d3.csv("trying_something_2.csv").then(
    function(dataset){
        //console.log(dataset)

	var dimensions={
            width: 800,
            height: 270,
            margin: {
                top: 15,
                bottom: 30,
                right: 50,
                left: 100
            },
            rectLength: 40
        }

        var ydstogo = i => i.ydstogo_buckets
        //var downs = [i => i.Down1, i => i.Down2, i => i.Down3, i => i.Down4]
        var down1 = i => i.Down1
        var down2 = i => i.Down2
        var down3 = i => i.Down3
        var down4 = i => i.Down4
        var downs = ['1st Down', '2nd Down', '3rd Down', '4th Down']

        var svg = d3.select("#downs")
                    .style("width", dimensions.width)
                    .style("height", dimensions.height)

        var headerLabel = ['1st Down', '2nd Down', '3rd Down', '4th Down'];
        var ydsLabel = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11-15', '16-20', '21-25', '26+'];

        //build x axis
        var xScale = d3.scaleBand()
                //.domain(downs)
                .domain(d3.map(dataset, ydstogo))
                .range([dimensions.margin.left, dimensions.margin.left + 14*dimensions.rectLength])
                //.range([dimensions.height - dimensions.margin.bottom - 14*dimensions.rectLength, dimensions.height - dimensions.margin.bottom])
                //.domain(d3.map(dataset, down1))
                

        //build y axis
        var yScale = d3.scaleBand()
                .domain(downs)
                //.range([dimensions.margin.left, dimensions.margin.left + 4*dimensions.rectLength])
                .range([dimensions.height - dimensions.margin.bottom - 4*dimensions.rectLength, dimensions.height - dimensions.margin.bottom])
        
        const color = d3.scaleDiverging([0,50,100],["blue", "white","red"])

        //down 1 (first row)
        var rects1 = svg.append("g")
                .selectAll("rect")
                .data(dataset)
                .enter()
                .append("rect")
                .attr("y", 40)
                //.attr("x", d => xScale(down1(d)))
                .attr("x", d => xScale(ydstogo(d)))
                .attr("height", dimensions.rectLength)
                .attr("width", dimensions.rectLength)
                .attr("fill", d=>color(down1(d)))
                .attr("stroke-width", 1)
                .attr("stroke", "white")
                .enter()

        //down 2 (second row)
        var rects2 = svg.append("g")
                .selectAll("rect")
                .data(dataset)
                .enter()
                .append("rect")
                .attr("y", 80)
                .attr("x", d => xScale(ydstogo(d)))
                .attr("height", dimensions.rectLength)
                .attr("width", dimensions.rectLength)
                .attr("fill", d=>color(down2(d)))
                .attr("stroke-width", 1)
                .attr("stroke", "white")

        //down 3 (third row)
        var rects3 = svg.append("g")
                .selectAll("rect")
                .data(dataset)
                .enter()
                .append("rect")
                .attr("y", 120)
                .attr("x", d => xScale(ydstogo(d)))
                .attr("height", dimensions.rectLength)
                .attr("width", dimensions.rectLength)
                .attr("fill", d=>color(down3(d)))
                .attr("stroke-width", 1)
                .attr("stroke", "white")

        //down 4 (fourth row)
        var rects2 = svg.append("g")
                .selectAll("rect")
                .data(dataset)
                .enter()
                .append("rect")
                .attr("y", 160)
                .attr("x", d => xScale(ydstogo(d)))
                .attr("height", dimensions.rectLength)
                .attr("width", dimensions.rectLength)
                .attr("fill", d=>color(down4(d)))
                .attr("stroke-width", 1)
                .attr("stroke", "white")

        var xTitle = svg.append("text")
                .attr("x", (dimensions.width-dimensions.margin.left)/2)
                .attr("y", dimensions.height-30)
                .style("text_anchor", "middle")
                .text("Yards to go")
        
        // var yTitle = svg.append("text")
        //         .attr("transform", "rotate(-90)")
        //         .attr("y", dimensions.margin.left/4)
        //         .attr("x", -2*dimensions.height / 4 )
        //         .style("text_anchor", "middle")
        //         .text("Down")

        var xAxisGen = d3.axisBottom().scale(xScale)
                .tickValues(xScale.domain())

        var xAxis = svg.append("g")
                .call(xAxisGen)
                .style("transform", `translate(${0}px, ${dimensions.height-dimensions.margin.bottom-dimensions.rectLength}px)`)

        var yAxisGen = d3.axisLeft().scale(yScale)

        var yAxis = svg.append("g")
                .call(yAxisGen)
                .style("transform", `translate(${dimensions.margin.left}px, ${-dimensions.rectLength}px)`)

                


    }
)