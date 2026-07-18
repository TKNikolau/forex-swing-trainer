export type PositionType =

| "LONG"

| "SHORT";





export interface Position {



id:string;



type:PositionType;



symbol:string;



timeframe:string;



entry:number;



stopLoss:number;



takeProfit:number;



openTime:number;



endTime:number;



}