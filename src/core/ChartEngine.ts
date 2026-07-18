import {
createChart,
CandlestickSeries,
type IChartApi,
type ISeriesApi,
type MouseEventParams,
type Time
} from "lightweight-charts";



export class ChartEngine {



private chart:
IChartApi | null = null;



private candleSeries:
ISeriesApi<"Candlestick"> | null = null;



private candleData:any[] = [];





create(

container:HTMLDivElement

){



this.chart =

createChart(

container,

{


layout:{


background:{

color:"#131722"

},


textColor:"#d1d4dc"


},




grid:{


vertLines:{

visible:false

},


horzLines:{

visible:false

}


},




crosshair:{


mode:0


},




rightPriceScale:{


borderVisible:false,


scaleMargins:{


top:0.1,


bottom:0.1


}



},





timeScale:{


borderVisible:false,


timeVisible:true,


secondsVisible:false,


barSpacing:10,


minBarSpacing:3


},




localization:{


timeFormatter:(time:number)=>{


const date =
new Date(time * 1000);



return (

date.toISOString()
.slice(0,16)
.replace("T"," ")

);


}



}


}


);







this.candleSeries =


this.chart.addSeries(


CandlestickSeries,


{


upColor:"#26a69a",


downColor:"#ef5350",


borderVisible:false,


wickUpColor:"#26a69a",


wickDownColor:"#ef5350",




priceFormat:{


type:"price",


precision:5,


minMove:0.00001


}



}


);





return this.chart;


}







setData(

data:any[]

){



if(!this.candleSeries)

return;





this.candleData =

data;





this.candleSeries.setData(

data

);





}





getData(){


return this.candleData;


}





getChart(){


return this.chart;


}





getSeries(){


return this.candleSeries;


}





subscribeClick(

callback:(param:MouseEventParams<Time>)=>void

){



if(!this.chart)

return;




this.chart.subscribeClick(

callback

);



}





remove(){



if(this.chart){



this.chart.remove();



this.chart=null;



}



}



}