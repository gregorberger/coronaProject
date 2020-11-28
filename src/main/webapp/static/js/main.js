function insertBoxInfoTitle() {
    n =  new Date();
    y = n.getFullYear();
    m = n.getMonth() + 1;
    d = n.getDate();
    document.getElementById("titleInfoBox").innerHTML = "Podatki za <br><b>" + d + "." + m + "." + y+"</b>";
}
