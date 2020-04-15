var enemyCount = 0, fx = 0, fy = 0, projectileCount = 0, towerCount = 0, fs = 0, ff = 0, ft = 0, i = 0, playerLife;
var gameTime = 0;
var audioMain= document.getElementById("wwaudio");
var audioDeath= document.getElementById("enemyDeath");
var audioOof= document.getElementById("oof");
var gameState;
var blueTowerClick = 0, redTowerClick = 0, yellowTowerClick = 0, greenTowerClick = 0, clickCount = 0, towerCount = 0, mouseClickX, mouseClickY, mouseX, mouseY;
var kruhac1;
var kruhac2;
var path1;
var uwaga1;
var towerMenuDisplayed = 0;
var enemies = [];
var projectiles = [];
var towers = [];
var projectileIntervals = [];
var gameStopped = false;
var gameAudio= "true";
function mainMenu() {
    gameState = "mainMenu";
    startInterval();
    gameArea.start();
    uwaga1 = new placeImage("uwagaedit.png", 800, 400, 50, 50);
    heart1 = new placeImage("heart.png", 10, 430, 50, 50);
    mainMenu1 = new placeImage("mainMenu.png", 0, 0, 1000, 500);
    mainMenuButtonStartGame= new placeImage("mainMenuStartGameButton.png",350,200,300,50);
    mainMenuButtonSettings= new placeImage("mainMenuSettingsButton.png",400,270,200,50);
    mainMenuButtonExit= new placeImage("mainMenuExitButton.png",425,340,150,50);
    instructions1 = new placeImage("instructions.png", 0, 0, 1000, 500);
    instructionsButtonUnderstood= new placeImage("instructionsUnderstoodButton.png",350,400,300,50);
    gameOver1 = new placeImage("gameOver.png", 0, 0, 1000, 500);
    gameOverButtonTryAgain= new placeImage("gameOverTryAgainButton.png",350,340,300,50);
    gameOverButtonExitGame= new placeImage("gameOverExitGameButton.png",350,410,300,50);
    printTextLife = new printText(playerLife, 70, 470, "50px Arial", "black");
    constructTower1 = new constructTower();
    showTowerMenu1 = new showTowerMenu();

}
function startGame() {
    playerLife = 2;
    if(gameAudio=="true")audioMain.play();
    path1 = new drawPath("khaki");

};
var gameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.style.border = "1px solid black";
        this.canvas.width = 1000;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
};
var showSettings = {
    settingsSettings: document.createElement("button"),
    settingsReturnToGame: document.createElement("button"),
    start: function () {
        gameStopped = true;
        this.settingsSettings.style.position = "absolute";
        this.settingsSettings.style.visibility = "visible";
        this.settingsSettings.style.top = "100px";
        this.settingsSettings.style.left = "400px";
        this.settingsSettings.style.width = "200px";
        this.settingsSettings.style.height = "50px";
        this.settingsSettings.innerHTML = "SETTINGS";
        document.body.insertBefore(this.settingsSettings, document.body.childNodes[0]);
        this.settingsReturnToGame.addEventListener("click", resumeGame);
        this.settingsReturnToGame.style.position = "absolute";
        this.settingsReturnToGame.style.visibility = "visible";
        this.settingsReturnToGame.style.top = "170px";
        this.settingsReturnToGame.style.left = "400px";
        this.settingsReturnToGame.style.width = "200px";
        this.settingsReturnToGame.style.height = "50px";
        this.settingsReturnToGame.innerHTML = "RESUME GAME";
        document.body.insertBefore(this.settingsReturnToGame, document.body.childNodes[0]);
    }
}
function showTowerMenu() {
    this.color = "lightgrey";
    this.x = 855;
    this.y = 115;
    this.width = 140;
    this.height = 270;
    this.ctx = gameArea.context;
    this.ctx.font = "10px Arial";
    this.start = function () {
        towerMenuDisplayed++;
    }
    this.update = function () {
        this.ctx.font = "10px Arial";
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.strokeText("blue tower", this.x + 20, this.y + 90);
        this.ctx.strokeText("green tower", this.x + 80, this.y + 90);
        this.ctx.strokeText("red tower", this.x + 20, this.y + 160);
        this.ctx.strokeText("yellow tower", this.x + 80, this.y + 160);
        this.ctx.fillStyle = "lightblue";
        this.ctx.fillRect(this.x + 20, this.y + 40, 40, 40);
        this.ctx.fillStyle = "lightgreen";
        this.ctx.fillRect(this.x + 80, this.y + 40, 40, 40);
        this.ctx.fillStyle = "pink";
        this.ctx.fillRect(this.x + 20, this.y + 110, 40, 40);
        this.ctx.fillStyle = "yellow";
        this.ctx.fillRect(this.x + 80, this.y + 110, 40, 40);
    }
}
function constructTower() {
    document.addEventListener("click", function (event1) {
        mouseClickX = event1.clientX;
        mouseClickY = event1.clientY;
        clickCount++;
    });
    document.addEventListener("mousemove", function (event2) {
        mouseX = event2.clientX;
        mouseY = event2.clientY;
    });
    this.ctx = gameArea.context;
    this.update = function () {
        if (greenTowerClick == 0 && blueTowerClick == 0 && yellowTowerClick == 0 && redTowerClick == 0 && clickCount > 0 && mouseClickX >= showTowerMenu1.x + 30 && mouseClickX <= showTowerMenu1.x + 70 && mouseClickY >= showTowerMenu1.y + 50 && mouseClickY <= showTowerMenu1.y + 90 && (towerMenuDisplayed % 2)) {
            document.getElementById("xy").innerHTML = "clicked blue tower";
            clickCount = 0;
            clickCount++;
            blueTowerClick++;
        }
        if (blueTowerClick > 0) {
            this.ctx.fillStyle = "#76E5FC";
            this.ctx.fillRect(mouseX - 35, mouseY - 35, 50, 50);
        }
        if (clickCount > 1 && blueTowerClick > 0 && (mouseClickX < showTowerMenu1.x - 15 || mouseClickY < showTowerMenu1.y - 15 || mouseClickX > showTowerMenu1.x + showTowerMenu1.width || mouseClickY > showTowerMenu1.y + showTowerMenu1.height)) {
            towers[towerCount] = new createTower(mouseClickX - 35, mouseClickY - 35, 50, 50, "blue");
            towerCount++;
            i++;
            clickCount = 0;
            blueTowerClick = 0;
        }
        if (greenTowerClick == 0 && blueTowerClick == 0 && yellowTowerClick == 0 && redTowerClick == 0 && clickCount > 0 && mouseClickX >= showTowerMenu1.x + 90 && mouseClickX <= showTowerMenu1.x + 130 && mouseClickY >= showTowerMenu1.y + 50 && mouseClickY <= showTowerMenu1.y + 90 && (towerMenuDisplayed % 2)) {
            document.getElementById("xy").innerHTML = "clicked green tower";
            clickCount = 0;
            clickCount++;
            greenTowerClick++;
        }
        if (greenTowerClick > 0) {
            this.ctx.fillStyle = "#8DE969";
            this.ctx.fillRect(mouseX - 35, mouseY - 35, 50, 50);
        }
        if (clickCount > 1 && greenTowerClick > 0 && (mouseClickX < showTowerMenu1.x - 15 || mouseClickY < showTowerMenu1.y - 15 || mouseClickX > showTowerMenu1.x + showTowerMenu1.width || mouseClickY > showTowerMenu1.y + showTowerMenu1.height)) {
            towers[towerCount] = new createTower(mouseClickX - 35, mouseClickY - 35, 50, 50, "green");
            towerCount++;
            i++;
            clickCount = 0;
            greenTowerClick = 0;
        }
        if (greenTowerClick == 0 && blueTowerClick == 0 && yellowTowerClick == 0 && redTowerClick == 0 && clickCount > 0 && mouseClickX >= showTowerMenu1.x + 30 && mouseClickX <= showTowerMenu1.x + 70 && mouseClickY >= showTowerMenu1.y + 120 && mouseClickY <= showTowerMenu1.y + 160 && (towerMenuDisplayed % 2)) {
            document.getElementById("xy").innerHTML = "clicked pink tower";
            clickCount = 0;
            clickCount++;
            redTowerClick++;
        }
        if (redTowerClick > 0) {
            this.ctx.fillStyle = "#EEB4B3";
            this.ctx.fillRect(mouseX - 35, mouseY - 35, 50, 50);
        }
        if (clickCount > 1 && redTowerClick > 0 && (mouseClickX < showTowerMenu1.x - 15 || mouseClickY < showTowerMenu1.y - 15 || mouseClickX > showTowerMenu1.x + showTowerMenu1.width || mouseClickY > showTowerMenu1.y + showTowerMenu1.height)) {
            towers[towerCount] = new createTower(mouseClickX - 35, mouseClickY - 35, 50, 50, "red");
            towerCount++;
            i++;
            clickCount = 0;
            redTowerClick = 0;
        }
        if (greenTowerClick == 0 && blueTowerClick == 0 && yellowTowerClick == 0 && redTowerClick == 0 && clickCount > 0 && mouseClickX >= showTowerMenu1.x + 90 && mouseClickX <= showTowerMenu1.x + 130 && mouseClickY >= showTowerMenu1.y + 120 && mouseClickY <= showTowerMenu1.y + 160 && (towerMenuDisplayed % 2)) {
            document.getElementById("xy").innerHTML = "clicked yellow tower";
            clickCount = 0;
            clickCount++;
            yellowTowerClick++;
        }
        if (yellowTowerClick > 0) {
            this.ctx.fillStyle = "#FAFF81";
            this.ctx.fillRect(mouseX - 35, mouseY - 35, 50, 50);
        }
        if (clickCount > 1 && yellowTowerClick > 0 && (mouseClickX < showTowerMenu1.x - 15 || mouseClickY < showTowerMenu1.y - 15 || mouseClickX > showTowerMenu1.x + showTowerMenu1.width || mouseClickY > showTowerMenu1.y + showTowerMenu1.height)) {
            towers[towerCount] = new createTower(mouseClickX - 35, mouseClickY - 35, 50, 50, "#ECA72C");
            towerCount++;
            i++;
            clickCount = 0;
            yellowTowerClick = 0;
        }
    }
}


function spawnEnemies() {
    if (enemyCount < 10 && gameTime > 0 && (gameTime % 100) == 0) {
        enemies[enemies.length] = new kruhac(925, 75, "green", 25);
        enemyCount++;
    }

}
function spawnProjectiles(i) {
    projectiles[projectiles.length] = new towerProjectiles(5, 5, "black", towers[i].x + 25, towers[i].y + 25, 10);
    projectileCount++;
}
function manageProjectiles() {
    var ii;
    if (gameTime > 0 && (gameTime % 10) == 0) {
        for (ii = 0; ii < towerCount; ii++) {
            spawnProjectiles(ii);
        }
    }
}
function panak(x, y, color, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.update = function () {
        this.ctx = gameArea.context;
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    };
};
function kruhac(x, y, color, radius) {
    this.maxHitPoints = 100;
    this.hitPoints = this.maxHitPoints;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.pix2 = (Math.PI) * 2;
    this.radius = radius;
    this.hpBarWidth = 30;
    this.hpBarHeight = 5;
    this.alive = true;
    this.ctx = gameArea.context;
    this.update = function () {
        this.hpPercentage = (this.hitPoints / this.maxHitPoints) * 100;
        if (this.hitPoints <= 0) this.alive = false;
        if (this.hitPoints / this.maxHitPoints > 0) {
            this.ctx.fillStyle = "red";
            this.ctx.fillRect(this.x - 15, this.y + 30, this.hpBarWidth, this.hpBarHeight);
            if (this.hpPercentage < 100) {
                this.ctx.fillStyle = "black";
                this.ctx.fillRect(this.x - 15, this.y + 30, (this.hpBarWidth * (100 - this.hpPercentage)) / 100, this.hpBarHeight);
            }
        }
        this.x += this.speedX;
        this.y += this.speedY;
        this.color = color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, this.pix2, true);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    };
};
function collision() {
    if (enemies.length > 0) {
        for (fx = 0; fx < enemies.length; fx++) {
            for (fs = 0; fs < projectiles.length; fs++) {
                dx = enemies[fx].x - projectiles[fs].x;
                dy = enemies[fx].y - projectiles[fs].y;
                distance = Math.sqrt(dx * dx + dy * dy);
                if ((distance < enemies[fx].radius + projectiles[fs].radius) && enemies[fx].alive && projectiles[fs].alive) {
                    enemies[fx].hitPoints -= projectiles[fs].damage;
                    projectiles[fs].alive = false;
                }
                /* if(((enemies[fx].x-25)<=(projectiles[fs].x+10) && (enemies[fx].x+25)>=(projectiles[fs].x-10) ) && 
                 ((enemies[fx].y-25)<=(projectiles[fs].y+10) && (enemies[fx].y+25)>=(projectiles[fs].y-10) ) && enemies[fx].alive && projectiles[fs].alive){
                     enemies[fx].hitPoints-=10;
                     projectiles[fs].alive=false;
                 }*/
            }
        }
    }
};
function drawPath(color) {
    this.color = color;
    this.update = function () {
        this.ctx = gameArea.context;
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(100, 50, (gameArea.canvas.width) - 150, 50);
        this.ctx.fillRect(100, 100, 50, 250);
        this.ctx.fillRect(100, 350, gameArea.canvas.width - 300, 50);
        this.ctx.fillRect(800, 350, 50, 100);
    }
}
function placeImage(imgsrc, x, y, width, height) {
    this.ctx = gameArea.context;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    var img = new Image();
    img.src = imgsrc;
    this.update = function () {
        this.ctx.drawImage(img, this.x, this.y, this.width, this.height);
    };
}
function createTower(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.ctx = gameArea.context;
    this.update = function () {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
function enemyMovementTurn() {
    for (fy = 0; fy < enemies.length; fy++) {
        if (enemies[fy].x == 925 && enemies[fy].y == 75) enemies[fy].speedX = -1;
        if (enemies[fy].x == 125 && enemies[fy].y == 75) {
            enemies[fy].speedX = 0;
            enemies[fy].speedY = 1;
        }
        if (enemies[fy].x == 125 && enemies[fy].y == 375) {
            enemies[fy].speedX = 1;
            enemies[fy].speedY = 0;
        }
        if (enemies[fy].x == 825 && enemies[fy].y == 375) {
            enemies[fy].speedX = 0;
            enemies[fy].speedY = 1;
        }
        if (enemies[fy].x == 825 && enemies[fy].y == 425) {
            enemies[fy].speedX = 0;
            enemies[fy].speedY = 0;
            enemies[fy].alive = false;
            if(gameAudio=="true"){
                audioOof.load();
                audioOof.play(); 
            }
            
            playerLife--;
        }
    }
}
function resumeGame() {
    var f = updateGame;
    gameStopped = false;
    showSettings.settingsSettings.style.visibility = "hidden";
    showSettings.settingsReturnToGame.style.visibility = "hidden";
    interval = setInterval(f, 20);
}
function startInterval() {
    var f = updateGame;
    interval = setInterval(f, 20);
}
function towerProjectiles(radius, projectileSpeed, color, x, y, damage) {
    this.projectileSpeed = projectileSpeed;
    this.damage = damage;
    this.radius = radius;
    this.pix2 = (Math.PI) * 2;
    this.x = x;
    this.y = y;
    this.alive = true;
    this.ctx = gameArea.context;
    this.update = function () {
        this.color = color;
        this.y -= this.projectileSpeed;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, this.pix2, true);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }
}
function enemyMovement() {
    for (ff = 0; ff < towers.length; ff++) {
        towers[ff].update();
    }
    for (fx = 0; fx < enemies.length; fx++) {
        if(enemies[fx].hitPoints<=0){
            if(gameAudio=="true"){
                audioDeath.load();
                audioDeath.play();  
            }
        }
        if (enemies[fx].alive == false && enemies.length > 0) {
            enemies.splice(fx, 1);
        }
        if (enemies[fx].alive == true && enemies.length > 0) enemies[fx].update();

    }
    for (fs = 0; fs < projectiles.length; fs++) {
        if (projectiles[fs].alive) projectiles[fs].update();
    }
}
function playerLifeCheck() {
    if (playerLife == 0) {
        gameState = "gameOver";
        resetVariables();
        enemies = [];
        projectiles = [];
        towers = [];
        projectileIntervals = [];
    }
}
function printText(text, x, y, font, color) {
    this.x = x;
    this.y = y;
    this.ctx = gameArea.context;
    this.text = text;
    this.font = font;
    this.color = color;
    this.update = function () {
        this.ctx.font = this.font;
        this.ctx.fillStyle = this.color;
        this.ctx.fillText(playerLife, this.x, this.y);
    }

}
function toggleAudio(){
    if(gameAudio=="true"){
        audioMain.pause();
        gameAudio="false";
        return;
    }
    
    if(gameAudio=="false"){
        audioMain.play();
        gameAudio="true";
    }
    return;
}
function buttonVisibility(buttonState) {
    document.getElementById("settingsButton").style.visibility = buttonState;
    document.getElementById("towerButton").style.visibility = buttonState;
    document.getElementById("audioButton").style.visibility = buttonState;
}
function mainMenuButtons() {
    if (gameState == "mainMenu" && mouseClickX >= mainMenuButtonStartGame.x+5 && mouseClickX <= mainMenuButtonStartGame.x+mainMenuButtonStartGame.width+5 && mouseClickY >= mainMenuButtonStartGame.y+5 && mouseClickY <= mainMenuButtonStartGame.y+mainMenuButtonStartGame.height+5) {
        mouseClickX = 0;
        mouseClickY = 0;
        gameState = "instructions";
    }
    if (gameState == "mainMenu" && mouseClickX >= mainMenuButtonSettings.x+5 && mouseClickX <= mainMenuButtonSettings.x+mainMenuButtonSettings.width+5 && mouseClickY >= mainMenuButtonSettings.y+5 && mouseClickY <= mainMenuButtonSettings.y+mainMenuButtonSettings.height+5) {
        mouseClickX = 0;
        mouseClickY = 0;
    }
    if (gameState == "mainMenu" && mouseClickX >= mainMenuButtonExit.x+5 && mouseClickX <= mainMenuButtonExit.x+mainMenuButtonExit.width+5 && mouseClickY >= mainMenuButtonExit.y+5 && mouseClickY <= mainMenuButtonExit.y+mainMenuButtonExit.height+5) {
        mouseClickX = 0;
        mouseClickY = 0;
    }
}
function instructionsButtons() {
    if (gameState == "instructions" && mouseClickX >= instructionsButtonUnderstood.x+5 && mouseClickX <= instructionsButtonUnderstood.x+instructionsButtonUnderstood.width+5 && mouseClickY >= instructionsButtonUnderstood.y+5 && mouseClickY <= instructionsButtonUnderstood.y+instructionsButtonUnderstood.height+5) {
        mouseClickX = 0;
        mouseClickY = 0;
        gameState = "inGame";
        startGame();
    }
}
function resetVariables() {
    enemyCount = 0;
    fx = 0;
    fy = 0;
    projectileCount = 0;
    towerCount = 0;
    fs = 0;
    ff = 0;
    ft = 0;
    i = 0;
}
function gameOverButtons() {
    if (gameState == "gameOver" && mouseClickX >= gameOverButtonTryAgain.x+5 && mouseClickY >= gameOverButtonTryAgain.y+5 && mouseClickX <= gameOverButtonTryAgain.x+gameOverButtonTryAgain.width+5 && mouseClickY <= gameOverButtonTryAgain.y+gameOverButtonTryAgain.height+5) {
        mouseClickX = 0;
        mouseClickY = 0;
        startGame();
        gameState = "inGame";
    }
    if (gameState == "gameOver" && mouseClickX >= gameOverButtonExitGame.x+5 && mouseClickY >= gameOverButtonExitGame.y+5 && mouseClickX <= gameOverButtonExitGame.x+gameOverButtonExitGame.width+5 && mouseClickY <= gameOverButtonExitGame.y+gameOverButtonExitGame.height+5) {
        mouseClickX = 0;
        mouseClickY = 0;
        gameState = "mainMenu";
    }
}
/*function towerCreation() {
    towers[ff] = new createTower(mouseClickX, mouseClickY, 50, 50, "blue");
    ff++;
}*/
function updateGame() {
    if (gameState == "mainMenu") {
        buttonVisibility("hidden");
        mainMenu1.update();
        mainMenuButtonStartGame.update();
        mainMenuButtonSettings.update();
        mainMenuButtonExit.update();
        mainMenuButtons();
        document.getElementById("xyskusacky").innerHTML = "X:" + mouseX + " Y:" + mouseY;
    }
    if (gameState == "instructions") {
        buttonVisibility("hidden");
        instructionsButtons();
        instructions1.update();
        instructionsButtonUnderstood.update();
        document.getElementById("xyskusacky").innerHTML = "X:" + mouseX + " Y:" + mouseY;
    }
    if (gameState == "inGame") {
        gameTime++;
        buttonVisibility("visible");
        spawnEnemies();
        manageProjectiles();
        gameArea.clear();
        path1.update();
        uwaga1.update();
        //tower1.update();
        playerLifeCheck();
        heart1.update();
        printTextLife.update();
        document.getElementById("xyskusacky").innerHTML = "X:" + mouseX + " Y:" + mouseY;
        if (towerMenuDisplayed % 2) showTowerMenu1.update();
        if (gameStopped == true) clearInterval(interval);
        constructTower1.update();
        collision();
        enemyMovement();
        enemyMovementTurn();
    }
    if (gameState == "gameOver") {
        buttonVisibility("hidden");
        gameOver1.update();
        gameOverButtonTryAgain.update();
        gameOverButtonExitGame.update();
        gameOverButtons();
        document.getElementById("xyskusacky").innerHTML = "X:" + mouseX + " Y:" + mouseY;
    }
};