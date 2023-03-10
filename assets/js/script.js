let char = new Knight('Stella');
let foe = new BigMonster();


let stage = new Stage(
   char,
   foe,
   document.querySelector('#char'),
   document.querySelector('#foe')
);

stage.start();