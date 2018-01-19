
var $ = go.GraphObject.make;
var myDiagram =
    $(go.Diagram, "myDiagramDiv",
        {
            initialContentAlignment: go.Spot.Center, // center Diagram contents
            "undoManager.isEnabled": true, // enable Ctrl-Z to undo and Ctrl-Y to redo
            layout: $(go.TreeLayout, // specify a Diagram.layout that arranges trees
                { angle: 90, layerSpacing: 35 })
        });

// the template we defined earlier
myDiagram.nodeTemplate =
    $(go.Node, "Horizontal",
        { background: "#44CCFF" },
        $(go.Picture,
            { margin: 10, width: 50, height: 50, background: "red" },
            new go.Binding("source")),
        $(go.TextBlock, "Default Text",
            { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
            new go.Binding("text", "name"))
    );

var model = $(go.TreeModel);
model.nodeDataArray =
    [
        { key: "1",              name: "Turner et al vs. United States"},
        { key: "2", parent: "1", name: "argument"},
        { key: "3", parent: "1", name: "argument"},
        { key: "4", parent: "3", name: "argument"},
        { key: "5", parent: "3", name: "argument"},
        { key: "6", parent: "2", name: "argument"}
    ];
myDiagram.model = model;
    