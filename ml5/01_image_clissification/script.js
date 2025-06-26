
let classifier, img;

async function preload() {

    // classifier = ml5.imageClassifier("MobileNet");
    
    img = loadImage("images/test_img.jpg");

}
function setup() {

    createCanvas(500, 400);

    // classifier.classify(img, gotResult);
}

// Callback function for when classification has finished
function gotResult(results) {
    // The results are in an array ordered by confidence
    console.log(results);
}

function draw() {
    background(220);
    image(img, 0, 0, width, height);

    textSize(32)
    textAlign(CENTER)
    text("Image Classification", 200,200);

}