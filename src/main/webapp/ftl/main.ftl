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
        /*fill: #ccc;*/
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
<script src="./static/js/brezposelni.js"></script>
<script src="./static/js/confirmedGraphData.js"></script>
<script src="./static/js/ageGroups.js"></script>
<script src="./static/js/labTests.js"></script>
<script src="./static/js/bolnisnice.js"></script>
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

<div id="main" class="container-fluid text-center pt-4 backgroundColor h-100">
    <div class="d-inline-flex align-items-center">
        <h1 class="text-white font-weight-bold">Zemljevid po regijah</h1>

    </div>
    <div class="row pt-2">
        <div id="infoBox" class="col-2">
            <div id="titleInfoBox" class="h4 text-white collapse"></div>
            <div class="row">
                <div id="mapData"></div>
            </div>
            <div class="row">
                <div id="mapLegend"></div>
            </div>
        </div>
        <div id="mapDiv" class="col-7 bg-light border-radius"></div>
        <div id="graphs" class="col-3 navbar-bg border-radius pt-5">
            <div id="animation">
                <button type="button" onclick="updateMap()" class="btn btn-dark">Animacija</button>
                <br>
                <label class="mt-3 font-weight-bold text-white" for="startDate">Začetni datum:</label>
                <input  type="date" id="startDate" name="trip-start"
                       value="2020-09-20"
                       min="2020-01-01" max="2021-02-31">
                <br>
                <label class="font-weight-bold text-white" for="endDate">Končni datum:</label>
                <input type="date" id="endDate" name="trip-start"
                       min="2020-01-01" max="2021-02-31">
                <br>
                <br>
                <br>
                <br>
                <label class="font-weight-bold text-white" for="chosenDate">Podatki po regijah:</label>
                <input type="date" id="chosenDate" name="trip-start"
                       min="2020-02-20" max="2021-01-30">
                <div>
                    <button id="buttonPotrdi" class="btn btn-dark" type="button" onclick="resetData()">Potrdi</button>
                </div>
            </div>
            <div id="graph01" class="row">
                <button class="reset" type="button" onclick="resetSlovenija()">Ponastavi graf</button>
            </div>
        </div>
    </div>


    <div class="row backgroundColor mt-5">
        <div class="col-sm-3">
            <div class="card ml-5 navbar-bg border-radius">
                <div class="card-body">
                    <img src="/static/images/virus.png" width="30" height="30" alt="">
                    <h5 class="card-title text-white">Aktivni primeri:</h5>
                    <p>
                        <span class="card-text" id="aktivni"></span>
                        <span class="card-text" id="aktivni2"></span>
                        <img src="/static/images/greenarrow.png" width="20" height="20" alt="" id="activeArrow">
                    </p>
                </div>
            </div>
        </div>
        <div class="col-sm-3">
            <div class="card navbar-bg border-radius">
                <div class="card-body">
                    <img src="/static/images/hospital.png" width="30" height="30" alt="">
                    <h5 class="card-title text-white">Hospitalizirani bolniki:</h5>
                    <p>
                        <span class="card-text" id="hospitalizirani"></span>
                        <span class="card-text" id="hospitalizirani2"></span>
                        <img src="/static/images/greenarrow.png" width="20" height="20" alt="" id="hospitalizedArrow">
                    </p>
                </div>
            </div>
        </div>
        <div class="col-sm-3">
            <div class="card navbar-bg border-radius">
                <div class="card-body">
                    <img src="/static/images/cross.png" width="25" height="30" alt="">
                    <h5 class="card-title text-white">Število smrti:</h5>
                    <p>
                        <span class="card-text" id="smrti"></span>
                        <span class="card-text" id="smrti2"></span>
                        <img src="/static/images/greenarrow.png" width="20" height="20" alt="" id="deathArrow">
                    </p>
                </div>
            </div>
        </div>
        <div class="col-sm-3">
            <div class="card mr-5 navbar-bg border-radius">
                <div class="card-body">
                    <img src="/static/images/nojob.png" width="30" height="30" alt="">
                    <h5 class="card-title text-white">Brezposelni:</h5>
                    <p class="card-text" id="brezposelni"></p>
                    <p class="card-text" ></p>
                </div>
            </div>
        </div>

    </div>

    <div class="row pt-5 backgroundColor">
        <div class="col-6 flex-column">
            <div class="card ml-5 navbar-bg border-radius">
                <div class="card-body">
                    <button type="button" onclick="labTestsGraph()" class="btn btn-dark">Celotno obdobje</button>
                    <button type="button" onclick="labTestsGraph(7)" class="btn btn-dark">7 dni</button>
                    <button type="button" onclick="labTestsGraph(31)" class="btn btn-dark">31 dni</button>
                    <div id="labTestsGraph2"></div>
                    <div class="row"></div>
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="card mr-5 navbar-bg border-radius">
                <div class="card-body">
                    <div id="statePerAge"></div>
                    <div class="row"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="row p-5 backgroundColor">
        <div class="col">
            <div class="card navbar-bg border-radius">
                <div class="card-body">
                    <h1 class="text-white font-weight-bold">Najnovejše novice za prehajanje meja</h1>
                    <ul class="list-group align-items-center">
                    <#assign count=0>
                    <#list novice.entries as novica>
                        <#if count < 5>
                            <a href="${novica.link}" class="list-group-item list-group-item-action">${novica.publishedDate?date} | ${novica.title}</a>
                        </#if>
                        <#assign count++>
                    </#list>
                    </ul>
                </div>
            </div>
        </div>
    </div>

</div>


<script>

    function resetData(){
        let izbraniDatum = document.getElementById("chosenDate").value.split("-0").join("-").split("-");


        let index = 0;
        for (let j=0; j<regionData.length; j++){
            if (regionData[j].year.toString() === izbraniDatum[0] && regionData[j].month.toString() === izbraniDatum[1] &&
                regionData[j].day.toString() === izbraniDatum[2]) {
                index = j;

            }
        }
        calculatePostelje(index-5);
        calculateRegionsData(index);
        map.select("text")
            .attr('x', 900)
            .attr('y', 575)
            .attr('class', "text-muted")
            .attr('fill', "grey")
            .text("Podatki za :" + getDate(index));

        map.select("g")
            .selectAll("path")
            .attr("class", function(d) { return pathColor(d.properties.SR_UIME); })
            .attr("d", path);
    }

    //set date for data of region
    n =  new Date();
    y = n.getFullYear();
    m = n.getMonth() + 1;
    d = n.getDate() - 1;

    let nastaviDatum = y + "-" + m + "-" + d;
    if (d < 10 && m < 10){
        nastaviDatum = y + "-0" + m + "-0" + d;
    }
    else if (d < 10){
        nastaviDatum = y + "-" + m + "-0" + d;
    }
    else if (m < 10){
        nastaviDatum = y + "-0" + m + "-" + d;
    }
    document.getElementById("endDate").value = nastaviDatum;
    document.getElementById("chosenDate").value = nastaviDatum;

    var width = 1070;
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


    function bottomRightMapInfo(vrstica) {
        map.append("text")
            .attr('x', 900)
            .attr('y', 575)
            .attr('class', "text-muted")
            .attr('fill', "grey")
            .text("Podatki za :" + getDate(vrstica));
        map.append("text")
            .attr('x', 845)
            .attr('y', 590)
            .attr('class', "text-muted")
            .attr('fill', "grey")
            .text("vir: NIJZ, Ministrstvo za zdravje");
    }

    //test risanje grafa D3


    var margin = {top: 20, right: 30, bottom: 50, left: 100},
        width1 = 485 - margin.left - margin.right,
        height1 = 250 - margin.top - margin.bottom;

    var graf = d3.select("#graph01")
        .append("svg")
        .attr("width", width1 + margin.left + margin.right)
        .attr("height", height1 + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scalePoint()
        .domain(["jan", "feb", "mar", "apr", "maj", "jun", "jul", "avg", "sep", "okt", "nov"])
        .range([0, width1]);
    graf.append("g")
        .attr("transform", "translate(0," + height1 + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
            .style("font-size", "10px")
            .attr("transform", "translate(-10,10)rotate(-45)")
            .style("fill", "#FFFFFF");


    var y = d3.scaleLinear()
        .domain([76, 92])
        .range([height1, 0]);

    var y2 = d3.scaleLinear()
        .domain([0, 8])
        .range([height1, 0]);

    graf.append("g")
        .attr("class", "yaxis")
        .call(d3.axisLeft(y))
        .selectAll("text")
            .style("font-size", "10px")
            .style("fill", "#FFFFFF");

    graf.append("g")
        .attr("class", "yaxis2")
        .attr("transform", "translate(-32)")
        .call(d3.axisLeft(y2))
        .selectAll("text")
        .style("font-size", "10px")
        .style("fill", "red");



    graf.append("path")
        .attr("class", "prikaz")
        .datum([{"people": 79.841, "month":"jan"}, {"people": 77.484, "month":"feb"}, {"people": 77.855, "month":"mar"},
            {"people": 88.648, "month":"apr"}, {"people": 90.415, "month":"maj"}, {"people": 89.377, "month":"jun"},
            {"people": 89.397, "month":"jul"}, {"people": 88.172, "month":"avg"}, {"people": 83.766, "month":"sep"},
            {"people": 83.654, "month":"okt"}, {"people": 84.139, "month":"nov"}])

        .style("opacity", ".8")
        //.style("stroke", "black")
        .style("stroke-width", 1)
        .style("stroke-linejoin", "round")
        .style("fill", "#DFDFDF")
        .attr("d",  d3.area().curve(d3.curveBasis)
            .x(function(d) { return this.x(d.month); })
            .y0(height1)
            .y1(function(d) { return this.y(d.people); })
        );

    //ročno dodani začetni podatki za celo Slovenijo, ker se prepozno izvede json klic
    graf.append("path")
        .attr("class", "prikaz2")
        .datum([{"people": 0, "month":"jan"}, {"people": 0.001, "month":"feb"}, {"people": 0.841, "month":"mar"},
            {"people": 1.433, "month":"apr"}, {"people": 1.472, "month":"maj"}, {"people": 1.611, "month":"jun"},
            {"people": 2.170, "month":"jul"}, {"people": 2.908, "month":"avg"}, {"people": 5.838, "month":"sep"},
            {"people": 35.629, "month":"okt"}, {"people": 77.130, "month":"nov"}])

        .style("opacity", ".8")
        .style("stroke", "red")
        .style("stroke-width", 3.5)
        .style("stroke-linejoin", "round")
        .attr("fill", "none")
        .attr("d",  d3.line().curve(d3.curveNatural)
            .x(function(d) { return this.x(d.month); })
            .y(function(d) { return this.y2(d.people); })
        );

    d3.selectAll('.axis path')
        .style("fill", "black");

    graf.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -120)
        .attr("y", -68)
        .attr("fill", "white")
        .style("font-size", "13px")
        .text("potrjeni (na tisoč)");

    graf.append("text")
        .attr("x", -50)
        .attr("y", -10)
        .attr("fill", "white")
        .style("font-size", "12px")
        .text("brezposelni (na tisoč)");

    //reset button
    let resetSlovenija = function() {
        y = d3.scaleLinear()
            .domain([76, 92])
            .range([height1, 0]);
        y2 = d3.scaleLinear()
            .domain([0, 8])
            .range([height1, 0]);

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
            .datum([{"people": 79.841, "month":"jan"}, {"people": 77.484, "month":"feb"}, {"people": 77.855, "month":"mar"},
                {"people": 88.648, "month":"apr"}, {"people": 90.415, "month":"maj"}, {"people": 89.377, "month":"jun"},
                {"people": 89.397, "month":"jul"}, {"people": 88.172, "month":"avg"}, {"people": 83.766, "month":"sep"},
                {"people": 83.654, "month":"okt"}, {"people": 84.139, "month":"nov"}])
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
            .datum([{"people": 0, "month":"jan"}, {"people": 0.001, "month":"feb"}, {"people": 0.841, "month":"mar"},
                {"people": 1.433, "month":"apr"}, {"people": 1.472, "month":"maj"}, {"people": 1.611, "month":"jun"},
                {"people": 2.170, "month":"jul"}, {"people": 2.908, "month":"avg"}, {"people": 5.838, "month":"sep"},
                {"people": 35.629, "month":"okt"}, {"people": 77.130, "month":"nov"}])

            .style("opacity", ".8")
            .style("stroke", "red")
            .style("stroke-width", 3.5)
            .style("stroke-linejoin", "round")
            .attr("fill", "none")
            .attr("d",  d3.line().curve(d3.curveNatural)
                .x(function(d) { return this.x(d.month); })
                .y(function(d) { return this.y2(d.people); })
            );

    }


    //skupni podatki

    d3.json("https://api.sledilnik.org/api/summary", function(err, podatki) {
        d3.select("#aktivni").text(podatki.casesActive.value).style("font-weight", "bold");
        /*var aktivni = document.getElementById("aktivni");
        aktivni.textContent += " (" + podatki.casesActive.diffPercentage + "%)";*/
        if (podatki.casesActive.diffPercentage > 0){
            d3.select("#aktivni2").text(" (" + podatki.casesActive.diffPercentage + "%)")
                .style("font-weight", "bold")
                .style("color", "red");
            //attr("src", "/static/images/redarrow.png")
            document.getElementById("activeArrow").src = "/static/images/redarrow.png";
        }
        else{
            d3.select("#aktivni2").text(" (" + podatki.casesActive.diffPercentage + "%)")
                .style("font-weight", "bold")
                .style("color", "green");
        }
        d3.select("#hospitalizirani").text(podatki.hospitalizedCurrent.value).style("font-weight", "bold");

        if (podatki.hospitalizedCurrent.diffPercentage > 0){
            d3.select("#hospitalizirani2").text(" (" + podatki.hospitalizedCurrent.diffPercentage + "%)")
                .style("font-weight", "bold")
                .style("color", "red");
            document.getElementById("hospitalizedArrow").src = "/static/images/redarrow.png";
        }
        else{
            d3.select("#hospitalizirani2").text(" (" + podatki.hospitalizedCurrent.diffPercentage + "%)")
                .style("font-weight", "bold")
                .style("color", "green");
        }

        d3.select("#smrti").text(podatki.deceasedToDate.value).style("font-weight", "bold");

        if (podatki.deceasedToDate.diffPercentage > 0){
            d3.select("#smrti2").text(" (" + podatki.deceasedToDate.diffPercentage + "%)")
                .style("font-weight", "bold")
                .style("color", "red");
            document.getElementById("deathArrow").src = "/static/images/redarrow.png";
        }
        else{
            d3.select("#smrti2").text(" (" + podatki.deceasedToDate.diffPercentage + "%)")
                .style("font-weight", "bold")
                .style("color", "green");
        }
        //console.log(getBrezposelni().get("november").get("Slovenija")[2]);
        d3.select("#brezposelni").text(getBrezposelni().get("november").get("Slovenija")[2]).style("font-weight", "bold");
    });

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

        let index = regionData.length-1;
        calculatePostelje(index-5);
        calculateRegionsData(index);

        map.selectAll("path").on('mouseover', function (d, i) {

            //funkcija za vračanje meseca pri regijah za brezposelnost
            function getFullMonth(mes) {
                let tab = ["november", "februar", "marec", "april", "maj", "junij", "julij", "avgust", "september"
                    , "oktober", "november", "november"];
                return tab[mes-1];
            }
            let izbraniDatum = document.getElementById("chosenDate").value.split("-0").join("-").split("-");
            let mesec = getFullMonth(izbraniDatum[1]);

            /*map.select("g")
                .selectAll("path")
                .attr("class", function(d) { return pathColor(d.properties.SR_UIME); })
                .attr("d", path);*/

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
            //document.getElementById("activeCases").innerHTML += "<a class='font-weight-bold'>"+regionsMap[d.properties.SR_UIME].activeCases+"</a>";
            document.getElementById("activeCases").innerHTML += "<a class='font-weight-bold'>"+regionChangeData[d.properties.SR_UIME].activeCases+"</a>";

            mapData.append("text")
                .attr('id', 'confirmedToDate')
                .attr('fill', 'white')
                .attr('class', 'h5')
                .attr('x', 30)
                .attr('y', 100)
                .text("Potrjeni do danes: ");
            document.getElementById("confirmedToDate").innerHTML += "<a class='font-weight-bold'>"+regionChangeData[d.properties.SR_UIME].confirmedToDate+"</a>";

            mapData.append("text")
                .attr('id', 'deceasedToDate')
                .attr('fill', 'white')
                .attr('class', 'h5')
                .attr('x', 30)
                .attr('y', 130)
                .text("Smrti do danes: ");
            document.getElementById("deceasedToDate").innerHTML += "<a class='font-weight-bold'>"+regionChangeData[d.properties.SR_UIME].deceasedToDate+"</a>";

            mapData.append("text")
                .attr('id', 'hospitalBeds')
                .attr('fill', 'white')
                .attr('class', 'h5')
                .attr('x', 30)
                .attr('y', 160)
                .text("Postelje (Z/P): ");
            document.getElementById("hospitalBeds").innerHTML += "<a class='text-danger'>"+changeDataPostelje.get(d.properties.SR_UIME).occupied+"</a>" +
                "/<a class='font-weight-bold'>"+changeDataPostelje.get(d.properties.SR_UIME).max+"</a>";

            mapData.append("text")
                .attr('id', 'unemployed')
                .attr('fill', 'white')
                .attr('class', 'h5')
                .attr('x', 30)
                .attr('y', 190)
                .text("Brezposelni: ");
            document.getElementById("unemployed").innerHTML += "<a class='font-weight-bold'>"+getBrezposelni().get(mesec).get(d.properties.SR_UIME)[2]+"</a>";


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

    mapLegend();

</script>
<script src="https://d3js.org/d3.v5.js"></script>
