<html lang="en">
<head>
    <title>Corona project</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    <link rel="stylesheet" href="/static/css/main.css">

</head>

<style>
    path {
        fill: #ccc;
        stroke: #fff;
        stroke-width: .5px;
    }
    path:hover {
        fill: pink;
    }
</style>
<body>
<script src="https://d3js.org/d3.v5.js"></script>
<script src="./static/js/bolnisnice.js"></script>
<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="//d3js.org/topojson.v1.min.js"></script>
<nav class="navbar navbar-dark navbar-bg">
    <div class="container">
        <div class="row">
            <div class="col">
                <a class="navbar-brand">
                    <img src="/static/images/virus.png" width="30" height="30" class="d-inline-block align-top" alt="">
                    Corona Project
                </a>
            </div>
        </div>

    </div>

</nav>

<div id="main" class="container-fluid text-center pt-5 bg-dark h-100">

</div>


<script>
    var width = 1400;
    var height = 700;
    var svg = d3.select("#main")
        .append("svg")
        .attr("width",width)
        .attr("height",height);
    d3.selection.prototype.moveToFront = function() {
        return this.each(function(){
            this.parentNode.appendChild(this);
        });
    };
    d3.selection.prototype.moveToBack = function() {
        return this.each(function() {
            var firstChild = this.parentNode.firstChild;
            if (firstChild) {
                this.parentNode.insertBefore(this, firstChild);
            }
        });
    };
    var projection = d3.geoIdentity().reflectY(true);
    var path = d3.geoPath(projection);
    var todaysData;
    var region;
    d3.json("./static/SR.geojson", function(err, geojson) {
        projection.fitSize([width,height],geojson);
        svg.append("g")
            .selectAll("path")
            .data(geojson.features)
            .enter()
            .append("path")
            .attr("d", path)
        svg.select("rect").raise()
        svg.selectAll("path").on('mouseover', function (d, i) {
            svg.selectAll("text").remove()
            var x = d3.mouse(this)[0];
            var y = d3.mouse(this)[1];
            svg.select("rect")
                .attr('fill', '#ffa458')
                .attr('opacity', 0.7)
                .attr('x', x + 10)
                .attr('y', y + 10)
            svg.append("text")
                .attr('fill', 'black')
                .attr('class', 'font-weight-bold')
                .attr('x', x + 40)
                .attr('y', y + 30)
                .text(d.properties.SR_UIME)
            // Data from today
            d3.json('https://api.sledilnik.org/api/municipalities')
                .then(function (data) {
                    let todayData = data[data.length - 1];
                    let regionsData = todayData.regions;
                    var regionsMap = new Map();
                    const regionsDataMap = new Map(Object.entries(regionsData));
                    for (var mapElement of regionsDataMap) {
                        var regionName = mapElement[0];
                        var obcineInRegion = mapElement[1];
                        var activeCases = 0;
                        var confirmedToDate = 0;
                        var deceasedToDate = 0;
                        regionsMap[regionName] = obcineInRegion;
                        const obcinaDataMap = new Map(Object.entries(obcineInRegion));
                        for (var obcinaElement of obcinaDataMap) {
                            var singleEl = obcinaElement[1];
                            if (singleEl.activeCases != null) {
                                activeCases += singleEl.activeCases;
                            }
                            if (singleEl.confirmedToDate != null) {
                                confirmedToDate += singleEl.confirmedToDate;
                            }
                            if (singleEl.deceasedToDate != null) {
                                deceasedToDate += singleEl.deceasedToDate;
                            }
                        }
                        var regionData = {};
                        regionData.activeCases = activeCases;
                        regionData.confirmedToDate = confirmedToDate;
                        regionData.deceasedToDate = deceasedToDate;
                        regionsMap[regionName] = regionData;
                    }
                    switch (d.properties.SR_UIME) {
                        case "Pomurska":
                            region = 'ms';
                            break;
                        case "Podravska":
                            region = 'mb';
                            break;
                        case "Savinjska":
                            region = 'ce';
                            break;
                        case "Posavska":
                            region = 'kk';
                            break;
                        case "Zasavska":
                            region = 'za';
                            break;
                        case "Koroška":
                            region = 'sg';
                            break;
                        case "Jugovzhodna Slovenija":
                            region = 'nm';
                            break;
                        case "Osrednjeslovenska":
                            region = 'lj';
                            break;
                        case "Primorsko-notranjska":
                            region = 'po';
                            break;
                        case "Obalno-kraška":
                            region = 'kp';
                            break;
                        case "Goriška":
                            region = 'ng';
                            break;
                        case "Gorenjska":
                            region = 'kr';
                            break;
                    }
                    svg.append("text")
                        .attr('fill', 'black')
                        .attr('x', x + 30)
                        .attr('y', y + 60)
                        .text("Aktivni primeri: " + regionsMap[region].activeCases);
                    svg.append("text")
                        .attr('fill', 'black')
                        .attr('x', x + 30)
                        .attr('y', y + 80)
                        .text("Potrjeni do danes: " + regionsMap[region].confirmedToDate);
                    svg.append("text")
                        .attr('fill', 'black')
                        .attr('x', x + 30)
                        .attr('y', y + 100)
                        .text("Smrti do danes: " + regionsMap[region].deceasedToDate);
                    svg.append("text")
                        .attr('fill', 'black')
                        .attr('x', x + 30)
                        .attr('y', y + 120)
                        .text("Postelje (P/Z): " + getData().get(d.properties.SR_UIME).max+ " / "+getData().get(d.properties.SR_UIME).occupied);
                });
        })
        svg.selectAll("path").on('mouseout', function (d, i) {
            svg.select("rect").attr('fill', 'none')
            svg.selectAll("text").remove()
        })
    })
    var rect = svg.append("rect")
        .attr('x', 10)
        .attr('y', 120)
        .attr('width', 200)
        .attr('height', 120)
        .attr('stroke', 'none')
        .attr('fill', 'none');
</script>
<script src="https://d3js.org/d3.v5.js"></script>
<script src="./static/js/main.js"></script>