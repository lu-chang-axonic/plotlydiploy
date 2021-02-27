function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    console.log(result.wfreq);
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
 
  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
    d3.json("samples.json").then((data) => {
    console.log(data);
        
    // 3. Create a variable that holds the samples array. 
    var samples=data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var filteredSample = samples.filter(sampleObj => sampleObj.id == sample); 
    //  5. Create a variable that holds the first sample in the array.
    var result = filteredSample[0];
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var result_otu_ids = result.otu_ids;
    var result_otu_labels = result.otu_labels;
    var result_sample_values = result.sample_values;

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    var sample_values_desc = result_sample_values.sort((a, b) => b - a);
    console.log(sample_values_desc);
    console.log('result_otu_ids', result_otu_ids);

    var topTenSampleValues=sample_values_desc.slice(0,10);
   
     var yticks=result_otu_ids.slice(0,10).map(otuID=>`OTU ${otuID}`)
     console.log(yticks);
    // 8. Create the trace for the bar chart. 
    var trace={
      x:topTenSampleValues.reverse(),
      y:yticks.reverse(),
      type:"bar",
      orientation:"h"
    };
    
    var barData = [trace];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
     title: "Top 10 Bacteria Cultures Found", 
     height: 450,
     width: 600
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);
  
    //Bubble Chart

    // Use Plotly to plot the data with the layout. 

    // 1. Create the trace for the bubble chart.
    var bubbleData = [
      {
        x: result_otu_ids,
        y: result_sample_values,
        text: result_otu_labels,
        mode: 'markers',
        marker: {
    //Colors are off. Not enough bubbles either. Top 10 and non-top 10 didn't make a difference
          color: result_otu_ids,
          size: result_sample_values
        }
      }
    ]

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: { title: "OTU ID" },
      showlegend: false,
      height: 600,
      width: 1200
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  
//Gauge Chart
    // 4. Create the trace for the gauge chart.
      var metadata = data.metadata;
      // Filter the data for the object with the desired sample number
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var wfreq=result.wfreq;
      console.log(wfreq)

      var gaugeData = [
      {
        value: wfreq,
        //Couldn't change the second line font
        title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week", font:{size: 24}},
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 10], tickwidth: 1, tickcolor: "darkblue" },
          bar: { color: "black" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "gray",
          steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow" },
            { range: [6, 8], color: "yellowgreen" },
            { range: [8, 10], color: "green" }
          ],
        }
      }
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 500, height: 500, margin: { t: 0, b: 0 }
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);
  });
}
