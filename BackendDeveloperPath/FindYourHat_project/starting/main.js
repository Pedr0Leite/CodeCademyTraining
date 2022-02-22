const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
const initialMessage = "Choose a path to go l,r,d,u:";
const instructionsGame = "Include the Amount of Lines, Columns and the difficulty you want to play \n for example (2,4,33)";

class Field {
  constructor(x,y,difficulty) {
    this.field;
    this.x = x;
    this.y = y;
    this.x_charPosition = 0;
    this.y_charPosition = 0;
    this.difficulty = difficulty;
  }

  print() {
    for (var i = 0; i < this.field.length; i++) {
      console.log(this.field[i].join(""));
    }
  }

  hatPosition() {
    let xPosition = Math.floor(Math.random() * this.x);
    let yPosition = Math.floor(Math.random() * this.y);
    return {x: xPosition, y: yPosition};
  }

  createAreaOfGame(){
    //Set the amount of holes it will show
    let chanceOfHole = this.difficulty;
    //set the random position of the hat (make sure its never x:0, y:0)
    let hatPosition = this.hatPosition();
    while(hatPosition.x == 0 && hatPosition.y == 0){
      hatPosition = this.hatPosition();
    }

    let areaOfGame = new Array(this.y);
    for(var i = 0; i < this.y; i++){
        areaOfGame[i] = new Array(this.x);
        for(var j = 0; j < areaOfGame[i].length; j++){
          //Make sure the first square is always a field character so no holes can be there
            if(i == 0 && j == 0){
                areaOfGame[i][j] =  fieldCharacter;
            }else{
              if(Math.floor(Math.random() * 100) > chanceOfHole){
                        //number of holes
                        let holesInLine = areaOfGame[i].filter(x => x == hole);
                        //Make sure its number of holes in each line is always smaller than 80% so its possible to play 
                        let percentageOfHoles = (holesInLine.length * 100) / areaOfGame[i].length;
                        //If the line has already more than 20% of holes, generate a fieldCharacter
                        if(percentageOfHoles > 20){
                          areaOfGame[i][j] =  fieldCharacter;
                        }else{
                        //If its less than 20%, go ahead and generate a hole there, depending on the difficulty set
                          areaOfGame[i][j] =  hole;
                        }
                    }else{
                        areaOfGame[i][j] =  fieldCharacter;
                    }
            }
        }
    }
    //For last, set the hat on its position.
    
    areaOfGame[hatPosition.y][hatPosition.x] = hat;

    this.field = areaOfGame;
  }
  
  play() {
    let stop = false;
    this.createAreaOfGame();
    console.log(instructionsGame);
    while (!stop) {
      this.print();
      let input = prompt(initialMessage);

      if (input == "l") {
        this.y_charPosition--;

      } else if (input == "r") {
        this.y_charPosition++;
 
      } else if (input == "d") {
        this.x_charPosition++;

      } else if (input == "u") {
        this.x_charPosition--;

      } else {
        prompt("Please enter a valid key.");

      }

      if (this.y_charPosition < 0) {
        this.y_charPosition = 0;
        console.log("You are out of the map! Please select a valid key...");

      } else if (this.x_charPosition < 0) {
        this.x_charPosition = 0;
        console.log("You are out of the map! Please select a valid key...");

      }

      try{
        let nextMove = this.replacePosition(this.x_charPosition, this.y_charPosition);
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
// const myField = new Field(arrField);
const myField = new Field(10, 10, 50);
myField.play();
myField;
