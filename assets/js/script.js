let char = new Knight('Stella');
let foe = new LittleMonster();

let log = new Log(document.querySelector('.log'));

let stage = new Stage(
   char,
   foe,
   document.querySelector('#char'),
   document.querySelector('#foe'),
   log
);

stage.insertIcon();
stage.start();