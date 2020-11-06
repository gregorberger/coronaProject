# coronaProject

Za zagon dockerjev znotraj projekta odpri terminal in vpisi:
  1. ./make.sh
 
Povezava do mysql baze lokalno je:
  * host: localhost
  * port: 3306
  * user: root
  * password: example

Dostop do lokalne strani:
  * http://localhost:8080/

Vsakic k se spremeni kj na controllerju je treba v Maven nardit clean in package, da se nardi nov .war
To lahko nardis v Intelliju na desni strani al pa nardis Run/Debug configuracijo in jo samo zaženes.
![2015-09-20 17 02 28](https://i.imgur.com/qIwe4VN.pngA)

Za bazo se v mapi "data" dodaja sql stavke, ki se izvedejo ob kreiranju dockerja. V "tables" so kreiranja tabel, v "data" pa podatki.
