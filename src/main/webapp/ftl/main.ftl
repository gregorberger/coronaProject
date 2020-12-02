<html lang="en">
<head>
    <title>Corona Project</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    <link rel="stylesheet" href="/static/css/main.css">

</head>

<style>
    * {
        font-family: "Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif;
        font-size: 15px;
    }

    path {
        fill: #ccc;
        stroke: #fff;
        stroke-width: .5px;
        margin: 20px;
    }
    path:hover {
        fill: pink;
    }
</style>
<body>
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/series-label.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"></script>

<script src="https://d3js.org/d3.v5.js"></script>
<script src="./static/js/labTests.js"></script>
<script src="./static/js/bolnisnice.js"></script>
<script src="./static/js/brezposelni.js"></script>
<script src="./static/js/regionsData.js"></script>
<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="//d3js.org/topojson.v1.min.js"></script>
<script src="./static/js/main.js"></script>
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
    <div class="d-inline-flex align-items-center">
        <h1 class="text-white border-bottom">Zemljevid po regijah</h1>

    </div>
    <div class="row">
        <div id="infoBox" class="col-2">
            <div id="titleInfoBox" class="h4 text-white collapse"></div>
            <div class="row">
                <div id="mapData"></div>
            </div>
            <div class="row">
                <div id="mapLegend"></div>
            </div>
        </div>
        <div id="mapDiv" class="col-7"></div>
        <div id="graphs" class="col-3">
            <div id="labTestsGraph" class="row"></div>
            <div id="drugiGraf" class="row"></div>
        </div>
    </div>


    <div class="row bg-dark mt-5">
        <div class="col-sm-4">
            <div class="card ml-5">
                <div class="card-body">
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
            </div>
        </div>
        <div class="col-sm-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
            </div>
        </div>
        <div class="col-sm-4">
            <div class="card mr-5">
                <div class="card-body">
                    <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
            </div>
        </div>

    </div>

</div>


<script>
    var width = 1150;
    var height = 600;
    var map = d3.select("#mapDiv")
        .append("svg")
        .attr("width",width)
        .attr("height",height);

    var mapData = d3.select("#mapData").append("svg")
        .attr("width",300)
        .attr("height",400);

    var projection = d3.geoIdentity().reflectY(true);
    var path = d3.geoPath(projection);
    var region;

    var rect = mapData
        .append("rect")
        .attr('width', 276)
        .attr('height', 200)
        .attr('fill', 'none');


    function bottomRightMapInfo() {
        map.append("text")
            .attr('x', 980)
            .attr('y', 575)
            .attr('class', "text-muted")
            .attr('fill', "grey")
            .text("Podatki za :" + getDate());
        map.append("text")
            .attr('x', 915)
            .attr('y', 590)
            .attr('class', "text-muted")
            .attr('fill', "grey")
            .text("vir: NIJZ, Ministrstvo za zdravje");
    }

    d3.json("./static/SR.geojson", function(err, geojson) {
        projection.fitSize([width,height],geojson);

        map.append("g")
            .selectAll("path")
            .data(geojson.features)
            .enter()
            .append("path")
            .attr("id", function(d) { return d.properties.SR_UIME; })
            .attr("class", function(d) { return pathColor(d.properties.SR_UIME); })
            .attr("d", path);

        bottomRightMapInfo();

        map.selectAll("path").on('mouseover', function (d, i) {
            var x = d3.mouse(this)[0];
            var y = d3.mouse(this)[1];

            mapData.select("rect")
                //.attr('x', 150)
                //.attr('y', 30)
                .attr('fill', '#ffa458')
                .attr('stroke', 'black')
                .attr('stroke-width', '3')
                .attr('opacity', 1);

            mapData.append("text")
                .attr('fill', 'black')
                .attr('class', 'font-weight-bold h4')
                .attr('x', 10)
                .attr('y', 30)
                .text(d.properties.SR_UIME);

            mapData.append("text")
                .attr('id', 'activeCases')
                .attr('fill', 'black')
                .attr('class', 'h5')
                .attr('x', 10)
                .attr('y', 70)
                .text("Aktivni primeri: ");
            document.getElementById("activeCases").innerHTML += "<a class='font-weight-bold'>"+regionsMap[d.properties.SR_UIME].activeCases+"</a>";

            mapData.append("text")
                .attr('id', 'confirmedToDate')
                .attr('fill', 'black')
                .attr('class', 'h5')
                .attr('x', 10)
                .attr('y', 100)
                .text("Potrjeni do danes: ");
            document.getElementById("confirmedToDate").innerHTML += "<a class='font-weight-bold'>"+regionsMap[d.properties.SR_UIME].confirmedToDate+"</a>";

            mapData.append("text")
                .attr('id', 'deceasedToDate')
                .attr('fill', 'black')
                .attr('class', 'h5')
                .attr('x', 10)
                .attr('y', 130)
                .text("Smrti do danes: ");
            document.getElementById("deceasedToDate").innerHTML += "<a class='font-weight-bold'>"+regionsMap[d.properties.SR_UIME].deceasedToDate+"</a>";

            mapData.append("text")
                .attr('id', 'hospitalBeds')
                .attr('fill', 'black')
                .attr('class', 'h5')
                .attr('x', 10)
                .attr('y', 160)
                .text("Postelje (Z/P): ");
            document.getElementById("hospitalBeds").innerHTML += "<a class='text-danger'>"+getData().get(d.properties.SR_UIME).occupied+"</a>" +
                "/<a class='font-weight-bold'>"+getData().get(d.properties.SR_UIME).max+"</a>";

            mapData.append("text")
                .attr('id', 'unemployed')
                .attr('fill', 'black')
                .attr('class', 'h5')
                .attr('x', 10)
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
    });

    mapLegend();

</script>
<script src="https://d3js.org/d3.v5.js"></script>
