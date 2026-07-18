import {
useEffect,
useState
} from "react";

import {
replayController
} from "../core/ReplayController";



export default function ReplayControls(){



const [playing,setPlaying] =
useState(false);



const [speed,setSpeed] =
useState(1000);



const [position,setPosition] =
useState(0);



const [total,setTotal] =
useState(0);



const [time,setTime] =
useState<number|null>(null);





useEffect(()=>{


const update = ()=>{


setPosition(
replayController.getCurrentIndex()
);



setTotal(
replayController.getTotal()
);



setPlaying(
replayController.isPlaying()
);



setTime(
replayController.getCurrentTime()
);



};



const unsubscribe =
replayController.subscribe(
update
);



update();



return unsubscribe;



},[]);







function formatTime(
value:number|null
){


if(!value)
return "-";



const date =
new Date(
value * 1000
);



return (

date.toISOString()
.slice(0,16)
.replace(
"T",
" "
)

);



}







return (

<div

style={{

display:"flex",

alignItems:"center",

gap:"10px",

padding:"10px",

background:"#111",

color:"white"

}}

>





<button

onClick={()=>{

replayController.next();

}}

>

Nächste Kerze

</button>







<button

onClick={()=>{


if(
replayController.isPlaying()
){

replayController.pause();


}
else{


replayController.play();


}



}}

>

{

playing

?

"Pause"

:

"Play"

}

</button>








<button

onClick={()=>{


replayController.randomStart();


}}

>

🎲 Random Start

</button>







<button

onClick={()=>{


replayController.reset();


}}

>

Reset

</button>







<select

value={speed}

onChange={(e)=>{


const value =
Number(
e.target.value
);



setSpeed(
value
);



replayController.setSpeed(
value
);



}}

>

<option value={2000}>
0.5x
</option>


<option value={1000}>
1x
</option>


<option value={500}>
2x
</option>


<option value={200}>
5x
</option>


<option value={100}>
10x
</option>


</select>







<span>

{position}

/

{total}

</span>







<span>

{

formatTime(
time
)

}

</span>





</div>

);


}