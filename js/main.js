var $ = go.GraphObject.make;
var myDiagram =
    $(go.Diagram, "myDiagramDiv",
        {
            initialContentAlignment: go.Spot.Center, // center Diagram contents
            "undoManager.isEnabled": true, // enable Ctrl-Z to undo and Ctrl-Y to redo
            layout: $(go.TreeLayout, // specify a Diagram.layout that arranges trees
                {angle: 90, layerSpacing: 35})
        });

// the template we defined earlier
myDiagram.nodeTemplate =
    $(go.Node, "Horizontal",
        {background: "#44CCFF"},
        $(go.Picture,
            {margin: 10, width: 50, height: 50, background: "red"},
            new go.Binding("source")),
        $(go.TextBlock, "Default Text",
            {margin: 12, stroke: "white", font: "bold 16px sans-serif"},
            new go.Binding("text", "name"))
    );

var model = $(go.TreeModel);

var url = "http://localhost:9000/arguments.json";
jQuery.getJSON(url, function(data){
    model.nodeDataArray = data;
    myDiagram.model = model;
});
