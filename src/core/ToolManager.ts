import type {
Tool
} from "../types.ts";




let activeTool:Tool =
"NONE";



let magnetEnabled =
false;



let gridEnabled =
false;





export function setTool(
tool:Tool
){


activeTool = tool;


}







export function getTool(){


return activeTool;


}







export function clearTool(){


activeTool =
"NONE";


}







export function setMagnet(
value:boolean
){


magnetEnabled =
value;


}







export function getMagnet(){


return magnetEnabled;


}







export function setGrid(
value:boolean
){


gridEnabled =
value;


}







export function getGrid(){


return gridEnabled;


}