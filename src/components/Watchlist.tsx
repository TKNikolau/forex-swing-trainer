import type {
  SymbolName,
  Timeframe
} from "../types";





type Props = {

  symbol:SymbolName;

  setSymbol:(symbol:SymbolName)=>void;

  timeframe:Timeframe;

  setTimeframe:(timeframe:Timeframe)=>void;

};








const symbols:SymbolName[] = [

  "EURUSD",

  "GBPUSD",

  "USDJPY",

  "USDCHF",

  "AUDUSD",

  "USDCAD",

  "NZDUSD",

  "EURJPY",

  "GBPCAD",

  "NZDCHF",

  "XAUUSD"

];







const timeframes:Timeframe[] = [

  "M1",

  "M5",

  "M15",

  "M30",

  "H1",

  "H4",

  "D1",

  "W1"

];








export default function Watchlist({

  symbol,

  setSymbol,

  timeframe,

  setTimeframe

}:Props){






  return (

    <aside className="watchlist">





      <h3>

        Watchlist

      </h3>







      {

        symbols.map(item=>(


          <button

            key={item}


            onClick={()=>{

              setSymbol(item);

            }}


            style={{

              fontWeight:

              symbol === item

              ?

              "bold"

              :

              "normal"

            }}

          >

            {item}

          </button>


        ))

      }







      <hr />







      <h3>

        Timeframe

      </h3>








      {

        timeframes.map(tf=>(


          <button

            key={tf}


            onClick={()=>{

              setTimeframe(tf);

            }}



            style={{

              fontWeight:

              timeframe === tf

              ?

              "bold"

              :

              "normal"

            }}

          >

            {tf}

          </button>


        ))

      }





    </aside>

  );

}