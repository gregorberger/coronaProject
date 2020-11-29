function insertBoxInfoTitle() {
    n =  new Date();
    y = n.getFullYear();
    m = n.getMonth() + 1;
    d = n.getDate();
    document.getElementById("titleInfoBox").innerHTML = "Podatki za <br><b>" + d + "." + m + "." + y+"</b>";
}


function pathColor(regionsMap, mapRegion) {
    var location;
    switch (mapRegion) {
        case "Pomurska":
            location = 'ms';
            break;
        case "Podravska":
            location = 'mb';
            break;
        case "Savinjska":
            location = 'ce';
            break;
        case "Posavska":
            location = 'kk';
            break;
        case "Zasavska":
            location = 'za';
            break;
        case "Koroška":
            location = 'sg';
            break;
        case "Jugovzhodna Slovenija":
            location = 'nm';
            break;
        case "Osrednjeslovenska":
            location = 'lj';
            break;
        case "Primorsko-notranjska":
            location = 'po';
            break;
        case "Obalno-kraška":
            location = 'kp';
            break;
        case "Goriška":
            location = 'ng';
            break;
        case "Gorenjska":
            location = 'kr';
            break;
    }

    if(regionsMap[location].activeCases <= 400) {
        return "cases400";
    } else if (regionsMap[location].activeCases > 401 && regionsMap[location].activeCases <= 600) {
        return "cases600";
    } else if (regionsMap[location].activeCases > 601 && regionsMap[location].activeCases <= 800) {
        return "cases800";
    } else if (regionsMap[location].activeCases > 801 && regionsMap[location].activeCases <= 1000) {
        return "cases1000";
    } else if (regionsMap[location].activeCases > 1001 && regionsMap[location].activeCases <= 1200) {
        return "cases1200";
    } else if (regionsMap[location].activeCases > 1201) {
        return "cases1400";
    }
}

function mapLegend() {
    // create a list of keys
    var keys = ["<401", "402-600", "601-800", "801-1000", "1001-1200", ">1201"]

    // Usually you have a color scale in your chart already
    var color = ["#E6A480","#E6904C","#E6805B","#E6604B","#E6494C","#E62129"];

    var size = 20;

    var mapLegend = d3.select("#mapLegend").append("svg")
        .attr("width",220)
        .attr("height",250);

    mapLegend.selectAll("mapLegend")
        .data(keys)
        .enter()
        .append("rect")
        .attr("x", 100)
        .attr("y", function(d,i){ return 100 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("width", size)
        .attr("height", size)
        .style("fill", function(d,i){ return color[i]})

    mapLegend.selectAll("mapLegend")
        .data(keys)
        .enter()
        .append("text")
        .attr("x", 100 + size*1.2)
        .attr("y", function(d,i){ return 105 + i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d,i){ return color[i]})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
}