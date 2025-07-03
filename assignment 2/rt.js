let box = document.getElementById('shape');
let startTime, endTime;

function startGame() {
    box.style.display = 'block';
    moveBox();
}

function moveBox() {
    const randomX = Math.random() * (window.innerWidth - 100);
    const randomY = Math.random() * (window.innerHeight - 100);
    box.style.transform = `translate(${randomX}px, ${randomY}px)`;
    startTime = new Date().getTime();
}

box.addEventListener('click', () => {
    endTime = new Date().getTime();
    const reactionTime = (endTime - startTime)/1000;
    alert(`Your reaction time is ${reactionTime}seconds`);
    box.style.display = 'none';
    setTimeout(startGame, 1000); // Restart the game after 1 second
});

// Start the game for the first time
startGame();


function changeColor() {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    box.style.backgroundColor = randomColor;
}

function moveBox() {
    const randomX = Math.random() * (window.innerWidth - 100);
    const randomY = Math.random() * (window.innerHeight - 100);
    box.style.transform = `translate(${randomX}px, ${randomY}px)`;
    changeColor(); // Change color while moving
    startTime = new Date().getTime();
}