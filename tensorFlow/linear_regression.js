// shape is [4,2] mean 4 rows and 2 columns.
// here 8 num of array convert into 4 rows and 2 columns shape tensor.
// tf.tensor (values, shape?, dtype?) 


/*
✅ learning rate
✅ loss function
✅ optimizer
✅ minimize function
✅ training function
✅ predict function

*/



const x_vals = [];
const y_vals = [];

let m, b;

const learningRate = 0.2;
const optimizer = tf.train.sgd(learningRate);

function setup() {
    createCanvas(400, 400);
    background(0);

    // y = mx + b
    m = tf.variable(tf.scalar(random(1)).variable());
    b = tf.variable(tf.scalar(random(1)).variable());

    console.log(m, b);


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

        const xs = [0, 1];
        const ys = predict(xs)

        const x1 = map(xs[0], 0, 1, 0, width);
        const x2 = map(xs[1], 0, 1, 0, width);


        const liney = ys.dataSync();


        const y1 = map(liney[0], 0, 1, height, 0);
        const y2 = map(liney[1], 0, 1, height, 0);

        strokeWeight(2);
        line(x1, y1, x2, y2)



    })

    console.log("tensor count : ", tf.memory().numTensors);

}

function loss(pred, label) {
    return pred.sub(label).square().mean();
}

function predict(xs) {
    const tfxs = tf.tensor1d(xs);
    // y = mx + b;
    const ys = tfxs.mul(m).add(b);

    return ys;
}

function mousePressed(e) {
    const x = map(mouseX, 0, width, 0, 1);
    const y = map(mouseY, 0, height, 1, 0);
    x_vals.push(x);
    y_vals.push(y);

}