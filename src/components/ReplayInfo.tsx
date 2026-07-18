import {
useEffect,
useState
} from "react";

import {
replayController
} from "../core/ReplayController";



type Props = {

symbol:string;

timeframe:string;

};



export default function ReplayInfo({

symbol,

timeframe

}:Props){



const [,setUpdate] =
useState(0);





useEffect(()=>{


const unsubscribe =
replayController.subscribe(()=>{


setUpdate(
value=>value+1
);


});



return unsubscribe;



},[]);







const time =
replayController.getCurrentTime();



const index =
replayController.getCurrentIndex();



const total =
replayController.getTotal();





function formatTime(){

if(!time)
return "-";



return new Date(
time * 1000
)
.toISOString()
.slice(0,16)
.replace(
"T",
" "
);


}





return (

<div

style={{

position:"absolute",

top:"15px",

left:"15px",

zIndex:10,

background:"rgba(0,0,0,0.7)",

padding:"10px 15px",

borderRadius:"6px",

color:"white",

fontFamily:"Arial"

}}

>

<div>

<b>
{symbol}
</b>

&nbsp; |

&nbsp;

{timeframe}

</div>



<div>

{formatTime()}

</div>



<div>

Kerze:

&nbsp;

{index}

/

{total}

</div>



</div>

);


}