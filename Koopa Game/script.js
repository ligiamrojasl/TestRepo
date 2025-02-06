var player = document.getElementById("player");
var target = document.getElementById("target");
var targetX, targetY;
var playerX = 0;
var playerY = 0;
var speed = 30;

// bestTime variable will gather the window storage info to retrieve the best score, localstorage: The localStorage read-only property of the window interface allows you to access a Storage object for the Document's origin;
// The get.Item() is a method fromm the Storage Interface. which is going to gather the item called bestTime
var bestTime = localStorage.getItem("bestTime");

if (!bestTime) {
    bestTime = Infinity;
}

updateBestTimeDisplay();

// Set the initial position of the target picture
setTargetPosition();


document.addEventListener("keydown", function(event) {
    if ([37, 38, 39, 40].includes(event.keyCode)) {
        switch(event.keyCode) {
            case 37: // left arrow
                playerX -= speed;
                player.style.transform = "scaleX(-1)";
                break;
            case 39: // right arrow
                playerX += speed;
                player.style.transform = "scaleX(1)";
                break;
            case 38: // up arrow
                playerY -= speed;
                break;
            case 40: // down arrow
                playerY += speed;
                break;
        }

        // Check for collision with the target picture
        if (collision(player, target)) {
            var currentTime = new Date().getTime();
            var catchTime = currentTime - startTime;
            if (catchTime < bestTime) {
                bestTime = catchTime;
                localStorage.setItem("bestTime", bestTime);
                updateBestTimeDisplay();
            }
            setTargetPosition();
        }

        player.style.left = playerX + "px";
        player.style.top = playerY + "px";

        // Move the player towards the target picture
        var dx = targetX - playerX;
        var dy = targetY - playerY;
        var distance = Math.sqrt(dx * dx + dy * dy);
        var vx = (dx / distance) * speed;
        var vy = (dy / distance) * speed;
        playerX += vx;
        playerY += vy;
    }
    
});

// Function to set the position of the target picture randomly
function setTargetPosition() {
    var targetWidth = target.offsetWidth;
    var targetHeight = target.offsetHeight;
  
    var maxX = window.innerWidth - targetWidth;
    var maxY = window.innerHeight - targetHeight;
  
    targetX = Math.floor(Math.random() * maxX);
    targetY = Math.floor(Math.random() * maxY);
  
    target.style.left = targetX + "px";
    target.style.top = targetY + "px";
  
    startTime = new Date().getTime();
  }

// Function to check if two elements are colliding
function collision(element1, element2) {
    var rect1 = element1.getBoundingClientRect();
    var rect2 = element2.getBoundingClientRect();
    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}

// Function to update the best time display
function updateBestTimeDisplay() {
    var bestTimeElement = document.getElementById("bestTime");
    bestTimeElement.textContent = "Best Time: " + formatTime(bestTime);
}

// Function to format the time in milliseconds as mm:ss
function formatTime(time) {
    var minutes = Math.floor(time / 60000);
    var seconds = ((time % 60000) / 1000).toFixed(2);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
