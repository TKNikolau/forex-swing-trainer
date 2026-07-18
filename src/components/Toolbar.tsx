import { useState } from "react";

import {
setTool,
setMagnet,
setGrid
} from "../core/ToolManager";

import type {
Tool
} from "../types.ts";



export default function Toolbar(){



const [activeTool,setActiveTool] =
useState<Tool>("NONE");



const [magnet,setMagnetState] =
useState(false);



const [grid,setGridState] =
useState(false);





function selectTool(
tool:Tool
){

setActiveTool(tool);

setTool(tool);

}





function toggleMagnet(){

const value =
!magnet;


setMagnetState(value);

setMagnet(value);

}





function toggleGrid(){

const value =
!grid;


setGridState(value);

setGrid(value);

}





return (

<aside className="toolbar">


<h3>
Tools
</h3>



<p>
Aktiv:
{" "}
{activeTool}
</p>





<button
onClick={()=>
selectTool("NONE")
}
>
🖱 Auswahl
</button>





<hr />





<button
onClick={()=>
selectTool("LONG")
}
>
📈 Long Position
</button>





<button
onClick={()=>
selectTool("SHORT")
}
>
📉 Short Position
</button>





<hr />





<button
onClick={()=>
selectTool("TRENDLINE")
}
>
〰 Trendlinie
</button>





<button
onClick={()=>
selectTool("RECTANGLE")
}
>
▭ Rechteck
</button>





<button
onClick={()=>
selectTool("PATH")
}
>
〰 Pfad
</button>





<button
onClick={()=>
selectTool("HEAD_SHOULDERS")
}
>
Head & Shoulders
</button>





<hr />





<button
onClick={toggleMagnet}
>

🧲 Magnet:
{" "}
{magnet ? "AN" : "AUS"}

</button>





<button
onClick={toggleGrid}
>

Raster:
{" "}
{grid ? "AN" : "AUS"}

</button>



</aside>

);

}