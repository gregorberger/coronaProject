function getDate() {
    n =  new Date();
    y = n.getFullYear();
    m = n.getMonth() + 1;
    d = n.getDate();
    return  d + "." + m + "." + y;
}


function pathColor(mapRegion) {
    if(regionsMap[mapRegion].activeCases <= 400) {
        return "cases400";
    } else if (regionsMap[mapRegion].activeCases > 401 && regionsMap[mapRegion].activeCases <= 800) {
        return "cases600";
    } else if (regionsMap[mapRegion].activeCases > 801 && regionsMap[mapRegion].activeCases <= 1200) {
        return "cases800";
    } else if (regionsMap[mapRegion].activeCases > 1201 && regionsMap[mapRegion].activeCases <= 1600) {
        return "cases1200";
    } else if (regionsMap[mapRegion].activeCases > 1601 && regionsMap[mapRegion].activeCases <= 2000) {
        return "cases1600";
    } else if (regionsMap[mapRegion].activeCases > 2001) {
        return "cases2000";
    }
}

function mapLegend() {
    // create a list of keys
    var keys = ["<401", "402-800", "801-1200", "1201-1600", "1601-2000", ">2001"]

    // Usually you have a color scale in your chart already
    var color = ["#fce8e4","#fbd2d2","#f6a5a5","#f27777","#ed4a4a","#E91D1D"];

    var size = 20;

    var mapLegend = d3.select("#mapLegend").append("svg")
        .attr("width",170)
        .attr("height",250)
        .attr("class", "navbar-bg border-radius ml-5")
        .attr("style", "margin-left: 4.5rem!important;")


    mapLegend.selectAll("mapLegend")
        .data(keys)
        .enter()
        .append("text")
        .attr("x", 20)
        .attr("y", 20) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", "white")
        .text("Aktivni primeri:")
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")

    mapLegend.selectAll("mapLegend")
        .data(keys)
        .enter()
        .append("rect")
        .attr("x", 20)
        .attr("y", function(d,i){ return 50 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("width", size)
        .attr("height", size)
        .style("fill", function(d,i){ return color[i]})

    mapLegend.selectAll("mapLegend")
        .data(keys)
        .enter()
        .append("text")
        .attr("x", 20 + size*1.2)
        .attr("y", function(d,i){ return 52 + i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d,i){ return color[i]})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")

    mapLegend.selectAll("mapLegend").style("top", 250);
}