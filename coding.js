let fs = require('fs');

module.exports.coding = function (inText, shift) {
	let alph = getAlph();
	let key = getKey(alph, shift);
	let codingText = '';
	let upperChar;
	for(let char of inText) {
		upperChar = char.toUpperCase();
		if ( Boolean(key[upperChar]) ) {
			if (char == upperChar)
				codingText += key[upperChar]
			else
				codingText += key[upperChar].toLowerCase();
		} else
			codingText += char;
	}
	return codingText;

}

function getAlph() {
	let data;
	try {
		data = fs.readFileSync('alph.txt');
	} catch (err) {
		console.log(`Reading file error: alph.txt. \nCheck the file existence!`);
		throw err;
	}
	
	data = data.toString().split('\n');
	
	let alph = new Array();
	
	for(let i = 0; i < data.length - 1; i++) {
		alph[i] = data[i][0];
	}
	return alph;

}


function getKey(alph, shift) {
	let newArr = new Array();
	for (let i = 0; i < alph.length; i++)
		newArr[ alph[i].toUpperCase() ] = alph[ (i + shift) % alph.length ].toUpperCase();
	return newArr;
}
