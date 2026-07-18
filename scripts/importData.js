import fs from "fs";



const inputFile = process.argv[2];

const outputFile = process.argv[3];



if(!inputFile || !outputFile){

console.log(
"Benutzung: node scripts/importData.js input.csv output.ts"
);

process.exit();

}





const text =
fs.readFileSync(

inputFile,

"utf8"

);





const lines =
text
.trim()
.split("\n");





const candles = [];





for(const line of lines){



const parts =
line
.trim()
.split(/\s+/);





if(parts.length < 6)
continue;





const date =
parts[0];



const time =
parts[1];





const timestamp =
Math.floor(

new Date(
`${date}T${time}:00`
).getTime()

/1000

);





if(isNaN(timestamp))
continue;






candles.push({

time: timestamp,

open: Number(parts[2]),

high: Number(parts[3]),

low: Number(parts[4]),

close: Number(parts[5])

});



}






const output =

`export const DATA = ${JSON.stringify(
candles,
null,
2
)};`;






fs.writeFileSync(

outputFile,

output

);



console.log(

"Import fertig:",

outputFile,

"Kerzen:",

candles.length

);