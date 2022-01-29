var cadTypes = ["Saber", "Duelist", "Brawler", "Mauler", "Lancer", "Phalanx"]; 
var cadIndex = [0, 1, 2, 3, 4, 5, 6]; // Saber, Duellist, Brawler, Mauler, Lancer, Phalanx, A-Type
var strengthMod = [0, -2, 2, 4, 0, 0, 0];
var enduranceMod = [0, -2, -2, -3, 1, 4, 0];
var speedMod = [0, 5, 4, -2, 0, -2, 0]; 
var cognitionMod = [0, 2, 4, -2, 0, 0, 0];
var offenseMod = [0, 0, 1, 3, 1, -2, 0];
var defenseMod = [0, -2, -1, -3, 0, 4, 0];
var cadType = "";
var cadIndexValue = 0;
var colors = ["White", "Black", "Blue", "Green", "Lime", "Gray", "Maroon", "Red", "Purple", "Yellow", "Pink", "Bronze", "Silver", "Gold", "Orange"];
var cadRankNum = 0;
var cadRankFinalNum = 0;
var cadRankDisplay = "";
var letterRanks = ["F", "E", "D", "C", "B", "A", "S"];
var strengthScore, enduranceScore, speedScore, cognitionScore, offenseScore, defenseScore, growthScore;

function generateCAD() {
    generateType();
    generateColors();
    generateRank();

    generateCadScores();
    generateUserScores();
   
    generateName();

    finalRank();

    //alert("Cad Created!");
}

function finalRank() {
    cadRankFinalNum = strengthScore + enduranceScore + speedScore + cognitionScore + offenseScore + defenseScore + growthScore;
    cadRankFinalNum = Math.floor(cadRankFinalNum/7);

    document.getElementById('cad_rank').innerHTML = convertToRank(cadRankFinalNum);
}

function generateName() {
    var name = capitalizeFirstLetter(generate_name('nouns2'));
    document.getElementById('cad_name').innerHTML = name;
}

function generateType() {
    var shuffledCads = shuffle(cadTypes);
    cadType = shuffledCads[Math.floor(Math.random()*shuffledCads.length)];
    if(Math.random() > 0.95) { cadType = "A-Type"; }

    cadIndexValue = ( ( cadType == "Saber" ) ? 0 : ( ( cadType == "Duelist" ) ? 1 : ( ( cadType == "Brawler" ) ? 2 : ( ( cadType == "Mauler" ) ? 3 : ( ( cadType == "Lancer" ) ? 4 : ( ( cadType == "Phalanx" ) ? 5 : 6 ) ) ) ) ) );

    document.getElementById('cad_type').innerHTML = cadType;
}

function generateCadScores() {
    var cad_adjustment = 15;
    var growth_mod = 10;
    var lower_limit = cadRankNum - cad_adjustment;
    lower_limit = lower_limit > 0 ? lower_limit : 0;
    var upper_limit = cadRankNum + cad_adjustment;
    document.getElementById('cad_offense').innerHTML = convertToRank(offenseScore = randn_bm(lower_limit + offenseMod[cadIndexValue], upper_limit + offenseMod[cadIndexValue], 1));
    document.getElementById('cad_defense').innerHTML = convertToRank(defenseScore = randn_bm(lower_limit + defenseMod[cadIndexValue], upper_limit + defenseMod[cadIndexValue], 1));
    document.getElementById('cad_growth').innerHTML = convertToRank(growthScore = randn_bm(lower_limit + growth_mod , upper_limit + growth_mod, 1)); 
}

function generateUserScores() {
    var cad_adjustment = 15;
    var lower_limit = cadRankNum - cad_adjustment; 
    lower_limit = lower_limit > 0 ? lower_limit : 0;
    var upper_limit = cadRankNum + cad_adjustment;
    document.getElementById('cad_strength').innerHTML = convertToRank(strengthScore = randn_bm(lower_limit + strengthMod[cadIndexValue], upper_limit + strengthMod[cadIndexValue], 1));
    document.getElementById('cad_endurance').innerHTML = convertToRank(enduranceScore = randn_bm(lower_limit + enduranceMod[cadIndexValue], upper_limit + enduranceMod[cadIndexValue], 1));
    document.getElementById('cad_speed').innerHTML = convertToRank(speedScore = randn_bm(lower_limit + speedMod[cadIndexValue], upper_limit + speedMod[cadIndexValue], 1));
    document.getElementById('cad_cognition').innerHTML = convertToRank(cognitionScore = randn_bm(lower_limit + cognitionMod[cadIndexValue], upper_limit + cognitionMod[cadIndexValue], 1)); 
}

function generateRank() {
    cadRankNum = Math.floor(randn_bm(0, 35, 0.6));

    document.getElementById('cad_rank').innerHTML = convertToRank(cadRankNum); 
}

function convertToRank(numVal) {
    var letter = letterRanks[Math.floor(numVal/10)];
    return letter + (numVal % 10);
}


function generateColors() {
    var vysetrium = colors[Math.floor(Math.random()*colors.length)];
    var steel1 = colors[Math.floor(Math.random()*colors.length)]; 
    var steel2 = colors[Math.floor(Math.random()*colors.length)];
    while( vysetrium == steel1 ) { steel1 = colors[Math.floor(Math.random()*colors.length)]; }
    while( vysetrium == steel2 ) { steel2 = colors[Math.floor(Math.random()*colors.length)]; } 

    document.getElementById('cad_vysetrium').innerHTML = vysetrium;
    document.getElementById('cad_steel1').innerHTML = steel1;
    document.getElementById('cad_steel2').innerHTML = steel2; 
}

function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function randn_bm(min, max, skew) {
  let u = 0, v = 0;
  while(u === 0) u = Math.random() //Converting [0,1) to (0,1)
  while(v === 0) v = Math.random()
  let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v )

  num = num / 10.0 + 0.5 // Translate to 0 -> 1
  if (num > 1 || num < 0)
    num = randn_bm(min, max, skew) // resample between 0 and 1 if out of range

  else{
    num = Math.pow(num, skew) // Skew
    num *= max - min // Stretch to fill range
    num += min // offset to min
  }
  return Math.floor(num)
}
