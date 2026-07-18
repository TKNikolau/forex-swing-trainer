import {
positionManager
} from "./PositionManager";


import type {
PositionType,
Position
} from "./PositionTypes";






class PositionTool {






create(

type:PositionType,

symbol:string,

timeframe:string,

price:number,

time:number

){



const risk =
price * 0.001;





let secondsPerCandle = 3600;



if(timeframe === "M1")
secondsPerCandle = 60;


if(timeframe === "M5")
secondsPerCandle = 300;


if(timeframe === "M15")
secondsPerCandle = 900;


if(timeframe === "M30")
secondsPerCandle = 1800;


if(timeframe === "H1")
secondsPerCandle = 3600;


if(timeframe === "H4")
secondsPerCandle = 14400;


if(timeframe === "D1")
secondsPerCandle = 86400;


if(timeframe === "W1")
secondsPerCandle = 604800;





// 50 Kerzen nach rechts
const endTime =

time +

(secondsPerCandle * 1);







let position:Position;






if(type === "LONG"){



position = {



id:
crypto.randomUUID(),



type:"LONG",



symbol,



timeframe,



entry:price,



stopLoss:
price - risk,



takeProfit:
price + risk,



openTime:time,



endTime

};



}
else{



position = {



id:
crypto.randomUUID(),



type:"SHORT",



symbol,



timeframe,



entry:price,



stopLoss:
price + risk,



takeProfit:
price - risk,



openTime:time,



endTime

};



}






positionManager.add(
position
);



return position;



}







updateEntry(

position:Position,

price:number

){



const risk =

Math.abs(

position.entry -

position.stopLoss

);




position.entry =
price;




if(position.type === "LONG"){



position.stopLoss =
price - risk;



position.takeProfit =
price + risk;



}
else{



position.stopLoss =
price + risk;



position.takeProfit =
price - risk;



}




positionManager.update(
position
);



}




}




export const positionTool =
new PositionTool();