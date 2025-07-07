import './style.scss';
import Car, { CarType } from './types/car';
import { Vector } from './types/primitive';
import Road from './types/road';


const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;

const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;


const resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

// add a Vector class


const init = () => {
  resizeCanvas();
  // move the origin to the center of the canvas
  ctx.translate(canvas.width / 2, canvas.height / 2);
};

window.addEventListener('resize', init);

init();


const road = new Road(3);

// creaing car object
const car = new Car({ x: road.getLaneCenter(2), y: 0 }, CarType.Player);

const car2 = new Car({ x: road.getRandomLaneCenter(), y: 0 }, CarType.PC);





const draw = () => {
  // Clear the canvas in the translated coordinate system

  ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset to default transform
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  // Apply camera transformation to follow the car
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2 - car.loc.y);

  // Draw road
  road.draw(ctx);


  car2.update();
  car2.draw(ctx);

  // Main car drawing
  car.update();
  car.draw(ctx);

  ctx.restore();

  requestAnimationFrame(draw);
};

draw();
