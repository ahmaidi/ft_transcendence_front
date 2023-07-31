import React from "react";
import Sketch from "react-p5";
import p5Types from "p5"; 
import MainCanvas from "./PongTable";

const BACK_END = 'ws://10.11.43.6:4444/game'
// const BACK_END = 'ws://localhost:4000/game'

export const Pong: React.FC = () => {

  const mainPong:MainCanvas = new MainCanvas(BACK_END);

  const setup = (p5: p5Types, canvasParentRef: Element) =>
    mainPong.init(p5, canvasParentRef);

  const draw = () => mainPong.update();
    
  return <Sketch setup={setup} draw={draw} />;
}
