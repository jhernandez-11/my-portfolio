let viewportHeight = window.innerHeight * .3;
let viewportWidth = window.innerWidth * .90;

function dataAnime() {
  const data = [
    { group: "A", variable: "1", value: 7.2 },
    { group: "A", variable: "2", value: 13.2 },
    { group: "B", variable: "1", value: 9.3 },
    { group: "B", variable: "2", value: 20.1 },
    { group: "C", variable: "1", value: 30.0 },
    { group: "C", variable: "2", value: 2.1 },
    { group: "D", variable: "1", value: 24.6 },
    { group: "D", variable: "2", value: 9.9 }
    // ... more data
];

// Set up the dimensions
const margin = { top: 30, right: 30, bottom: 30, left: 30 };
const width = 450 - margin.left - margin.right;
const height = 450 - margin.top - margin.bottom;

// Append the svg object to the body of the page
const svg = d3.select(".bar")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Build X scales and axis
const x = d3.scaleBand()
    .range([0, width])
    .domain(data.map(d => d.group))
    .padding(0.05);
svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))

// Build Y scales and axis
const y = d3.scaleBand()
    .range([height, 0])
    .domain(data.map(d => d.variable))
    .padding(0.05);
svg.append("g")
    .call(d3.axisLeft(y));

// Build color scale
const myColor = d3.scaleSequential()
    .interpolator(d3.interpolateInferno)
    .domain([1, 100]);

// Create a tooltip
const tooltip = d3.select("body")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px");

// Three function that change the tooltip when mouse is over / move / leave a cell
const mouseover = function(event, d) {
    tooltip.style("opacity", 1);
    d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1);
};
const mousemove = function(event, d) {
    tooltip.html(`The value of<br>this cell is: ${d.value}`)
        .style("left", (event.x) + "px")
        .style("top", (event.y) + "px");
};
const mouseleave = function(event, d) {
    tooltip.style("opacity", 0);
    d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8);
};

// Add the squares
svg.selectAll()
    .data(data, d => d.group+':'+d.variable)
    .join("rect")
    .attr("x", d => x(d.group))
    .attr("y", d => y(d.variable))
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("width", x.bandwidth())
    .attr("height", y.bandwidth())
    .style("fill", d => myColor(d.value))
    .style("stroke-width", 4)
    .style("stroke", "none")
    .style("opacity", 0.8)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave);

}

document.addEventListener('DOMContentLoaded', dataAnime())

window.addEventListener('resize', function() {
    location.reload()
})


anime({
    targets: '.animated-header',
    translateY: [-50, 0],   // Move from -50px to 0 on the Y axis
    opacity: [0, 1],        // Fade in from 0 to 1 opacity
    duration: 1500,
    easing: 'easeOutExpo',
    delay: 500              // Start the animation after 500 milliseconds
  });

  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('mouseover', () => {
      anime({
        targets: item,
        scale: 1.1, // Slightly increase the size
        duration: 500,
        easing: 'easeInOutQuad'
      });
    });

    item.addEventListener('mouseout', () => {
      anime({
        targets: item,
        scale: 1, // Return to original size
        duration: 500,
        easing: 'easeInOutQuad'
      });
    });
  });