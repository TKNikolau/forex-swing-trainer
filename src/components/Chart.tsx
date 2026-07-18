import {
useEffect,
useRef,
useState
} from "react";


import {
ChartEngine
} from "../core/ChartEngine";


import {
getData
} from "../logic/dataLoader";


import {
replayController
} from "../core/ReplayController";


import {
drawingManager
} from "../drawings/DrawingManager";


import DrawingLayer from "./DrawingLayer";


import PositionLayer from "./PositionLayer";


import {
CoordinateEngine
} from "../core/CoordinateEngine";


import {
getTool
} from "../core/ToolManager";


import {
trendLineTool
} from "../drawings/TrendLineTool";


import {
positionTool
} from "../trading/PositionTool";


import type {
SymbolName,
Timeframe
} from "../types";




type Props = {

symbol: SymbolName;

timeframe: Timeframe;

};




export default function Chart({

symbol,

timeframe

}:Props){



const containerRef =
useRef<HTMLDivElement|null>(null);



const engineRef =
useRef<ChartEngine|null>(null);



const [coordinateEngine,setCoordinateEngine] =
useState<CoordinateEngine|null>(null);



const [drawings,setDrawings] =
useState(
drawingManager.getAll()
);



const [update,setUpdate] =
useState(0);





useEffect(()=>{


if(!containerRef.current)
return;



const engine =
new ChartEngine();



engine.create(
containerRef.current
);



engineRef.current =
engine;



return ()=>{


engine.remove();


};



},[]);






useEffect(()=>{


const unsubscribe =
drawingManager.subscribe(()=>{


setDrawings(
[
...drawingManager.getAll()
]
);



});



return unsubscribe;



},[]);







useEffect(()=>{


const load = async ()=>{


const data =
await getData(
symbol,
timeframe
);



const currentTime =
replayController.getCurrentTime();



replayController.load(
data,
currentTime ?? undefined
);



};



load();



const unsubscribe =
replayController.subscribe(()=>{


setUpdate(
value=>value+1
);



});



return unsubscribe;



},[
symbol,
timeframe
]);







useEffect(()=>{


const engine =
engineRef.current;



if(!engine)
return;



const chart =
engine.getChart();



const series =
engine.getSeries();



if(!chart || !series)
return;





const coordinate =
new CoordinateEngine(

chart,

series,

()=>engine.getData()

);



setCoordinateEngine(
coordinate
);





engine.subscribeClick(

param=>{


const tool =
getTool();



if(!param.point)
return;





const position =
coordinate.screenToChart(

param.point.x,

param.point.y

);



if(!position)
return;





if(
tool === "LONG" ||
tool === "SHORT"
){


positionTool.create(

tool,

symbol,

timeframe,

position.price,

position.time

);


return;


}





if(
tool !== "TRENDLINE"
)
return;





if(
!trendLineTool.hasStartPoint()
){


trendLineTool.start(
position
);


}

else{


const drawing =
trendLineTool.finish(
position
);



if(drawing){


drawingManager.add(
drawing
);


}



}



}



);



},[
update,
symbol,
timeframe
]);







useEffect(()=>{


const engine =
engineRef.current;



if(!engine)
return;



const candles =
replayController.getCandles();




engine.setData(

candles.map(candle=>({

time:candle.time as any,

open:candle.open,

high:candle.high,

low:candle.low,

close:candle.close

}))

);



},[
update,
symbol,
timeframe
]);







return (

<div

style={{

position:"relative",

width:"100%",

height:"600px"

}}

>


<div

ref={containerRef}

style={{

width:"100%",

height:"600px"

}}

/>



<DrawingLayer

drawings={drawings}

coordinateEngine={coordinateEngine}

/>



<PositionLayer

coordinateEngine={coordinateEngine}

/>



</div>

);


}