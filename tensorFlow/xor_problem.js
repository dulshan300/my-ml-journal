// shape is [4,2] mean 4 rows and 2 columns.
// here 8 num of array convert into 4 rows and 2 columns shape tensor.
// tf.tensor (values, shape?, dtype?) 

/*

✅  if done.

✅  Blank Model
✅  Compile Options
    -   loss function
    -   optimizer

✅  training function
✅  predict function

*/


// test data
const xs = tf.tensor2d([
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
]);

const ys = tf.tensor2d([
    [0],
    [1],
    [1],
    [0]
]);


async function trainModel() {
    return await model.fit(xs, ys, {
        epochs: 20,
        shuffle: true
    })
}

function train() {
    trainModel().then(h => {
        console.log(h.history.loss[0]);

        setTimeout(train, 10);

    });
}

const res = 20;

let model;
let cols = 0;
let rows = 0;

let input_x = [];

let isTraining = false;
let isPredicting = false;

let output = [];




function setup() {
    createCanvas(500, 500);
    background(255 * 0.5);

    // create blank network
    model = tf.sequential();

    // add hidden layer
    model.add(tf.layers.dense({
        inputShape: [2],
        units: 4,
        activation: 'sigmoid'
    }));

    // add output layer
    model.add(tf.layers.dense({
        units: 1,
        activation: 'sigmoid'
    }));

    // compile model
    model.compile({
        loss: tf.losses.meanSquaredError,
        optimizer: tf.train.adam(0.1)
    });

    cols = width / res;
    rows = height / res;

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            input_x.push([i / cols, j / rows]);
            output.push(255);
        }
    }

    setTimeout(train, 10);
}


function draw() {

    background(255 * 0.5);

    tf.tidy(() => {
        const input_tx = tf.tensor2d(input_x);
        const output_yx = model.predict(input_tx).dataSync(); // get the output from the model


        // draw the result
        let index = 0;
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {

                fill(output_yx[index] * 255);
                rect(i * res, j * res, res, res);

                index++;
            }
        }
    });




}