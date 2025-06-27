import { leap } from "../utils";


class Road {

    width: number;
    lanes: number[];
    laneWidth: number;
    laneCount: number;

    constructor(laneCount: number = 3, laneWidth: number = 60) {
        this.laneWidth = laneWidth;
        this.laneCount = laneCount;
        this.width = laneWidth * laneCount;
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


    getLaneCenter(lane: number = 1): number {

        const fisrt_lane = this.lanes[0];
        const first_lane_center = fisrt_lane - this.laneWidth / 2;

        if (Math.abs(lane) > this.laneCount) {
            lane = this.laneCount;
        }

        return first_lane_center + ((lane - 1) * this.laneWidth);
    }

    getRandomLaneCenter(): number {

        const fisrt_lane = this.lanes[0];
        const first_lane_center = fisrt_lane - this.laneWidth / 2;

        const lane = Math.floor(Math.random() * this.laneCount) + 1;

        return first_lane_center + ((lane - 1) * this.laneWidth);
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