score = 0;
cross = true;
audio = new Audio('music/bgm.mp3');
audiogo = new Audio('music/gameover.wav');
setTimeout(() => {
    audio.play()
}, 1000);

document.onkeydown = function (e) {
    console.log('KeyCode is ', e.keyCode);
    // 32 for spacebar and 38 for up key 
    if (e.keyCode == 32) {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 700);
    }
    if (e.keyCode == 38) {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 700);
    }
    if (e.keyCode == 39) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 100 + "px";
    }
    if (e.keyCode == 37) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX - 100 + "px";
    }
}

let gamestart = () => {
    let start = document.getElementById('Start')
    let obstacle = document.getElementById('obstacle');
    start.classList.add("hide")
    obstacle.classList.add("obstacleAni");
    {
        setInterval(() => {
            dino = document.getElementById('dino');
            gameover = document.querySelector('.gameover');
            let Reload = document.querySelector('.Reload')

            dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
            ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
            oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

            offsetX = Math.abs(dx - ox);
            offsetY = Math.abs(dy - oy);
            console.log(offsetX, offsetY);

            if (offsetX < 40 && offsetY < 70) {
                gameover.innerHTML = "Game Over! Reload to Play Again.";
                obstacle.classList.remove('obstacleAni');
                audiogo.play();
                audio.pause();
                if (score > 1) {
                    score = score - 1;
                    updateScore(score);
                } else {
                    score = 0;
                    updateScore(score);
                }
                Reload.classList.remove('hide')
            }
            else if (offsetX < 145 && cross) {
                score += 1;
                updateScore(score);
                cross = false;
                setTimeout(() => {
                    cross = true;
                }, 1000);
                setTimeout(() => {
                    aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
                    newDur = aniDur - 0.1;
                    obstacle.style.animationDuration = newDur + 's';
                }, 500);
            }
        }, 20);
    }
}

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}
