let labTests;
d3.json('https://api.sledilnik.org/api/lab-tests')
    .then(function(data) {
        labTests = data.slice(data.length - 7, data.length);
        labTestsGraph();
    });


function labTestsGraph() {
    Highcharts.chart('labTestsGraph', {
        chart: {
            type: 'area',
            backgroundColor: "transparent"
        },

        title: {
            text: 'Testiranje',
            style: {
                color: '#ffffff',
                fontWeight: 'bold'
            }
        },
        credits: {
            enabled: false
        },
        subtitle: {
            text: 'vir: NIJZ, Ministrstvo za zdravje'
        },
        legend: {
            backgroundColor: '#3a434a',
            layout: 'vertical',
            title: {
                itemStyle: {
                    color: '#ffffff',
                    fontWeight: 'bold'
                }
            },
        },
        xAxis: {
            categories: [labTests[0].day + "/" + labTests[0].month, labTests[1].day + "/" + labTests[1].month, labTests[2].day + "/" + labTests[2].month,
                labTests[3].day + "/" + labTests[3].month, labTests[4].day + "/" + labTests[4].month, labTests[5].day + "/" + labTests[5].month,
                labTests[6].day + "/" + labTests[6].month],
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            },
            labels: {
                style: {
                    color: 'white'
                }
            }
        },
        yAxis: {
            labels: {
                format: '{value}%',
                style: {
                    color: 'white'
                }
            },
            title: {
                enabled: false
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f} testov)<br/>',
            split: true
        },
        plotOptions: {
            area: {
                stacking: 'percent',
                lineColor: '#ffffff',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#ffffff'
                },
            }
        },
        series: [{
            name: 'Pozitivni',
            data: [positiveTests(labTests[0]), positiveTests(labTests[1]), positiveTests(labTests[2]),
                positiveTests(labTests[3]), positiveTests(labTests[4]), positiveTests(labTests[5]), positiveTests(labTests[6])],
            color: "red",
        }, {
            name: 'Negativni',
            data: [negativeTests(labTests[0]), negativeTests(labTests[1]), negativeTests(labTests[2]), negativeTests(labTests[3]),
                negativeTests(labTests[4]), negativeTests(labTests[5]), negativeTests(labTests[6])],
            color: "green"
        }]
    });
}

function positiveTests(testDay) {
    return testDay.total.positive.today;
}

function negativeTests(testDay) {
    return testDay.total.performed.today - positiveTests(testDay);
}