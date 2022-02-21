class Player {
    constructor(name, hitsPerMinute) {
      this.name = name;
      this.hitsPerMinute = hitsPerMinute;
      this.balloonCount = 100;
    }
  
    status() {
      console.log(`Player: ${this.name} -- Balllons Left: ${this.balloonCount}`)
    }
  }
  
  // Write function below
function balloonAttack(p1, p2){
    let time = 10;
    let p1BallonsLeft = (p1.hitsPerMinute * time) - p1.balloonCount; 
    let p2BallonsLeft = (p2.hitsPerMinute * time) - p2.balloonCount; 
    
    if(p1BallonsLeft > p2BallonsLeft){
        return p1.name;
    }else if(p1BallonsLeft < p2BallonsLeft){
        return p2.name;
    }else{
        return 'Tie';
    }
  }


const p1 = new Player('p1', 5);
const p2 = new Player('p2', 2);
 
// console.log(balloonAttack(p1, p2));

