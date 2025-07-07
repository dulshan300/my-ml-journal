import type { Point, Polar } from "./types/primitive";

export const lerp = (a: number, b: number, t: number) => {
    return a + (b - a) * t;
}

export const vector_add = (a: Point, b: Point): Point => {
    return {
        x: a.x + b.x,
        y: a.y + b.y
    }
}
export const vector_subtract = (a: Point, b: Point): Point => {
    return {
        x: a.x - b.x,
        y: a.y - b.y
    }
}

export const vector_to_polar = (loc: Point): Polar => {
    return {
        r: Math.sqrt(loc.x * loc.x + loc.y * loc.y),
        theta: Math.atan2(loc.y, loc.x)
    }
}

export const polar_to_vector = (p: Polar): Point => {
    return {
        x: p.r * Math.cos(p.theta),
        y: p.r * Math.sin(p.theta)
    }
}


export const getIntersection = (A: Point, B: Point, C: Point, D: Point) => {
    const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
    const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
    const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

    if (bottom != 0) {
        const t = tTop / bottom;
        const u = uTop / bottom;
        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            return {
                x: lerp(A.x, B.x, t),
                y: lerp(A.y, B.y, t),
                offset: t
            }
        }
    }

    return null;
}