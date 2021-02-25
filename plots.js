d3.json("samples.json").then(function(data){
  console.log(data);
});

d3.json("samples.json").then(function(data){
  wfreq = data.metadata.map(person => person.wfreq);
  console.log(wfreq);
});

d3.json("samples.json").then(function(data){
  wfreq = data.metadata.map(person =>
person.wfreq).sort((a,b) => b - a);
  console.log(wfreq);
});

d3.json("samples.json").then(function(data){
  wfreq = data.metadata.map(person =>
person.wfreq).sort((a,b) => b - a);
  filteredWfreq = wfreq.filter(element => element !=
null);
  console.log(filteredWfreq);
});

//display the metadata of any individual from the dataset
d3.json("samples.json").then(function(data){
  firstPerson = data.metadata[0];
  Object.entries(firstPerson).forEach(([key, value]) =>
    {console.log(key + ': ' + value);});
});

d3.selectAll("body").on("change", updatePage);

function updatePage() {
  var dropdownMenu = d3.selectAll("#selectOption").node();
  var dropdownMenuID = dropdownMenu.id;
  var selectedOption = dropdownMenu.value;

  console.log(dropdownMenuID);
  console.log(selectedOption);
};

// //change of charts

// function init() {
//   data = [{
//     x: [1, 2, 3, 4, 5],
//     y: [1, 2, 4, 8, 16] }];
//   Plotly.newPlot("plot", data);
// };

// d3.selectAll("#dropdownMenu").on("change", updatePlotly);
// function updatePlotly() {
//   var dropdownMenu = d3.select("#dropdownMenu");
//   var dataset = dropdownMenu.property("value");

//   var xData = [1, 2, 3, 4, 5];
//   var yData = [];

//   if (dataset === 'dataset1') {
//     yData = [1, 2, 4, 8, 16];
//   };

//   if (dataset === 'dataset2') {
//     yData = [1, 10, 100, 1000, 10000];
//   };

//   var trace = {
//     x: [xData],
//     y: [yData],
//   };
//   Plotly.restyle("plot", trace);
// };

// init();

function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
})}

init();

function optionChanged(newSample) {
  console.log(newSample);
}
//optionChanged() is called from the HTML document and, in turn, calls buildMetadata() and buildCharts(). Th
function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    PANEL.append("h6").text(key.result, result.ethnicity);
    PANEL.append("h6").text(result.id);
    PANEL.append("h6").text(result.gender);
    PANEL.append("h6").text(result.age);
    PANEL.append("h6").text(result.location);
    PANEL.append("h6").text(result.bbtype);
    PANEL.append("h6").text(result.wfreq);
  });
}

