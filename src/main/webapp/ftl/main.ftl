<html lang="en">
<head>
    <title>Corona project</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    <link rel="stylesheet" href="/static/css/main.css">

</head>
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

<div id="main" class="container-fluid text-center bg-dark">

</div>


<script>

    var width = 1400;
    var height = 700;

    var svg = d3.select("#main")
        .append("svg")
        .attr("width",width)
        .attr("height",height);

    // var rect = svg.append("rect")
    //     .attr('x', 800)
    //     .attr('y', 100)
    //     .attr('width', 200)
    //     .attr('height', 200)
    //     .attr('stroke', 'none')
    //     .attr('fill', 'none');

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
            var x = d3.mouse(this)[0];
            var y = d3.mouse(this)[1];

            //to mi izpisuje v konzolo
            console.log(d.properties.SR_UIME)

            svg.select("rect")
                .attr('fill', 'lightblue')
                .attr('x', x + 10)
                .attr('y', y + 10)

            svg.append("text")
                .attr('fill', 'black')
                .attr('x', x + 30)
                .attr('y', y + 30)
                .text(d.properties.SR_UIME)


        })


        svg.selectAll("path").on('mouseout', function (d, i) {
            svg.select("rect").attr('fill', 'none')
            svg.select("text").remove()
        })
    })
    var rect = svg.append("rect")
        .attr('x', 10)
        .attr('y', 120)
        .attr('width', 200)
        .attr('height', 200)
        .attr('stroke', 'none')
        .attr('fill', 'none');

</script>
<script src="https://d3js.org/d3.v5.js"></script>
<script src="./static/js/main.js"></script>
