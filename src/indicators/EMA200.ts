export function calculateEMA(
  data:any[],
  period:number
){


  if(data.length < period)
    return [];



  const result:any[] = [];



  const multiplier =
    2 / (period + 1);



  let previousEMA =
    data
      .slice(0, period)
      .reduce(
        (sum,candle)=>
          sum + candle.close,
        0
      ) / period;



  result.push({

    time:data[period-1].time,

    value:previousEMA

  });





  for(
    let i = period;
    i < data.length;
    i++
  ){


    const ema =
      (
        data[i].close - previousEMA
      )
      *
      multiplier
      +
      previousEMA;



    result.push({

      time:data[i].time,

      value:ema

    });



    previousEMA = ema;


  }



  return result;

}