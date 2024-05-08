//"use strict" di default co i moduli ES
//const dayjs = require("dayjs"); //import dayjs
import dayjs from 'dayjs'; //per farlo funzionare ho dovuto mettere estensione mjs al file

let oggi = dayjs();
console.log(oggi.format('YY'));