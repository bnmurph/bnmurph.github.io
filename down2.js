
d3.csv("2018-2022_nflfastR_clean.csv").then(
    function(dataset){
        //console.log(dataset)

        reduced_data = d3.flatRollup(dataset, i => d3.sum(i, k => k.pass)/i.length, d=>d.down, d=>d.ydstogo_buckets)
        reduced_data.splice(56, 1)

        var downDimensions={
            width: 750,
            height: 270,
            margin: {
                top: 15,
                bottom: 30,
                right: 50,
                left: 100
            },
            rectLength: 40
        }

        var downs = i => +i[0]
        var ydstogo = i => i[1]
        var percent_pass = i => +i[2]
        var downsLabel = ['1st Down', '2nd Down', '3rd Down', '4th Down']

        var downs_svg = d3.select("#downs")
                    .style("width", downDimensions.width)
                    .style("height", downDimensions.height)

        var ydsLabel = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11-15', '16-20', '21-25', '26+'];

        //build x axis
        var xScaleDowns = d3.scalePoint()
                .domain(ydsLabel)
                .range([downDimensions.margin.left, downDimensions.margin.left + 13*downDimensions.rectLength+13])
               
        //build y axis
        var yScaleDowns = d3.scaleLinear()
                .domain(d3.extent(reduced_data, downs))
                .range([downDimensions.height - downDimensions.margin.bottom - 5*downDimensions.rectLength-3, downDimensions.height-downDimensions.margin.bottom-2*downDimensions.rectLength])
                
        const color = d3.scaleDiverging([0,0.5,1],["blue", "white","red"])           

        var rectsDowns = downs_svg.append("g")
                .selectAll("rect")
                .data(reduced_data)
                .enter()
                .append("rect")
                .on('mouseover', function(){
                        d3.select(this).style('stroke', 'black')
                                       .style('stroke-width', 1)
                })
                .on('mouseout', function(){
                        d3.select(this).style('stroke-width', 0)
                })
                .attr("y", d => yScaleDowns(downs(d)))
                .attr("x", d => xScaleDowns(ydstogo(d))) 
                .attr("height", downDimensions.rectLength)
                .attr("width", downDimensions.rectLength)
                .attr("fill", d=>color(percent_pass(d)))
                //.attr("stroke-width", 1)
                //.attr("stroke", "white")

        var xTitleDowns = downs_svg.append("text")
                .attr("x", (downDimensions.width-downDimensions.margin.left)/2)
                .attr("y", downDimensions.height-30)
                .style("text_anchor", "middle")
                .text("Yards to go")
        
        // var yTitle = downs_svg.append("text")
        //         .attr("transform", "rotate(-90)")
        //         .attr("y", downDimensions.margin.left/4)
        //         .attr("x", -2*downDimensions.height / 4 )
        //         .style("text_anchor", "middle")
        //         .text("Down")

        var xAxisGenDowns = d3.axisBottom().scale(xScaleDowns)
                .tickValues(xScaleDowns.domain())

        var xAxisDowns = downs_svg.append("g")
                .call(xAxisGenDowns)
                .style("transform", `translate(${downDimensions.rectLength/2}px, ${downDimensions.height-downDimensions.margin.bottom-downDimensions.rectLength}px)`)

        var newScaleDowns = d3.scaleBand()
        .domain(downsLabel)
        .range([downDimensions.height - downDimensions.margin.bottom - 4*downDimensions.rectLength, downDimensions.height - downDimensions.margin.bottom])

        var yAxisGenDowns = d3.axisLeft().scale(newScaleDowns)

        var yAxisDowns = downs_svg.append("g")
                .call(yAxisGenDowns)
                .style("transform", `translate(${downDimensions.margin.left}px, ${-downDimensions.rectLength}px)`)

        //build color legend
        //code from: https://www.visualcinnamon.com/2016/05/smooth-color-legend-d3-downs_svg-gradient/
        //Append a defs element to your SVG
        var keysvg = d3.select("#legend")
                    .style("width", 750)
                    .style("height", 100)

        var defs = keysvg.append("defs");

        //Append a linearGradient element to the defs and give it a unique id
        var linearGradient = defs.append("linearGradient")
                .attr("id", "linear-gradient");
        //Horizontal gradient
        linearGradient
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");
        //Set the color for the start (0%)
        linearGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "blue"); 
        //Set the color for the middle (50%)
        linearGradient.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "white"); 
        //Set the color for the end (100%)
        linearGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "red");   

        //var legendWidth = 300;
        //Color Legend container
        var legendsvg = keysvg.append("g")
                .attr("class", "legendWrapper")
        //Draw the Rectangle
        legendsvg.append("rect")
                .attr("class", "legendRect")
                .attr("x", 225)
                .attr("y", 45)
                .attr("width", 300)
                .attr("height", 10)
                .style("fill", "url(#linear-gradient)");
                
        //Append title
        legendsvg.append("text")
                .attr("class", "legendTitle")
                .attr("x",336.5)
                .attr("y", 30)
                .text("Pass Percentage")
                .attr("font-size", 12)
        legendsvg.append("text")
                .attr("class", "legendTitle")
                .attr("x",225)
                .attr("y", 90)
                .text("More likely to run")
                .attr("font-size", 12)
        legendsvg.append("text")
                .attr("class", "legendTitle")
                .attr("x",435)
                .attr("y", 90)
                .text("More likely to pass")
                .attr("font-size", 12)
        
        //Set scale for x-axis
        var xScaleLegend = d3.scaleLinear()
                        .range([225, 525])
                       .domain([0, 1]);
        
        //Define x-axis
        var xAxisLegend = d3.axisBottom().scale(xScaleLegend)
                        .ticks(3)
                        .tickValues([0,0.5,1])
                        .tickFormat(d3.format(".0%"))
        
        //Set up X axis
        legendsvg.append("g")
                .attr("class", "axis")
                .call(xAxisLegend)
                //.attr("transform", "translate(0," + (10) + ")")
                .style("transform", `translate(${0}px, ${55}px)`)


    }
)