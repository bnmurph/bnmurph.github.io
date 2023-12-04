d3.csv('2018-2022_nflfastR_clean.csv').then(
    function(dataset) {

        // SCATTER STUFF

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

        // LOGOS STUFF
        
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
        var teamSelected = "none";

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
                                d3.selectAll("img").style('border', 'none');
                                d3.select(this).style('border', '2px solid black');
                                dots.attr("r",3);
                                d3.selectAll("img").datum({selected:false});
                                d3.selectAll("rect").style('stroke-width', 0);
                                selectedTime.clear();
                                dots.filter(d => teamAccessor(d) != logo)
                                    .attr("r", 0);
                                dots.filter(d => teamAccessor(d) == logo)
                                    .attr("fill", d => colorWay(d,logo));
                                d3.select(this).datum({selected:true});
                                logoSelected = true;
                                teamSelected = logo;
                                moose2 = d3.flatRollup(dataset.filter(d => teamAccessor(d) == logo), i => d3.sum(i, k => k.pass)/i.length, d=>d.score_differential_buckets, d=>d.half_minutes_remaining);
                                rectanglesTime.data(moose2).attr("fill", d=>color(percent_pass(d)));
                                reduced_data2 = d3.flatRollup(dataset.filter(d => teamAccessor(d) == logo), i => d3.sum(i, k => k.pass)/i.length, d=>d.down, d=>d.ydstogo_buckets);
                                reduced_data2.splice(reduced_data2.length - 1, 1);
                                rectsDowns.data(reduced_data2).attr("fill", d=>color(percent_pass(d)));

                            }
                            else {
                                d3.select(this).style('border', 'none');
                                d3.selectAll("rect").style('stroke-width', 0);
                                selectedTime.clear();
                                dots.attr('r', 3)
                                    .attr("fill", d => colorWay(d,'none'));
                                d3.select(this).datum({selected:false});
                                logoSelected = false;
                                teamSelected = "none";
                                rectanglesTime.data(moose).attr("fill", d=>color(percent_pass(d)));
                                rectsDowns.data(reduced_data).attr("fill", d=>color(percent_pass(d)));
                            }
                            
                        })
                        .on('mouseover', function(){
                            d3.select(this).style('border', '2px solid black'); 
                            d3.select(this).style('cursor', 'pointer')
                        })
                        .on('mouseout', function(){
                            if (!logoSelected ) { d3.select(this).style('border', 'none'); }
                            else if (d3.select(this).datum().selected == false) { d3.select(this).style('border', 'none'); }
                            else { d3.select(this).style('border', '2px solid black'); }
                            d3.select(this).style('cursor', 'auto')

                        });
        })


        // TIME STUFF

        //https://observablehq.com/@d3/d3-group <-- Source for rollup syntax
        //https://observablehq.com/@d3/d3-flatgroup  <-- Source for flatRollup syntax
        moose = d3.flatRollup(dataset, i => d3.sum(i, k => k.pass)/i.length, d=>d.score_differential_buckets, d=>d.half_minutes_remaining)

        var dimensions={
            width: 800,
            height: 270,
            margin: {
                top: 5,
                bottom: 55,
                right: 50,
                left: 100
            },
            rect_length: 20,
            background_border: 1
        }
    
        var score_buckets = i => +i[0]
        var min_remaining = i => +i[1]
        var percent_pass = i => +i[2]    

        var svgTime = d3.select("#time")
                    .style("width", dimensions.width)
                    .style("height", dimensions.height)

        var xScaleTime = d3.scaleLinear()
                .domain(d3.extent(moose, min_remaining))
                .range([dimensions.margin.left + 31*dimensions.rect_length, dimensions.margin.left])

        var yScaleTime = d3.scaleLinear()
                .domain(d3.extent(moose, score_buckets))
                .range([dimensions.height - dimensions.margin.bottom, dimensions.height - dimensions.margin.bottom - 10*(dimensions.rect_length+1)])
        
        const color = d3.scaleDiverging([0,0.5,1],["blue", "white","red"])

        //Axis Stuff
        var xAxisGenTime = d3.axisBottom().scale(xScaleTime)
        var xAxisTime = svgTime.append("g")
                .call(xAxisGenTime)
                .style("transform", `translate(${dimensions.rect_length/2}px,${dimensions.height-dimensions.margin.bottom+dimensions.rect_length}px)`)
                .on('mouseover', function(event,d){
                    d3.select(this).style('cursor', 'pointer')
                })
                .on('mouseout', function(event,d){
                    d3.select(this).style('cursor', 'auto')
                })

        var yAxisGenTime = d3.axisLeft().scale(yScaleTime).tickValues([-35, -28, -21, -14, -7,0,7,14,21,28,35])
        var yAxisTime = svgTime.append("g")
                .call(yAxisGenTime)
                .style("transform", `translate(${dimensions.margin.left}px, ${dimensions.rect_length/2}px)`)
                .on('mouseover', function(event,d){
                    d3.select(this).style('cursor', 'pointer')
                })
                .on('mouseout', function(event,d){
                    d3.select(this).style('cursor', 'auto')
                })


        var selectedTime = new Set();

        var isTimeSelected = false;

        var isDownSelected = false;


        var timeBackground = svgTime.append("rect")
                                    .attr("x", xScaleTime(30)-dimensions.background_border)
                                    .attr("y", yScaleTime(35)-dimensions.background_border)
                                    .attr("width", dimensions.rect_length*32+dimensions.background_border*2)
                                    .attr("height", dimensions.rect_length*11+10+dimensions.background_border*2)
                                    .attr("fill", "gray")

        var rectanglesTime = svgTime.append("g")
                .selectAll("rect")
                .data(moose)
                .enter()
                .append("rect")
                .on('mouseover', function(event,d){      //Mouseover and mouseout don't seem to work
                    const selectedValueKey = `${d.half_minutes_remaining}_${d.score_differential_buckets}`
                    if (!selectedTime.has(selectedValueKey)) {
                        d3.select(this).style('stroke', 'black')
                                       .style('stroke-width', 2)
                    }
                    else {
                        d3.select(this).style('stroke-width', 0)
                    }
                    d3.select(this).style('cursor', 'pointer')
                })
                .on('mouseout', function(event,d){
                    const selectedValueKey = `${d[0]}_${d[1]}`
                    if (!selectedTime.has(selectedValueKey)) {
                        d3.select(this).style('stroke-width', 0)
                    }
                    else {
                        d3.select(this).style('stroke', 'black')
                                       .style('stroke-width', 2)
                    }
                    d3.select(this).style('cursor', 'auto')

                })

                .on('click', function(event,d){
                    isTimeSelected = true;
                    const selectedValueKey = `${d[0]}_${d[1]}`
                    
                    if (selectedTime.has(selectedValueKey)) { 
                        selectedTime.delete(selectedValueKey); 
                        d3.select(this).style('stroke-width', 0);
                    }
                    else { 
                        selectedTime.add(selectedValueKey); 
                        d3.select(this).style('stroke', 'black')
                                       .style('stroke-width', 2);
                    }
                    
                    if (teamSelected == 'none'){
                        if (isDownSelected) {
                            dots.filter(item => { const itemKey = `${item.score_differential_buckets}_${item.half_minutes_remaining}`;
                                                const itemKeyNew = `${item.down}_${item.ydstogo_buckets}`;
                                                return selectedTime.has(itemKey) && selectedDown.has(itemKeyNew); })
                                .attr("r", 3);
                            
                            dots.filter(item => { const itemKey = `${item.score_differential_buckets}_${item.half_minutes_remaining}`;
                                                const itemKeyNew = `${item.down}_${item.ydstogo_buckets}`;
                                                return !selectedTime.has(itemKey) || !selectedDown.has(itemKeyNew); })
                                .attr("r", 0);
                        }
                        else {
                            dots.filter(item => { const itemKey = `${item.score_differential_buckets}_${item.half_minutes_remaining}`;
                                                return selectedTime.has(itemKey); })
                                .attr("r", 3);
                            
                            dots.filter(item => { const itemKey = `${item.score_differential_buckets}_${item.half_minutes_remaining}`;
                                                return !selectedTime.has(itemKey); })
                                .attr("r", 0);
                        }
                    }
                    else {
                        if (isDownSelected) {
                            dots.filter(item => { const itemKey = `${item.score_differential_buckets}_${item.half_minutes_remaining}`;
                                                const itemKeyNew = `${item.down}_${item.ydstogo_buckets}`;
                                                return selectedTime.has(itemKey) && selectedDown.has(itemKeyNew) && teamSelected == item.posteam; })
                                .attr("r", 3);
                            
                            dots.filter(item => { const itemKey = `${item.score_differential_buckets}_${item.half_minutes_remaining}`;                  
                                                const itemKeyNew = `${item.down}_${item.ydstogo_buckets}`;
                                                return !selectedTime.has(itemKey) || !selectedDown.has(itemKey) || teamSelected != item.posteam; })
                                .attr("r", 0);
                        }
                        else {
                            dots.filter(item => { const itemKey = `${item.score_differential_buckets}_${item.half_minutes_remaining}`;
                                                return selectedTime.has(itemKey) && teamSelected == item.posteam; })
                                .attr("r", 3);
                        
                            dots.filter(item => { const itemKey = `${item.score_differential_buckets}_${item.half_minutes_remaining}`;
                                                return !selectedTime.has(itemKey) || teamSelected != item.posteam; })
                                .attr("r", 0);
                        }
                    }

                    if (selectedTime.size == 0 && teamSelected != 'none') {
                        if (selectedDown.size != 0) {
                            dots.filter(item => { const itemKey = `${item.score_differential_buckets}_${item.half_minutes_remaining}`;
                                                return d.posteam == teamSelected && selectedDown.has(itemKey); })
                                .attr("r", 3);
                            isDownSelected = false;
                        }
                        else {
                            dots.filter(d => d.posteam == teamSelected).attr("r", 3);
                            isDownSelected = false;
                        }
                    }
                    else if (selectedTime.size == 0) {
                        if (selectedDown.size != 0) {
                            dots.filter(item => { const itemKey = `${item.score_differential_buckets}_${item.half_minutes_remaining}`;
                                            return selectedDown.has(itemKey); })
                            .attr("r",3);
                            isDownSelected = false;
                        }
                        else {
                            dots.attr("r",3);
                            isDownSelected = false;
                        }
                    }
                })
                .attr("x", d => xScaleTime(min_remaining(d)))
                .attr("y", d => yScaleTime(score_buckets(d)))
                .attr("width", dimensions.rect_length)
                .attr("height", dimensions.rect_length)
                .attr("fill", d=>color(percent_pass(d)))

        // DOWN STUFF

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
            rectLength: 40,
            background_border: 1
        }

        var downs = i => +i[0]
        var ydstogo = i => i[1]
        var downsLabel = ['1st', '2nd', '3rd', '4th']

        var downs_svg = d3.select("#downs")
                    .style("width", downDimensions.width)
                    .style("height", downDimensions.height)

        var ydsLabel = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11-15', '16-20', '21-25', '26+'];

        //build x scale
        var xScaleDowns = d3.scalePoint()
                .domain(ydsLabel)
                .range([downDimensions.margin.left, downDimensions.margin.left + 13*downDimensions.rectLength+13])
                
        //build y scale
        var yScaleDowns = d3.scaleLinear()
                .domain(d3.extent(reduced_data, downs))
                .range([downDimensions.height - downDimensions.margin.bottom - 5*downDimensions.rectLength-3, downDimensions.height-downDimensions.margin.bottom-2*downDimensions.rectLength])
        
        var selectedDown = new Set();

        //Plot Axis and Labels
        var xAxisGenDowns = d3.axisBottom().scale(xScaleDowns)
                .tickValues(xScaleDowns.domain())

        var xAxisDowns = downs_svg.append("g")
                .call(xAxisGenDowns)
                .style("transform", `translate(${downDimensions.rectLength/2}px, ${downDimensions.height-downDimensions.margin.bottom-downDimensions.rectLength}px)`)
                .on('mouseover', function(event,d){
                    d3.select(this).style('cursor', 'pointer')
                })
                .on('mouseout', function(event,d){
                    d3.select(this).style('cursor', 'auto')
                })

        var newScaleDowns = d3.scaleBand()
        .domain(downsLabel)
        .range([downDimensions.height - downDimensions.margin.bottom - 4*downDimensions.rectLength, downDimensions.height - downDimensions.margin.bottom])

        var yAxisGenDowns = d3.axisLeft().scale(newScaleDowns)

        var yAxisDowns = downs_svg.append("g")
                .call(yAxisGenDowns)
                .style("transform", `translate(${downDimensions.margin.left}px, ${-downDimensions.rectLength}px)`)
                .on('mouseover', function(event,d){
                    d3.select(this).style('cursor', 'pointer')
                })
                .on('mouseout', function(event,d){
                    d3.select(this).style('cursor', 'auto')
                })

        //Set scale for x-axis
        var xScaleLegend = d3.scaleLinear()
        .range([225, 525])
        .domain([0, 1]);

        //Define x-axis
        var xAxisLegend = d3.axisBottom().scale(xScaleLegend)
                .ticks(3)
                .tickValues([0,0.5,1])
                .tickFormat(d3.format(".0%"))


        //Plot Background Gray Box
        var downsBackground = downs_svg.append("rect")
                                    .attr("x", xScaleDowns('1')-downDimensions.background_border)
                                    .attr("y", yScaleDowns(1)-downDimensions.background_border)
                                    .attr("width", 14*downDimensions.rectLength+15)
                                    .attr("height", 4*downDimensions.rectLength+5)
                                    .attr("fill", "gray")

        //Plot data rectangles
        var rectsDowns = downs_svg.append("g")
                .selectAll("rect")
                .data(reduced_data)
                .enter()
                .append("rect")
                .on('mouseover', function(event,d){
                    const selectedValueKeyNew = `${d.ydstogo}_${d.downs}`
                    if(!selectedDown.has(selectedValueKeyNew)){
                        d3.select(this).style('stroke', 'black')
                                        .style('stroke-width', 2)
                    }
                    else{
                        d3.select(this).style('stroke-width', 0)
                    }
                    d3.select(this).style('cursor', 'pointer')
                })
                .on('mouseout', function(event,d){
                    const selectedValueKeyNew = `${d[0]}_${d[1]}`
                    if(!selectedDown.has(selectedValueKeyNew)){
                        d3.select(this).style('stroke-width', 0)
                    }
                    else{
                        d3.select(this).style('stroke', 'black')
                                       .style('stroke-width', 2)
                    }
                    d3.select(this).style('cursor', 'auto')

                })
                .on('click', function(event,d){
                    isDownSelected = true;
                    const selectedValueKeyNew = `${d[0]}_${d[1]}`
                    console.log(selectedValueKeyNew)
                    if (selectedDown.has(selectedValueKeyNew)) { 
                        selectedDown.delete(selectedValueKeyNew); 
                        d3.select(this).style('stroke-width', 0);
                    }
                    else { 
                        selectedDown.add(selectedValueKeyNew); 
                        d3.select(this).style('stroke', 'black')
                                       .style('stroke-width', 2);
                                    
                    }
                    if (teamSelected == 'none'){
                        if (isTimeSelected) {
                            dots.filter(item => { const itemKeyNew = `${item.down}_${item.ydstogo_buckets}`;
                                                const itemKey2 = `${item.score_differential_buckets}_${item.half_minutes_remaining}`;
                                                return selectedDown.has(itemKeyNew) && selectedTime.has(itemKey2); })
                                .attr("r", 3);
                            
                            dots.filter(item => { const itemKeyNew = `${item.down}_${item.ydstogo_buckets}`;
                                                const itemKey2 = `${item.score_differential_buckets}_${item.half_minutes_remaining}`;
                                                return !selectedDown.has(itemKeyNew) || !selectedTime.has(itemKey2); })
                                .attr("r", 0);
                        }
                        else {
                            dots.filter(item => { const itemKeyNew = `${item.down}_${item.ydstogo_buckets}`;
                                                return selectedDown.has(itemKeyNew); })
                                .attr("r", 3);
                            
                            dots.filter(item => { const itemKeyNew = `${item.down}_${item.ydstogo_buckets}`;
                                                return !selectedDown.has(itemKeyNew); })
                                .attr("r", 0);
                        }
                    }
                    else {
                        if (isTimeSelected) {
                            dots.filter(item => { const itemKeyNew = `${item.down}_${item.ydstogo_buckets}`;
                                                const itemKey2 = `${item.score_differential_buckets}_${item.half_minutes_remaining}`;
                                                return selectedDown.has(itemKeyNew) && selectedTime.has(itemKey2) && teamSelected == item.posteam; })
                                .attr("r", 3);
                            
                            dots.filter(item => { const itemKeyNew = `${item.down}_${item.ydstogo_buckets}`;
                                                const itemKey2 = `${item.score_differential_buckets}_${item.half_minutes_remaining}`;
                                                return !selectedDown.has(itemKeyNew) || !selectedTime.has(itemKey2) || teamSelected != item.posteam; })
                                .attr("r", 0);
                        }
                        else {
                            dots.filter(item => { const itemKeyNew = `${item.down}_${item.ydstogo_buckets}`;
                                                return selectedDown.has(itemKeyNew) && teamSelected == item.posteam; })
                                .attr("r", 3);
                            
                            dots.filter(item => { const itemKeyNew = `${item.down}_${item.ydstogo_buckets}`;
                                                return !selectedDown.has(itemKeyNew) || teamSelected != item.posteam; })
                                .attr("r", 0);
                        }
                    }

                    if (selectedDown.size == 0 && teamSelected != 'none') {
                        if (selectedTime.size != 0) {
                            dots.filter(item => { const itemKey = `${item.score_differential_buckets}_${item.half_minutes_remaining}`;
                                                return d.posteam == teamSelected && selectedTime.has(itemKey); })
                                .attr("r", 3);
                            isDownSelected = false;
                        }
                        else {
                            dots.filter(d => d.posteam == teamSelected).attr("r", 3);
                            isDownSelected = false;
                        }
                    }
                    else if (selectedDown.size == 0) {
                        if (selectedTime.size != 0) {
                            dots.filter(item => { const itemKey = `${item.score_differential_buckets}_${item.half_minutes_remaining}`;
                                            return selectedTime.has(itemKey); })
                            .attr("r",3);
                            isDownSelected = false;
                        }
                        else {
                            dots.attr("r",3);
                            isDownSelected = false;
                        }
                    }
                })
                .attr("y", d => yScaleDowns(downs(d)))
                .attr("x", d => xScaleDowns(ydstogo(d))) 
                .attr("height", downDimensions.rectLength)
                .attr("width", downDimensions.rectLength)
                .attr("fill", d=>color(percent_pass(d)))

        // LEGEND STUFF

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
                .text("Run often")
                .attr("font-size", 12)
        legendsvg.append("text")
                .attr("class", "legendTitle")
                .attr("x",476)
                .attr("y", 90)
                .text("Pass often")
                .attr("font-size", 12)

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

        
        
        //Axis Title Code from http://www.d3noob.org/2012/12/adding-axis-labels-to-d3js-graph.html
        var xTitleTime = svgTime.append("text")
                .attr("x", (6* dimensions.width / 15) +15)
                .attr("y", dimensions.height-5)
                .style("text_anchor", "middle")
                .text("Minutes Remaining in Half")
        
        var yTitleTime = svgTime.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", dimensions.margin.left/2)
                .attr("x", -2*dimensions.height / 3 )
                //.attr("dy", "1em")
                .style("text_anchor", "middle")
                .text("Score Differential") 
                  

        var xTitleDowns = downs_svg.append("text")
                                    .attr("x", ((downDimensions.width-downDimensions.margin.left)/2)+30)
                                    .attr("y", downDimensions.height-40)
                                    .style("text_anchor", "middle")
                                    .text("Yards to go")
        
        var yTitleDowns = downs_svg.append("text")
                .attr("transform", "rotate(-90)")
                // .attr("y", downDimensions.margin.left/4)
                // .attr("x", -2*downDimensions.height / 4 )
                .attr("y", downDimensions.margin.left/2)
                .attr("x", -1*downDimensions.height/2)
                .style("text_anchor", "middle")
                .text("Down")



        //Set up X axis
        legendsvg.append("g")
        .attr("class", "axis")
        .call(xAxisLegend)
        //.attr("transform", "translate(0," + (10) + ")")
        .style("transform", `translate(${0}px, ${55}px)`)
    }
)