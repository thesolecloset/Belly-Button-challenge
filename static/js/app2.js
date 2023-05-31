const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

d3.json(url).then(function(data) 
{
    console.log(data);
});

function init() 
{
    let menu1 = d3.select("#selDataset");
    d3.json(url).then((data) => 
    {        
        let samplenames = data.names;
        samplenames.forEach((id) => 
        {
            console.log(id);
            menu1.append("option")
            .text(id)
            .property("value",id);
        });

        let firstsample = samplenames[0];
        metadatabuilder(firstsample);
        barchartbuilder(firstsample);
        bubblechartbuilder(firstsample);
        gaugebuilder(firstsample);

    });
};

function metadatabuilder(sample) 
{

    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => 
    {

        // Retrieve all metadata
        let metadata = data.metadata;

        // Filter based on the value of the sample
        let valueofsample = metadata.filter(result => result.id == sample);

        // Log the array of metadata objects after the have been filtered
        console.log(valueofsample)

        // Get the first index from the array
        let valuearray = valueofsample[0];

        // Clear out metadata
        d3.select("#sample-metadata").html("");

        // Use Object.entries to add each key/value pair to the panel
        Object.entries(valuearray).forEach(([key,valueofsample]) => 
        {

            // Log the individual key/value pairs as they are being appended to the metadata panel
            console.log(key,valueofsample);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${valueofsample}`);
        });
    });

};

// Function that builds the bar chart
function barchartbuilder(sample) 
{

    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => 
    {

        // Retrieve all sample data
        let sampleInfo = data.samples;

        // Filter based on the value of the sample
        let valueofsample = sampleInfo.filter(result => result.id == sample);

        // Get the first index from the array
        let valuearray = valueofsample[0];
        
        let sample_values = valuearray.sample_values;
        let otu_ids = valuearray.otu_ids;
        let otu_labels = valuearray.otu_labels;

        // Log the data to the console
        console.log(otu_ids,otu_labels,sample_values);

        // Set top ten items to display in descending order
        let xticks = sample_values.slice(0,10).reverse();
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let labels = otu_labels.slice(0,10).reverse();
        
        // Set up the trace for the bar chart
        let trace = 
        {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        // Setup the bubblechartlayout
        let bubblechartlayout = 
        {
            title: "Top 10 OTUs Present Per Individual"
        };

        // Call Plotly to plot the bar chart
        Plotly.newPlot("bar", [trace], bubblechartlayout)
    });
};

// Function that builds the bubble chart
function bubblechartbuilder(sample) 
{

    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => 
    {
        
        // Retrieve all sample data
        let sampleInfo = data.samples;

        // Filter based on the value of the sample
        let valueofsample = sampleInfo.filter(result => result.id == sample);

        // Get the first index from the array
        let valuearray = valueofsample[0];
        let otu_ids = valuearray.otu_ids;
        let otu_labels = valuearray.otu_labels;
        let sample_values = valuearray.sample_values;
        let trace1 = 
        {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: 
            {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        let bubblechartlayout = 
        {
            title: "Bacteria Per Sample",
            hovermode: "Closest",
            xaxis: 
            {
                title: "OTU IDs"
            },
        };

        Plotly.newPlot("bubble", [trace1], bubblechartlayout)
    });
};

function optionchange(valueofsample) 
{ 
    metadatabuilder(valueofsample);
    barchartbuilder(valueofsample);
    bubblechartbuilder(valueofsample);
    gaugebuilder(valueofsample);
};

init();