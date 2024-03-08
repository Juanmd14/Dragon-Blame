let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Palo"];

const fondoimg = document.getElementById('fondoimg');
const fondo = document.getElementById('fondo');
const body = document.querySelector('body');
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const text = document.getElementById('text');
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'palo', power: 5 },
  { name: 'Daga', power: 30 },
  { name: 'Martillo Pesado', power: 50 },
  { name: 'Espada', power: 100 }
];
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15,
    image: "img/Slime.jpg"
  },
  {
    name: "bestia",
    level: 8,
    health: 60,
    image: "img/Bestia.jpg"
  },
  {
    name: "dragon",
    level: 20,
    health: 300,
    image: "img/Dragon.jpg"
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
    "button position top": ["40%","35%","20%"],
    "button position left": ["13%","77%","28%"],
    text: "Llegas al pueblo A, no hay mucho, pero divisas una pequeña tienda, un cartel que señala la dirección hacia el bosque, y otro que señala la dirección hacia el pueblo B",
    img: "https://img.pikbest.com/origin/09/32/81/75fpIkbEsTygS.jpg!sw800"
  },
  {
    name: "Store",
    "button text": ["Poción de vida (10 de oro)", "Arma nueva(30 de oro)", "Volver"],
    "button functions": [buyHealth, buyWeapon, goTown],
    "button position top": ["50%","60%","75%"],
    "button position left": ["75%","25%","30%"],
    text: "Entras a una tienda por suministros. altos pobres",
    img: "img/Tienda.jpg"
  },
  {
    name: "Bosque",
    "button text": ["Pelear al slime", "Esconderse detras de un arbol", "Huir"],
    "button functions": [fightSlime, goThree, goTown],
    "button position top": ["55%","30%","74%"],
    "button position left": ["10%","74%","70%"],
    text: "Encontraste un grupo de slime, que haras?",
    img: "img/Bosque2.jpg"
  },
  {
    name: "slime fight",
    "button text": ["Atacar", "Esquivar", "Huir"],
    "button functions": [attack, dodge, goTown],
    "button position top": ["75%","75%","75%"],
    "button position left": ["35%","40%","45%"],
    text: "Blurp, Blurp",
    img: "img/Slime fight2.jpg"
  },
 
  {
    name: "cave",
    "button text": ["Pelear a la Bestia ", "Huir"],
    "button functions": [fightBeast, goTown],
    "button position top": ["33%","80%"],
    "button position left": ["37%","45%"],
    text: "Entras a la cueva y en la oscuridad ves la bestia.",
    img: "img/Cueva.jpg"
  
  },
  {
    name: "fight bestia",
    "button text": ["Atacar", "Esquivar", "Huir"],
    "button functions": [attack, dodge, goMountain],
    "button position top": ["75%","75%","75%"],
    "button position left": ["35%","40%","45%"],
    text: "La bestia era enorme",
    img : "img/Bestia pelea.jpg"
  },
  {
    name: "kill monster",
    "button text": ["Volver a casa","Volver a casa", "Volver a casa"],
    "button functions": [goTown],
    "button position top": ["20%"],
    "button position left": ["80%"],
    text: "El monstruo cae y obtienes experiencia y oro.",
    img :"img/Defeat monster.jpg"
  },
  {
    name: "lose",
    "button text": ["Jugar de nuevo?"],
    "button position top": ["32%"],
    "button position left": ["48%"],
    "button functions": [restart],
    text: "Has muerto. &#x2620;",
    img: "img/Muerte.jpg"
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
    "button text": ["Entrar a la cueva", "Volver a la ciudad","Ir a la ciudad que sigue por el camino"],
    "button functions": [goCave, goTown, goTown2],
    "button position top": ["80%","50%","55%"],
    "button position left": ["40%","60%","20%"],
    text: "La montaña estaba vacia y el frio congelaba mis",
    img: "img/montaña.jpg"
  },
  {
    name: "Escondido del slime",
    "button text": ["Ya no te ve es hora de irte"],
    "button functions": [goTown],
    "button position top": ["50%"],
    "button position left": ["78%"],
    text: "rodeando el arbol el slime ya no me ve",
    img: "img/escondido.jpg"
  },
  {
    name: "Pueblo B",
    "button text": ["Entrar a la tienda", "Subir a lo alto de la montaña", "Volver"],
    "button functions": [goStore2, fightDragon, goMountain],
    "button position top": ["40%","30%","75%"],
    "button position left": ["13%","35%","30%"],
    text: "Llegas al pueblo A, no hay mucho, pero divisas una pequeña tienda, un cartel que señala la dirección hacia el bosque, y otro que señala la dirección hacia el pueblo B",
    img: "img/ciudad B.jpg"
  },
  {
    name: "Dragon",
    "button text": ["Atacar", "Esquivar", "Huir"],
    "button functions": [attack, dodge, goTown2],
    "button position top": ["75%","75%","75%"],
    "button position left": ["35%","40%","55%"],
    text: "Dragon",
    img: "img/Dragon.jpg"
  },
  {
    name: "Store2",
    "button text": ["Poción de vida", "Arma nueva", "Volver"],
    "button functions": [buyHealth, buyWeapon, goTown],
    "button position top": ["35%","28%","75%"],
    "button position left": ["40%","20%","60%"],
    text: "Entras a una tienda por suministros.",
    img: "img/Store2.jpg"
  },
];


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
          document.getElementById('fondo').style.display = 'flex';
          update(locations[1]);
          text.style.display='flex';
          document.getElementById('marcopj').style.display = 'flex';
          document.getElementById('stats').style.display = 'flex';
          document.getElementById('controls').style.display= 'flex';
          updateHealthBar();
      } else {
          alert('Por favor, ingresa tu nombre antes de comenzar el juego.');
      }
  });
}

// Evento DOMContentLoaded para llamar a la función inicio()
document.addEventListener('DOMContentLoaded', inicio());
// initialize buttons
button1.onclick = goStore;
button2.onclick = goForest;
button3.onclick = goMountain;

function update(location) {
  fondoimg.setAttribute("src", location.img); // Cambia la imagen del fondo en el div fondo
  
  // Oculta todos los botones
  button1.style.display = 'none';
  button2.style.display = 'none';
  button3.style.display = 'none';

  // Verifica si estamos en "Escondido del slime"
  if (location.name === "Escondido del slime" ||  location.name === "lose"  || location.name === "kill monster") {  // aca agregas locations si queres que se muestre 1 solo boton
    // Muestra solo el botón de "Huir"
    button1.innerText = location["button text"][0]; // Cambiado de 2 a 0 ya que solo hay un boton
    button1.onclick = location["button functions"][0]; // Cambiado de 2 a 0 ya que solo hay una funcion
    button1.style.display = 'block';       
  } else if (location.name === "cave") {   //aca tambien podemos agregar mas locations
    // Muestra solo 2 botones 
    button1.innerText = location["button text"][0]; 
    button1.onclick = location["button functions"][0]; 
    button1.style.display = 'block';
    button2.innerText = location["button text"][1]; 
    button2.onclick = location["button functions"][1]; 
    button2.style.display = 'block';
  } else {
    //  muestra los botones normales
    button1.innerText = location["button text"][0];
    button1.onclick = location["button functions"][0];
    button1.style.display = 'block';
    button2.innerText = location["button text"][1];
    button2.onclick = location["button functions"][1];
    button2.style.display = 'block';
    button3.innerText = location["button text"][2]; // Agregado
    button3.onclick = location["button functions"][2]; // Agregado
    button3.style.display = 'block'; // Agregado
  }

  button1.style.top = location["button position top"][0];
  button2.style.top = location["button position top"][1];
  button3.style.top = location["button position top"][2];
  button1.style.left = location["button position left"][0];
  button2.style.left = location["button position left"][1];
  button3.style.left = location["button position left"][2];

  // Oculta el marco del monstruo al actualizar la ubicación
  const marcoMonstruo = document.getElementById('marcomonstruo2');
  if (marcoMonstruo) {
    marcoMonstruo.style.display = 'none';
  } else {
    console.error("El elemento 'marcomonstruo2' no existe en el DOM.");
  }
  const statsMonstruo = document.getElementById('monsterStats');
  if (statsMonstruo) {
    statsMonstruo.style.display = 'none';
  } else {
   console.error("El elemento 'statsmonstruo' no existe en el DOM.");
  }
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

function goThree() {
  update(locations[12]);
}

function goCave() {
  update(locations[5]); 
}

function goTown2() {
  update(locations[13]);
}

function goStore2() {
  update(locations[15]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "No tienes oro para comprar esta pocion.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Ahora tienes una " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " En tu inventario tienes: " + inventory;
    } else {
      text.innerText = "No tienes oro para comprar un arma.";
    }
  } else {
    text.innerText = "Ya tienes el mejor equipamiento";
    button2.innerText = "Vender arma 15 de oro";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Has vendido tu " + currentWeapon + ".";
    text.innerText += " En tu inventario tienes : " + inventory;
  } else {
    text.innerText = "No vendas tu unica arma!";
  }
}

function fightSlime() {
  fighting = 0; // Inicializa fighting en 0 cuando peleas con el slime
  goFight(); // Manda a la pelea
  update(locations[4]); // Actualiza la ubicación a la pelea con el slime
  
  // Verifica si el elemento existe antes de intentar acceder a su estilo
  const marcoMonstruo = document.getElementById('marcomonstruo2');
  if (marcoMonstruo) {
    marcoMonstruo.style.display = 'flex'; // Muestra el marco del personaje
  } else {
    console.error("El elemento 'marcomonstruo2' no existe en el DOM.");
  }
  
  const statsMonstruo = document.getElementById('monsterStats');
  if (statsMonstruo) {
    statsMonstruo.style.display = 'flex';
  } else {
    console.error("El elemento 'statsmonstruo' no existe en el DOM.");
  }
}

function fightBeast() {
  fighting = 1;
  goFight();
  update(locations[6]);
  document.getElementById('marcomonstruo2').style.display = 'flex'; 
  document.getElementById('statsMonstruo').style.display = 'flex'; // Muestra el marco del personaje
}

function fightDragon() {
  fighting = 2;
  goFight();
  update(locations[14]);
  document.getElementById('marcomonstruo2').style.display = 'flex';
  document.getElementById('statsMonstruo').style.display = 'flex';  // Muestra el marco del personaje
}

function goForest() {
  update(locations[3]); // Actualiza a la ubicación del bosque
}

function goFight() {
  monsterHealth = monsters[fighting].health;
  monsterHealthText.innerText = monsterHealth; // Agrega esta línea para actualizar el texto de la salud del monstruo en la interfaz
  
  // Obtén el elemento de la imagen del monstruo
  const monsterImage = document.querySelector("#marcomonstruo2 img");
  
  // Actualiza el atributo src de la imagen del monstruo con la ruta de la imagen correspondiente al monstruo actual
  monsterImage.src = monsters[fighting].image;

  // Muestra el marco del monstruo
  const statsMonstruo = document.getElementById('monsterStats');
  const marcoMonstruo = document.getElementById('marcomonstruo2');
  if (marcoMonstruo && statsMonstruo) {
    marcoMonstruo.style.display = 'flex';
  } else {
    console.error("El elemento no existe en el DOM.");
  }
}
document.getElementById('marcomonstruo').style.display = 'block';
document.getElementById('monsterStats').style.display = 'block';

function endFight() {
  // Ocultar el marco del monstruo
  document.getElementById('marcomonstruo').style.display = 'none';
  document.getElementById('monsterStats').style.display = 'none';
  
}

function attack() {
  text.innerText = monsters[fighting].name + " ataca.";
  text.innerText += " Lo atacas con tu " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    // Calcula el daño infligido al monstruo
    let playerDamage = weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    text.innerText += " ¡Has infligido " + playerDamage + " de daño!";
    console.log(`monsterHealth antes del ataque: ${monsterHealth}`);
    monsterHealth -= playerDamage;
    console.log(`monsterHealth después del ataque: ${monsterHealth}`);
    
    // Asegúrate de actualizar el texto de la salud del monstruo en la interfaz
    monsterHealthText.innerText = monsterHealth;
  } else {
    text.innerText += " Has fallado.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      console.log("Monstruo derrotado"); // Verifica si esta condición se cumple correctamente
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Tu " + inventory.pop() + " se ha roto.";
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
  text.innerText = "Has esquivado el ataque de " + monsters[fighting].name;
}

function updateHealthBar() {
  const maxHealth = 100; // Valor máximo de vida del personaje
  const healthPercentage = (health / maxHealth) * 100; // Calcula el porcentaje de vida actual
  const barraVida = document.getElementById('barravida');
  const healthText = document.getElementById('healthText');

  // Si el personaje está en una pelea (fighting es verdadero), actualiza la barra de vida
  // de acuerdo a la salud del personaje, de lo contrario, la barra de vida permanece sin cambios.
  if (fighting) {
    barraVida.style.width = healthPercentage + '%'; // Establece el ancho de la barra de vida según el porcentaje de vida actual
    healthText.innerText = health; // Actualiza el texto de la salud
  } else {
    // Si no está en pelea, se asume que el personaje está comprando una poción,
    // por lo que la barra de vida se incrementa en 10 puntos.
    health += 10;
    if (health > maxHealth) {
      health = maxHealth; // Limita la salud al valor máximo
    }
    barraVida.style.width = ((health / maxHealth) * 100) + '%'; // Actualiza el ancho de la barra de vida
    healthText.innerText = health; // Actualiza el texto de la salud
  }
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[7]);
}

function lose() {
  update(locations[8]);
}

function winGame() {
  update(locations[9]);
}

function restart() {
  location.reload();
}

function pickTwo() {
  let randomNumber = Math.floor(Math.random() * 10);
  if (randomNumber === 2) {
    text.innerText = "¡Has ganado! La recompensa es de 100 monedas de oro.";
    gold += 100;
    goldText.innerText = gold;
  } else {
    text.innerText = "Número incorrecto. Inténtalo de nuevo.";
  }
}

function pickEight() {
  let randomNumber = Math.floor(Math.random() * 10);
  if (randomNumber === 8) {
    text.innerText = "¡Has ganado! La recompensa es de 200 monedas de oro.";
    gold += 200;
    goldText.innerText = gold;
  } else {
    text.innerText = "Número incorrecto. Inténtalo de nuevo.";
  }
}
