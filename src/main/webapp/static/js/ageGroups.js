var ageGroups = [];

d3.json('https://api.sledilnik.org/api/stats')
    .then(function(data) {
        getAgeGroups(data[0]);
        for (let i = data.length; i >= 0; i--) {
            var podatek = data[i];
            if(podatek !== undefined) {
                if(podatek.statePerAgeToDate[0].allToDate !== undefined) {
                    ageGroupGraph(podatek.statePerAgeToDate);
                    break;
                }
            }

        }

    });

function getAgeGroups(data) {
    for (let i = 0; i < data.statePerAgeToDate.length; i++) {
        if(data.statePerAgeToDate[i].ageTo === undefined) {
            ageGroups.push(data.statePerAgeToDate[i].ageFrom + "");
        } else {
            ageGroups.push(data.statePerAgeToDate[i].ageFrom + "-" + data.statePerAgeToDate[i].ageTo);
        }
    }
}

function ageGroupGraph(podatek) {
    chart = Highcharts.chart('statePerAge', {
        chart: {
            type: 'column',
            backgroundColor: "transparent",
            height: 435
        },

        title: {
            text: 'Okuženi po starostnih skupinah',
            style: {
                color: 'black',
                fontWeight: 'bold'
            }
        },
        credits: {
            enabled: false
        },
        subtitle: {
            text: 'vir: NIJZ, Ministrstvo za zdravje',
            style: {
                color: '#ffffff',
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
            categories: ageGroups,
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
            min:0,
            title: {
                enabled: false
            },
            labels: {
                style: {
                    color: 'white'
                }
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: {point.y:,.0f}<br/>',
            split: true
        },
        plotOptions: {
            series: {
                // stacking: 'normal',
                // pointWidth: 22
            },

        },
        series: [{
            name: 'Skupaj',
            data: [podatek[0].allToDate, podatek[1].allToDate, podatek[2].allToDate, podatek[3].allToDate, podatek[4].allToDate,
                podatek[5].allToDate, podatek[6].allToDate, podatek[7].allToDate, podatek[8].allToDate, podatek[9].allToDate],
            color: "#7692bc"
        }, {
            name: 'Moški',
            data: [podatek[0].maleToDate, podatek[1].maleToDate, podatek[2].maleToDate, podatek[3].maleToDate, podatek[4].maleToDate,
                podatek[5].maleToDate, podatek[6].maleToDate, podatek[7].maleToDate, podatek[8].maleToDate, podatek[9].maleToDate],
            color: "#3087d4"
        }, {
            name: 'Ženske',
            data: [podatek[0].femaleToDate, podatek[1].femaleToDate, podatek[2].femaleToDate, podatek[3].femaleToDate, podatek[4].femaleToDate,
                podatek[5].femaleToDate, podatek[6].femaleToDate, podatek[7].femaleToDate, podatek[8].femaleToDate, podatek[9].femaleToDate],
            color: "#cc5f83"
        }]
    });
}
