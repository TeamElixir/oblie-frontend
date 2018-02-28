// function init() {
    if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
    var $ = go.GraphObject.make;  // for conciseness in defining templates

    myDiagram =
        $(go.Diagram, "myDiagramDiv",  // must be the ID or reference to div
            {
                "toolManager.hoverDelay": 100,  // 100 milliseconds instead of the default 850
                allowCopy: false,
                layout:  // create a TreeLayout for the family tree
                    $(go.TreeLayout,
                        {angle: 90, nodeSpacing: 10, layerSpacing: 40, layerStyle: go.TreeLayout.LayerUniform})
            });

    var bluegrad = '#90CAF9';
    var pinkgrad = '#F48FB1';

    // Set up a Part as a legend, and place it directly on the diagram
    myDiagram.add(
        $(go.Part, "Table",
            {position: new go.Point(300, 10), selectable: false},
            $(go.TextBlock, "Key",
                {row: 0, font: "700 14px Droid Serif, sans-serif"}),  // end row 0
            $(go.Panel, "Horizontal",
                {row: 1, alignment: go.Spot.Left},
                $(go.Shape, "Rectangle",
                    {desiredSize: new go.Size(30, 30), fill: bluegrad, margin: 5}),
                $(go.TextBlock, "Arguments",
                    {font: "700 13px Droid Serif, sans-serif"})
            ),  // end row 1
            $(go.Panel, "Horizontal",
                {row: 2, alignment: go.Spot.Left},
                $(go.Shape, "Rectangle",
                    {desiredSize: new go.Size(30, 30), fill: pinkgrad, margin: 5}),
                $(go.TextBlock, "Citations",
                    {font: "700 13px Droid Serif, sans-serif"})
            )  // end row 2
        ));

    // get tooltip text from the object's data
    function tooltipTextConverter(person) {
        var str = "";
        str += "Born: " + person.birthYear;
        if (person.deathYear !== undefined) str += "\nDied: " + person.deathYear;
        if (person.reign !== undefined) str += "\nReign: " + person.reign;
        return str;
    }

    // define tooltips for nodes
    var tooltiptemplate =
        $(go.Adornment, "Auto",
            $(go.Shape, "Rectangle",
                {fill: "whitesmoke", stroke: "black"}),
            $(go.TextBlock,
                {
                    font: "bold 8pt Helvetica, bold Arial, sans-serif",
                    wrap: go.TextBlock.WrapFit,
                    margin: 5
                },
                new go.Binding("text", "", tooltipTextConverter))
        );

    // define Converters to be used for Bindings
    function changeColorAccordingToType(type) {
        if (type === null) return bluegrad;
        if (type === "red") return pinkgrad;
        return "orange";
    }

    // replace the default Node template in the nodeTemplateMap
    myDiagram.nodeTemplate =
        $(go.Node, "Auto",
            {deletable: false, toolTip: tooltiptemplate},
            new go.Binding("text", "name"),
            $(go.Shape, "Rectangle",
                {
                    fill: "lightgreen",
                    stroke: null, strokeWidth: 0,
                    stretch: go.GraphObject.Fill,
                    alignment: go.Spot.Center
                },
                new go.Binding("fill", "type", changeColorAccordingToType)),
            $(go.TextBlock,
                {
                    font: "700 12px Droid Serif, sans-serif",
                    textAlign: "center",
                    margin: 10, maxSize: new go.Size(200, NaN)
                },
                new go.Binding("text", "name"))
        );

    // define the Link template
    myDiagram.linkTemplate =
        $(go.Link,  // the whole link panel
            {routing: go.Link.Orthogonal, corner: 5, selectable: false},
            $(go.Shape, {strokeWidth: 3, stroke: '#424242'}
            ));  // the gray link shape

    // // here's the family data
    var nodeDataArray = [];

    // create the model for the family tree
    myDiagram.model = new go.TreeModel(nodeDataArray);

    // document.getElementById('zoomToFit').addEventListener('click', function () {
    //     myDiagram.zoomToFit();
    // });
    //
    // document.getElementById('centerRoot').addEventListener('click', function () {
    //     myDiagram.scale = 1;
    //     myDiagram.scrollToRect(myDiagram.findNodeForKey(0).actualBounds);
    // });

// }   // init()

var model = $(go.TreeModel);

var url = "http://localhost:9000/arguments.json";
// var url = "../arguments.json";
jQuery.getJSON(url, function (data) {
    model.nodeDataArray = data;
    myDiagram.model = model;
    // console.log(data[6]["type"]);
});
