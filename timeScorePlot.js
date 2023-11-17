
d3.csv("trying_something_4.csv").then(
    function (dataset){

        //console.log(dataset)
        

        var dimensions={
            width: 900,
            height: 270,
            margin: {
                top: 15,
                bottom: 30,
                right: 50,
                left: 100
            },
            circle_radius: 10
        }
    
        var score_buckets = i => i.score_differential_buckets
        var min_remaining = i => i['half_minutes_remaining']
        var percent_pass = i => i['Pass %']        

        var svg = d3.select("#time")
                    .style("width", dimensions.width)
                    .style("height", dimensions.height)

        var xScale = d3.scaleBand()
                .domain(d3.map(dataset, min_remaining))
                .range([dimensions.margin.left + 31*2*dimensions.circle_radius, dimensions.margin.left])

        var yScale = d3.scaleBand()
                .domain(d3.map(dataset, score_buckets))
                .range([dimensions.height - dimensions.margin.bottom, dimensions.height - dimensions.margin.bottom - 2*11*dimensions.circle_radius])
        
        const color = d3.scaleDiverging([0,0.5,1],["blue", "white","red"])

        var circles = svg.append("g")
                .selectAll("circle")
                .data(dataset)
                .enter()
                .append("circle")
                .attr("cx", d => xScale(min_remaining(d)))
                .attr("cy", d => yScale(score_buckets(d)))
                .attr("r", dimensions.circle_radius)
                .attr("fill", d=>color(percent_pass(d)))
                .datum({selected:false})
                .on('mouseover', function(){
                        if (d3.select(this).datum().selected == false) { d3.select(this).style('stroke', 'black')
                                                                                        .style('stroke-width', 1.5); }
                })
                .on('mouseout', function(){
                        if (d3.select(this).datum().selected == false) { d3.select(this).style('stroke-width', 0); }
                })
                .on('click', function(){
                        //maybe this??? idk
                        if (!d3.select(this).datum().selected) {
                                // dots.filter(function(d){
                                //         return (d.half_minutes_remaining != this.half_minutes_remaining || d.score_differential_buckets != this.score_differential_buckets)
                                // }).attr('r', 0);
                                d3.select(this).style('stroke-width', 1.5)
                                               .style('stroke', 'black');
                                d3.select(this).datum({selected:true});
                        }
                        else {
                                //dots.attr('r', 3);
                                d3.select(this).style('stroke-width', 0);
                                d3.select(this).datum({selected:false});
                        }
                        //highlight this, unhighlight others (?) or just leave the stroke-width as 1
                        //filter if not filtered
                        //unfilter if filtered
                })

        var xAxisGen = d3.axisBottom().scale(xScale)
                .tickValues(xScale.domain().filter(function(d,i){return !(i%2)}))

        var xAxis = svg.append("g")
                .call(xAxisGen)
                .style("transform", `translate(${-dimensions.circle_radius}px, ${dimensions.height-dimensions.margin.bottom-dimensions.circle_radius}px)`)

        var yAxisGen = d3.axisLeft().scale(yScale)
        var yAxis = svg.append("g")
                .call(yAxisGen)
                .style("transform", `translate(${dimensions.margin.left-dimensions.circle_radius}px, ${-dimensions.circle_radius}px)`)

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

