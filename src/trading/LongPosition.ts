import type {
Trade
} from "./TradeTypes";



export function createLongPosition(

symbol:string,

timeframe:string,

entry:number,

stopLoss:number,

takeProfit:number,

time:number

):Trade {



return {



id:crypto.randomUUID(),



symbol,



timeframe,



direction:"LONG",



entry,



stopLoss,



takeProfit,



openTime:time



};



}





export function calculateLongResult(

trade:Trade,

price:number

){



const risk =

trade.entry - trade.stopLoss;



const reward =

price - trade.entry;



if(risk === 0)
return 0;



return (

reward / risk

);



}