// shape is [4,2] mean 4 rows and 2 columns.
// here 8 num of array convert into 4 rows and 2 columns shape tensor.
// tf.tensor (values, shape?, dtype?) 


/*
y = ax^2 + bx + c

✅ learning rate is 0.2
✅ loss function
✅ optimizer
✅ minimize function
✅ training function
✅ predict function

*/

const x_vals = [];
const y_vals = [];


let a, b, c;

const learningRate = 0.03;


const optimizer = tf.train.adam(learningRate);

function setup() {
    createCanvas(400, 400);
    background(0);

    // y = ax^2 + bx + c
    a = tf.variable(tf.scalar(random([-1, 1])).variable());
    b = tf.variable(tf.scalar(random([-1, 1])).variable());
    c = tf.variable(tf.scalar(random([-1, 1])).variable());


}


function draw() {

    background(0);

    stroke('white');
    strokeWeight(10);
    for (let i = 0; i < x_vals.length; i++) {
        const px = map(x_vals[i], 0, 1, 0, width);
        const py = map(y_vals[i], 1, 0, 0, height);
        point(px, py);
    }

    // memory management
    tf.tidy(() => {
        if (x_vals.length > 0) {
            const ys = tf.tensor1d(y_vals);

            /*
            minimize(f, returnCost?, varList?) : Executes f() and minimizes the scalar output of f() by computing gradients of y with respect to the list of trainable variables provided by varList. If no list is provided, it defaults to all trainable variables.
            */
            optimizer.minimize(() => loss(predict(x_vals), y_vals));
        }

        const curveX = [];
        for (let x = -1; x < 1.1; x += 0.05) {
            curveX.push(x);
        }

        const ys = predict(curveX)
        const curveY = ys.dataSync();

        beginShape();
        noFill();
        stroke('white');
        strokeWeight(2);

        for (let i = 0; i < curveX.length; i++) {
            const x = map(curveX[i], 0, 1, 0, width);
            const y = map(curveY[i], 1, 0, 0, height);

            vertex(x, y);
            
        }

        endShape();

    })

    console.log("tensor count : ", tf.memory().numTensors);

}

function loss(pred, label) {
    return pred.sub(label).square().mean();
}

function predict(xs) {
    const tfxs = tf.tensor1d(xs);
    // y = ax^2 + bx + c;
    const ys = tfxs.square().mul(a).add(tfxs.mul(b)).add(c);

    return ys;
}

function mousePressed(e) {
    const x = map(mouseX, 0, width, 0, 1);
    const y = map(mouseY, 0, height, 1, 0);
    x_vals.push(x);
    y_vals.push(y);

}