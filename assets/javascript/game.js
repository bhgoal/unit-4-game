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

var scavCharacter = {
    health: 50,
    attackPower: 4,
    counterattackPower: 6,
};

var bearCharacter = {
    health: 50,
    attackPower: 4,
    counterattackPower: 6,
};

var usecCharacter = {
    health: 50,
    attackPower: 4,
    counterattackPower: 6,
};

var praporCharacter = {
    health: 50,
    attackPower: 4,
    counterattackPower: 6,
};

var characterChoice = "";

var showCard = {
    scav: '<div class="card" id="scav" style="width: 18rem;"><img class="card-img-top" src="assets/images/scav.png" alt="Scav image cap"><div class="card-body"><h5 class="card-title">Scav</h5><p class="card-text">Some quick placeholder text for the scav character.</p><a href="#" class="btn btn-primary">Go somewhere</a></div></div>',

    bear:'<div class="card" id="bear" style="width: 18rem;"><img class="card-img-top" src="assets/images/bear.png" alt="Bear image cap"><div class="card-body"><h5 class="card-title">Bear</h5><p class="card-text">Some quick placeholder text for the bear character.</p><a href="#" class="btn btn-primary">Go somewhere</a></div></div>',
};



//var charactersRemain = ["scav", "bear", "usec", "prapor"];
//console.log(charactersRemain);

$(".card").on("click", function() {
    console.log("character clicked");
    characterChoice = $(this).attr("id");
    console.log(characterChoice);
    charactersRemain.splice($.inArray(characterChoice, charactersRemain),1);
    console.log(charactersRemain);
    $("#leftSubCol2").html(showCard.characterChoice);
});

console.log(showCard.characterChoice);