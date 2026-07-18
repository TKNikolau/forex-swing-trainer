import type {
SymbolName,
Timeframe
} from "../types";



const modules = import.meta.glob(
[
"../data/EURUSD/H1.ts",
"../data/EURUSD/H4.ts",
"../data/EURUSD/D1.ts",
"../data/EURUSD/W1.ts"
]
);



export async function getData(
symbol:SymbolName,
timeframe:Timeframe
){


const path =
`../data/${symbol}/${timeframe}.ts`;



const loader =
modules[path];



if(!loader){

console.error(
"DATA NOT FOUND:",
path
);

return [];

}



const module:any =
await loader();



return module.DATA ?? [];

}