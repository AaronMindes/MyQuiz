
//music
let played = true;
const logo = document.querySelector('#colorplayed');
const music = new Audio('music/medievalSong.mp3');
quizAppmusic = () => {
    music.autoplay = true;
    music.load();
    logo.style.color = 'green';
}


playOrStop = () =>{

}

class Question {
    constructor(text, choices, answer) {
      this.text = text;
      this.choices = choices;
      this.answer = answer;
    }
    isCorrectAnswer(choice) {
      return this.answer === choice;
    }
  }

let questions = [
new Question("?איזה תאריך מתאים להקמת המדינה",
["1945","1939","1967","1948"],"1948"),
new Question("?איזה שם בן גוריון נותן לארץ בשעת הכריזת המדינה",
["מדינת היהודים","מדינת ישראל","ישראל","אוגנדה"],"מדינת ישראל"),
new Question("?איזה מלחמה התרשה ב 1967",["Independence war",
"The war of stars","The war of 6 days","Tsouk Eytan"],"The war of 6 days"),
new Question("?מי היה הרב קוק",["המשיח","הרב הראשי האשכנזי הראשון במדינת ישראל","עיתונאי","ספדרי מפורסם"],"הרב הראשי האשכנזי הראשון במדינת ישראל")
];


console.log(questions);

class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
  }
  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }
  guess(answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
      this.score++;
    }
    else if(this.getCurrentQuestion().isCorrectAnswer(answer)===false){
      const music2 = new Audio('music/wrongSong.mp3');
      music2.play();
      music2.playbackRate = 2;
    }
    this.currentQuestionIndex++;
  }
  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }
}

//Functions relative to the App Display
const display = {
  elementShown: function(id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
  },
  endQuiz: function() {
    endQuizHTML = `
      <h1>Quiz נגמר !</h1>
      <h3> Your Score is : ${quiz.score} / ${quiz.questions.length}</h3>
      <button class="my-btn">Restart</button>`;
 
    this.elementShown("quiz", endQuizHTML);
  },
  question: function() {
    this.elementShown("question", quiz.getCurrentQuestion().text);
  },
  choices: function() {
    let choices = quiz.getCurrentQuestion().choices;

    guessHandler = (id, guess) => {
      document.getElementById(id).onclick = function() {
        quiz.guess(guess);
        quizApp();
      }
    }
    // display choices and handle guess
    for(let i = 0; i < choices.length; i++) {
      this.elementShown("choice" + i, choices[i]);
      guessHandler("guess" + i, choices[i]);
    }
  },
  progress: function() {
    let currentQuestionNumber = quiz.currentQuestionIndex + 1;
    this.elementShown("progress", "שאלה " + currentQuestionNumber + " מתוך " + quiz.questions.length);
  },
};

// Game logic
quizApp = () => {
  if (quiz.hasEnded()) {
    display.endQuiz();
      let btn = document.querySelector(".my-btn");
      btn.addEventListener("click",() => {
        location.reload();
      })
    music.pause();
  } else {
    display.question();
    display.choices();
    display.progress();
  } 
}
// Create Quiz
let quiz = new Quiz(questions);
quizApp();

quizAppmusic();

document.querySelector('.musicPlayed').addEventListener("click", ()=>{

   if(played){
     music.pause();
     played = false;
     logo.style.color =  'red';
    }
    else{
      logo.style.color = 'green';
      music.play();
      played = true; 
    }
  });






