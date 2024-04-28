let xp = 0;
let health = 100;
let gold = 50;
let restartedHpZombie=false
let restartedHpSkeleton=false
let canSellWeapons=false                                                       //LET VARIABLES//
let inventory=["wooden sword"];
let currentWeapon=0;
let currentMonsterFighting=-1;
const convertXpToGold=document.querySelector("#convertXpToGoldButton")
const button1=document.querySelector("#button1")
const button2=document.querySelector("#button2")
const button3=document.querySelector("#button3")
const xpText = document.querySelector("#xpText");                                     //CONST OF ALL ID//
const healthText = document.querySelector("#healthText");
const text = document.querySelector("#text");
const fieldsetMonsterStats=document.querySelector("#fieldsetMonsterStats")
const monstersHealthText=document.querySelector("#monstersHealthText")
const monstersDamageText=document.querySelector("#monstersDamageText")
const monsters=[                                                                                        //MONSTERS//
  {name:"noMonsters",health:"NotaMonster",damage:"NotaMonster",healthRestarted:"NotaMonster"},
  {name:"zombie",health:55,damage:15,healthRestarted:55,xp:10},
  {name:"skeleton",health:125,damage:35,healthRestarted:125,xp:30},
  {name:"warden",health:330,damage:70,xp:80}
  ];
const weapons=[                                                 // WEAPONS//
  {name:"wooden sword",power:5},
  {name:"stone sword",power:20},
  {name:"iron sword",power:40},
  {name:"diamond sword",power:55},
  {name:"Netherite sword",power:85}
              
 ];


let damage=weapons[currentWeapon].power;                    // DAMAGE IS EQUAL TO CURRENT WEAPON POWER//


const locations=[
   {
  name:"town square",
  "button text": ["Go to Store","Go to a cave","Fight Warden"],
   "button functions": [goStore,goCave,fightWarden],                                     //LOCATION 0(TOWN SQUARE)
    "text":"Welcome to Dragon Repeller. You must defeat the dragon that is preventing people from leaving the town. You are in the town square. Where do you want to go? Use the buttons above."
  },
  {
  name:"store",
  "button text": ["Buy Health(10 gold)","Buy new weapon(30 gold)","Go to Town"],              //LOCATION 1(STORE)
   "button functions": [buyHealth,BuyOrSellWeapon,goTown],
    "text":"You entered the store."
  },
  {
  name:"cave",
  "button text": ["Fight Zombie","Fight Skeleton","Go to Town"],
   "button functions": [fightZombie,fightSkeleton,goTown],                                   //LOCATION 2(CAVE)
    "text":"You entered the cave."
  },
   {
  name:"fightZombie",
  "button text": ["Attack with Sword","Jump on him","Run away"],
   "button functions": [attackWithSword,jumpOnHim,runAway],                                   //LOCATION 3(FIGHTZOMBIE)
    "text":"You see a zombie in front of you."
  },
  {
  name:"fightSkeleton",
  "button text": ["Attack with Sword","Jump on him","Run away"],
   "button functions": [attackWithSword,jumpOnHim,runAway],                                  //LOCATION 4(FIGHTSKELETON)
    "text":"You see a skeleton in front of you."
  },
   {
  name:"fightWarden",
  "button text": ["Attack with Sword","Jump on him","Run away"],                            //LOCATION 5(FIGHT WARDEN THE FINAL BOSS)
   "button functions": [attackWithSword,jumpOnHim,runAway],
    "text":"You see a Warden in front of you."
  }
];
const update=(location) => {
  button1.onclick= location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  button1.innerText=location["button text"][0];                                           //LOCATION UPDATES OF ONCLICK AND INNER TEXT//
  button2.innerText=location["button text"][1];
  button3.innerText=location["button text"][2];
  text.innerHTML=location.text
};
xpText.innerText=xp
healthText.innerText=health                                               //XP,GOLD AND HEALTH INNER TEXTS EQUAL TO XP,GOLD AND HEALTH//
goldText.innerText=gold


convertXpToGold.onclick= () => ConvertXp()
button1.onclick=goStore;
button2.onclick=goCave;                                                    //CONVERT XP TO GOLD AND BUTTONS(1,2,3) ONCLICK//
button3.onclick=fightWarden;

function ConvertXp(){
  gold+=Math.floor(xp * 0.87)
  xp-=xp                                                                    // WHEN YOU PRESS BUTTON CONVERT XP TO GOLD CONVERT XP FUNCTION WILL PLAY//
  xpText.innerText=xp
  goldText.innerText=gold
}
function goStore(){
   update(locations[1])                                                    // WHEN YOU PRESS BUTTON 1 GO TO STORE GOSTORE FUNCTION WILL PLAY//
};
function goCave(){
  update(locations[2])                                                      // WHEN YOU PRESS BUTTON 2 GO TO STORE GOCAVE FUNCTION WILL PLAY//   
};
function buyHealth(){
  if (health> 0 && gold >=10 ){
      gold-=10
      health+=10                                                            // WHEN YOU PRESS BUTTON 1 IN STORE BUYHEALTH FUNCTION WILL PLAY// 
      healthText.innerText=health
      goldText.innerText=gold
  }
  };

function BuyWeapon(){
   if (weapons.length >= 1 && gold>=30 &&  weapons[currentWeapon].name != "Netherite sword"){
   gold-=30
   goldText.innerText=gold
   currentWeapon+=1                                                                    //BUY WEAPON FUNCTION//
   let newWeapon=weapons[currentWeapon].name                      // NEW WEAPON IS BASICALLY THE NAME OF CURRENT WEAPON YOU HAVE NOW//
   text.innerText="you got a new weapon: " + newWeapon;
   inventory.push(newWeapon)                             //IT WILL ADD A WEAPON INTO YOUR INVENTORY THE ONE YOU BOUGHT//
   text.innerText += " your inventory is: " + inventory
   }else{
     button2.innerText="Sell Weapons(25 gold)"
      }
};

function SellWeapon(){
    if (weapons.length > 1 ){
    gold+=25
    let currentWeapon=inventory.shift()         //BASICALLY THE FIRST WEAPON OF WEAPONS ARRAY WILL BE CONSIDERED AS CURRENT WEAPON//
    goldText.innerText=gold
    text.innerText="you sold a weapon: " + currentWeapon         // INVENTORY ARRAY WILL SHIFT WITH CURRENT WEAPON SO IT WILL SHOW INVENTORY BUT THE FIRST WEAPON WILL BE REMOVED BECAUSE IT GOT SOLD AND IT CAN GET SELLED AS LONG AS YOU HAVE AT LEAST 1 WEAPON
    text.innerText+=" your inventory is : " + inventory
 }     
};
function BuyOrSellWeapon(){
  switch(button2.innerText){
      
    case "Buy new weapon(30 gold)":
      BuyWeapon()
      break;
      
    case "Sell Weapons(25 gold)":                                                //THIS FUNCTION WILL DECIDE IF PLAYER WILL BUY OR SELL WEAPON/S//
      if (inventory.length>1){
        SellWeapon()
        break;
      }else{
        text.innerText="You cant sell your only weapon!"
        break;
    }
      
  }
  };  
function goTown(){
  update(locations[0])                                                         //GO TOWN FUNCTION (BASICALLY THE START OF THE GAME "PAGE")
};
function fightZombie(){
    fieldsetMonsterStats.style.display="block";
    currentMonsterFighting=[1]
    monstersHealthText.innerText=monsters[1].health                          //FIGHT ZOMBIE FUNCTION//
    monstersDamageText.innerText=monsters[1].damage
    update(locations[3])
};
function fightSkeleton(){
  currentMonsterFighting=[2]
  update(locations[4])
  fieldsetMonsterStats.style.display="block";                               //FIGHT SKELETON FUNCTION//
  monstersHealthText.innerText=monsters[2].health
  monstersDamageText.innerText=monsters[2].damage
};
function fightWarden(){
  update(locations[5])
  currentMonsterFighting=[3]
  fieldsetMonsterStats.style.display="block";                                //FIGHT WARDEN FUNCTION//
  monstersHealthText.innerText=monsters[3].health
  monstersDamageText.innerText=monsters[3].damage
};
function attackWithSword() {
  switch (monsters[currentMonsterFighting].name){
    
    case "zombie":               //IT WILL DO THIS PART OF CODE IF  NAME OF MONSTER IS "zombie"//
      if (health > 0  &&  health > monsters[currentMonsterFighting].damage){      
        
        fightMonstersWithSword()        //this is function that deals damage to player and monster//
        break;
      }else{
        
        playerIsDead();           //this is function that will call only if your health is below or equal to 0 which means you are dead//
      break;
 }        
        case "skeleton":                //IT WILL DO THIS PART OF CODE IF  NAME OF MONSTER IS "skeleton"//
      
         if (health > 0  &&  health > monsters[currentMonsterFighting].damage){
        
            fightMonstersWithSword();//this is function that deals damage to player and monster//
            break;
           }
           case "warden":
           if (health > 0  &&  health > monsters[currentMonsterFighting].damage){        //IF HEALTH IS MORE THAN 0 AND HEALTH IS LESS THAN MONSTERS DAMAGE NUMBER
        
            fightMonstersWithSword();
            break;
            
           }else{
        
          playerIsDead();           //this is function that will call only if your health is below or equal to 0 which means you are dead//
          break;
 }     
 }
 };
function jumpOnHim() {
      monsters[currentMonsterFighting].health= monsters[currentMonsterFighting].health/2
      monstersHealthText.innerText=monsters[currentMonsterFighting].health                             //JUMP ON HIM FUNCTION BUT WILL ONLY WORK ON SKELETONS//
      
};
function runAway() {
      fieldsetMonsterStats.style.display="none"
  switch (monsters[currentMonsterFighting].name){
      
    case "warden":
      update(locations[0])
      break;
    case "zombie":                                                                   //RUN AWAY FUNCTION WHERE PLAYER WILL LEAVE FIGHT//
      update(locations[2])
      break;
    case "skeleton":
      update(locations[2])
      break;
  }
};



function killedMonster(){
  restartedHpZombie=true
  restartedHpSkeleton=true
  monsters[currentMonsterFighting].health=monsters[currentMonsterFighting].healthRestarted              //FUNCTION WILL PLAY WHEN YOU KILLED A MONSTER(NOT WARDEN)
  update(locations[0])
  restartedHpZombie=false
  restartedHpSkeleton=false
};

function fightMonstersWithSword () {
      if (monsters[currentMonsterFighting].health > weapons[currentWeapon].power ) {
        
          monsters[currentMonsterFighting].health -= weapons[currentWeapon].power
          health-=monsters[currentMonsterFighting].damage
                                                                      //IF MONSTER HAS MORE HP THAN WEAPON POWER IT WILL BE HIT//
          monstersHealthText.innerText=monsters[currentMonsterFighting].health
          healthText.innerText=health                                                              
        }else{
          if (monsters[currentMonsterFighting].name != "warden" ){
            update(locations[2])
            monsters[currentMonsterFighting].health = monsters[currentMonsterFighting].healthRestarted      //ELSE PLAYER WILL KILL MONSTER AND GET XP(NOT WARDEN)
            fieldsetMonsterStats.style.display="none";
           xp+=monsters[currentMonsterFighting].xp
            xpText.innerText=xp
            text.innerText="You killed a " + monsters[currentMonsterFighting].name + " and gained " + monsters[currentMonsterFighting].xp +  " xp."
         }else{
           WonGame()                                  //IF MONSTER YOU ARE CURRENTLY FIGHTING NAME IS WARDEN IT WILL PLAY WON GAME//
   
    }
}
} ;
function playerIsDead() {
  health=0
  healthText.innerText=health
  update(locations[0])
  xp=0
  gold=50
  health=100
  inventory=["wooden sword"]                                      // THIS FUNCTION WILL PLAY WHEN PLAYER IS DEAD//
  currentWeapon=0
  healthText.innerText=health
  xpText.innerText=xp
  goldText.innerText=gold
  text.innerText="You died, if you want try again."
  fieldsetMonsterStats.style.display="none";
    
};
function WonGame(){
  update(locations[0])                                             //WON GAME FUNCTION WHERE IT WILL UPDATE LOCATION TO 0(START GAME "PAGE") AND YOU WIN//
  text.innerText="YOU WON!"
  fieldsetMonsterStats.style.display="none";
};



console.log("weapons length: ",weapons.length)