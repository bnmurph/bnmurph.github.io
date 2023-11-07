d3.csv("trying_something_2.csv").then(
    function(dataset){
        //console.log(dataset)

		var alpha = d3.scaleLinear().domain([0, 100]).range([0, 1]);

		var headerLabel = ['Yards to Go', 'First Down', 'Second Down', 'Third Down', 'Fourth Down'];

		var colLabel = ['ydstogo_buckets', 'Down1', 'Down2', 'Down3', 'Down4'];

		
		function tabulate(dataset, columns, label) {
			var table = d3.select('#downs').append('table')
			var thead = table.append('thead')
			var	tbody = table.append('tbody');
		
			table.attr('border', '1px', 'black')

			// append the header row
			thead.append('tr')
				.selectAll('th')
				.data(label).enter()
				.append('th')
				.text(function (label) { return label; });
		
			// create a row for each object in the data
			var rows = tbody.selectAll('tr')
			  				.data(dataset)
							.enter()
							.append('tr')
							.attr("height", "50px")
		
			// create a cell in each row for each column
			var cells = rows.append('td')
							.text(function(d){
								return d.ydstogo_buckets;
							})
							.enter()

			rows.selectAll('td')
				.data(function (row) {
					return columns.map(function (column) {
					return {column: column, value: row[column]};
					});
				})
				.enter()
				.append('td')
				// .text(function (d) { 
				// 	return d.value; 
				// })
				.style('background-color', function (d) {
					return 'rgba(' +255 + ',' +0 + ',' +0 + ',' + alpha(d.value) + ')';
				})			
			
		  return table;
		}
		
		tabulate(dataset, colLabel, headerLabel);
	
					
    }
)