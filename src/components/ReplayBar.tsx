import { useState } from "react";

import {
  replayController
} from "../core/ReplayController";





export default function ReplayBar(){



  const [playing,setPlaying] =
    useState(false);



  const [speed,setSpeed] =
    useState(1);







  function nextCandle(){


    replayController.next();


  }







  function reset(){


    replayController.reset();


  }







  return (

    <div className="replay-bar">





      <button

        onClick={()=>{

          setPlaying(true);

        }}

      >

        ▶ Start

      </button>








      <button

        onClick={()=>{

          setPlaying(false);

        }}

      >

        ⏸ Pause

      </button>








      <button

        onClick={nextCandle}

      >

        ⏭ Nächste Kerze

      </button>








      <button

        onClick={reset}

      >

        🔄 Reset

      </button>








      <select

        value={speed}

        onChange={e=>

          setSpeed(

            Number(
              e.target.value
            )

          )

        }

      >

        <option value={1}>
          1x
        </option>


        <option value={2}>
          2x
        </option>


        <option value={5}>
          5x
        </option>


        <option value={10}>
          10x
        </option>


      </select>







      <span>

        {playing
        ?
        "läuft"
        :
        "Pause"}

      </span>





    </div>

  );

}