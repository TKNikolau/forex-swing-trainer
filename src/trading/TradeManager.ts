import type {
Trade
} from "./TradeTypes";



class TradeManager {



private trades:Trade[] = [];



private listeners:(()=>void)[] = [];





add(
trade:Trade
){


this.trades.push(
trade
);


this.notify();


}







remove(
id:string
){


this.trades =

this.trades.filter(

trade =>

trade.id !== id

);


this.notify();


}







getAll(){


return [
...this.trades
];


}







getActive(){


return this.trades.filter(

trade =>

!trade.closeTime

);


}







clear(){


this.trades = [];


this.notify();


}







subscribe(
callback:()=>void
){


this.listeners.push(
callback
);



return ()=>{


this.listeners =

this.listeners.filter(

listener =>

listener !== callback

);


};


}







private notify(){


this.listeners.forEach(

callback =>

callback()

);


}


}



export const tradeManager =
new TradeManager();