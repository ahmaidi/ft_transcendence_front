import p5Types from "p5"; 


export const scale = (size: number, marging: number) => {
  return size * marging / 100;
} 

export const mapRange = (
  value: number,
  fromLow: number,
  fromHigh: number,
  toLow: number,
  toHigh: number
  ) => {
  var ratio = (value - fromLow) / (fromHigh - fromLow);
  var mappedValue = ratio * (toHigh - toLow) + toLow;

  return Math.floor(mappedValue);
}


// const MovePaddle = (p5: p5Types, yLeftPaddel: number, rightPaddel: number) => {

// 	let key: number = 0
// 	if (p5.keyIsDown(87) && props.player1.yPosition > 1)
// 		key = 87
// 	if (p5.keyIsDown(83) && props.player1.yPosition < props.tableHeight - 91)
// 		key = 83
// 	// if (props.socket && key)
// 	// 	props.socket.emit('key-pressed', key)
// }