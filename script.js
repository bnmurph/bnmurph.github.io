d3.csv('2018-2022_nflfastR_clean.csv').then(
    function(dataset) {
        var svg_dimensions = {
            width: 700,
            height: 775,
            margin:{
                top:10,
                bottom:50,
                right:10,
                left:100
            }
        }

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

         
        var colorWay = function(d,team){
            if (team == 'BAL') {if (+d.epa >= 0) {return '#241773'} else {return '#000000'}}
            else if (team == 'CIN') {if (+d.epa >= 0) {return '#FB4F14'} else {return '#000000'}}
            else if (team == 'CLE') {if (+d.epa >= 0) {return '#311D00'} else {return '#FF3C00'}}
            else if (team == 'PIT') {if (+d.epa >= 0) {return '#FFB612'} else {return '#101820'}}
            else if (team == 'BUF') {if (+d.epa >= 0) {return '#00338D'} else {return '#C60C30'}}
            else if (team == 'MIA') {if (+d.epa >= 0) {return '#008E97'} else {return '#FC4C02'}}
            else if (team == 'NE') {if (+d.epa >= 0) {return '#002244'} else {return '#C60C30'}}
            else if (team == 'NYJ') {if (+d.epa >= 0) {return '#125740'} else {return '#000000'}}
            else if (team == 'HOU') {if (+d.epa >= 0) {return '#03202F'} else {return '#A71930'}}
            else if (team == 'IND') {if (+d.epa >= 0) {return '#002C5F'} else {return '#A2AAAD'}}
            else if (team == 'JAX') {if (+d.epa >= 0) {return '#9F792C'} else {return '#006778'}}
            else if (team == 'TEN') {if (+d.epa >= 0) {return '#0C2340'} else {return '#4B92DB'}}
            else if (team == 'DEN') {if (+d.epa >= 0) {return '#FB4F14'} else {return '#002244'}}
            else if (team == 'KC') {if (+d.epa >= 0) {return '#E31837'} else {return '#FFB81C'}}
            else if (team == 'LV') {if (+d.epa >= 0) {return '#000000'} else {return '#A5ACAF'}}
            else if (team == 'LAC') {if (+d.epa >= 0) {return '#0080C6'} else {return '#FFC20E'}}
            else if (team == 'CHI') {if (+d.epa >= 0) {return '#0B162A'} else {return '#C83803'}}
            else if (team == 'DET') {if (+d.epa >= 0) {return '#0076B6'} else {return '#B0B7BC'}}
            else if (team == 'GB') {if (+d.epa >= 0) {return '#203731'} else {return '#FFB612'}}
            else if (team == 'MIN') {if (+d.epa >= 0) {return '#4F2683'} else {return '#FFC62F'}}
            else if (team == 'DAL') {if (+d.epa >= 0) {return '#041E42'} else {return '#869397'}}
            else if (team == 'NYG') {if (+d.epa >= 0) {return '#0B2265'} else {return '#A71930'}}
            else if (team == 'PHI') {if (+d.epa >= 0) {return '#004C54'} else {return '#A5ACAF'}}
            else if (team == 'WAS') {if (+d.epa >= 0) {return '#5A1414'} else {return '#FFB612'}}
            else if (team == 'ATL') {if (+d.epa >= 0) {return '#A71930'} else {return '#000000'}}
            else if (team == 'CAR') {if (+d.epa >= 0) {return '#0085CA'} else {return '#101820'}}
            else if (team == 'NO') {if (+d.epa >= 0) {return '#D3BC8D'} else {return '#101820'}}
            else if (team == 'TB') {if (+d.epa >= 0) {return '#D50A0A'} else {return '#FF7900'}}
            else if (team == 'ARI') {if (+d.epa >= 0) {return '#97233F'} else {return '#000000'}}
            else if (team == 'LA') {if (+d.epa >= 0) {return '#003594'} else {return '#FFA300'}}
            else if (team == 'SF') {if (+d.epa >= 0) {return '#AA0000'} else {return '#B3995D'}}
            else if (team == 'SEA') {if (+d.epa >= 0) {return '#002244'} else {return '#69BE28'}}
            else {if (+d.epa >= 0) {return '#D50A0A'} else {return '#013369'}}
        }

        var dots = svg.append("g")
                        .selectAll("circle")
                        .data(dataset)
                        .enter()
                        .append("circle")
                        .attr("cx", d => xScale(xAccessor(d)))
                        .attr("r", 3)
                        .attr("cy", d => yScale(yAccessor(d)))
                        .attr("fill", d => colorWay(d,'none'))
                        .attr("opacity", '0.3')
        
        var logos = ['ARI', 'ATL', 'BAL', 'BUF', 'CAR', 'CHI', 'CIN', 'CLE',
                    'DAL', 'DEN', 'DET', 'GB', 'HOU', 'IND', 'JAX', 'KC', 'LA',
                    'LAC', 'LV', 'MIA', 'MIN', 'NE', 'NO', 'NYG', 'NYJ', 'PHI',
                    'PIT', 'SEA', 'SF', 'TB', 'TEN', 'WAS']

        /*
            ISSUES:
            1. Can't select multiple
                Well, you can, but then it works stupidly.

            SOLUTION:
            1. I have made it so it doesn't highlight if one is clicked, so it doesn't look like you can select multiple.
        */

        var logoSelected = false;

        logos.forEach(logo => {
            var img = d3.select('#pictures')
                        .append("img")
                        .attr("src", "./logos/"+logo+".png")
                        .attr("class", "logo")
                        .attr("width", 46)
                        .attr("height", 46)
                        .datum({selected: false})
                        .on("click", function(){
                            if (d3.select(this).datum().selected == false) {
                                d3.select(this).style('border', '2px solid black');
                                dots.attr("r",3);
                                d3.selectAll("img").datum({selected:false});
                                d3.selectAll("img").style('border', 'none');
                                dots.filter(d => teamAccessor(d) != logo)
                                    .attr("r", 0);
                                dots.filter(d => teamAccessor(d) == logo)
                                    .attr("fill", d => colorWay(d,logo));
                                d3.select(this).datum({selected:true});
                                logoSelected = true;
                            }
                            else {
                                d3.select(this).style('border', 'none');
                                dots.attr('r', 3)
                                    .attr("fill", d => colorWay(d,'none'))
                                d3.select(this).datum({selected:false})
                                logoSelected = false;
                            }
                            
                        })
                        .on('mouseover', function(){
                            if (!logoSelected) { d3.select(this).style('border', '2px solid black'); }
                            else if (d3.select(this).datum().selected == false) { d3.select(this).style('border', '2px solid black'); }
                            else { d3.select(this).style('border', 'none'); }
                        })
                        .on('mouseout', function(){
                            if (!logoSelected ) { d3.select(this).style('border', 'none'); }
                            else if (d3.select(this).datum().selected == false) { d3.select(this).style('border', 'none'); }
                            else { d3.select(this).style('border', '2px solid black'); }
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



