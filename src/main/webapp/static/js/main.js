

d3.json('https://api.sledilnik.org/api/municipalities')
    .then(function(data) {
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

        console.log(regionsMap);
    });
