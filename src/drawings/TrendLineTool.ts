import type {
  ChartPoint
} from "../types.ts";



export class TrendLineTool {



  private firstPoint:
    ChartPoint | null = null;





  start(
    point:ChartPoint
  ){

    this.firstPoint = point;

  }







  finish(
    point:ChartPoint
  ){



    if(!this.firstPoint)
      return null;





    const drawing = {


      id:
        crypto.randomUUID(),


      type:
        "TRENDLINE" as const,


      points:[

        this.firstPoint,

        point

      ],


      color:
        "#ffffff"


    };





    this.firstPoint = null;



    return drawing;


  }






  cancel(){


    this.firstPoint = null;


  }






  hasStartPoint(){


    return this.firstPoint !== null;


  }

}
export const trendLineTool =
  new TrendLineTool();