const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
const initialMessage = "Choose a path to go l,r,d,u:";

class Field {
  constructor(field) {
    this.field = field;
    this.x = 0;
    this.y = 0;
  }

  print() {
    for (var i = 0; i < this.field.length; i++) {
      console.log(this.field[i].join(""));
    }
  }

  play() {
    let stop = false;
    while (!stop) {
      this.print();
      let input = prompt(initialMessage);

      if (input == "l") {
        this.y--;

      } else if (input == "r") {
        this.y++;
 
      } else if (input == "d") {
        this.x++;

      } else if (input == "u") {
        this.x--;

      } else {
        prompt("Please enter a valid key.");

      }

      if (this.y < 0) {
        this.y = 0;
        console.log("You are out of the map! Please select a valid key...");

      } else if (this.x < 0) {
        this.x = 0;
        console.log("You are out of the map! Please select a valid key...");

      }

      try{
        let nextMove = this.replacePosition(this.x, this.y);
        if (nextMove == "win") {
          console.log("You Won! You have found the hat!");
  
          stop = true;
        } else if (nextMove == "dead") {
          console.log("You felt into a hole, end of game.");
  
          stop = true;
        }
      }catch(e){
          console.log('nextMove error: ' + e);
      }
      
    }
  }

  replacePosition(x, y) {
    if (this.field[x][y] == hole) {
      return "dead";
    } else if (this.field[x][y] == hat) {
      return "win";
    } else if (this.field[x][y] == fieldCharacter) {
      this.field[x][y] = pathCharacter;
      return "continue";
    } else {
      return undefined;
    }
  }
}

var arrField = [
  ["*", "░", "O", "░", "░"],
  ["░", "O", "░", "░", "O"],
  ["░", "^", "░", "░", "░"],
];
const myField = new Field(arrField);

// myField.play()

class NewField extends Field {
  constructor(x,y,difficulty) {
    super(field);
    this.x = x;
    this.y = y;
    this.difficulty = difficulty;
  }

  //  //static -  Métodos estáticos não são chamados na instâncias da classe.
hatPosition() {
    let xPosition = Math.floor(Math.random() * this.x);
    let yPosition = Math.floor(Math.random() * this.y);
    return {x: xPosition, y: yPosition};
  }

  createAreaOfGame(){
    let chanceOfHole = this.difficulty;
    let hatPosition = this.hatPosition();
    // console.log('hatPosition :', hatPosition);
    let areaOfGame = new Array(this.y);
    for(var i = 0; i < this.y; i++){
        areaOfGame[i] = new Array(this.x);
        for(var j = 0; j < areaOfGame[i].length; j++){
            if(i == 0 && j == 0){
                areaOfGame[i][j] =  fieldCharacter;
            }else{
                if(Math.floor(Math.random() * 100) > chanceOfHole){
                    if(areaOfGame[i].length > 0){
                        //number of holes
                        let holesInLine = areaOfGame[i].filter(x => x == hole);
                        //Percentage of Holes - Make sure its always
                        let percentageOfHoles = (numberOfHoles.length / areaOfGame[i].length) / 100;
                        // if()
                    }else{
                        areaOfGame[i][j] =  fieldCharacter;
                    }

                }else{
                    areaOfGame[i][j] =  hole;

                }
            }
        }

    }


    this.field = areaOfGame;
    console.log(' this.field :',  this.field);
  }

}
const myField2 = new NewField(3, 6, 25).createAreaOfGame();
myField2;
