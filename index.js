const letters = [ // array of letters
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
    'Z', 'X', 'C', 'V', 'B', 'N', 'M'
];

const data = [{ // array of images and answer
        id: 1,
        image: "https://cdn.pixabay.com/photo/2024/05/08/17/45/animal-8748794_640.jpg",
        answer: 'lion'
    }, {
        id: 2,
        image: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg",
        answer: 'flower'
    }, {
        id: 3,
        image: "https://cdn.pixabay.com/photo/2014/01/22/19/38/boot-250012_1280.jpg",
        answer: 'shoe'
    }, {
        id: 4,
        image: "https://cdn.pixabay.com/photo/2014/12/08/17/52/horse-561221_640.jpg",
        answer: 'horse'
    },
    {
        id: 5,
        image: "https://cdn.pixabay.com/photo/2015/01/19/13/51/car-604019_960_720.jpg",
        answer: 'car'
    }
]


let gameCard = document.getElementById('game-card')
let gameImg = document.getElementById('game-card').firstElementChild
let initialCount = document.getElementById('countdown').innerText

function stopGame(interval) { // function to clear any interval
    clearInterval(interval)
}

function startTimer(count) { // function to start countdown timer
    let timer = count
    let countDown = setInterval(() => {

        timer--
        if (timer === 0) {
            timer = 60
            document.getElementById('countdown').classList.add('bg-success')
            document.getElementById('countdown').classList.remove('bg-danger')
        }

        if (timer === 10) {
            document.getElementById('countdown').classList.add('bg-danger')
            document.getElementById('countdown').classList.remove('bg-success')
        }
        document.getElementById('countdown').innerText = timer
    }, 1000)
    return countDown
}

function startEntry(currentIndex, countDownTimer, score) { // function to pass data entry
    let entryIndex = currentIndex
    gameImg.setAttribute('src', data[entryIndex].image)
    gameImg.setAttribute('alt', data[entryIndex].id)
    let entryInterval = setInterval(() => {
        entryIndex++;
        if (entryIndex >= data.length) {
            stopGame(entryInterval);
            stopGame(countDownTimer);
            gameCard.innerHTML = `<div class="d-flex flex-column justify-content-center align-items-center">
                <p class="my-3 fw-bold text-center" style="font-size: 30px; font-family: cursive; color: orange;">Game Over!</p>
                <p class="fw-bold">Your Score is:</p>
                <p class="display-1 fw-bold">${score}/5</p>                
                </div>`
            document.getElementsByTagName('body')[0].classList.add('flex-column', 'vh-100');
            document.getElementById('restartGame').classList.remove('d-none');

        } else {
            gameImg.setAttribute('src', data[entryIndex].image)
            gameImg.setAttribute('alt', data[entryIndex].id)
            document.getElementById('answer').innerText = ''
        }

    }, 60000)

    return entryInterval
}

function startGame() { // function to start game 

    document.getElementById('countdown').classList.remove('d-none')
    document.getElementById('answer').classList.remove('d-none')
    document.getElementById('startGame').classList.add('d-none')
    document.getElementById('Opening').classList.add('d-none')
    document.getElementById('checkAnswer').classList.remove('d-none')
    document.getElementById('delete').classList.remove('d-none')

    let score = 0 // keep track of score

    letters.map((letter) => { // map keys to game
        document.getElementById('keys').innerHTML += `<div class="btn rounded bg-body-secondary p-1 text-capitalize fw-bold letters" style"font-size:14px;">
  ${letter}
</div>`
    })

    let countDown = startTimer(initialCount) // call timer

    let entryInterval = startEntry(0, countDown, score)

    document.getElementById('keys').addEventListener('click', function(e) { // display answer
        if (e.target.classList.contains('letters')) {
            document.getElementById('answer').innerText += e.target.innerText
        }
    })


    document.getElementById('delete').addEventListener('click', function() { // delete answer
        let inputedAnswer = document.getElementById('answer').innerText
        document.getElementById('answer').innerText = inputedAnswer.slice(0, -1)
    })


    document.getElementById('checkAnswer').addEventListener('click', function() { // check answer
        let inputedAnswer = document.getElementById('answer').innerText;
        let dataIndex = gameImg.getAttribute('alt');
        let responseMsg = document.getElementById('response')
        if (inputedAnswer.toLocaleLowerCase() === data[dataIndex - 1].answer) {
            score++
            responseMsg.innerHTML = `<p class="text-center">✅Correct!</p>`
            responseMsg.classList.add('text-success')
            setTimeout(() => {
                responseMsg.innerText = ''
                responseMsg.classList.remove('text-success')
            }, 1000);

            document.getElementById('answer').innerText = ''
            stopGame(entryInterval)
            stopGame(countDown)


            if (data[dataIndex]) {
                countDown = startTimer(initialCount) // restart timer
                entryInterval = startEntry(dataIndex, countDown, score) // go to next entry

            } else {
                gameCard.innerHTML = `<div class="d-flex flex-column justify-content-center align-items-center">
                <p class="my-3 fw-bold text-center" style="font-size: 30px; font-family: cursive; color: orange;">Game Over!</p>
                <p class="fw-bold">Your Score is:</p>
                <p class="display-1 fw-bold">${score}/5</p>                
                </div>`
                document.getElementsByTagName('body')[0].classList.add('flex-column', 'vh-100');
                document.getElementById('restartGame').classList.remove('d-none');
            }
        } else {
            responseMsg.innerHTML = `<p class="text-center">❌Try Again!</p>`
            responseMsg.classList.add('text-danger')
            setTimeout(() => {
                responseMsg.innerText = ''
                responseMsg.classList.remove('text-danger')
            }, 1000);
        }
    })

}


document.getElementById('startGame').addEventListener('click', startGame) // start game

document.getElementById('restartGame').addEventListener('click', function() { // restart game
    window.location.reload();
})