import { polar_to_vector, vector_add, vector_subtract, vector_to_polar } from "../utils";
import { Vector, type Point } from "./primitive";

export enum CarType {
    Player,
    PC,
    AI
}

class Car {
    loc: Point;
    width: number;
    height: number;
    acceleration: number;
    maxSpeed: number;
    friction: number;
    speed: number;
    minSpeed: number;
    controls: { forward: boolean; backward: boolean; left: boolean; right: boolean; };
    angle: any;
    box: { x: number; y: number; }[];
    constructor(loc: Point, type: CarType = CarType.PC) {
        this.loc = loc;
        this.width = 30;
        this.height = 50;
        this.acceleration = 0.2;
        this.maxSpeed = 3;
        this.minSpeed = -2;
        this.angle = 0;
        this.speed = 0;
        this.friction = 0.05;
        this.controls = {
            forward: false,
            backward: false,
            left: false,
            right: false,
        }

        this.box = [];

        if (type === CarType.Player) {
            this.#addEventListeners();
        }

        if (type === CarType.PC) {
            this.controls.forward = true;
            this.maxSpeed = 1.5;
        }
    }

    #addEventListeners() {
        window.addEventListener('keydown', (e) => {
            // console.log(e.key);

            switch (e.key) {
                case 'ArrowUp':
                    this.controls.forward = true;
                    break;
                case 'ArrowDown':
                    this.controls.backward = true;

                    break;

                case 'ArrowLeft':
                    this.controls.left = true;
                    break;

                case 'ArrowRight':
                    this.controls.right = true;
                    break;
            }

        });

        window.addEventListener('keyup', (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    this.controls.forward = false;
                    break;
                case 'ArrowDown':
                    this.controls.backward = false;
                    break;

                case 'ArrowLeft':
                    this.controls.left = false;
                    break;

                case 'ArrowRight':
                    this.controls.right = false;
                    break;
            }
        })
    }

    #setBox() {

        const tl: Point = { x: this.loc.x - this.width / 2, y: this.loc.y - this.height / 2 };
        // bottom left
        const bl: Point = { x: this.loc.x - this.width / 2, y: this.loc.y + this.height / 2 };
        // bottom right
        const br: Point = { x: this.loc.x + this.width / 2, y: this.loc.y + this.height / 2 };
        // top right
        const tr: Point = { x: this.loc.x + this.width / 2, y: this.loc.y - this.height / 2 };

        const base_tl = vector_subtract(tl, this.loc);
        const base_bl = vector_subtract(bl, this.loc);
        const base_br = vector_subtract(br, this.loc);
        const base_tr = vector_subtract(tr, this.loc);

        const ptl = vector_to_polar(base_tl);
        ptl.theta -= this.angle;
        let ntl = polar_to_vector(ptl);
        ntl = vector_add(ntl, this.loc);

        const pbl = vector_to_polar(base_bl);
        pbl.theta -= this.angle;
        let nbl = polar_to_vector(pbl);
        nbl = vector_add(nbl, this.loc);

        const pbr = vector_to_polar(base_br);
        pbr.theta -= this.angle;
        let nbr = polar_to_vector(pbr);
        nbr = vector_add(nbr, this.loc);

        const ptr = vector_to_polar(base_tr);
        ptr.theta -= this.angle;
        let ntr = polar_to_vector(ptr);
        ntr = vector_add(ntr, this.loc);


        this.box = [
            // top left
            ntl,
            // bottom left
            nbl,
            // bottom right
            nbr,
            // top right
            ntr

        ];
    }

    update() {
        // console.log(this.controls);

        // forward
        if (this.controls.forward) {
            this.speed = Math.min(this.speed + this.acceleration, this.maxSpeed);
        }

        // backward
        if (this.controls.backward) {
            this.speed = Math.max(this.speed - this.acceleration, this.minSpeed);
        }

        if (this.speed != 0) {

            const flip = this.speed > 0 ? 1 : -1;

            // left
            if (this.controls.left) {
                this.angle += flip * (Math.PI / 90);
            }

            // right
            if (this.controls.right) {
                this.angle -= flip * (Math.PI / 90);
            }

        }


        // if no control fraction
        if (!this.controls.forward && !this.controls.backward) {
            this.speed = Math.sign(this.speed) * Math.max(Math.abs(this.speed) - this.friction, 0);
        }

        this.loc.x -= Math.sin(this.angle) * this.speed;
        this.loc.y -= Math.cos(this.angle) * this.speed;

        this.#setBox();

    }

    draw(ctx: CanvasRenderingContext2D) {

        ctx.beginPath();
        ctx.moveTo(this.box[0].x, this.box[0].y);
        ctx.lineTo(this.box[1].x, this.box[1].y);
        ctx.lineTo(this.box[2].x, this.box[2].y);
        ctx.lineTo(this.box[3].x, this.box[3].y);
        ctx.closePath();
        ctx.fillStyle = "red";
        ctx.fill();


    }
}

export default Car;