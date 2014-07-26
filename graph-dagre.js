function myDrawNodes(g, root) {
  var nodes = g.nodes();

  var svgNodes = root
    .selectAll('g.node')
    .classed('enter', false)
    .data(nodes, function(u) { return u; });

  svgNodes.selectAll('*').remove();

  svgNodes
    .enter()
      .append('g')
        .style('opacity', 0)
        .attr('class', 'node enter');

  svgNodes.each(function(u) { myAddLabel(g.node(u), d3.select(this), 10, 10); });
  svgNodes.attr('id', function(u) { return 'node-' + u; });

  return svgNodes;
}
function myAddLabel(node, root, marginX, marginY) {
  // Add the rect first so that it appears behind the label
  var label = node.label;
  var rect = root.append('rect');
  var g = root.append('g');
  var labelSvg = g.append('g');

  addTextLabel(label,
               labelSvg,
               Math.floor(node.labelCols),
               node.labelCut);

  var labelBbox = labelSvg.node().getBBox();
  labelSvg.attr('transform',
             'translate(' + (-labelBbox.width / 2) + ',0)');

  if (node.image !== undefined) {
    root.classed('image-node', true);
    var image = g.append('image')
      .attr('xlink:href', node.image)
      .attr('width', '160').attr('height', '120')
      .attr('x', '-80').attr('y', '22');
  }

  var bbox = g.node().getBBox();
  g.attr('transform', 'translate(0,' + (-bbox.height / 2) + ')');

  rect
    .attr('rx', 5)
    .attr('ry', 5)
    .attr('x', -(bbox.width / 2 + marginX))
    .attr('y', -(bbox.height / 2 + marginY))
    .attr('width', bbox.width + 2 * marginX)
    .attr('height', bbox.height + 2 * marginY);
}
function addTextLabel(label, root, labelCols, labelCut) {
  if (labelCut === undefined) labelCut = 'false';
  labelCut = (labelCut.toString().toLowerCase() === 'true');

  var node = root
    .append('text')
    .attr('text-anchor', 'left');

  label = label.replace(/\\n/g, '\n');

  var arr = labelCols ? wordwrap(label, labelCols, labelCut) : label;
  arr = arr.split('\n');
  for (var i = 0; i < arr.length; i++) {
    node
      .append('tspan')
        .attr('dy', '1em')
        .attr('x', '1')
        .text(arr[i]);
  }
}
