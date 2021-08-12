let animating = false;

//display random questions from this array
let question_library = ["What activities do you do in summer?",
"What are your favorite barbecue foods?",
"What are your favorite summer drinks?",
"What are your favorite ice cream flavors?",
"What do you like to do at beaches?",
"What is you ideal vacation destination?",
"Where are you going for vacation?",
"What is your favorite nature/amusement park?",
"Which kinds of museums do you like to visit?",
"What kind of songs do you listen to in summer?",
"What are your favorite summer sports?",
"Which summer clothing colors do you wear?",
"What do you like about summer sceneries?",
"How to say “summer” in languages you know?",
"How do you keep cool in summer?",
"What do you like/dislike about summer?"];

let index = -1;
let state = 'title';
let questions = [];
let numQuestions = 0;

let angle = 0; //let cube rotate

let g;

let nextButton; //button to display next question

function setup() {
  cnv=createCanvas(windowWidth, 450);
  cnv.parent("#canvasDiv");
  g = createGraphics(windowWidth, 600, WEBGL);
  pixelDensity(1);
  nextButton = select("#nextQuestion");
  nextButton.mousePressed(buttonPressed);
}

function draw() {
   switch (state){
     case 'title':
        title();
        break;

     case 'play':
        showQuestion();
        break;

    default:
        break;
   }
}

function drawPixels() {
  //draw background with light blue and cyan pixels to resemble ice
  loadPixels();
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let index = (i + j * width) * 4;
      pixels[index + 0] = 0; //no red used here
      pixels[index + 1] = i*0.125;  //add some green to create cyan
      pixels[index + 2] = j*0.75; //add blue for coolness
      pixels[index + 3] = j*0.5; //add transparency to make colors lighter
    }
  }
  updatePixels();
}

function title() {
  if (questions.length == 0) {
    for (let i=0; i<question_library.length; i++) {
       questions.push(question_library[i]);
    }
  }

  drawPixels();
  fill(0, 40, 180); //dark blue text to put over lighter blue background
  textAlign(CENTER);
  textSize(60);
  text("Summer Ice Breaker", width*0.5, height*0.5);
  textSize(24);
  text("Click button to begin new round", width*0.5, height*0.75);
}

function showQuestion(){
  drawPixels();
  textAlign(CENTER);
  textSize(36);
  console.log(`question: index=${index}, length = ${questions.length}`);
  // text(questions[index], width * 0.5, height * 0.5);
  text(questions[index], width * 0.5, height * 0.5);
}

function buttonPressed(){
  console.log(`b4: index=${index}, length = ${questions.length}`);
  if (index >= 0){
    questions.splice(index, 1);
  }
  if (numQuestions >= 6){
    initTitle();
    console.log(`question_library=${question_library}`);
    return;
  }
  state = 'play';
  index = randomIndex = int(random(questions.length));
  numQuestions += 1;
  console.log(`after: index=${index}, length = ${questions.length}`);
}

function initTitle(){
  state = 'title';
  index = -1;
  numQuestions = 0;
}
