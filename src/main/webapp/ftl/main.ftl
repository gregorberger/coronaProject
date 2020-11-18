<html lang="en">
<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="//d3js.org/topojson.v1.min.js"></script>
<style>

    path {
        fill: #ccc;
        stroke: #fff;
        stroke-width: .5px;
    }

    circle {
        fill: #fff;
        fill-opacity: 0.4;
        stroke: #111;
    }

    path:hover {
        fill: pink;
    }
    circle.active {
        fill: blue;
    }


</style>
<body>


<script>

    var width = 960;
    var height = 620;

    var svg = d3.select("body")
        .append("svg")
        .attr("width",width)
        .attr("height",height);

    var projection = d3.geoIdentity().reflectY(true);

    var path = d3.geoPath(projection);

    d3.json("./static/SR.geojson", function(err, geojson) {

        projection.fitSize([width,height],geojson);

        // svg.append("d").selectAll("path").data(geojson.features)
        //     .enter().append("path").attr("d", path);

        svg.append("g")
            .attr("class", "black")
            .selectAll("path")
            .data(geojson.features)
            .enter()
            .append("path")
            .attr("d", path);

    })

</script>
<script src="https://d3js.org/d3.v5.js"></script>
<script src="./static/js/main.js"></script>
