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
<script src="https://d3js.org/d3.v5.js"></script>
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
    <div class="row">
        <div id="infoBox" class="col-2">
            <div id="titleInfoBox" class="h4 text-white collapse">
            </div>
        </div>
        <div id="mapDiv" class="col-10"></div>
    </div>
</div>


<script>
    insertBoxInfoTitle();

    var width = 1350;
    var height = 700;
    var map = d3.select("#mapDiv")
        .append("svg")
        .attr("width",width)
        .attr("height",height);

    var infoBox = d3.select("#infoBox").append("svg")
        .attr("width",300)
        .attr("height",500);

    var projection = d3.geoIdentity().reflectY(true);
    var path = d3.geoPath(projection);
    var todaysData;
    var region;
    var regionsMapData;

    var rect = infoBox
        .append("rect")
        .attr('width', 276)
        .attr('height', 200)
        .attr('fill', 'none');


    d3.json("./static/SR.geojson", function(err, geojson) {
        // Data from today
        regionsMapData = getRegionsData();
        projection.fitSize([width,height],geojson);


        map.append("g")
            .selectAll("path")
            .data(geojson.features)
            .enter()
            .append("path")
            .attr("id", function(d) { return d.properties.SR_UIME; })
            .attr("class", function(d) { return pathColor(regionsMapData, d.properties.SR_UIME); })
            .attr("d", path);

        map.selectAll("path").on('mouseover', function (d, i) {
            var x = d3.mouse(this)[0];
            var y = d3.mouse(this)[1];

            document.getElementById("titleInfoBox").classList.remove("collapse");

            infoBox.select("rect")
                .attr('fill', '#ffa458')
                .attr('stroke', 'black')
                .attr('stroke-width', '3')
                .attr('opacity', 1);

            infoBox.append("text")
                .attr('fill', 'black')
                .attr('class', 'font-weight-bold h4')
                .attr('x', 10)
                .attr('y', 30)
                .text(d.properties.SR_UIME);

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
            infoBox.append("text")
                .attr('id', 'activeCases')
                .attr('fill', 'black')
                .attr('class', 'h5')
                .attr('x', 10)
                .attr('y', 70)
                .text("Aktivni primeri: ");
            document.getElementById("activeCases").innerHTML += "<a class='font-weight-bold'>"+regionsMapData[region].activeCases+"</a>";

            infoBox.append("text")
                .attr('id', 'confirmedToDate')
                .attr('fill', 'black')
                .attr('class', 'h5')
                .attr('x', 10)
                .attr('y', 100)
                .text("Potrjeni do danes: ");
            document.getElementById("confirmedToDate").innerHTML += "<a class='font-weight-bold'>"+regionsMapData[region].confirmedToDate+"</a>";

            infoBox.append("text")
                .attr('id', 'deceasedToDate')
                .attr('fill', 'black')
                .attr('class', 'h5')
                .attr('x', 10)
                .attr('y', 130)
                .text("Smrti do danes: ");
            document.getElementById("deceasedToDate").innerHTML += "<a class='font-weight-bold'>"+regionsMapData[region].deceasedToDate+"</a>";

            infoBox.append("text")
                .attr('id', 'hospitalBeds')
                .attr('fill', 'black')
                .attr('class', 'h5')
                .attr('x', 10)
                .attr('y', 160)
                .text("Postelje (Z/P): ");
            document.getElementById("hospitalBeds").innerHTML += "<a class='text-danger'>"+getData().get(d.properties.SR_UIME).occupied+"</a>" +
                "/<a class='font-weight-bold'>"+getData().get(d.properties.SR_UIME).max+"</a>";

            infoBox.append("text")
                .attr('id', 'unemployed')
                .attr('fill', 'black')
                .attr('class', 'h5')
                .attr('x', 10)
                .attr('y', 190)
                .text("Brezposelni: ");
            document.getElementById("unemployed").innerHTML += "<a class='font-weight-bold'>"+getBrezposelni().get("oktober").get(d.properties.SR_UIME)[2]+"</a>";


        });

        map.selectAll("path").on('mouseout', function (d, i) {
            infoBox.select("rect").attr('fill', 'none');
            infoBox.select("rect").attr('stroke', 'none');
            infoBox.selectAll("text").remove();
            infoBox.selectAll("br").remove();
            document.getElementById("titleInfoBox").classList.add("collapse");
        })
    });
</script>
<script src="https://d3js.org/d3.v5.js"></script>
