/* Strange JS behaviors and where to find (some of) them */
'use strict';

const type = typeof NaN;
console.log('NaN is a ' + type); // <number>
console.log(`NaN === NaN? ${NaN === NaN}\n`); // <true -> FALSE - NaN non è uguale ne a sè stesso ne a null'altro>

console.log(`NaN == NaN? ${NaN == NaN}`); // <true -> FALSE - NaN non è uguale ne a sè stesso ne a null'altro>
console.log(`null == undefined? ${null == undefined}\n`); // <false -> TRUE - sono entrambi oggetti nullish>

console.log(`null == false? ${null == false}`); // <true -> FALSE - con la conversione diventa null == 0>
console.log(`'' == false? ${'' == false}`); // <true>
console.log(`3 == true? ${3 == true}`); // <true -> FALSE - quando c'è una conversione il boolean diventa un numero>
console.log(`0 == -0? ${0 == -0}\n`); // <true>

console.log(`true + true = ${true + true}`); // <true -> 2 - i boolean vengono convertiti in numeri>
console.log(`true !== 1? ${true !== 1}\n`); // <true - l'eguaglianza stretta NON fa conversioni>

console.log(`5 + '10' = ${5 + '10'}`); // <510>
console.log(`'5' - 1 = ${'5' - 1}\n`); // <4>

console.log(`1 < 2 < 3? ${1 < 2 < 3}`); // <true>
console.log(`3 > 2 > 1? ${3 > 2 > 1}\n`); // <true -> FALSE - 3 > 2 restituisce true, ossia 1, che non è > 1>

console.log(`0.2 + 0.1 === 0.3? ${0.2 + 0.1 === 0.3}\n`); // <FALSE - conversione dei floating point, non si ottiene quasi mai il valore esatto>

console.log('b' + 'a' + (+ 'a') + 'a'); // <baNaNa - (+a) è un operatore unario, che non può essere applicato a una stringa -> NaN>