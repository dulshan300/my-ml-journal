// shape is [4,2] mean 4 rows and 2 columns.
// here 8 num of array convert into 4 rows and 2 columns shape tensor.
// tf.tensor (values, shape?, dtype?) 

/*
✅ create neural network
✅ loss function
✅ optimizer
 training function
 predict function

*/

// let's create a model

const model = tf.sequential();

// create dense or layers
const hidden = tf.layers.dense({
    units: 4,
    inputShape: [2],
    activation: 'sigmoid'
});

const output = tf.layers.dense({
    units: 3,
    activation: 'sigmoid'
});

// add layers to the model
model.add(hidden);
model.add(output);

const optimizer = tf.train.sgd(0.5);

model.compile({
    optimizer: optimizer,
    loss: tf.losses.meanSquaredError
});


/* 
 the model is some thing like this
I   H   O
    0   0
0   0   0
0   0   0
    0
 */

// training data
const tx = tf.tensor2d([
    [0.25, 0.92],
    [0.12, 0.32],
    [0.34, 0.56],
    [0.56, 0.78]
]);

const ty = tf.tensor2d([
    [0.25, 0.92, 0.12],
    [0.12, 0.32, 0.56],
    [0.34, 0.56, 0.78],
    [0.56, 0.78, 0.92]
]);

// input values should be a 2,1 array
const inputs = tf.tensor2d([
    [0.25, 0.92],
    [0.12, 0.32],
    [0.34, 0.56],
    [0.56, 0.78]
]);

const config = {
    epochs: 10,
    verbose: true
}

// we use fit to train the model
async function train() {
    for (let i = 0; i < 1000; i++) {
        const response = await model.fit(tx, ty, config);
        console.log(response.history.loss[0]);
    }   
}

train().then(res => {
    console.log("training complete");
    let results = model.predict(inputs);
    results.print();
});




function setup() {
    createCanvas(400, 400);
    background(0);
}


function draw() {

    // tf.tidy(() => {



    // })
    noLoop();

}