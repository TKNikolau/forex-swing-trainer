export type GapResult = {

  time: string;

  type: "GAP_UP" | "GAP_DOWN" | "NO_GAP";

};





export function detectNoGapCandles(
  data:any[]
):GapResult[] {


  const result:GapResult[] = [];



  for(
    let i = 1;
    i < data.length;
    i++
  ){


    const previous =
      data[i-1];


    const current =
      data[i];





    if(
      current.low >
      previous.high
    ){

      result.push({

        time:current.time,

        type:"GAP_UP"

      });

    }






    else if(
      current.high <
      previous.low
    ){

      result.push({

        time:current.time,

        type:"GAP_DOWN"

      });

    }






    else {


      result.push({

        time:current.time,

        type:"NO_GAP"

      });


    }


  }



  return result;

}