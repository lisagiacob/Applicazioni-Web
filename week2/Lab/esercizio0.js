"use strict"

const names = ["maia", "giulia", "antonietta", "fabrizia"];
console.log(names);
function provaNode(){
	names.forEach(function(name){
		let word = "";
		if(name.length >= 2){
			word = name.substring(0,2) + name.substring(name.length-2); //substring vede i numeri negativi come 0
		}
		console.log(word);
	});
}
provaNode();