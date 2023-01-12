const els = {
    welcomeScreen: null,
    questionScreen: null,
    rulesScreen: null,
    endScreen: null,
    welcomeBtn: null,
    continueBtn: null,
    quitBtn: null,
    answers: null,
    endBtn: null,
    answersContainer: null
};

let questionIndex = 0;

// Questions for Quiz
const questions = [{
        question: 'Your head hurts. You wake up on the floor of an old house, remembering nothing of how you got here. In your head one phrase "run away from here".Your actions:',
        answers: [{
            title: 'Escape as soon as possible',
            result: 'right'
        }, {
            title: 'You want to wait until you remember what happened',
            result: 'wrong'
        }, {
            title: 'Look around the room',
            result: 'middle'
        }]
    },
    {
        question: 'Right, maybe.... You notice the sword on the wall. Looks ancient.',
        answers: [{
            title: 'Need to look for something better',
            result: 'wrong'
        }, {
            title: 'I`ll run faster without the sword',
            result: 'middle'
        }, {
            title: 'Take it with you.',
            result: 'right'
        }]
    },
    {
        question: 'You see a strange box. It contains some kind of ball with a mysterious gas inside and a small tag saying "look your fears in the face - break me"',
        answers: [{
            title: 'Take the ball with you',
            result: 'middle'
        }, {
            title: 'Break the ball',
            result: 'wrong'
        }, {
            title: 'Leave',
            result: 'right'
        }]
    },
    {
        question: 'You hold it carelessly and it falls, breaking and releasing a dark gas out. Screams are coming from the basement. There is no time - you need to run.',
        answers: [{
            title: 'Get out through the door, but is it open?',
            result: 'right'
        }, {
            title: 'Hide in the closet',
            result: 'middle'
        }, {
            title: 'Go down to the basement?',
            result: 'wrong'
        }]
    },
    {
        question: 'You`ve been thinking too long. You hear footsteps.You are near the only door. There is nothing left to do, so you run out. You`re in the middle of a dark forest, where do you go next?',
        answers: [{
            title: 'Try to hide near the house',
            result: 'middle'
        }, {
            title: 'Maybe you try to hide in the forest',
            result: 'right'
        }, {
            title: 'You need to stop and think about where to go next',
            result: 'wrong'
        }]
    },
    {
        question: 'You see a huge shadow, it is not an animal or a person. Its scream is deafening. You are thrown a few meters straight into the forest.',
        answers: [{
            title: 'Run to the right, where everything is fully lit by the moon',
            result: 'right'
        }, {
            title: 'You need to think ...',
            result: 'wrong'
        }, {
            title: 'Run to the left, choosing the darkest side',
            result: 'middle'
        }]
    },
    {
        question: 'You have almost no strength left. The monster is behind you',
        answers: [{
            title: 'I can`t do anything anymore',
            result: 'wrong'
        }, {
            title: 'Is it all real?',
            result: 'middle'
        }, {
            title: 'You have to fight',
            result: 'right'
        }]
    },
    {
        question: 'The monster is hitting you. Everything darkens before your eyes. The monster disappears and the forest with it. What`s happening? Is this even real?',
        answers: [{
            title: 'No',
            result: 'right'
        }, {
            title: 'I don`t know',
            result: 'middle'
        }, {
            title: 'Yes, the broken magic ball caused this',
            result: 'wrong'
        }]
    }
];

const recordedAnswers = [];


const init = () => {
    // all variables
    els.welcomeScreen = document.querySelector('.welcome-screen');
    els.rulesScreen = document.querySelector('.rules-screen')
    els.questionScreen = document.querySelector('.question-screen');
    els.endScreen = document.querySelector('.end-screen');
    els.welcomeBtn = els.welcomeScreen.querySelector('button');
    els.continueBtn = els.rulesScreen.querySelector('.button-continue');
    els.quitBtn = els.questionScreen.querySelector('.button-quit')
    els.endBtn = els.endScreen.querySelector('button');
    els.answersContainer = els.questionScreen.querySelector('ul'); 

    // Page/screen transitions
    els.welcomeBtn.addEventListener('click', () => {
        displayScreen('rules');
        ;
    });

    els.continueBtn.addEventListener('click', () => {
        displayScreen('question');
        displayQuestion(questionIndex);
    });

    els.quitBtn.addEventListener('click', () => {
        displayScreen('welcome');
        questionIndex = 0;
    });

    els.endBtn.addEventListener('click', () => {
        displayScreen('welcome');
        questionIndex = 0;
    });

// hide screen after click button
    els.answersContainer.addEventListener('click', ({ target }) => {
        if (target.tagName !== 'LI') {
            return;
        }
        const result = target.getAttribute('data-result');
        recordedAnswers.push(result);

        questionIndex++;

        if (questionIndex >= questions.length) {
            calculateScore();
            displayScreen('end');
        } else {
            displayQuestion(questionIndex);
        }
    });

};

// calculation
const calculateScore = () => {
    const result = recordedAnswers.sort((a, b) => {
        return recordedAnswers.filter(answer => answer === a).length - 
        recordedAnswers.filter(answer => answer === b).length 
    }).pop();
    // console.log('result', result)

    // 3 possible results after quiz
    const resultFullAnswer = {
        right: 'You wake up in your bed at home. This terrible dream is over. But you suddenly realize that your shoulder is aching terribly and there is a wound as if from claws. Was it a dream? It doesn`t matter - You escaped and showed good intuition and ability to survive, this is the main thing.',
        middle: 'Your head hurts. You wake up on the floor of an old house, remembering nothing ... Oh, no. This has already happened to you. Looks like you`re stuck, maybe next time you`ll be able to escape.',
        wrong: 'You did not run away and unfortunately you died. Your intuition failed you and the decisions you made were wrong. Maybe sign up for a survival course!',
        
    };

    els.endScreen.querySelector('span').textContent = resultFullAnswer[result];
};

// add function to answers
const displayQuestion = (index) => {

    const currentQuestion = questions[index];

    const questionEl = els.questionScreen.querySelector('h2');

    const answerEls = currentQuestion.answers.map((answer) => {
        const liEl = document.createElement('li');
        liEl.textContent = answer.title;
        liEl.setAttribute('data-result', answer.result);
        return liEl;
    });

    questionEl.textContent = currentQuestion.question;
    els.answersContainer.textContent = '';
    els.answersContainer.append(...answerEls);
};