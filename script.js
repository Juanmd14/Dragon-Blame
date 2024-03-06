let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const body = document.querySelector('body');
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "start",
    "button text": [startGame],
    "button functions": [startGame],
    imagen: "https://assets.epuzzle.info/puzzle/111/288/original.webp",
    text: ""
  },
  {
    name: "Pueblo A",
    "button text": ["Entrar a la tienda", "Ir al bosque", "Seguir camino hacia las montañas"],
    "button functions": [goStore, goForest, goMountain],
    "button position top": [450,400,300],
    "button position left": ["250","1150","550"],
    text: "Llegas al pueblo A, no hay mucho, pero divisas una pequeña tienda, un cartel que señala la dirección hacia el bosque, y otro que señala la dirección hacia el pueblo B",
    img: 'url("https://img.pikbest.com/origin/09/32/81/75fpIkbEsTygS.jpg!sw800")'
  },
  {
    name: "Store",
    "button text": ["Comprar 10 de vida (10 de oro)", "Comprar un arma (30 de oro)", "Volver"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Entras a una tienda por suministros.",
    img: 'url("https://cdn.openart.ai/uploads/image_cK-y_XFZ_1709698674982_512.webp")'
  },
  {
    name: "Bosque",
    "button text": ["Pelear al slime", "Pedir clemencia a diosito", "Huir"],
    "button functions": [fightSlime, goTown, goTown],
    text: "Encontraste un slime, que haras?",
    img: 'url("https://t4.ftcdn.net/jpg/01/38/81/53/360_F_138815333_nxZVxnha49hAHSHeyIzcfz58c8s8ZRHC.jpg")'
  },
  {
    name: "Slime fight",
    "button text": ["Atacar", "Esquivar", "Huir"],
    "button functions": [attackSlime, dodgeSlime, goTown],
    text: "Blurp, Blurp",
    img: 'url("https://t4.ftcdn.net/jpg/01/38/81/53/360_F_138815333_nxZVxnha49hAHSHeyIzcfz58c8s8ZRHC.jpg")'
  },
 
  {
    name: "Cave",
    "button text": ["Un slime", "Bestia ", "Huir"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, goTown],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  },
  {
    name: "Montañas",
    "button text": ["Entrar a la cueva", "Pasar la noche y volver al otro dia", "Volver a la ciudad llorando"],
    "button functions": [goCave, goTown, goTown],
    text: "La montaña estaba vacia y el frio congelaba mis",
    img: 'url("https://cdn.openart.ai/uploads/image__bTHPcwg_1709702850630_raw.jpg")'
  },
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goForest;
button3.onclick = fightDragon;

function update(location) {
  body.style.backgroundImage = location.img;
  body.style.backgroundSize = "cover"; // Ajusta la imagen para que cubra completamente el contenedor
  body.style.backgroundPosition = "center";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];

  button1.style.top = location["button position top"][0];
  button2.style.top = location["button position top"][1];
  button3.style.top = location["button position top"][2];
  button1.style.left = location["button position left"][0];
  button2.style.left = location["button position left"][1];
  button3.style.left = location["button position left"][2];

}
  


function goTown() {
  update(locations[1]);
}

function goStore() {
  update(locations[2]);
}

function goMountain() {
  update(locations[11]);
}

function goCave() {
  update(locations[5]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightSlime() {
    update(locations[4]); // Corregido el índice para apuntar al escenario slimeFight
  }


function attackSlime() {
  text.innerText = "ej: Atacaste al slime !";
  // Lógica de ataque al slime
}

function dodgeSlime() {
  text.innerText = "ej: Esquivaste al slime !";
  // Lógica de esquivar al slime
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goForest() {
  update(locations[3]); // Actualiza a la ubicación del bosque
}

function goFight() {
  update(locations[6]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[8]);
}

function winGame() {
  update(locations[9]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[10]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}

function inicio(){
  
    const welcomeMessage = document.querySelector('.welcome-message');
  
    // retrasa el tiempo del mensaje al principio
    setTimeout(() => {
        welcomeMessage.classList.add('show');
    }, 500);
  
    // click para inicio
    document.getElementById('startGame').addEventListener('click', function() {
        var playerName = document.getElementById('playerName').value;
        if (playerName.trim() !== '') {
            // Aquí puedes hacer algo con el nombre del jugador, como mostrarlo.
  
            // Ocultar pantalla de inicio y mostrar el juego.
            document.getElementById('startScreen').style.display = 'none';
            update(locations[1]);
            text.style.display='flex';
           // document.getElementById('city').style.display = 'flex';
            document.getElementById('stats').style.display = 'flex';
            document.getElementById('controls').style.display= 'flex';
        } else {
            alert('Por favor, ingresa tu nombre antes de comenzar el juego.');
        }
    });
  }

  document.addEventListener('DOMContentLoaded', inicio());

