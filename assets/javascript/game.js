//Create four character options, each with 3 stats: Health, attack power, counterattack power.
//    Create img for each, link img to click, click = var(playerCharacter)
//    Swap div elements to hide remaining characters, show those 3 characters in Enemies to Attack instead
//    Click on remaining 3 characters = var(enemyChosen)
//    Swap div elements to hide remaining characters, show enemyChosen in Fight section
//    enemiesRemaining = 3
//    Attack button function:
//        numberAttacks ++
//        enemy Health -= player Attack power
//        player Health -= enemy Counterattack power
//        player Attack power = (numberAttacks + 1) * player Attack power

//    if (enemy Health == 0)
//        Swap div to hide enemyChosen
//        Prompt new enemy selection
//        return to Attack button stage
//        enemiesRemaining --

//    if (player Health == 0)
//        Player loses

//    if (enemiesRemaining == 0)
//        Player wins]

var health = {
    scav: 50,
    bear: 75,
    usec: 75,
    prapor: 100,
};

var stats = {
    scav: {
        health: 50,
        attackPower: 4,
        counterattackPower: 6
    },
    bear: {
        health: 55,
        attackPower: 5,
        counterattackPower: 3
    },
    usec: {
        health: 70,
        attackPower: 2,
        counterattackPower: 8
    },
    prapor: {
        health: 100,
        attackPower: 9,
        counterattackPower: 9
    }
};

var characterChoice = "";

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

var showCard = {
    scav: '<div class="card" id="scav" style="width: 14rem;"><img class="card-img-top" src="assets/images/scav.png" alt="Scav image cap"><div class="card-body"><h5 class="card-title">Scav</h5></div></div>',
    bear: '<div class="card" id="bear" style="width: 14rem;"><img class="card-img-top" src="assets/images/bear.png" alt="Bear image cap"><div class="card-body"><h5 class="card-title">Bear</h5></div></div>',
    usec: '<div class="card" id="usec" style="width: 14rem;"><img class="card-img-top" src="assets/images/usec.png" alt="Usec image cap"><div class="card-body"><h5 class="card-title">Usec</h5></div></div>',
    prapor: '<div class="card" id="prapor" style="width: 14rem;"><img class="card-img-top" src="assets/images/prapor.png" alt="Prapor image cap"><div class="card-body"><h5 class="card-title">Prapor</h5></div></div>',
};

var charactersRemain = ["scav", "bear", "usec", "prapor"];
console.log(charactersRemain);

// Select character
function selectCharacter() {
    $(".card").on("click", function() {
        characterChoice = $(this).attr("id");
        console.log("character clicked");
        console.log(stats[characterChoice]);
        for(var k in stats.bear) {playerChar[k]=stats[characterChoice][k];}
        console.log(playerChar);

        // Remove chosen character from array of remaining
        charactersRemain.splice($.inArray(characterChoice, charactersRemain),1);
        console.log(charactersRemain);
        // Move chosen character to left, others to right
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
selectCharacter();

// Select active enemy
function selectEnemy() {
    $(".card").on("click", function() {
        if ($(this).attr("id") != characterChoice) {
            activeEnemy = $(this).attr("id");
            console.log("enemy clicked");
            console.log(stats[activeEnemy]);
            for(var k in stats.bear) {enemyChar[k]=stats[activeEnemy][k];}
            console.log(enemyChar);
            charactersRemain.splice($.inArray(activeEnemy, charactersRemain),1);
            console.log(charactersRemain);
            // Move chosen character to left, others to right
            $("#rightSubCol1").html(showCard[activeEnemy]);
            $("#rightSubCol2").html("");
            for (i = 0; i < charactersRemain.length; i++) {
                $("#rightSubCol2").append(showCard[charactersRemain[i]]);
            }
            attackMode = true;
            attack();
        }
    });
}

function attack() {
    $("#attackButton").on("click", function() {
        if (attackMode === true) {
            console.log("button clicked");
            playerChar.health -= enemyChar.attackPower;
            enemyChar.health -= (numberAttacks * playerChar.attackPower);
            numberAttacks ++;
            console.log("numberAttacks: " + numberAttacks);
            console.log("player health: " + playerChar.health);
            console.log("enemy health: " + enemyChar.health);
            if (playerChar.health <= 0) {
                console.log("Game over: You died");
                attackMode = false;
            }
            if (enemyChar.health <= 0) {
                attackMode = false;
                console.log("Enemy defeated");
                $("#rightSubCol1").html("");
                if (charactersRemain.length === 0) {
                    console.log("You win!");
                } else {
                    selectEnemy();
                }
            }
            console.log(attackMode);
        } else {
            console.log("select new enemy");
        }
    });
}
