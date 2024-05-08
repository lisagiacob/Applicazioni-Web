import sqlite from 'sqlite3';

//Apriamo il database
const db = new sqlite.Database('questions.sqlite', (err) => {
	if (err) throw err;
});

//Scriviamo la query
let sql = 'SELECT * FROM answer'
db.all(sql, [], (err, rows) => {
	if (err) throw err;
	for(let row of rows) console.log(row);
});