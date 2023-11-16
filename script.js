d3.csv('2018-2022_nflfastR_clean.csv').then(
    function(dataset) {
        var svg_dimensions = {
            width: 900,
            height: 500,
            margin:{
                top:10,
                bottom:50,
                right:10,
                left:100
            }
        }

        var deepData = dataset.filter(function(d){})

        var scatter_dimensions = {
            width: svg_dimensions.width - svg_dimensions.margin.left - svg_dimensions.margin.right,
            height: (svg_dimensions.height - svg_dimensions.margin.top - svg_dimensions.margin.bottom)/3
        }

        var xAccessor = d => d.xpass
        var yAccessor = function(d){
            if (d.new_play_type === 'deep pass') {return (+d.epa + 56);}
            else if (d.new_play_type === 'short pass') {return (+d.epa + 28);}
            else if (d.new_play_type === 'run') {return +d.epa;}
        }
        var teamAccessor = d => d.posteam

        var svg = d3.select('#success')
                    .style("width", svg_dimensions.width)
                    .style("height", svg_dimensions.height)

        var xScale = d3.scaleLinear()
                       .domain([0,1])
                       .range([svg_dimensions.margin.left,svg_dimensions.margin.left+scatter_dimensions.width])

        var yScale = d3.scaleLinear()
                       .domain([70,-14])
                       .range([svg_dimensions.margin.top, svg_dimensions.height - svg_dimensions.margin.bottom])

        var dots = svg.append("g")
                        .selectAll("circle")
                        .data(dataset)
                        .enter()
                        .append("circle")
                        .attr("cx", d => xScale(xAccessor(d)))
                        .attr("r", 3)
                        .attr("cy", d => yScale(yAccessor(d)))
                        .attr("fill", "yellow")
                        .attr("opacity", '0.2')
        
        var logos = ['ARI', 'ATL', 'BAL', 'BUF', 'CAR', 'CHI', 'CIN', 'CLE',
                    'DAL', 'DEN', 'DET', 'GB', 'HOU', 'IND', 'JAX', 'KC', 'LA',
                    'LAC', 'LV', 'MIA', 'MIN', 'NE', 'NO', 'NYG', 'NYJ', 'PHI',
                    'PIT', 'SEA', 'SF', 'TB', 'TEN', 'WAS']
        
        /*
            ISSUES:
            1. Border doesn't stay when clicked
            2. Can't get it to go back to full dataset
            3. Can't select multiple
        */
        logos.forEach(logo => {
            var img = d3.select('#pictures')
                        .append("img")
                        .attr("src", "./logos/"+logo+".png")
                        .attr("class", "logo")
                        .attr("width", 46)
                        .attr("height", 46)
                        .on("click", function(){
                            d3.select(this).style('border', '2px solid black');
                            
                            dots.filter(d => teamAccessor(d) != logo)
                                .attr("r", 0)
                        })
                        .on('mouseover', function(){
                            d3.select(this).style('border', '2px solid black')
                        })
                        .on('mouseout', function(){
                            d3.select(this).style('border', 'none')
                        });
        })


        /*
            BELOW ARE ONLY LINES AND AXES
        */

        var yScaleDeepPass = d3.scaleLinear()
                               .domain([14,-14])
                               .range([svg_dimensions.margin.top, svg_dimensions.margin.top+scatter_dimensions.height])

        var yScaleShortPass = d3.scaleLinear()
                                .domain([14,-14])
                                .range([svg_dimensions.margin.top + scatter_dimensions.height, svg_dimensions.margin.top + 2 * scatter_dimensions.height])

        var yScaleRun = d3.scaleLinear()
                          .domain([14,-14])
                          .range([svg_dimensions.margin.top + 2 * scatter_dimensions.height, svg_dimensions.margin.top + 3 * scatter_dimensions.height])

        var center = svg.append("line")
                        .attr("x1", xScale(0.5))
                        .attr("y1", svg_dimensions.margin.top)
                        .attr("x2", xScale(0.5))
                        .attr("y2", svg_dimensions.height - svg_dimensions.margin.bottom)
                        .attr("stroke", "gray")
                        .attr("stroke-width", 2)

        var deep_center = svg.append("line")
                             .attr("x1", svg_dimensions.margin.left)
                             .attr("y1", yScaleDeepPass(0))
                             .attr("x2", svg_dimensions.margin.left + scatter_dimensions.width)
                             .attr("y2", yScaleDeepPass(0))
                             .attr("stroke", "gray")
                             .attr("stroke-width", 2)

        var short_center = svg.append("line")
                              .attr("x1", svg_dimensions.margin.left)
                              .attr("y1", yScaleShortPass(0))
                              .attr("x2", svg_dimensions.margin.left + scatter_dimensions.width)
                              .attr("y2", yScaleShortPass(0))
                              .attr("stroke", "gray")
                              .attr("stroke-width", 2)

        var run_center = svg.append("line")
                            .attr("x1", svg_dimensions.margin.left)
                            .attr("y1", yScaleRun(0))
                            .attr("x2", svg_dimensions.margin.left + scatter_dimensions.width)
                            .attr("y2", yScaleRun(0))
                            .attr("stroke", "gray")
                            .attr("stroke-width", 2)

        var deep_top = svg.append("line")
                          .attr("x1", svg_dimensions.margin.left)
                          .attr("y1", yScaleDeepPass(14))
                          .attr("x2", svg_dimensions.margin.left + scatter_dimensions.width)
                          .attr("y2", yScaleDeepPass(14))
                          .attr("stroke", "black")

        var short_top = svg.append("line")
                           .attr("x1", svg_dimensions.margin.left)
                           .attr("y1", yScaleShortPass(14))
                           .attr("x2", svg_dimensions.margin.left + scatter_dimensions.width)
                           .attr("y2", yScaleShortPass(14))
                           .attr("stroke", "black")

        var run_top = svg.append("line")
                         .attr("x1", svg_dimensions.margin.left)
                         .attr("y1", yScaleRun(14))
                         .attr("x2", svg_dimensions.margin.left + scatter_dimensions.width)
                         .attr("y2", yScaleRun(14))
                         .attr("stroke", "black")

        var xAxisGen = d3.axisBottom().scale(xScale)

        var xAxis = svg.append("g")
                       .call(xAxisGen)
                       .style("transform", `translateY(${svg_dimensions.height-svg_dimensions.margin.bottom}px)`)
    
        var deepAxisGen = d3.axisLeft().scale(yScaleDeepPass).tickValues([-10, -5, 0, 5, 10])
        
        var deepAxis = svg.append("g")
                          .call(deepAxisGen)
                          .style("transform", `translateX(${svg_dimensions.margin.left}px)`)

        var shortAxisGen = d3.axisLeft().scale(yScaleShortPass).tickValues([-10, -5, 0, 5, 10])

        var shortAxis = svg.append("g")
                        .call(shortAxisGen)
                        .style("transform", `translateX(${svg_dimensions.margin.left}px)`)

        var runAxisGen = d3.axisLeft().scale(yScaleRun).tickValues([-10, -5, 0, 5, 10])

        var runAxis = svg.append("g")
                         .call(runAxisGen)
                         .style("transform", `translateX(${svg_dimensions.margin.left}px)`)

        var xLab = svg.append("text")
                      .attr("x", xScale(0.5))
                      .attr("y", svg_dimensions.height - svg_dimensions.margin.bottom + 35)
                      .attr("text-anchor", "middle")
                      .text("xPass (Pass Expectancy)")
                      .attr("fill", "black")
                      .attr("font-size", "18px")

        var yLab = svg.append("text")
                      .attr("x", -yScaleShortPass(0))
                      .attr("y", svg_dimensions.margin.left - 75)
                      .attr("text-anchor", "middle")
                      .text("EPA (Expected Points Added)")
                      .attr("fill", "black")
                      .attr("font-size", "18px")
                      .attr("transform", "rotate(-90)")
    
        var deepLab = svg.append("text")
                         .attr("transform", "rotate(-90)")
                         .attr("x", -yScaleDeepPass(0))
                         .attr("y", svg_dimensions.margin.left - 40)
                         .attr("text-anchor", "middle")
                         .attr("font-size", "14px")
                         .text("Deep Pass")
                         .attr("fill", "gray")
        
        var shortLab = svg.append("text")
                          .attr("transform", "rotate(-90)")
                          .attr("x", -yScaleShortPass(0))
                          .attr("y", svg_dimensions.margin.left - 40)
                          .attr("text-anchor", "middle")
                          .attr("font-size", "14px")
                          .text("Short Pass")
                          .attr("fill", "gray")
            
        var runLab = svg.append("text")
                         .attr("transform", "rotate(-90)")
                         .attr("x", -yScaleRun(0))
                         .attr("y", svg_dimensions.margin.left - 40)
                         .attr("text-anchor", "middle")
                         .attr("font-size", "14px")
                         .text("Run")
                         .attr("fill", "gray")

    }
)



