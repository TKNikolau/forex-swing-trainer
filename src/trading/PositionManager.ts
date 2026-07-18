import type {
  Position
} from "./PositionTypes";



class PositionManager {


  private positions: Position[] = [];


  private listeners: (() => void)[] = [];



  add(position: Position) {


    console.log(
      "POSITION ADDED:",
      position
    );


    this.positions.push(
      position
    );


    this.notify();

  }




  remove(id: string) {


    this.positions =
      this.positions.filter(
        position =>
          position.id !== id
      );


    this.notify();

  }




  update(position: Position) {


    this.positions =
      this.positions.map(
        item =>
          item.id === position.id
            ?
            {
              ...position
            }
            :
            item
      );


    this.notify();

  }




  updateById(
    id: string,
    changes: Partial<Position>
  ) {


    console.log(
      "UPDATE POSITION:",
      id,
      changes
    );



    this.positions =
      this.positions.map(
        position =>
          position.id === id
            ?
            {
              ...position,
              ...changes
            }
            :
            position
      );



    console.log(
      "NEW POSITIONS:",
      this.positions
    );


    this.notify();

  }





  getById(
    id: string
  ) {


    return this.positions.find(
      position =>
        position.id === id
    );

  }





  getAll() {


    return [
      ...this.positions
    ];

  }





  subscribe(
    callback: () => void
  ) {


    this.listeners.push(
      callback
    );


    return () => {

      this.listeners =
        this.listeners.filter(
          listener =>
            listener !== callback
        );

    };

  }





  private notify() {


    this.listeners.forEach(
      callback =>
        callback()
    );

  }


}



export const positionManager =
  new PositionManager();