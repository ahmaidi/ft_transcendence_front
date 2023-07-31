import { Socket, io } from "socket.io-client";
import Ball from "./PongBall";
import Paddel from "./PongPaddel";
import Ui from "./PongUi";
import p5Types from "p5"; 
import { drowNet, drowScore,  keyDown, keyDown_pad, keyDown_test } from "./PongTable-func";
import { Position,
          paddelPair, 
          scorePair,
          size } from "./PongTypes";
import isEqual from 'lodash/isEqual';

const FPS = 60;
const BG_COLOR = '#121212';
const TABLE_RADIUS = 10;


const TABLE_WIDGTH = 100;
const PADDEL_MARGING = 1.5;

const PADDEL_SPEED = 1.5;

const DEBUG: boolean = false;

export default class MainCanvas {

  private size: size;
  private p5?: p5Types;
  private ball?: Ball;
  private paddel?: Paddel;
  private ui?: Ui;
  private score: scorePair;
  private ballPosition: Position;
  private paddelPosition: paddelPair;
  private socket: Socket;
  private bColor: string;
  private updates: {bp: Position,
                    pp:paddelPair,
                    score: scorePair,
                    size:size
                    windowReSized:size
                    zoom: number,
                  };
  constructor( back_end: string) {
    this.socket = io(back_end);
    this.socketHandler();
    this.score = {tp: '', op: ''};
    this.size = { w: 0, h: 0 };
    this.bColor = 'green';
    // this.ballPosition = {x: TABLE_WIDGTH - PADDEL_MARGING, y: 0};
    // this.paddelPosition = {rp: 4.8, lp: 0};
    const pos = 50;
    this.ballPosition = {x: 50, y: 50};
    this.paddelPosition = {rp: 50, lp: 50};
    this.updates = {
      bp: {x: 0, y: 0},
      pp: {rp: 0, lp: 0},
      score: {tp: '', op: ''},
      size: {w: 0, h: 0},
      windowReSized: {w: window.innerWidth, h: window.innerHeight},
      zoom: window.devicePixelRatio,
    }
  }

  init(p5: p5Types, canvasRef: Element) {
    this.p5 = p5;
    this.ball = new Ball(p5);
    this.paddel = new Paddel(p5);
    if (!DEBUG) {
      this.ui = new Ui(p5, canvasRef, this.size, this.socket);
    }
    this.resize();
    p5.createCanvas(this.size.w, this.size.h).parent(canvasRef);
    p5.frameRate(FPS);
  }

  update() {
    if (!DEBUG)
      keyDown(this.socket, this.paddelPosition.rp, this.p5);
    else
    {
      keyDown_pad(this.socket, this.paddelPosition.rp, this.p5);
      if (this.ball) {
        const arrow = keyDown_test(this.p5);
        if (arrow) {
          if (arrow === 1 && this.ballPosition.y < 100) {
            this.ballPosition.y += .5
          }
          if (this.ballPosition.y > 100)
            this.ballPosition.y = 100
            if (arrow === 2 && this.ballPosition.y > 0) {
              this.ballPosition.y -= .5
            }
            if (this.ballPosition.y < 0)
              this.ballPosition.y = 0
        }
      }
    }
    if (!this.cheakForUpdates()) return;
    // if (this.ball)
    //   this.ball.color = this.bColor
    this.p5?.background(BG_COLOR);
    drowNet(this.size, this.p5);
    this.ball?.update(this.ballPosition, this.size.h);
    this.paddel?.update(this.paddelPosition, this.size.h);
    drowScore(this.score, this.size, this.p5);
    // console.log('Pong');
  }
  
  cheakForUpdates() {
    let res: boolean = false;
    if (this.updates.zoom !== window.devicePixelRatio) {
      this.updates.zoom = window.devicePixelRatio;
      this.resize();
      res = true;
    }
    if (!isEqual(this.updates.pp, this.paddelPosition)) {
      Object.assign(this.updates.pp, this.paddelPosition);
      res = true;
    }
    if (!isEqual(this.updates.bp, this.ballPosition)) {
      Object.assign(this.updates.bp, this.ballPosition);
      res = true;
    }
    if (!isEqual(this.updates.score, this.score)) {
      Object.assign(this.updates.score, this.score);
      res = true;
    }
    if (!isEqual(this.updates.size, this.size)) {
      Object.assign(this.updates.size, this.size);
      res = true;
    }
    if (!isEqual(this.updates.windowReSized, {w: window.innerWidth, h: window.innerHeight})) {
      this.resize();
      Object.assign(this.updates.windowReSized, {w: window.innerWidth, h: window.innerHeight});
      res = true;
    }
    return res;
  }

  // TODO: zoom is not handeled
  resize() {
    const  size = Math.min(window.innerHeight, window.innerWidth);
    this.size = {w: size , h: size / 2}
    this.p5?.resizeCanvas(this.size.w, this.size.h);
    this.ball?.resize( this.size.w );
    this.paddel?.resize( {x: this.size.w / 2, y: this.size.h / 2},
                        this.size.w );
    if (!DEBUG)                    
      this.ui?.resize(this.size);
  }

  socketHandler() {

    this.socket.on('next-frame', (data) => {
      this.ballPosition.x = data.x;
      this.ballPosition.y = data.y;
    });
    // this.socket.on('next-frame', (data, color) => {
    //   this.ballPosition.x = data.x;
    //   this.ballPosition.y = data.y;
    //   // if (this.ball)
    //   //   this.ball.color = color;

    // });
    
    // TORM: Debug
    this.socket.on('start-game', (data) => {
      // console.log('game started.');
      this.score.op = data.p1 + ': ';
      this.score.tp = data.p2 + ': ';
    });

    this.socket.on('new-score', (data) => {
      // console.log('game started.');
      this.score.op = data.other;
      this.score.tp = data.this;
    });
    
    this.socket.on('my-position', (data) => {
      this.paddelPosition.rp = data;
      // console.log('data: ', data);
    });
    
    this.socket.on('player-position', (data) => {
      // console.log('data: ', data);
      this.paddelPosition.lp = data;
    });

    this.socket.on('end-game-player-quit', _=> {
      console.log('you win');
    });
  }

}