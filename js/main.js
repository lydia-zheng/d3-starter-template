// Add <svg> element (drawing space)
const svg = d3.select('body').append('svg')
    .attr('width', 500)
    .attr('height', 500);

/* UNCOMMENT FOR HARDCODED DATA VERSION
//Add circles
 const sandwiches = [
     { name: "Thesis", price: 7.95, size: "large" },
	 { name: "Dissertation", price: 8.95, size: "large" },
	 { name: "Highlander", price: 6.50, size: "small" },
	 { name: "Just Tuna", price: 6.50, size: "small" },
	 { name: "So-La", price: 7.95, size: "large" },
	 { name: "Special", price: 12.50, size: "small" }
]; 

svg.selectAll('circle')
    .data(sandwiches)
    .enter()
  .append('circle')
    .attr('fill', d => {
        if (d.price < 7.00)
            return 'green'; // less than 7.00 USD is green
        else
            return 'red'; //more than 7.00 USD is red
    })
    .attr('r', d => {
        if (d.size == "large")
            return 12; //large should be twice as big as small ones
        else
            return 6; 
    })
    .attr('stroke', 'black')
    .attr('cy', 20)
    .attr('cx', (d, index) =>{
        if (index == 0)
            return 20;
        else 
            return 20 + (index * 60);
    }); //newly created circes are 60 pixels to the right
*/

//----------------Version of code with external data--------------------------------
const svg2 = d3.select('body').append('svg')
    .attr('width', 700)
    .attr('height', 550);

d3.csv('data/sandwiches.csv')
    .then(data => {
        console.log ("Data load complete. Work with dataset.");
        console.log(data);
        for (let i = 0; i < data.length; ++i){
            d = data[i];
            d.price = +d.price; //converts it to number; can also use parseInt() or parseFloat()
        }
    svg.selectAll('circle')
        .data(data)
        .enter()
    .append('circle')
        .attr('fill', d => {
            if (d.price < 7.00)
                return 'green'; 
            else
                return 'red'; 
        })
        .attr('r', d => {
            if (d.size == "large")
                return 12; 
            else
                return 6; 
        })
        .attr('stroke', 'black')
        .attr('cy', 20)
        .attr('cx', (d, index) =>{
            if (index == 0)
                return 20;
            else 
                return 20 + (index * 60);
        })
    })
    .catch(error => {
        console.error('Error loading the data');
    });


    // ------Activity 2---------------

    d3.csv('data/cities_and_population.csv')
        .then(data => {
            let filteredData = new Array ();
            for(let i = 0; i< data.length; ++i){
                data[i].population = +data[i].population; //same as parseInt(data[i].population)
                data[i].x = +data[i].x;
                data[i].y = +data[i].y;
                if (data[i].eu == "true"){ // if it's in eu, add to filtereddata
                    filteredData.push(data[i]);
                }
            }
            console.log ("city data loaded.")
            console.log(filteredData);
            let par = document.createElement('p');
            let text = document.createTextNode("Number of cities: "+ filteredData.length);
            par.appendChild(text);
            document.body.appendChild(par);
            
            //source:https://stackoverflow.com/questions/24388982/text-not-showing-in-forcelayout-d3js-but-present-in-view
            let nodes = svg2.selectAll('g')
                .data(filteredData)
                .enter()
                .append('g');
           
        
            nodes.append('circle')
                .attr ('fill', 'blue')
                .attr('cx', d => {
                    return d.x;
                })
                .attr('cy', d => {
                    return d.y;
                })
                .attr('r', d => {
                    if (d.population < 1000000)
                        return 4;
                    else 
                        return 8;
                })

            nodes.append('text')
                .text(d => d.city)
                .attr('x', d => d.x)
                .attr('y', d => d.y)
                .attr('dy', "-1em") //so it's not directly on top of circle
                .style('fill', 'black')
                .attr('class', 'city-label')
                .attr('opacity', d => {
                    if(d.population < 1000000)
                        return 0; //only show equal or higher than 1000000 pop. cities
                    else 
                        return 1;
                
                })
            
        
           
        })
