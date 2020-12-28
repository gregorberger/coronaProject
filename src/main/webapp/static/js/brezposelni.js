let brezposelni;
d3.xml('./static/brezposelni_pospolu_nov.xml')
    .then(function(brezp) {
        let podatki = brezp.getElementsByTagName("Data");
        brezposelni = new Map();
        //prve vrstice nepomembne
        let trenutni = 5;
        let mesec = "januar";
        let podatkiMesec = new Map();
        while (trenutni !== podatki.length) {
            //oznacuje konec podatkov za trenutni mesec
            if (podatki[trenutni].textContent === "Občina izven RS") {
                brezposelni.set(mesec, podatkiMesec);
                //podatkiMesec.clear();

                //naslednje 4 vrstice niso uporabne
                trenutni += 4;
                //shranimo naslednji mesec
                let s = podatki[trenutni].textContent;
                s = s.split(" ");
                mesec = s[s.length - 2];
                //podatki za naslednji mesec se zacnejo na 5 vrstici
                trenutni += 5;
                podatkiMesec = new Map();
            }
            //ne zanimajo nas podatki za celo V/Z Slovenijo
            else if (podatki[trenutni].textContent === "Vzhodna Slovenija" ||
                     podatki[trenutni].textContent === "Zahodna Slovenija"){
                trenutni += 4;
            }
            else{
                podatkiMesec.set(podatki[trenutni].textContent, [podatki[trenutni+1].textContent,
                                 podatki[trenutni+2].textContent, podatki[trenutni+3].textContent])
                trenutni += 4;
            }
        }
    });
function getBrezposelni() {
    return brezposelni;
}

