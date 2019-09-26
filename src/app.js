import yargs from 'yargs';

import fs from 'fs';

// Create add command
import uuid from 'uuid';

let obj;

const list = function(){
  obj.note.forEach((note,i) =>{
    console.log(`${i}: ${note.title}`);
  })
};

const remove = function(argsv){
    obj.note.splice(argv.index, 1);
}

const add = function(argv){
  const nota = {
    uuid: uuid.v4(),
    title: argv.title,
    body: argv.body,
    author: argv.author,
  };
  obj.notes.push(nota);
  console.log(`Added: ${nota.title}`);
}

const read = function(argv){
  console.log(obj.note[argv.index]);
}

yargs.command({
  command: 'add',
  describe: 'add a new note',
  builder: {
    title: {
      describe: 'Title of the note',
      demandOption: true,
      type: 'string',
    },

    body: {
      describe: 'body of the note',
      demandOption: true,
      type: 'string',
    },

    author: {
      describe: 'body of the note',
      demandOption: true,
      type: 'string',
    },

  },

  handler: add,

});

const path = './notas.txt';

fs.access(path, fs.F_OK, (err) => {

  if (err) {

    fs.writeFileSync("notas.txt","");

  }

  const data = fs.readFileSync("notas.txt").toString();

  if(data !== ""){
    obj = JSON.parse(data);
  }else{

    obj = {

      notes: [

      ]

    };

  }

  yargs.parse();

  fs.writeFileSync("notas.txt", JSON.stringify(obj));

});

yargs.command({

    command: 'list',
    describe: 'list existing notes',
    handler: list,

});

yargs.command({
  command: 'read',
  describe: 'read a note',
  builder: {

    index: {
      describe: 'Index of the note',
      demandOption: true,
      type: 'int',
    },

  },
  handler: read,
});



yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
  
      index: {
        describe: 'Index of the note',
        demandOption: true,
        type: 'int',
      },
  
    },
    handler: remove,
});

// yargs.parse();

// const obj = {

//   name: 'Alberto',

//   friends: ['Luis', 'Jorge', 'Maria'],

// };

// const str = JSON.stringify(obj);

// console.log(str);

// const obj2 = JSON.parse(str);

// console.log(obj2);

// fs.writeFileSync('notes.txt', str);

// const obj3 = JSON.parse(fs.readFileSync('notes.txt').toString());

// console.log(obj3);