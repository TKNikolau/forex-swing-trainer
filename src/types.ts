export type SymbolName =
  | "EURUSD"
  | "GBPUSD"
  | "USDJPY"
  | "USDCHF"
  | "AUDUSD"
  | "USDCAD"
  | "NZDUSD"
  | "EURJPY"
  | "GBPCAD"
  | "NZDCHF"
  | "XAUUSD";



export type Timeframe =
  | "M1"
  | "M5"
  | "M15"
  | "M30"
  | "H1"
  | "H4"
  | "D1"
  | "W1";

export interface Candle {

time:number;

open:number;

high:number;

low:number;

close:number;

}
export type Tool =

| "NONE"

| "SELECT"

| "TRENDLINE"

| "LONG"

| "SHORT"

| "RECTANGLE"

| "PATH"

| "HEAD_SHOULDERS";

export type DrawingType =

  | "TRENDLINE"

  | "RECTANGLE"

  | "PATH"

  | "HEAD_SHOULDERS";






export interface ChartPoint {


  time:number;


  price:number;


}







export interface Drawing {


  id:string;


  type:DrawingType;


  points:ChartPoint[];


  color:string;


}
