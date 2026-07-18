import {
  useState
} from "react";


import Chart from "./components/Chart";


import ReplayControls from "./components/ReplayControls";


import MarketSelector from "./components/MarketSelector";


import Toolbar from "./components/Toolbar";


import type {
  SymbolName,
  Timeframe
} from "./types";





export default function App(){



  const [symbol,setSymbol] =
    useState<SymbolName>("EURUSD");



  const [timeframe,setTimeframe] =
    useState<Timeframe>("H4");





  return (

    <div>


      <Toolbar />



      <MarketSelector

        symbol={symbol}

        timeframe={timeframe}

        setSymbol={setSymbol}

        setTimeframe={setTimeframe}

      />



      <Chart

        symbol={symbol}

        timeframe={timeframe}

      />



      <ReplayControls />


    </div>

  );


}