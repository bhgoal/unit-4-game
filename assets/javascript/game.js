// Define base stats for each of 4 characters.
var stats = {
    scav: {
        health: 80,
        attackPower: 16, // If this character is chosen as player character, attack power = damage dealt by player to enemies.
        counterattackPower: 16
    },
    bear: {
        health: 100,
        attackPower: 10,
        counterattackPower: 10 // If this character is an enemy, counterattack power = damage received by player when attacking this enemy
    },
    usec: {
        health: 120,
        attackPower: 8,
        counterattackPower: 10
    },
    prapor: {
        health: 140,
        attackPower: 6,
        counterattackPower: 8
    }
};

// HTML to be inserted into various page elements, to move character cards around screen.
// Contains span element for reactive health display when dealing/receiving damage.
var showCard = {
    scav: '<div class="card mx-auto" id="scav" style="width: 14rem;"><img class="card-img-top" src="assets/images/scav.png" alt="Scav image cap"><div class="card-body"><h5 class="card-title">Scav - <span id="scavHealth">80</span> HP</h5></div></div>',
    bear: '<div class="card mx-auto" id="bear" style="width: 14rem;"><img class="card-img-top" src="assets/images/bear.png" alt="Bear image cap"><div class="card-body"><h5 class="card-title">BEAR - <span id="bearHealth">100</span> HP</h5></div></div>',
    usec: '<div class="card mx-auto" id="usec" style="width: 14rem;"><img class="card-img-top" src="assets/images/usec.png" alt="Usec image cap"><div class="card-body"><h5 class="card-title">USEC - <span id="usecHealth">120</span> HP</h5></div></div>',
    prapor: '<div class="card mx-auto" id="prapor" style="width: 14rem;"><img class="card-img-top" src="assets/images/prapor.png" alt="Prapor image cap"><div class="card-body"><h5 class="card-title">Prapor - <span id="praporHealth">140</span> HP</h5></div></div>',
    button: '<div class="text-center"><button type="button" id="attackButton" class="btn btn-danger btn-lg mt-5">Attack!</button></div>',
    gameOver:'<h1 class="text-white text-center">Game Over. You died!</h1>'
};

// Name of player character choice
var characterChoice = "";

// Number of attacks player has performed so far, to track increasing attack damage.
var numberAttacks = 1;

var playerChar = {
    health: "",
    attackPower: "",
    counterattackPower: ""
};
var enemyChar = {
    health: "",
    attackPower: "",
    counterattackPower: ""
};
// Array to track how many enemies left to defeat.
var charactersRemain = ["scav", "bear", "usec", "prapor"];

//function hover( ) {
    //$(".card").hover(function(){
    //    $(this).css({"border": "3px solid greenyellow", "box-sizing": "content-box"});
    //    }, function(){
    //   $(this).css("border", "0px");
    //});
//}

// New game resets player/enemy character choices and stats
function newGame() {
    console.log("Begin newGame function");
    characterChoice = "";

    numberAttacks = 1;

    playerChar = {
        health: "",
        attackPower: "",
        counterattackPower: ""
    };
    enemyChar = {
        health: "",
        attackPower: "",
        counterattackPower: ""
    };
    charactersRemain = ["scav", "bear", "usec", "prapor"];
    console.log(charactersRemain);

    // Hide attack button
    $("#attackButton").css("visibility","hidden");
    selectCharacter();
}
newGame();


// Select character
function selectCharacter() {
    console.log("Begin selectCharacter function");
    $(".card").on("click", function() {
        // Player clicks on a character card, choice is recorded as string into characterChoice
        characterChoice = $(this).attr("id");
        // Clear intro message
        $("#charMessage").css("display", "none");
        $("#spacer").css("height", "18vh");
        // Stats of selected character copied into playerChar object
        for(var k in stats.bear) {playerChar[k]=stats[characterChoice][k];}
        console.log(playerChar);

        // Remove chosen character from array of remaining
        charactersRemain.splice($.inArray(characterChoice, charactersRemain),1);
        console.log(charactersRemain);
        // Move chosen character to far left of screen, others to right
        $("#leftSubCol1").html(showCard[characterChoice]);
        $("#leftSubCol2").html("");
        $("#rightSubCol1").html("");
        $("#rightSubCol2").html("");
        for (i = 0; i < charactersRemain.length; i++) {
            $("#rightSubCol2").append(showCard[charactersRemain[i]]);
        }
        selectEnemy();
    });
}

// Select enemy to fight
function selectEnemy() {
    console.log("Begin selectEnemy function");
    $(".card").on("click", function() {
        // Prevent player character card from being selected
        if ($(this).attr("id") != characterChoice) {
            activeEnemy = $(this).attr("id");
            for(var k in stats.bear) {enemyChar[k]=stats[activeEnemy][k];}
            console.log(enemyChar);

            // Remove chosen enemy from array of remaining
            charactersRemain.splice($.inArray(activeEnemy, charactersRemain),1);
            console.log(charactersRemain);
            // Move chosen character to left
            $("#rightSubCol1").html(showCard[activeEnemy]);
            $("#rightSubCol2").html("");
            for (i = 0; i < charactersRemain.length; i++) {
                $("#rightSubCol2").append(showCard[charactersRemain[i]]);
            }
            attack();
        }
    });
}

// Player attacks enemy
function attack() {
    console.log("Begin attack function");
    // Show attack button on screen
    $("#leftSubCol2").html(showCard.button);
    $("#attackButton").css("visibility","visible");
    $("#attackButton").unbind('click').on("click", function() {
        // Player takes damage from enemy
        playerChar.health -= enemyChar.attackPower;
        // Update player display
        $(`#${characterChoice}Health`).html(playerChar.health);
        // Player deals damage to enemy, multiplied by total number of attacks performed
        enemyChar.health -= (numberAttacks * playerChar.attackPower);
        // Update enemy display
        $(`#${activeEnemy}Health`).html(enemyChar.health);
        // Update attack count
        numberAttacks ++;
        console.log("numberAttacks: " + numberAttacks);
        console.log("Player health: " + playerChar.health);
        console.log("Enemy health: " + enemyChar.health);

        // Lose condition
        if (playerChar.health <= 0) {
            console.log("Game over: You died");
            $("#attackButton").css("visibility","hidden");
            $("#leftSubCol2").html(showCard.gameOver);
        }

        // When current enemy defeated
        if (enemyChar.health <= 0) {
            $("#attackButton").css("visibility","hidden");
            $("#leftSubCol2").html('<h1 class="text-white text-center">Enemy defeated!</h1>');
            console.log("Enemy defeated");
            // Clear enemy from fight area
            $("#rightSubCol1").html("");
            // Win condition if enemy was last one
            if (charactersRemain.length === 0) {
                $("#leftSubCol2").html('<h1 class="text-white text-center">You survived!</h1>');
                console.log("You win!");
            } else { // Otherwise, return to enemy selection
                $("#rightSubCol1").html('<h1 class="text-white text-center">Select next enemy:</h1>');
                selectEnemy();
            }
        }
    });
}
