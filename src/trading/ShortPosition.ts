import type {
Trade
} from "./TradeTypes";



export function createShortPosition(

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



direction:"SHORT",



entry,



stopLoss,



takeProfit,



openTime:time



};



}





export function calculateShortResult(

trade:Trade,

price:number

){



const risk =

trade.stopLoss - trade.entry;



const reward =

trade.entry - price;



if(risk === 0)
return 0;



return (

reward / risk

);



}