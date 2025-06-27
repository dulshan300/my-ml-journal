export interface Point {
    x: number;
    y: number;
}

export interface Polar {
    r: number;
    theta: number;
}

export class Vector {
    x: number;
    y: number;

    constructor(point: Point) {
        this.x = point.x;
        this.y = point.y;
    }
    add(v: Vector) {
        this.x += v.x;
        this.y += v.y;
    }
    subtract(v: Vector) {
        this.x -= v.x;
        this.y -= v.y;
    }

    static toPolar(v: Vector): Polar {
        return {
            r: Math.sqrt(v.x * v.x + v.y * v.y),
            theta: Math.atan2(v.y, v.x)
        }
    }

    static toCartesian(polar: Polar) {
        const x = polar.r * Math.cos(polar.theta);
        const y = polar.r * Math.sin(polar.theta);
        return new Vector({ x, y });

    }

}