console.log("Hello World");
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
// if(myDiagram.nodeDataArray["type"] == "red") {
//     console.log("red");
// }

// if(myDiagram.nodeDataArray.type == "red") {
//     console.log("red");
// }

console.log("Go Node", go.Node);
myDiagram.nodeTemplate =
    $(go.Node, "Horizontal", {background: "#44CCFF"},
        $(go.Picture, {margin: 10, width: 50, height: 50, background: "red"}, new go.Binding("source")),
        $(go.TextBlock, "Default Text",
            {
                margin: 12,
                width: 300,
                // stroke: "white",
                stroke: ("type"),
                font: "bold 16px sans-serif"
            },
            // new go.Binding("text", "type"))
            new go.Binding("text", "name"))
    );

var model = $(go.TreeModel);

var url = "http://localhost:9000/arguments.json";
jQuery.getJSON(url, function (data) {
    model.nodeDataArray = data;
    myDiagram.model = model;
    // console.log(data[7]["type"]);
    var i = 0;
    for (; i < Object.keys(model.nodeDataArray).length; i++) {
        console.log("type of ", i);
        console.log(data[i]["type"]);
    }
});


// jQuery.ajax({
//     type: 'GET',
//     url: url,
//     success: function (data) {
//         console.log(data);
//         model.nodeDataArray = data;
//         myDiagram.model = model;
//     }
// });
