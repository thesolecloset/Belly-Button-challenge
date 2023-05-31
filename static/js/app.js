const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"



function metadatabuilder(sample1) 
{
    d3.json(url).then((data) => 
    {
        let metadata = data.metadata;
        let value1 = metadata.filter(result => result.id == sample1);
        let valuearray = value1[0];

        d3.select("#sample-metadata").html("");
        Object.entries(valuearray).forEach(([key,value1]) => 
        {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value1}`);
        });
    });

};

function barchartbuilder(sample2) 
{
    d3.json(url).then((data) => 
    {
        let sampledata = data.samples;
        let value2 = sampledata.filter(result => result.id == sample2);
        let valuearray = value2[0];
        let otu_ids = valuearray.otu_ids;
        let otu_labels = valuearray.otu_labels;
        let sample_values = valuearray.sample_values;
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();
        let trace = 
        {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        let bubblechartlayout = 
        {
            title: "Top 10 OTUs Present Per Individual"
        };

        Plotly.newPlot("bar", [trace], bubblechartlayout)
    });
};

function bubblechartbuilder(sample3) 
{
    d3.json(url).then((data) => 
    {
        let datasample = data.samples;
        let value3 = datasample.filter(result => result.id == sample3);
        let valuearray = value3[0];
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

function optionChanged(value4)
{ 
    metadatabuilder(value4);
    barchartbuilder(value4);
    bubblechartbuilder(value4);
};

d3.json(url).then(function(data) 
{
    console.log(data);
});

function init() 
{
    let menu1 = d3.select("#selDataset");
    d3.json(url).then((data) => 
    {  
        let names = data.names;
        names.forEach((id) => 
        {
            menu1.append("option")
            .text(id)
            .property("value",id);
        });

        let firstsample = names[0];
        metadatabuilder(firstsample);
        barchartbuilder(firstsample);
        bubblechartbuilder(firstsample);
    });
};

init();
