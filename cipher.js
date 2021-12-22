const { coding } = require('./coding.js');
const { decoding } = require('./decoding.js');
let fs = require('fs');
let arg = process.argv;

let data;
try {
	data = fs.readFileSync(arg[2]);
} catch (err) {
	console.log(`Reading file error: '${arg[2]}'`);
	throw err;
}

data = data.toString();
let result;
switch (arg[3]) {
	case 'coding':
		result = coding(data, Number(arg[4]));
		break;
	case 'decoding':
		result = decoding(data);
		break;
	default:
		throw new Error(`Invalid command: ${arg[3]}`);
}

fs.writeFile('CipherCaesar-output.txt', result.toString(), (err) => {
	if (err){
		throw err;
	}
	console.log('The file \'CipherCaesar-output.txt\' has been saved!');
});
