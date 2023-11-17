
d3.csv("2018-2022_nflfastR_clean.csv").then(
    function (dataset){
        console.log(dataset)

        //https://observablehq.com/@d3/d3-group <-- Source for rollup syntax
        //https://observablehq.com/@d3/d3-flatgroup  <-- Source for flatRollup syntax
        moose = d3.flatRollup(dataset, i => d3.sum(i, k => k.pass)/i.length, d=>d.score_differential_buckets, d=>d.half_minutes_remaining)
        console.log(moose)

        var dimensions={
            width: 900,
            height: 270,
            margin: {
                top: 15,
                bottom: 50,
                right: 50,
                left: 100
            },
            circle_radius: 10
        }
    
        var score_buckets = i => +i[0]
        var min_remaining = i => +i[1]
        var percent_pass = i => i[2]    

        var svg = d3.select("#time")
                    .style("width", dimensions.width)
                    .style("height", dimensions.height)

        var xScale = d3.scaleLinear()
                .domain(d3.extent(moose, min_remaining))
                .range([dimensions.margin.left + 31*2*dimensions.circle_radius, dimensions.margin.left])

        var yScale = d3.scaleLinear()
                .domain(d3.extent(moose, score_buckets))
                .range([dimensions.height - dimensions.margin.bottom, dimensions.height - dimensions.margin.bottom - 2*10*dimensions.circle_radius])
        
        const color = d3.scaleDiverging([0,0.5,1],["blue", "white","red"])

        var circles = svg.append("g")
                .selectAll("circle")
                .data(moose)
                .enter()
                .append("circle")
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
                .attr("cx", d => xScale(min_remaining(d)))
                .attr("cy", d => yScale(score_buckets(d)))
                .attr("r", dimensions.circle_radius)
                .attr("fill", d=>color(percent_pass(d)))

        var xAxisGen = d3.axisBottom().scale(xScale)
        var xAxis = svg.append("g")
                .call(xAxisGen)
                .style("transform", `translateY(${dimensions.height-dimensions.margin.bottom+dimensions.circle_radius}px)`)

        var yAxisGen = d3.axisLeft().scale(yScale)
        var yAxis = svg.append("g")
                .call(yAxisGen)
                .style("transform", `translateX(${dimensions.margin.left-dimensions.circle_radius}px`)

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