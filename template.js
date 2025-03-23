const jscad = require('@jscad/modeling')
const { vectorText } = jscad.text
const { translate, rotate } = jscad.transforms
const { extrudeRectangular, extrudeLinear } = jscad.extrusions
const { union, subtract } = jscad.booleans
const { cuboid, cylinder, polygon, circle } = jscad.primitives
const { hullChain } = jscad.hulls

const getParameterDefinitions = () => {
  return [
    { name: 'text', type: 'text', initial: '', size: 20, maxLength: 100, caption: 'Text on stick:', placeholder: 'Tomato' }
   ];
}

function main(params) {
  return stick(params.text);
}

function stick(txt) {
  var text = translate([3, -74, 0], rotate([0, 0, Math.PI / 2], createText(txt)));
  var body = translate([0, 0, 1], cuboid({size: [14, 151, 2]}));
  var point = translate([0, 75.5, 0], extrudeLinear({height: 2}, polygon({ points: [[-7, 0], [7, 0], [1, 14], [-1, 14]] })));
  var hole = translate([0,69, 1], cylinder({radius: 2.5, height: 2 }));
  return subtract(union(text, body, point), hole);
}

function createText(txt) {
  const segments = vectorText({height: 4, input: txt });
  const characterLineWidth = 1;
  const lineRadius = characterLineWidth / 2;
  const lineCorner = circle({ radius: lineRadius });
  const lineSegments = [];
  segments.forEach(segmentPoints => {
    const corners = segmentPoints.map((point) => translate(point, lineCorner));
    lineSegments.push(hullChain(corners));
  });
  const text2d = union(lineSegments);
  return extrudeLinear({ height: 2.2 }, text2d);
}

module.exports = { main }