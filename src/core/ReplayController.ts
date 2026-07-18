export type Candle = {

    time:number;

    open:number;

    high:number;

    low:number;

    close:number;

};



class ReplayController {



private data:Candle[] = [];


private visible:Candle[] = [];


private index:number = 0;


private timer:number | null = null;


private speed:number = 1000;


private playing:boolean = false;


private listeners:(()=>void)[] = [];





load(
    candles:Candle[],
    keepTime?:number
){


    this.stop();


    this.data = candles;



    if(this.data.length === 0){


        this.visible = [];

        this.index = 0;

        this.notify();

        return;


    }





    if(keepTime !== undefined){


        const found =
        this.data.findIndex(

            candle =>
            candle.time >= keepTime

        );



        this.index =
        found >= 0
        ? found
        : 0;



    }
    else{


        this.index = 0;


    }






    this.visible =
    this.data.slice(

        0,

        this.index

    );



    this.notify();


}







play(){


    if(this.playing)
        return;



    this.playing = true;


    this.notify();



    this.timer =
    window.setInterval(()=>{


        this.next();


    },this.speed);



}







pause(){


    this.stop();


}







stop(){


    this.playing = false;



    if(this.timer){


        clearInterval(
            this.timer
        );


        this.timer = null;


    }



    this.notify();


}







setSpeed(
    value:number
){


    this.speed = value;



    if(this.playing){


        this.stop();

        this.play();


    }


}







next(){



    if(
        this.index >= this.data.length
    ){


        this.stop();

        return;


    }





    this.visible.push(


        this.data[
            this.index
        ]


    );



    this.index++;



    this.notify();


}







randomStart(){



    this.stop();



    if(
        this.data.length < 200
    )
        return;





    const min = 100;


    const max =
    this.data.length - 100;





    this.index =
    Math.floor(

        Math.random()
        *
        (
            max-min
        )
        +
        min

    );





    this.visible =
    this.data.slice(

        0,

        this.index

    );





    this.notify();



}







reset(){



    this.stop();



    this.visible = [];



    this.index = 0;



    this.notify();



}







getCandles(){


    return [
        ...this.visible
    ];


}







getCurrentCandle(){


    if(
        this.index === 0
    )
        return null;



    return this.data[
        this.index - 1
    ];



}







getCurrentTime(){


    const candle =
    this.getCurrentCandle();



    if(!candle)
        return null;



    return candle.time;


}







getCurrentIndex(){


    return this.index;


}







getTotal(){


    return this.data.length;


}







getProgress(){


    if(
        this.data.length === 0
    )
        return 0;



    return (

        this.index /
        this.data.length

    ) * 100;


}







isPlaying(){


    return this.playing;


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



export const replayController =
new ReplayController();