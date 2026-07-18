import type {
IChartApi,
ISeriesApi
} from "lightweight-charts";




export class CoordinateEngine {




private chart:IChartApi;




private series:
ISeriesApi<"Candlestick">;




private getData:
()=>any[];






constructor(

chart:IChartApi,

series:ISeriesApi<"Candlestick">,

getData:()=>any[]

){



this.chart = chart;



this.series = series;



this.getData = getData;



}








screenToChart(

x:number,

y:number

){



const logical =

this.chart

.timeScale()

.coordinateToLogical(x);





const price =

this.series

.coordinateToPrice(y);





const data =

this.getData();





if(

logical === null ||

price === null

)

return null;





const index =

Math.round(logical);





const candle =

data[index];





if(!candle)

return null;





return {

time:Number(
candle.time
),

price

};



}








chartToScreen(

time:number,

price:number

){



const x =

this.chart

.timeScale()

.timeToCoordinate(

time as any

);





const y =

this.series

.priceToCoordinate(

price

);





if(

x===null ||

y===null

)

return null;





return {

x,

y

};



}








priceToScreenY(

price:number

){



return this.series

.priceToCoordinate(

price

);



}








screenYToPrice(

y:number

){



return this.series

.coordinateToPrice(

y

);



}








timeToScreenX(

time:number

){



return this.chart

.timeScale()

.timeToCoordinate(

time as any

);



}




}