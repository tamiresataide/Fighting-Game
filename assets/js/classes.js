class Character{

   _life = 1;
   maxLife = 1;
   attack = 0;
   defense = 0;

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

// Character List

class Knight extends Character {
   constructor(name){
      super(name);
      this.life = 100;
      this.attack = 10;
      this.defense = 8;
      this.maxLife = this.life;
   }
}


class Sorcer extends Character {
   constructor(name){
      super(name);
      this.life = 80;
      this.attack = 15;
      this.defense = 5;
      this.maxLife = this.life;
   }
}

class Witch extends Character {
   constructor(name){
      super(name);
      this.life = 100;
      this.attack = 13;
      this.defense = 3;
      this.maxLife = this.life;
   }
}




// Foe List

class LittleMonster extends Character{
   constructor(){
      super('Little Monster');
      this.life = 40;
      this.attack = 4;
      this. defense = 4;
      this.maxLife = this.life
   }
}

class BigMonster extends Character{
   constructor(){
      super('Big Monster');
      this.life = 120;
      this.attack = 16;
      this. defense = 6;
      this.maxLife = this.life
   }
}



class Stage {
   constructor(fighter, foe, fighterEl, foeEl) {
      this.fighter = fighter;
      this.foe = foe;
      this.fighterEl = fighterEl; 
      this.foeEl = foeEl;

      // fighterEl and foeEl are meant to be used to select the ID of the div where each information should be.
   }

   start(){
      this.update();

      //Fighter attack button
      this.fighterEl.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter, this.foe));

      //Foe attack button
      this.foeEl.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.foe, this.fighter))
   }

   update(){
      //Fighter:
      this.fighterEl.querySelector('.name').innerHTML = `${this.fighter.name}  -  ${this.fighter.life} HP`;
      let fighterLife = (this.fighter.life / this.fighter.maxLife) * 100;
      this.fighterEl.querySelector('.bar').style.width = `${fighterLife}%`


      //Foe:
      this.foeEl.querySelector('.name').innerHTML = `${this.foe.name}  -  ${this.foe.life} HP`
      let foeLife = (this.foe.life / this.foe.maxLife) * 100;
      this.foeEl.querySelector('.bar').style.width = `${foeLife}%`
   }

   doAttack(atacker, attacked){
      let log = document.querySelector('.log');
      let logRegister = document.createElement('li');

      if (atacker.life <= 0 || attacked.life <= 0){
         logRegister.innerHTML = `... they're already dead. <br/>`;
         log.appendChild(logRegister);
         return;
      }

    /*   console.log(`${atacker.name} attacked ${attacked.name}!`); */

      let attackFactor = (Math.random() * 2).toFixed(2);
      let attackStrenght = (atacker.attack * attackFactor).toFixed(0);

      let defenseFactor = (Math.random() * 2).toFixed(2);
      let deffenseStrenght = (attacked.defense * defenseFactor).toFixed(0);

      console.log(`attack strenght: ${attackStrenght} | defense strenght: ${deffenseStrenght}`)

      let damage = attackStrenght - deffenseStrenght;

      if (damage > 0) {
         attacked.life -= attackStrenght;
         logRegister.innerHTML = `${atacker.name} attacks! ${attacked.name} suffers ${attackStrenght} damage!`;
         log.appendChild(logRegister);
      }else{
         logRegister.innerHTML = `${atacker.name} attacks! ${attacked.name} was able to dodge!`;
         log.appendChild(logRegister);
      }

      
      this.update();
   }

   
}