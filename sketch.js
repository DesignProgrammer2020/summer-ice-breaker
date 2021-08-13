let animating = false;

//display random questions from this array
let question_library = ["What outdoor activities do you do in summer?",
"What indoor activities do you do in summer?",
"What are your favorite barbecue meats/veggies?",
"What are your favorite summer drinks?",
"What are your favorite ice cream flavors?",
"What are your favorite popsicle/snow cone flavors?",
"What do you like to do at beaches?",
"What is your ideal summer vacation destination?",
"Where are you going/where did you go for vacation?",
"What is your favorite nature/amusement park to visit in summer?",
"Which kinds of museums do you like to visit?",
"What kind of songs do you listen to in summer?",
"What are your favorite summer sports?",
"Which colors do you wear in summer?",
"What do you like about summer sceneries?",
"How to say “summer” in languages you know?",
"How do you stay cool in summer?",
"What do you like/dislike about summer?"];

let index = -1;
let state = 'title';
let questions = [];
let numQuestions = 0;

let nextButton; //button to display next question

function setup() {
  cnv=createCanvas(windowWidth, 450);
  cnv.parent("#canvasDiv");
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

function drawPixels() { //draw a vertical sunset-like background
  loadPixels();
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let index = (i + j * width) * 4;
      pixels[index + 0] = 255; //add bright red pixels to the top
      pixels[index + 1] = j*0.75;  //add green pixels to red ones to create yellow
      pixels[index + 2] = 0; //no blue used here
      pixels[index + 3] = 180; //added transparency to make colors lighter
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
  fill(90, 0, 214); //bright purple text to contrast with red and yellow background
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
