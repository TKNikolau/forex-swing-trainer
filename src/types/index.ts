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

  time: number;

  open: number;

  high: number;

  low: number;

  close: number;

}



export interface ReplayState {

  symbol: SymbolName;

  timeframe: Timeframe;

  candleIndex: number;

  playing: boolean;

  speed: number;

}
export type Tool =


  | "NONE"


  | "TRENDLINE"


  | "RECTANGLE"


  | "PATH"


  | "HEAD_SHOULDERS"


  | "LONG"


  | "SHORT";