function insertBoxInfoTitle() {
    n =  new Date();
    y = n.getFullYear();
    m = n.getMonth() + 1;
    d = n.getDate();
    document.getElementById("titleInfoBox").innerHTML = "Podatki za <br><b>" + d + "." + m + "." + y+"</b>";
}


function pathColor(regionsMap, mapRegion) {
    var location;
    switch (mapRegion) {
        case "Pomurska":
            location = 'ms';
            break;
        case "Podravska":
            location = 'mb';
            break;
        case "Savinjska":
            location = 'ce';
            break;
        case "Posavska":
            location = 'kk';
            break;
        case "Zasavska":
            location = 'za';
            break;
        case "Koroška":
            location = 'sg';
            break;
        case "Jugovzhodna Slovenija":
            location = 'nm';
            break;
        case "Osrednjeslovenska":
            location = 'lj';
            break;
        case "Primorsko-notranjska":
            location = 'po';
            break;
        case "Obalno-kraška":
            location = 'kp';
            break;
        case "Goriška":
            location = 'ng';
            break;
        case "Gorenjska":
            location = 'kr';
            break;
    }

    if(regionsMap[location].activeCases <= 400) {
        return "cases400";
    } else if (regionsMap[location].activeCases > 401 && regionsMap[location].activeCases <= 600) {
        return "cases600";
    } else if (regionsMap[location].activeCases > 601 && regionsMap[location].activeCases <= 800) {
        return "cases800";
    } else if (regionsMap[location].activeCases > 801 && regionsMap[location].activeCases <= 1000) {
        return "cases1000";
    } else if (regionsMap[location].activeCases > 1001 && regionsMap[location].activeCases <= 1200) {
        return "cases1200";
    } else if (regionsMap[location].activeCases > 1201) {
        return "cases1400";
    }
}