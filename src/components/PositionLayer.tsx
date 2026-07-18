import {
useEffect,
useState
} from "react";


import {
positionManager
} from "../trading/PositionManager";


import type {
Position
} from "../trading/PositionTypes";


import type {
CoordinateEngine
} from "../core/CoordinateEngine";



type Props = {

coordinateEngine: CoordinateEngine | null;

};



type DragState = {

id:string;

type:"SL"|"TP";

};





export default function PositionLayer({

coordinateEngine

}:Props){



const [positions,setPositions] =
useState<Position[]>([]);



const [drag,setDrag] =
useState<DragState|null>(null);



const [,forceUpdate] =
useState(0);






function refresh(){


setPositions(

positionManager.getAll()

);



forceUpdate(
value=>value+1
);



}







useEffect(()=>{


const unsubscribe =
positionManager.subscribe(
refresh
);



refresh();



return unsubscribe;



},[]);







useEffect(()=>{


if(!coordinateEngine)

return;



const chart =
(coordinateEngine as any).chart;



if(!chart)

return;



const update = ()=>{


forceUpdate(
value=>value+1
);


};



chart.timeScale()
.subscribeVisibleLogicalRangeChange(
update
);



return ()=>{


chart.timeScale()
.unsubscribeVisibleLogicalRangeChange(
update
);



};



},[
coordinateEngine
]);








useEffect(()=>{


if(!drag || !coordinateEngine)

return;



const move = (
event:MouseEvent
)=>{



const canvas =
document.querySelector("canvas");



if(!canvas)

return;



const rect =
canvas.getBoundingClientRect();



const y =
event.clientY -
rect.top;



const price =
coordinateEngine.screenYToPrice(
y
);



if(price===null)

return;




if(drag.type==="SL"){


positionManager.updateById(

drag.id,

{

stopLoss:price

}

);



}



if(drag.type==="TP"){


positionManager.updateById(

drag.id,

{

takeProfit:price

}

);



}



};



const stop = ()=>{


setDrag(null);


};




window.addEventListener(
"mousemove",
move
);



window.addEventListener(
"mouseup",
stop
);



return ()=>{


window.removeEventListener(
"mousemove",
move
);



window.removeEventListener(
"mouseup",
stop
);



};



},[
drag,
coordinateEngine
]);








if(!coordinateEngine)

return null;





return (

<div

style={{

position:"absolute",

inset:0,

pointerEvents:"none",

zIndex:20

}}

>



{

positions.map(position=>{



const chart =
(coordinateEngine as any).chart;



const series =
(coordinateEngine as any).series;



if(!chart || !series)

return null;





const x1 =
chart.timeScale()
.timeToCoordinate(
position.openTime as any
);



const x2 =
chart.timeScale()
.timeToCoordinate(
position.endTime as any
);





const yEntry =
series.priceToCoordinate(
position.entry
);



const ySL =
series.priceToCoordinate(
position.stopLoss
);



const yTP =
series.priceToCoordinate(
position.takeProfit
);





if(

x1===null ||

x2===null ||

yEntry===null ||

ySL===null ||

yTP===null

)

return null;





const left =
Math.min(
x1,
x2
);



const width =
Math.abs(
x2-x1
);






const risk =
Math.abs(
position.entry -
position.stopLoss
);



const reward =
Math.abs(
position.takeProfit -
position.entry
);



const rr =
risk===0
?
0
:
reward/risk;







return (

<div

key={position.id}

>





<div

style={{

position:"absolute",

left,

top:Math.min(
yEntry,
yTP
),

width,

height:Math.abs(
yEntry-yTP
),

background:"rgba(0,200,0,0.15)",

pointerEvents:"none"

}}

/>






<div

style={{

position:"absolute",

left,

top:Math.min(
yEntry,
ySL
),

width,

height:Math.abs(
yEntry-ySL
),

background:"rgba(255,0,0,0.15)",

pointerEvents:"none"

}}

/>






<div

onMouseDown={()=>setDrag({

id:position.id,

type:"TP"

})}

style={{

position:"absolute",

left,

top:yTP,

width,

height:6,

background:"lime",

cursor:"ns-resize",

pointerEvents:"auto"

}}

/>






<div

onMouseDown={()=>setDrag({

id:position.id,

type:"SL"

})}

style={{

position:"absolute",

left,

top:ySL,

width,

height:6,

background:"red",

cursor:"ns-resize",

pointerEvents:"auto"

}}

/>






<div

style={{

position:"absolute",

left,

top:yEntry,

width,

height:2,

background:"white"

}}

/>






<div

style={{

position:"absolute",

left:left+5,

top:yEntry-35,

background:"rgba(0,0,0,0.7)",

color:"white",

padding:"5px",

fontSize:"12px"

}}

>

{position.type}

<br/>

CRV 1:{rr.toFixed(2)}

</div>






</div>

);



})

}



</div>

);



}