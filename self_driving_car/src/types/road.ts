import { leap } from "../utils";


class Road {
    private readonly width: number;
    private readonly lanes: number[];

    constructor(width: number, laneCount: number = 3) {
        this.width = width;
        this.lanes = this.calculateLanePositions(laneCount);        
    }

    private calculateLanePositions(laneCount: number): number[] {
        const positions: number[] = [];
        const halfWidth = this.width / 2;

        for (let i = 1; i < laneCount; i++) {
            positions.push(leap(-halfWidth, halfWidth, i / laneCount));
        }

        return positions;
    }

    draw(ctx: CanvasRenderingContext2D) {
        const renderHeight = 10000000; // Large enough to cover visible area
        const halfWidth = this.width / 2;

        // Draw road surface

        ctx.beginPath();
        ctx.rect(-halfWidth, -renderHeight, this.width, renderHeight * 2);
        ctx.fillStyle = "#2c3e50";
        ctx.fill();

        // Draw road borders
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";
        ctx.stroke();

        // Draw lane markings
        ctx.setLineDash([20, 20]);
        this.lanes.forEach(lanePos => {
            ctx.beginPath();
            ctx.moveTo(lanePos, -renderHeight);
            ctx.lineTo(lanePos, renderHeight);
            ctx.stroke();
        });


    }
}

export default Road;