import {
  useEffect,
  useState
} from "react";


import type {
  Drawing
} from "../types";


import type {
  CoordinateEngine
} from "../core/CoordinateEngine";





type Props = {

  drawings:Drawing[];

  coordinateEngine:
    CoordinateEngine | null;

};







export default function DrawingLayer({

  drawings,

  coordinateEngine

}:Props){



  const [lines,setLines] =
    useState<any[]>([]);






  useEffect(()=>{


    const result:any[]=[];





    drawings.forEach(drawing=>{



      if(
        drawing.type === "TRENDLINE"
      ){



        const first =
          drawing.points[0];



        const second =
          drawing.points[1];





        const p1 =
          coordinateEngine
          ?.chartToScreen(

            first.time,

            first.price

          );





        const p2 =
          coordinateEngine
          ?.chartToScreen(

            second.time,

            second.price

          );





        if(
          p1 && p2
        ){

          result.push({

            id:drawing.id,

            x1:p1.x,

            y1:p1.y,

            x2:p2.x,

            y2:p2.y,

            color:drawing.color

          });


        }


      }


    });




    setLines(result);



  },[
    drawings,
    coordinateEngine
  ]);








  return (

    <svg

      style={{

        position:"absolute",

        top:0,

        left:0,

        pointerEvents:"none"

      }}

      width="100%"

      height="100%"

    >




      {

        lines.map(line=>(


          <line

            key={line.id}

            x1={line.x1}

            y1={line.y1}

            x2={line.x2}

            y2={line.y2}

            stroke={line.color}

            strokeWidth={2}

          />


        ))

      }



    </svg>

  );

}