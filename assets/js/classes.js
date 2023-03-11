// Creating a class with the characteristics that are common to every character in the game.
class Character{

   _life = 1;
   maxLife = 1;
   attack = 0;
   defense = 0;
   charClass = '';

   constructor(name){
      this.name = name;
   }

   get life(){
      return this._life;
   }

   set life(newLife){
      this._life = newLife < 0 ? 0 : newLife;
   }
}

// Character List: These classes will add the the default character and add all the specifics to each character based on their class/type 

class Knight extends Character {

   constructor(name){
      super(name);
      this.charClass = 'charKnight';
      this.life = 100;
      this.attack = 10;
      this.defense = 8;
      this.maxLife = this.life;
   }
}


class Sorcerer extends Character {
   
   constructor(name){
      super(name);
      this.charClass = 'charSorcerer';
      this.life = 80;
      this.attack = 15;
      this.defense = 5;
      this.maxLife = this.life;
   }
}

// Foe List: Same principal as the character list.

class LittleMonster extends Character{
   constructor(){
      super('Little Monster');
      this.charClass = 'charLilMonster';
      this.life = 40;
      this.attack = 4;
      this. defense = 4;
      this.maxLife = this.life
   }
}

class BigMonster extends Character{
   constructor(){
      super('Big Monster');
      this.charClass = 'charBigMonster';
      this.life = 120;
      this.attack = 16;
      this. defense = 6;
      this.maxLife = this.life
   }
}


// All the attacks and game actions happen here:
class Stage {
   constructor(fighter, foe, fighterEl, foeEl, logObject) {
      this.fighter = fighter; //Selects the current fighter character
      this.foe = foe; // Selects the current Foe
      this.fighterEl = fighterEl; // Selects the area on the html where all the fighter info are
      this.foeEl = foeEl; // Selects the area on the html where all the foe info are
      this.log = logObject; // Used to insert on the log the things that happen on the stage
   }

   insertIcon(){
      this.fighterEl.querySelector('.icon').innerHTML = `<img src="../../media/${this.fighter.charClass}.png">`

      this.foeEl.querySelector('.icon').innerHTML = `<img src="../../media/${this.foe.charClass}.png">`
   }

   // Function that selects the buttons and identifies who is attacking and who is being attacked, and adds the correct action for the button:
   start(){
      this.update(); // Adding this here makes the names and HP show up before needing to press any buttons  

      //Fighter attack button
      this.fighterEl.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter, this.foe)); 

      //Foe attack button
      this.foeEl.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.foe, this.fighter))
   }

   update(){

      // All the updates on the fighter area:
      this.fighterEl.querySelector('.name').innerHTML = `${this.fighter.name}  -  ${(this.fighter.life).toFixed(1)} HP`;
      let fighterLife = (this.fighter.life / this.fighter.maxLife) * 100;
      this.fighterEl.querySelector('.bar').style.width = `${fighterLife}%`


      //All the updates on the foe area:
      this.foeEl.querySelector('.name').innerHTML = `${this.foe.name}  -  ${(this.foe.life).toFixed(1)} HP`
      let foeLife = (this.foe.life / this.foe.maxLife) * 100;
      this.foeEl.querySelector('.bar').style.width = `${foeLife}%`
   }

   // What actual happens once you click the attack button:

   doAttack(atacker, attacked){
      // First, a verification if someone is already dead:
      if (atacker.life <= 0){
         this.log.addMessage(`... You're dead.`);
         return;
      } else if (attacked.life <= 0){
         this.log.addMessage(`... They're dead, chill.`);
         return;
      }

      // Adding a Math.random() function to make the strenght of both the attack and defense random, but still based on both characters stats
      let attackFactor = (Math.random() * 2).toFixed(2); 
      let attackStrenght = (atacker.attack * attackFactor).toFixed(2);

      let defenseFactor = (Math.random() * 2).toFixed(2);
      let deffenseStrenght = (attacked.defense * defenseFactor).toFixed(2);

      let damage = attackStrenght - deffenseStrenght; // Sees if the attacked was able to dodge or not

      if (damage > 0) {
         attacked.life -= attackStrenght; // Updates the life of the one who got attacked, taking off the HP the damage that was done.
         this.log.addMessage(`${atacker.name} attacks! ${attacked.name} suffers ${attackStrenght} damage!`);
      }else{
         this.log.addMessage(`${atacker.name} attacks! ${attacked.name} was able to dodge!`);
      } 

      
      this.update(); // After the actions happen, the update function will update on the screen all that happened.
   } 
}


// Making the log entry an object allows to make different buttons, attacks and items using the same system
class Log{
   list = []; //List where all the log texts will be added to 

   constructor(listEl){
      this.listEl = listEl; //Used to select which html element the text will be added to 
   }

   // Function to add the message to the list:
   addMessage(msg){  
      this.list.push(msg);
      this.render();
   }

   // Function to add the list to the page so the users are able to see it:
   render(){
      this.listEl.innerHTML = '';  // This clears up the previous log so when a new message is added it won't show the previous ones twice.

      for (let i in this.list){
         this.listEl.innerHTML += `<li>${this.list[i]}</li>`;
      } // Inserts the actions on the list, making all of them new elements
   }
}