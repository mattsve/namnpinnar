#!/bin/bash
seds="s/å/a/g;"
seds+="s/ä/a/g;"
seds+="s/ö/o/g;"
seds+="s/Å/A/g;"
seds+="s/Ä/A/g;"
seds+="s/Ö/O/g;"
seds+="s/ü/u/g;"

[[ -d stl ]] || mkdir stl
while IFS= read -r line ; do
  trimmed=$(echo "$line" | sed -r "s/[[:blank:]]+$//g;")
  stl="stl/${trimmed}.stl"
  if [ ! -f "$stl" ]; then
    txt=$(echo "$trimmed" | sed ${seds})
    npx jscad template.js --text "${txt}" -o "$stl"
    admesh --fill-holes --normal-directions --normal-values -b "$stl" "$stl" > /dev/null
  fi
done < names.txt