#!/bin/bash
seds="s/å/a/g;"
seds+="s/ä/a/g;"
seds+="s/ö/o/g;"
seds+="s/Å/A/g;"
seds+="s/Ä/A/g;"
seds+="s/Ö/O/g;"

while IFS= read -r line ; do
  mkdir -p stl
  stl="stl/${line}.stl"
  if [ ! -f $stl ]; then
    txt=$(echo "$line" | sed ${seds})
    npx jscad template.js --text "$txt" -o "$stl" 
  fi
done < names.txt