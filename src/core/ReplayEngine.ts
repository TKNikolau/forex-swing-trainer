import type {
  Candle
} from "../types";



export class ReplayEngine {

  private candles: Candle[] = [];

  private currentIndex = 1;

  private playing = false;

  private speed = 1;



  load(candles: Candle[]) {

    this.candles = candles;

    this.currentIndex = 1;

  }



  next() {

    if (this.currentIndex >= this.candles.length)
      return;

    this.currentIndex++;

  }



  previous() {

    if (this.currentIndex <= 1)
      return;

    this.currentIndex--;

  }



  reset() {

    this.currentIndex = 1;

  }



  getVisibleCandles() {

    return this.candles.slice(
      0,
      this.currentIndex
    );

  }



  getIndex() {

    return this.currentIndex;

  }



  isPlaying() {

    return this.playing;

  }



  play() {

    this.playing = true;

  }



  pause() {

    this.playing = false;

  }



  setSpeed(speed: number) {

    this.speed = speed;

  }



  getSpeed() {

    return this.speed;

  }

}