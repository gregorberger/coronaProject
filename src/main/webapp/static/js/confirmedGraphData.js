let confirmedMap;
d3.json('https://api.sledilnik.org/api/municipalities')
    .then(function(data) {
        let todayData = data[data.length - 1];
        confirmedMap = new Map();
        confirmedMap["feb"] = confirmedData(data[0]);
        confirmedMap["mar"] = confirmedData(data[27]);
        confirmedMap["apr"] = confirmedData(data[57]);
        confirmedMap["maj"] = confirmedData(data[88]);
        confirmedMap["jun"] = confirmedData(data[118]);
        confirmedMap["jul"] = confirmedData(data[149]);
        confirmedMap["avg"] = confirmedData(data[180]);
        confirmedMap["sep"] = confirmedData(data[210]);
        confirmedMap["okt"] = confirmedData(data[241]);
        confirmedMap["nov"] = confirmedData(data[271]);
    });

function getConfirmedData(){
    return confirmedMap;
}

function confirmedData(thisData) {
    let trenutno = new Map();
    let regionsData = thisData.regions;
    const regionsDataMap = new Map(Object.entries(regionsData));
    var skupni = 0;
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
            case "n":
                regionName = 'Slovenija';
        }

        var obcineInRegion = mapElement[1];
        var confirmedToDate = 0;
        trenutno[regionName] = obcineInRegion;
        const obcinaDataMap = new Map(Object.entries(obcineInRegion));
        for (var obcinaElement of obcinaDataMap) {
            var singleEl = obcinaElement[1];
            if (regionName === 'Slovenija'){
                confirmedToDate = skupni;
                break;
            }
            else if(singleEl.confirmedToDate != null) {
                confirmedToDate += singleEl.confirmedToDate;
                skupni += singleEl.confirmedToDate;
            }
        }
        var regionData = {};
        regionData.confirmedToDate = confirmedToDate;
        trenutno[regionName] = regionData;
    }
    return trenutno;
}
