import fs from "fs";



const input =
process.argv[2];



if(!input){

console.log(
"Benutzung: node scripts/createTimeframes.js SYMBOL"
);

process.exit();

}



const basePath =
`src/data/${input}/M30.ts`;



const file =
fs.readFileSync(
basePath,
"utf8"
);



const data =
JSON.parse(

file
.replace(
"export const DATA = ",
""
)
.replace(
";",
""
)

);





function createTF(

candles,

minutes

){



const result=[];



const size =
minutes / 30;



for(
let i=0;
i<candles.length;
i+=size
){


const group =
candles.slice(
i,
i+size
);



if(group.length !== size)
continue;




result.push({

time:
group[0].time,


open:
group[0].open,


high:
Math.max(
...group.map(c=>c.high)
),


low:
Math.min(
...group.map(c=>c.low)
),


close:
group[group.length-1].close


});


}



return result;

}





const timeframes = {


H1:60,

H4:240,

D1:1440,

W1:10080


};





for(const tf in timeframes){


const result =
createTF(

data,

timeframes[tf]

);




const output =
`export const DATA = ${JSON.stringify(
result,
null,
2
)};`;




fs.writeFileSync(

`src/data/${input}/${tf}.ts`,

output

);



console.log(
tf,
result.length,
"Kerzen erstellt"
);


}