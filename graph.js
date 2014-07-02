function draw() {
	g = new dagreD3.Digraph();

	var category_id, menu_id, rekt_id,
		from, to, edges = {};
	for (var category in coords) {
		for (var menu in coords[category]) {
			if (menu === 'id')
				continue;

			menu_id = Draw._joinIds(category, menu);

			g.addNode(menu_id, { label: menu });
			for (var rekt in coords[category][menu]) {
				if (rekt === 'id')
					continue;

				rekt_id = Draw._joinIds(category, menu, rekt);
				from = menu_id;
				to = coords[category][menu][rekt].ref;

				if (to === '   ')
					continue;

				if (to === 'END' || to === 'NEW') {
					to += '-' + menu_id;
					if (!(to in g._nodes))
						g.addNode(to);
				}

				if (!(from in edges))
					edges[from] = {};
				if (!(to in edges[from]))
					edges[from][to] = [rekt_id, from, to, { label: [rekt] }];
				else
					edges[from][to][3].label.push(rekt);
			}
		}
	}
	var l, la;
	for (from in edges)
		for (to in edges[from]) {
			l = edges[from][to][3].label;

			if (l.length <= 4)
				la = l.join("\n");
			else
				la = l.slice(0, 2).join("\n") + "\n…\n" + l[l.length - 1];

			edges[from][to][3].label = la;
			g.addEdge.apply(g, edges[from][to]);
		}

	var renderer = new dagreD3.Renderer();
	var oldDrawNodes = renderer.drawNodes();
	renderer.drawNodes(function(graph, root) {
		var svgNodes = oldDrawNodes(graph, root);
		svgNodes.attr("id", function(u) { return "node-" + u; });
		return svgNodes;
	});
	renderer.run(g, d3.select("svg g"));
}

window.onload = draw;
