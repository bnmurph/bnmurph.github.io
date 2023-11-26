
d3.csv("2018-2022_nflfastR_clean.csv").then(
    function (dataset){
        console.log(dataset)

        //https://observablehq.com/@d3/d3-group <-- Source for rollup syntax
        //https://observablehq.com/@d3/d3-flatgroup  <-- Source for flatRollup syntax
        moose = d3.flatRollup(dataset, i => d3.sum(i, k => k.pass)/i.length, d=>d.score_differential_buckets, d=>d.half_minutes_remaining)
        console.log(moose)

        var dimensions={
            width: 800,
            height: 270,
            margin: {
                top: 5,
                bottom: 60,
                right: 50,
                left: 100
            },
            rect_length: 20
        }
    
        var score_buckets = i => +i[0]
        var min_remaining = i => +i[1]
        var percent_pass = i => i[2]    

        var svg = d3.select("#time")
                    .style("width", dimensions.width)
                    .style("height", dimensions.height)

        var xScale = d3.scaleLinear()
                .domain(d3.extent(moose, min_remaining))
                .range([dimensions.margin.left + 31*dimensions.rect_length, dimensions.margin.left])

        var yScale = d3.scaleLinear()
                .domain(d3.extent(moose, score_buckets))
                .range([dimensions.height - dimensions.margin.bottom, dimensions.height - dimensions.margin.bottom - 10*dimensions.rect_length])
        
        const color = d3.scaleDiverging([0,0.5,1],["blue", "white","red"])

        var rectangles = svg.append("g")
                .selectAll("rect")
                .data(moose)
                .enter()
                .append("rect")
                .on('mouseover', function(){
                        d3.select(this).style('stroke', 'black')
                                       .style('stroke-width', 1)
                })
                .on('mouseout', function(){
                        d3.select(this).style('stroke-width', 0)
                })
                .on('click', function(){
                        //highlight this, unhighlight others (?) or just leave the stroke-width as 1
                        //filter if not filtered
                        //unfilter if filtered
                })
                .attr("x", d => xScale(min_remaining(d)))
                .attr("y", d => yScale(score_buckets(d)))
                .attr("width", dimensions.rect_length)
                .attr("height", dimensions.rect_length)
                .attr("fill", d=>color(percent_pass(d)))

        var xAxisGen = d3.axisBottom().scale(xScale)
        var xAxis = svg.append("g")
                .call(xAxisGen)
                .style("transform", `translate(${dimensions.rect_length/2}px,${dimensions.height-dimensions.margin.bottom+dimensions.rect_length}px)`)

        var yAxisGen = d3.axisLeft().scale(yScale).tickValues(d3.map(moose, score_buckets))
        var yAxis = svg.append("g")
                .call(yAxisGen)
                .style("transform", `translate(${dimensions.margin.left}px, ${dimensions.rect_length/2}px)`)

        //Axis Title Code from http://www.d3noob.org/2012/12/adding-axis-labels-to-d3js-graph.html
        var xTitle = svg.append("text")
                .attr("x", dimensions.width / 3)
                .attr("y", dimensions.height-10)
                .style("text_anchor", "middle")
                .text("Minutes Remaining in Half")
        
        var yTitle = svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", dimensions.margin.left/2)
                .attr("x", -2*dimensions.height / 3 )
                //.attr("dy", "1em")
                .style("text_anchor", "middle")
                .text("Score Differential") 
 
    }
)