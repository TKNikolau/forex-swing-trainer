import type {
  Drawing
} from "../types.ts";



import {
  save,
  load
} from "../core/Storage";





class DrawingManager {



  private drawings:Drawing[] = [];



  private listeners:
    (()=>void)[] = [];





  constructor(){


    this.drawings =
      load<Drawing[]>(
        "drawings",
        []
      );


  }








  add(
    drawing:Drawing
  ){
    console.log(
  "DRAWING ADDED",
  drawing
);


    this.drawings.push(
      drawing
    );


    this.save();


    this.notify();


  }








  remove(
    id:string
  ){


    this.drawings =
      this.drawings.filter(
        drawing =>
          drawing.id !== id
      );


    this.save();


    this.notify();


  }








  getAll(){


    return this.drawings;


  }








  clear(){


    this.drawings=[];


    this.save();


    this.notify();


  }








  subscribe(
    callback:()=>void
  ){


    this.listeners.push(
      callback
    );


  }








  private save(){


    save(
      "drawings",
      this.drawings
    );


  }








  private notify(){


    this.listeners.forEach(
      fn=>fn()
    );


  }



}





export const drawingManager =
  new DrawingManager();