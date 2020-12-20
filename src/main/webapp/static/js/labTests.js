let labTests;
let chart;
d3.json('https://api.sledilnik.org/api/lab-tests')
    .then(function(data) {
        labTests = data.slice(data.length - 7, data.length);
        labTestsGraph();
    });


function labTestsGraph() {
    chart = Highcharts.chart('labTestsGraph', {
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
            text: 'vir: NIJZ, Ministrstvo za zdravje',
            style: {
                color: '#343434',
                fontWeight: 'bold'
            }
        },
        legend: {
            // backgroundColor: '#3a434a',
            // layout: 'vertical',
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

function ljLabTests(pozitivni, negativni) {
    let positiveResults = [];
    positiveResults.push(labTests[0].labs.nlzohlj.positive.today)
    positiveResults.push(labTests[1].labs.nlzohlj.positive.today)
    positiveResults.push(labTests[2].labs.nlzohlj.positive.today)
    positiveResults.push(labTests[3].labs.nlzohlj.positive.today)
    positiveResults.push(labTests[4].labs.nlzohlj.positive.today)
    positiveResults.push(labTests[5].labs.nlzohlj.positive.today)
    positiveResults.push(labTests[6].labs.nlzohlj.positive.today)

    let performedToday = [];
    performedToday.push(labTests[0].labs.nlzohlj.performed.today)
    performedToday.push(labTests[1].labs.nlzohlj.performed.today)
    performedToday.push(labTests[2].labs.nlzohlj.performed.today)
    performedToday.push(labTests[3].labs.nlzohlj.performed.today)
    performedToday.push(labTests[4].labs.nlzohlj.performed.today)
    performedToday.push(labTests[5].labs.nlzohlj.performed.today)
    performedToday.push(labTests[6].labs.nlzohlj.performed.today)

    pozitivni.setData([positiveResults[0], positiveResults[1], positiveResults[2],
        positiveResults[3], positiveResults[4], positiveResults[5],
        positiveResults[6]]);
    negativni.setData([performedToday[0] - positiveResults[0], performedToday[1] - positiveResults[1],
        performedToday[2] - positiveResults[2],
        performedToday[3] - positiveResults[3], performedToday[4] - positiveResults[4],
        performedToday[5] - positiveResults[5], performedToday[6] - positiveResults[6]]);
}

function msLabTests(pozitivni, negativni) {
    let positiveResults = [];
    positiveResults.push(labTests[0].labs.nlzohms.positive.today)
    positiveResults.push(labTests[1].labs.nlzohms.positive.today)
    positiveResults.push(labTests[2].labs.nlzohms.positive.today)
    positiveResults.push(labTests[3].labs.nlzohms.positive.today)
    positiveResults.push(labTests[4].labs.nlzohms.positive.today)
    positiveResults.push(labTests[5].labs.nlzohms.positive.today)
    positiveResults.push(labTests[6].labs.nlzohms.positive.today)

    let performedToday = [];
    performedToday.push(labTests[0].labs.nlzohms.performed.today)
    performedToday.push(labTests[1].labs.nlzohms.performed.today)
    performedToday.push(labTests[2].labs.nlzohms.performed.today)
    performedToday.push(labTests[3].labs.nlzohms.performed.today)
    performedToday.push(labTests[4].labs.nlzohms.performed.today)
    performedToday.push(labTests[5].labs.nlzohms.performed.today)
    performedToday.push(labTests[6].labs.nlzohms.performed.today)
    pozitivni.setData([positiveResults[0], positiveResults[1], positiveResults[2],
        positiveResults[3], positiveResults[4], positiveResults[5],
        positiveResults[6]]);
    negativni.setData([performedToday[0] - positiveResults[0], performedToday[1] - positiveResults[1],
        performedToday[2] - positiveResults[2],
        performedToday[3] - positiveResults[3], performedToday[4] - positiveResults[4],
        performedToday[5] - positiveResults[5], performedToday[6] - positiveResults[6]]);
}

function mbLabTests(pozitivni, negativni) {
    let positiveResults = [];
    positiveResults.push(labTests[0].labs.nlzohmb.positive.today)
    positiveResults.push(labTests[1].labs.nlzohmb.positive.today)
    positiveResults.push(labTests[2].labs.nlzohmb.positive.today)
    positiveResults.push(labTests[3].labs.nlzohmb.positive.today)
    positiveResults.push(labTests[4].labs.nlzohmb.positive.today)
    positiveResults.push(labTests[5].labs.nlzohmb.positive.today)
    positiveResults.push(labTests[6].labs.nlzohmb.positive.today)

    let performedToday = [];
    performedToday.push(labTests[0].labs.nlzohmb.performed.today)
    performedToday.push(labTests[1].labs.nlzohmb.performed.today)
    performedToday.push(labTests[2].labs.nlzohmb.performed.today)
    performedToday.push(labTests[3].labs.nlzohmb.performed.today)
    performedToday.push(labTests[4].labs.nlzohmb.performed.today)
    performedToday.push(labTests[5].labs.nlzohmb.performed.today)
    performedToday.push(labTests[6].labs.nlzohmb.performed.today)
    pozitivni.setData([positiveResults[0], positiveResults[1], positiveResults[2],
        positiveResults[3], positiveResults[4], positiveResults[5],
        positiveResults[6]]);
    negativni.setData([performedToday[0] - positiveResults[0], performedToday[1] - positiveResults[1],
        performedToday[2] - positiveResults[2],
        performedToday[3] - positiveResults[3], performedToday[4] - positiveResults[4],
        performedToday[5] - positiveResults[5], performedToday[6] - positiveResults[6]]);
}

function ceLabTests(pozitivni, negativni) {
    let positiveResults = [];
    positiveResults.push(labTests[0].labs.sbce.positive.today)
    positiveResults.push(labTests[1].labs.sbce.positive.today)
    positiveResults.push(labTests[2].labs.sbce.positive.today)
    positiveResults.push(labTests[3].labs.sbce.positive.today)
    positiveResults.push(labTests[4].labs.sbce.positive.today)
    positiveResults.push(labTests[5].labs.sbce.positive.today)
    positiveResults.push(labTests[6].labs.sbce.positive.today)

    let performedToday = [];
    performedToday.push(labTests[0].labs.sbce.performed.today)
    performedToday.push(labTests[1].labs.sbce.performed.today)
    performedToday.push(labTests[2].labs.sbce.performed.today)
    performedToday.push(labTests[3].labs.sbce.performed.today)
    performedToday.push(labTests[4].labs.sbce.performed.today)
    performedToday.push(labTests[5].labs.sbce.performed.today)
    performedToday.push(labTests[6].labs.sbce.performed.today)
    pozitivni.setData([positiveResults[0], positiveResults[1], positiveResults[2],
        positiveResults[3], positiveResults[4], positiveResults[5],
        positiveResults[6]]);
    negativni.setData([performedToday[0] - positiveResults[0], performedToday[1] - positiveResults[1],
        performedToday[2] - positiveResults[2],
        performedToday[3] - positiveResults[3], performedToday[4] - positiveResults[4],
        performedToday[5] - positiveResults[5], performedToday[6] - positiveResults[6]]);
}

function sgLabTests(pozitivni, negativni) {
    let positiveResults = [];
    positiveResults.push(labTests[0].labs.sbsg.positive.today)
    positiveResults.push(labTests[1].labs.sbsg.positive.today)
    positiveResults.push(labTests[2].labs.sbsg.positive.today)
    positiveResults.push(labTests[3].labs.sbsg.positive.today)
    positiveResults.push(labTests[4].labs.sbsg.positive.today)
    positiveResults.push(labTests[5].labs.sbsg.positive.today)
    positiveResults.push(labTests[6].labs.sbsg.positive.today)

    let performedToday = [];
    performedToday.push(labTests[0].labs.sbsg.performed.today)
    performedToday.push(labTests[1].labs.sbsg.performed.today)
    performedToday.push(labTests[2].labs.sbsg.performed.today)
    performedToday.push(labTests[3].labs.sbsg.performed.today)
    performedToday.push(labTests[4].labs.sbsg.performed.today)
    performedToday.push(labTests[5].labs.sbsg.performed.today)
    performedToday.push(labTests[6].labs.sbsg.performed.today)
    pozitivni.setData([positiveResults[0], positiveResults[1], positiveResults[2],
        positiveResults[3], positiveResults[4], positiveResults[5],
        positiveResults[6]]);
    negativni.setData([performedToday[0] - positiveResults[0], performedToday[1] - positiveResults[1],
        performedToday[2] - positiveResults[2],
        performedToday[3] - positiveResults[3], performedToday[4] - positiveResults[4],
        performedToday[5] - positiveResults[5], performedToday[6] - positiveResults[6]]);
}

function nmLabTests(pozitivni, negativni) {
    let positiveResults = [];
    positiveResults.push(labTests[0].labs.nlzohnm.positive.today)
    positiveResults.push(labTests[1].labs.nlzohnm.positive.today)
    positiveResults.push(labTests[2].labs.nlzohnm.positive.today)
    positiveResults.push(labTests[3].labs.nlzohnm.positive.today)
    positiveResults.push(labTests[4].labs.nlzohnm.positive.today)
    positiveResults.push(labTests[5].labs.nlzohnm.positive.today)
    positiveResults.push(labTests[6].labs.nlzohnm.positive.today)

    let performedToday = [];
    performedToday.push(labTests[0].labs.nlzohnm.performed.today)
    performedToday.push(labTests[1].labs.nlzohnm.performed.today)
    performedToday.push(labTests[2].labs.nlzohnm.performed.today)
    performedToday.push(labTests[3].labs.nlzohnm.performed.today)
    performedToday.push(labTests[4].labs.nlzohnm.performed.today)
    performedToday.push(labTests[5].labs.nlzohnm.performed.today)
    performedToday.push(labTests[6].labs.nlzohnm.performed.today)
    pozitivni.setData([positiveResults[0], positiveResults[1], positiveResults[2],
        positiveResults[3], positiveResults[4], positiveResults[5],
        positiveResults[6]]);
    negativni.setData([performedToday[0] - positiveResults[0], performedToday[1] - positiveResults[1],
        performedToday[2] - positiveResults[2],
        performedToday[3] - positiveResults[3], performedToday[4] - positiveResults[4],
        performedToday[5] - positiveResults[5], performedToday[6] - positiveResults[6]]);
}

function kpLabTests(pozitivni, negativni) {
    let positiveResults = [];
    positiveResults.push(labTests[0].labs.nlzohkp.positive.today)
    positiveResults.push(labTests[1].labs.nlzohkp.positive.today)
    positiveResults.push(labTests[2].labs.nlzohkp.positive.today)
    positiveResults.push(labTests[3].labs.nlzohkp.positive.today)
    positiveResults.push(labTests[4].labs.nlzohkp.positive.today)
    positiveResults.push(labTests[5].labs.nlzohkp.positive.today)
    positiveResults.push(labTests[6].labs.nlzohkp.positive.today)

    let performedToday = [];
    performedToday.push(labTests[0].labs.nlzohkp.performed.today)
    performedToday.push(labTests[1].labs.nlzohkp.performed.today)
    performedToday.push(labTests[2].labs.nlzohkp.performed.today)
    performedToday.push(labTests[3].labs.nlzohkp.performed.today)
    performedToday.push(labTests[4].labs.nlzohkp.performed.today)
    performedToday.push(labTests[5].labs.nlzohkp.performed.today)
    performedToday.push(labTests[6].labs.nlzohkp.performed.today)
    pozitivni.setData([positiveResults[0], positiveResults[1], positiveResults[2],
        positiveResults[3], positiveResults[4], positiveResults[5],
        positiveResults[6]]);
    negativni.setData([performedToday[0] - positiveResults[0], performedToday[1] - positiveResults[1],
        performedToday[2] - positiveResults[2],
        performedToday[3] - positiveResults[3], performedToday[4] - positiveResults[4],
        performedToday[5] - positiveResults[5], performedToday[6] - positiveResults[6]]);
}

function krLabTests(pozitivni, negativni) {
    let positiveResults = [];
    positiveResults.push(labTests[0].labs.nlzohkr.positive.today)
    positiveResults.push(labTests[1].labs.nlzohkr.positive.today)
    positiveResults.push(labTests[2].labs.nlzohkr.positive.today)
    positiveResults.push(labTests[3].labs.nlzohkr.positive.today)
    positiveResults.push(labTests[4].labs.nlzohkr.positive.today)
    positiveResults.push(labTests[5].labs.nlzohkr.positive.today)
    positiveResults.push(labTests[6].labs.nlzohkr.positive.today)

    let performedToday = [];
    performedToday.push(labTests[0].labs.nlzohkr.performed.today)
    performedToday.push(labTests[1].labs.nlzohkr.performed.today)
    performedToday.push(labTests[2].labs.nlzohkr.performed.today)
    performedToday.push(labTests[3].labs.nlzohkr.performed.today)
    performedToday.push(labTests[4].labs.nlzohkr.performed.today)
    performedToday.push(labTests[5].labs.nlzohkr.performed.today)
    performedToday.push(labTests[6].labs.nlzohkr.performed.today)
    pozitivni.setData([positiveResults[0], positiveResults[1], positiveResults[2],
        positiveResults[3], positiveResults[4], positiveResults[5],
        positiveResults[6]]);
    negativni.setData([performedToday[0] - positiveResults[0], performedToday[1] - positiveResults[1],
        performedToday[2] - positiveResults[2],
        performedToday[3] - positiveResults[3], performedToday[4] - positiveResults[4],
        performedToday[5] - positiveResults[5], performedToday[6] - positiveResults[6]]);
}

function ukgLabTests(pozitivni, negativni) {
    let positiveResults = [];
    positiveResults.push(labTests[0].labs.ukg.positive.today)
    positiveResults.push(labTests[1].labs.ukg.positive.today)
    positiveResults.push(labTests[2].labs.ukg.positive.today)
    positiveResults.push(labTests[3].labs.ukg.positive.today)
    positiveResults.push(labTests[4].labs.ukg.positive.today)
    positiveResults.push(labTests[5].labs.ukg.positive.today)
    positiveResults.push(labTests[6].labs.ukg.positive.today)

    let performedToday = [];
    performedToday.push(labTests[0].labs.ukg.performed.today)
    performedToday.push(labTests[1].labs.ukg.performed.today)
    performedToday.push(labTests[2].labs.ukg.performed.today)
    performedToday.push(labTests[3].labs.ukg.performed.today)
    performedToday.push(labTests[4].labs.ukg.performed.today)
    performedToday.push(labTests[5].labs.ukg.performed.today)
    performedToday.push(labTests[6].labs.ukg.performed.today)
    pozitivni.setData([positiveResults[0], positiveResults[1], positiveResults[2],
        positiveResults[3], positiveResults[4], positiveResults[5],
        positiveResults[6]]);
    negativni.setData([performedToday[0] - positiveResults[0], performedToday[1] - positiveResults[1],
        performedToday[2] - positiveResults[2],
        performedToday[3] - positiveResults[3], performedToday[4] - positiveResults[4],
        performedToday[5] - positiveResults[5], performedToday[6] - positiveResults[6]]);
}