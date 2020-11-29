let podatkiPostelje;
d3.json('https://api.sledilnik.org/api/hospitals')
    .then(function(dataB) {
        const todayData = dataB[dataB.length - 1];
        podatkiPostelje = parseData(todayData);

    });

function getData(){
    return podatkiPostelje;
}

function parseData(todayData) {
    const hospitalsData = todayData.perHospital;
    const regionBeds = new Map();

    const hospitalsDataMap = new Map(Object.entries(hospitalsData));
    for (let mapElement of hospitalsDataMap) {
        const hospitalName = mapElement[0];
        const hospitalStuff = mapElement[1];

        if (hospitalStuff.beds.max === undefined || hospitalStuff.beds.occupied === undefined){
            regionBeds[hospitalName] = null;
            const dataNotranjska = {};
            if (!regionBeds.has("Primorsko-notranjska")) {
                dataNotranjska.max = 0;
                dataNotranjska.occupied = 0;
                regionBeds.set("Primorsko-notranjska", dataNotranjska);
            }
        }
        else{
            const hospitalData = {};
            hospitalData.max = hospitalStuff.beds.max;
            hospitalData.occupied = hospitalStuff.beds.occupied;
            //regionBeds[hospitalName] = hospitalData;

            switch (hospitalName) {
                case "ukclj":
                    regionBeds.set("Osrednjeslovenska", hospitalData);
                    break;
                case "sbje":
                case "ukg":
                    if(regionBeds.has("Gorenjska")){
                        hospitalData.max += regionBeds.get("Gorenjska").max;
                        hospitalData.occupied += regionBeds.get("Gorenjska").occupied;
                        regionBeds.set("Gorenjska", hospitalData);
                    }
                    else{
                        regionBeds.set("Gorenjska", hospitalData);
                    }
                    break;
                case "sbng":
                    regionBeds.set("Goriška", hospitalData);
                    break;
                case "sbiz":
                    regionBeds.set("Obalno-kraška", hospitalData);
                    break;
                case "sbnm":
                    regionBeds.set("Jugovzhodna Slovenija", hospitalData);
                    break;
                case "sbbr":
                    regionBeds.set("Posavska", hospitalData);
                    break;
                case "sbtr":
                    regionBeds.set("Zasavska", hospitalData);
                    break;
                case "sbce":
                    regionBeds.set("Savinjska", hospitalData);
                    break;
                case "sbsg":
                    regionBeds.set("Koroška", hospitalData);
                    break;
                case "sbms":
                    regionBeds.set("Pomurska", hospitalData);
                    break;
                case "sbpt":
                case "ukcmb":
                    if(regionBeds.has("Podravska")){
                        hospitalData.max += regionBeds.get("Podravska").max;
                        hospitalData.occupied += regionBeds.get("Podravska").occupied;
                        regionBeds.set("Podravska", hospitalData);
                    }
                    else{
                        regionBeds.set("Podravska", hospitalData);
                    }
                    break;
            }
        }
    }
    return regionBeds;
}
