export type TradeDirection =

    | "LONG"

    | "SHORT";





export interface Trade {



    id:string;



    symbol:string;



    timeframe:string;



    direction:TradeDirection;



    entry:number;



    stopLoss:number;



    takeProfit:number;



    openTime:number;



    closeTime?:number;



    result?:number;



}