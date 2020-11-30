let regionsMap;
d3.json('https://api.sledilnik.org/api/municipalities')
    .then(function(data) {
        let todayData = data[data.length - 1];
        regionsMap = new Map();
        regionsMap = parseRegionsData(todayData);

    });

function getRegionsData(){
    return regionsMap;
}

function parseRegionsData(todayData) {
    let regionsData = todayData.regions;
    const regionsDataMap = new Map(Object.entries(regionsData));
    for (var mapElement of regionsDataMap) {
        var regionName = mapElement[0];

        switch (regionName) {
            case "ms":
                regionName = 'Pomurska';
                break;
            case "mb":
                regionName = 'Podravska';
                break;
            case "ce":
                regionName = 'Savinjska';
                break;
            case "kk":
                regionName = 'Posavska';
                break;
            case "za":
                regionName = 'Zasavska';
                break;
            case "sg":
                regionName = 'Koroška';
                break;
            case "nm":
                regionName = 'Jugovzhodna Slovenija';
                break;
            case "lj":
                regionName = 'Osrednjeslovenska';
                break;
            case "po":
                regionName = 'Primorsko-notranjska';
                break;
            case "kp":
                regionName = 'Obalno-kraška';
                break;
            case "ng":
                regionName = 'Goriška';
                break;
            case "kr":
                regionName = 'Gorenjska';
                break;
        }

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

    return regionsMap;
}
