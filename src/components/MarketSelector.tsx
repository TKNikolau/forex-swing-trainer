import type {
  SymbolName,
  Timeframe
} from "../types";



type Props = {

  symbol:SymbolName;

  timeframe:Timeframe;

  setSymbol:(symbol:SymbolName)=>void;

  setTimeframe:(timeframe:Timeframe)=>void;

};





export default function MarketSelector({

  symbol,

  timeframe,

  setSymbol,

  setTimeframe

}:Props){



  return (

    <div

      style={{

        display:"flex",

        gap:"10px",

        padding:"10px",

        background:"#111",

      }}

    >



      <select

        value={symbol}

        onChange={(e)=>{

          setSymbol(
            e.target.value as SymbolName
          );

        }}

      >


        <option value="EURUSD">
          EURUSD
        </option>


        <option value="GBPUSD">
          GBPUSD
        </option>


        <option value="USDJPY">
          USDJPY
        </option>


        <option value="USDCHF">
          USDCHF
        </option>


        <option value="AUDUSD">
          AUDUSD
        </option>


        <option value="USDCAD">
          USDCAD
        </option>


        <option value="NZDUSD">
          NZDUSD
        </option>


        <option value="EURJPY">
          EURJPY
        </option>


        <option value="GBPCAD">
          GBPCAD
        </option>


        <option value="NZDCHF">
          NZDCHF
        </option>


        <option value="XAUUSD">
          XAUUSD
        </option>


      </select>






      <select

        value={timeframe}

        onChange={(e)=>{

          setTimeframe(
            e.target.value as Timeframe
          );

        }}

      >


        <option value="M1">
          M1
        </option>


        <option value="M5">
          M5
        </option>


        <option value="M15">
          M15
        </option>


        <option value="M30">
          M30
        </option>


        <option value="H1">
          H1
        </option>


        <option value="H4">
          H4
        </option>


        <option value="D1">
          D1
        </option>


        <option value="W1">
          W1
        </option>


      </select>



    </div>

  );

}