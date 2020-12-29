function getDate(vrstica) {
    if(vrstica === undefined) {
        n =  new Date();
        y = n.getFullYear();
        m = n.getMonth() + 1;
        d = n.getDate();
        return  d + "." + m + "." + y;
    } else {
        var podatki = regionData[vrstica];
        return podatki.day + "." + podatki.month + "." + podatki.year;
    }

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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function updateMap() {
    for (let i = 200; i < regionData.length; i=i+10) {
        if(i+10 > regionData.length) {
            i = regionData.length - 1;
        }
        parseRegionsData(regionData[i]);
    d3.json("./static/SR.geojson")
        .then(function(geojson){
            map.selectAll("g").remove();
            map.selectAll("text").remove();

            projection.fitSize([width,height],geojson);

            map.append("g")
                .selectAll("path")
                .data(geojson.features)
                .enter()
                .append("path")
                .attr("id", function(d) { return d.properties.SR_UIME; })
                .attr("class", function(d) { return pathColor(d.properties.SR_UIME); })
                .attr("d", path);
            bottomRightMapInfo(i);

            map.selectAll("path").on('mouseover', function (d, i) {
                var x = d3.mouse(this)[0];
                var y = d3.mouse(this)[1];

                mapData.select("rect")
                    .attr('x', 15)
                    .attr('y', 0)
                    .attr('fill', '#4f5d75')
                    .attr('stroke', 'black')
                    .attr('stroke-width', '1')
                    .attr('opacity', 1);

                mapData.append("text")
                    .attr('fill', 'black')
                    .attr('class', 'font-weight-bold h4')
                    .attr('x', 30)
                    .attr('y', 30)
                    .text(d.properties.SR_UIME);

                mapData.append("text")
                    .attr('id', 'activeCases')
                    .attr('fill', 'white')
                    .attr('class', 'h5')
                    .attr('x', 30)
                    .attr('y', 70)
                    .text("Aktivni primeri: ");
                document.getElementById("activeCases").innerHTML += "<a class='font-weight-bold'>"+regionsMap[d.properties.SR_UIME].activeCases+"</a>";

                mapData.append("text")
                    .attr('id', 'confirmedToDate')
                    .attr('fill', 'white')
                    .attr('class', 'h5')
                    .attr('x', 30)
                    .attr('y', 100)
                    .text("Potrjeni do danes: ");
                document.getElementById("confirmedToDate").innerHTML += "<a class='font-weight-bold'>"+regionsMap[d.properties.SR_UIME].confirmedToDate+"</a>";

                mapData.append("text")
                    .attr('id', 'deceasedToDate')
                    .attr('fill', 'white')
                    .attr('class', 'h5')
                    .attr('x', 30)
                    .attr('y', 130)
                    .text("Smrti do danes: ");
                document.getElementById("deceasedToDate").innerHTML += "<a class='font-weight-bold'>"+regionsMap[d.properties.SR_UIME].deceasedToDate+"</a>";

                mapData.append("text")
                    .attr('id', 'hospitalBeds')
                    .attr('fill', 'white')
                    .attr('class', 'h5')
                    .attr('x', 30)
                    .attr('y', 160)
                    .text("Postelje (Z/P): ");
                document.getElementById("hospitalBeds").innerHTML += "<a class='text-danger'>"+getData().get(d.properties.SR_UIME).occupied+"</a>" +
                    "/<a class='font-weight-bold'>"+getData().get(d.properties.SR_UIME).max+"</a>";

                mapData.append("text")
                    .attr('id', 'unemployed')
                    .attr('fill', 'white')
                    .attr('class', 'h5')
                    .attr('x', 30)
                    .attr('y', 190)
                    .text("Brezposelni: ");
                document.getElementById("unemployed").innerHTML += "<a class='font-weight-bold'>"+getBrezposelni().get("oktober").get(d.properties.SR_UIME)[2]+"</a>";


            });

            map.selectAll("path").on('mouseout', function (d, i) {
                mapData.select("rect").attr('fill', 'none');
                mapData.select("rect").attr('stroke', 'none');
                mapData.selectAll("text").remove();
                mapData.selectAll("br").remove();
                document.getElementById("titleInfoBox").classList.add("collapse");
            })

            map.selectAll("path").on('click', function (d, i) {
                // testiranje on click graf spremembe
                /* NI VEC PODATKOV
                var pozitivni = chart.series[0];
                var negativni = chart.series[1];

                switch (d.properties.SR_UIME) {
                    case "Pomurska":
                        msLabTests(pozitivni, negativni);
                        break;
                    case "Podravska":
                        mbLabTests(pozitivni, negativni);
                        break;
                    case "Savinjska":
                        ceLabTests(pozitivni, negativni);
                        break;
                    case "Posavska":
                        ukgLabTests(pozitivni, negativni);
                        break;
                    case "Zasavska":
                        ukgLabTests(pozitivni, negativni);
                        break;
                    case "Koroška":
                        sgLabTests(pozitivni, negativni);
                        break;
                    case "Jugovzhodna Slovenija":
                        nmLabTests(pozitivni, negativni);
                        break;
                    case "Osrednjeslovenska":
                        ljLabTests(pozitivni, negativni);
                        break;
                    case "Primorsko-notranjska":
                        kpLabTests(pozitivni, negativni);
                        break;
                    case "Obalno-kraška":
                        kpLabTests(pozitivni, negativni);
                        break;
                    case "Goriška":
                        krLabTests(pozitivni, negativni);
                        break;
                    case "Gorenjska":
                        krLabTests(pozitivni, negativni);
                        break;
                }
                */
                // brezposelni on click graf spremembe
                let dataU = [{"confirmed": 0,"people": getBrezposelni().get("januar").get(d.properties.SR_UIME)[2]/1000, "month":"jan"},
                    {"confirmed": confirmedMap["feb"][d.properties.SR_UIME].confirmedToDate/1000, "people": getBrezposelni().get("februar").get(d.properties.SR_UIME)[2]/1000, "month":"feb"},
                    {"confirmed": confirmedMap["mar"][d.properties.SR_UIME].confirmedToDate/1000, "people": getBrezposelni().get("marec").get(d.properties.SR_UIME)[2]/1000, "month":"mar"},
                    {"confirmed": confirmedMap["apr"][d.properties.SR_UIME].confirmedToDate/1000, "people": getBrezposelni().get("april").get(d.properties.SR_UIME)[2]/1000, "month":"apr"},
                    {"confirmed": confirmedMap["maj"][d.properties.SR_UIME].confirmedToDate/1000, "people": getBrezposelni().get("maj").get(d.properties.SR_UIME)[2]/1000, "month":"maj"},
                    {"confirmed": confirmedMap["jun"][d.properties.SR_UIME].confirmedToDate/1000, "people": getBrezposelni().get("junij").get(d.properties.SR_UIME)[2]/1000, "month":"jun"},
                    {"confirmed": confirmedMap["jul"][d.properties.SR_UIME].confirmedToDate/1000, "people": getBrezposelni().get("julij").get(d.properties.SR_UIME)[2]/1000, "month":"jul"},
                    {"confirmed": confirmedMap["avg"][d.properties.SR_UIME].confirmedToDate/1000, "people": getBrezposelni().get("avgust").get(d.properties.SR_UIME)[2]/1000, "month":"avg"},
                    {"confirmed": confirmedMap["sep"][d.properties.SR_UIME].confirmedToDate/1000, "people": getBrezposelni().get("september").get(d.properties.SR_UIME)[2]/1000, "month":"sep"},
                    {"confirmed": confirmedMap["okt"][d.properties.SR_UIME].confirmedToDate/1000, "people": getBrezposelni().get("oktober").get(d.properties.SR_UIME)[2]/1000, "month":"okt"},
                    {"confirmed": confirmedMap["nov"][d.properties.SR_UIME].confirmedToDate/1000, "people": getBrezposelni().get("oktober").get(d.properties.SR_UIME)[2]/1000, "month":"nov"}]
                console.log(confirmedMap["sep"][d.properties.SR_UIME].confirmedToDate/1000);
                let meja = function () {
                    let spodaj = parseFloat(getBrezposelni().get("januar").get(d.properties.SR_UIME)[2]/1000);
                    let zgoraj = parseFloat(getBrezposelni().get("januar").get(d.properties.SR_UIME)[2]/1000);
                    for (el in dataU){
                        if (parseFloat(dataU[el].people) < spodaj) {
                            spodaj = parseFloat(dataU[el].people);
                        }
                        if (parseFloat(dataU[el].people) > zgoraj) {
                            zgoraj = parseFloat(dataU[el].people);
                        }
                    }
                    spodaj -= 0.2;
                    zgoraj += 0.2;

                    spodaj = Math.round(spodaj*10) / 10;
                    zgoraj = Math.round(zgoraj*10) / 10;
                    return [spodaj, zgoraj];
                }

                y = d3.scaleLinear()
                    .domain([meja()[0] , meja()[1]])
                    .range([height1, 0]);

                if (d.properties.SR_UIME === "Gorenjska"){
                    y2 = d3.scaleLinear()
                        .domain([0, parseFloat(confirmedMap["sep"][d.properties.SR_UIME].confirmedToDate)/1000 + 3.1])
                        .range([height1, 0]);
                }
                else{
                    y2 = d3.scaleLinear()
                        .domain([0, parseFloat(confirmedMap["sep"][d.properties.SR_UIME].confirmedToDate)/1000])
                        .range([height1, 0]);
                }

                graf.select('.yaxis')
                    .call(d3.axisLeft(y))
                    .selectAll("text")
                    .style("font-size", "10px")
                    .style("fill", "#FFFFFF");

                graf.select('.yaxis2')
                    .attr("transform", "translate(-32)")
                    .call(d3.axisLeft(y2))
                    .selectAll("text")
                    .style("font-size", "10px")
                    .style("fill", "red");


                graf.select(".prikaz")
                    .datum(dataU)
                    .style("opacity", ".8")
                    .style("stroke-width", 1)
                    .style("stroke-linejoin", "round")
                    .style("fill", "#DFDFDF")
                    .attr("d",  d3.area().curve(d3.curveBasis)
                        .x(function(d) { return this.x(d.month); })
                        .y0(height1)
                        .y1(function(d) { return this.y(d.people); })
                    );
                graf.select(".prikaz2")
                    .datum(dataU)
                    .style("opacity", ".8")
                    .style("stroke", "red")
                    .style("stroke-width", 3.5)
                    .style("stroke-linejoin", "round")
                    .attr("fill", "none")
                    .attr("d",  d3.line().curve(d3.curveNatural)
                        .x(function(d) { return this.x(d.month); })
                        .y(function(d) { return this.y2(d.confirmed); })
                    );

            })
        });

        await sleep(1500);

    }
}