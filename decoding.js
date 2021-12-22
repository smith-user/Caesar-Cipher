let fs = require('fs');

module.exports.decoding = function (inText) {
	
	let cannonFreq = getCanonFreq();
	let factFreq = getFactFreq();
	// Массив alphArr[index] = letter
	let alphArr = new Array(cannonFreq.length);
	let i = 0;
	for (let char in cannonFreq)
		alphArr[i++] = char;
		
	let shift = searchShift();
	let key = getKey(alphArr, shift);
	
	let decodingText = "";
	
	for(let char of inText) {
		upperChar = char.toUpperCase();
		if ( Boolean(key[upperChar]) ) {
			if (char == upperChar)
				decodingText += key[upperChar]
			else
				decodingText += key[upperChar].toLowerCase();
		} else
			decodingText += char;
	}
	return decodingText;


	function searchShift() {
		let minDiff = Number.MAX_VALUE;
		let shiftResult;
		let diff;
		for(let shift = 0; shift < alphArr.length; shift++) {
			diff = 0; // Квадратичный функционал разнообразия
			for (let i = 0; i < alphArr.length  && diff < minDiff; i++)
				diff += Math.pow( cannonFreq[ alphArr[i] ] - factFreq[ alphArr[(i + shift) % alphArr.length] ], 2);
			if (diff < minDiff) {
				minDiff = diff;
				shiftResult = shift;
			}
		}
		return shiftResult;
	}

	function getFactFreq() {
		let alph = new Array(cannonFreq.length);
		let upperChar;
		for (let letter in cannonFreq)
			alph[letter] = 0;
			
		let count = 0;
		for (let char of inText)
			if ( alph[ char.toUpperCase() ] != undefined ) {
				alph[ char.toUpperCase() ]++;
				count++;
			}
		for (let letter in alph)
			alph[letter] /= count;
		return alph;
	}
}

function getCanonFreq() {
	let data;
	try {
		data = fs.readFileSync('alph.txt');
	} catch (err) {
		console.log(`Reading file error: alph.txt. \nCheck the file existence!`);
		throw err;
	}
	data = data.toString().split(/\s+/);
	
	let alph = new Array();
	for(let i = 0; i < data.length - 1; i += 2)
		alph[ data[i].toUpperCase() ] = Number(data[i + 1]);
	return alph;
}

function getKey(alph, shift) {
	let newArr = new Array();
	for (let i = 0; i < alph.length; i++)
		newArr[ alph[i].toUpperCase() ] = alph[ (i - shift + alph.length) % alph.length ].toUpperCase();
	return newArr;
}
