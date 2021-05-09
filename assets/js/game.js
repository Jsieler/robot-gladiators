// Game States
// "WIN" - Player robot has defeated all enemy robots
//    * Fight all enemy robots
//    * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less
var fightOrSkip = function() {
    // ask user if they'd like to fight or skip using  function
      var promptFight = window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  
      if (promptFight === "" || promptFight === null) {
          window.alert("You need to provide a valid answer! Please try again.");
          return fightOrSkip();
      }
      promptFight = promptFight.toLowerCase();
  
      if (promptFight === "skip") {
      
          var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
      
          if (confirmSkip) {
              window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
        
              playerInfo.playerMoney = playerInfo.money - 10;
              
              return true;
              
          }
      
      }
      
  }
  var fight = function(enemy) {  
     
      while (playerInfo.health > 0 && enemy.health > 0) {
          // ask user if they'd like to fight or skip using fightOrSkip function
          if (fightOrSkip()) {
            // if true, leave fight by breaking loop
            break;
          }
  
          var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
          var damage = randomNumber(playerInfo.attack - 3,playerInfo.attack);
  
          if (promptFight === "skip" || promptFight === "SKIP") {
              var confirmSkip = window.confirm("Are you sure you'd like to quit?");
      
              if (confirmSkip) {
                  window.alert(playerInfo.name + " has decided to skip this fight. Gooooodbye!");
                  playerInfo.money = Math.max(0, playerInfo.money - 10);
                  console.log("player money", playerInfo.money);
                  return true;
              }
          }   
  
          if (promptFight === "fight" || promptFight === "FIGHT") {
  
             var damage = randomNumber(enemy.attack - 3, enemy.attack);
  
             enemy.health = Math.max(0, enemy.health - damage);
              console.log(
                  playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
              );
              
              
              // check enemies health
              if (enemy.health <= 0) {
                  window.alert(enemy.name + " has died!");
                  playerInfo.money = playerInfo.money + 20;
  
                  break;
              } else {
                  window.alert(enemy.name + " still has " + enemy.health + "health left.")
              }
              
             var damage = randomNumber(enemy.attack - 3, enemy.attack);
  
             playerInfo.health = Math.max(0, playerInfo.health - damage);
             
              console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");
              //check pcs health
              if (playerInfo.health <= 0) {
                  window.alert(playerInfo.name + " has died!!!");
                  break;
              }
              else {
                  window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
              }
  
          }
          
          else {
              window.alert("You need to pick a valid option. Try again!");
          }
          return false;
      }
  };
  var startGame = function() {
      playerInfo.reset();
  
      for(var i = 0; i < enemyInfo.length; i++) {
          if (playerInfo.health > 0) {
              alert("Welcome to Battlebots! Round " + ( i + 1 ));
  
              var pickedEnemyObj = enemyInfo[i]; 
              
              pickedEnemyObj.health = randomNumber(40, 60);
  
              
  
              fight(pickedEnemyObj);
  
              if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
  
                  var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
  
                  if (storeConfirm) {
                      shop();
                  }
              }
          }
          else {
              window.alert("You have lost your robot in battle! Game Over!");
              break;
          }
      }
      endGame();   
  };
  var endGame = function() {
  
      if (playerInfo.health > 0) {
          window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
      }
      else {
          window.alert("You've lost your robot in battle, RIP");
      }
      var playAgainConfirm = window.confirm("Would you like to play again?");
  
      if (playAgainConfirm) {
          startGame();
      }
      else {
          window.alert("Thank you for playing Robot Gladiators! Come back soon!");
      }
  }
  
  var shop = function() {
      var shopOptionPrompt = window.prompt(
          "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE to make a choice."
      );
      shopOptionPrompt = parseInt(shopOptionPrompt);
  
      switch (shopOptionPrompt) {
          case 1:
              playerInfo.refillHealth();
              break;
          case 2:
              playerInfo.upgradeAttack();
              break;
          case 3:
              window.alert("Thank you for your buisness.");
              break;
          default:
              window.alert("You did not pick a valid option. Try again.")
              shop();
              break;
      }
  };
  var randomNumber = function(min, max) {
      var value = Math.floor(Math.random() * (max - min + 1) + min);
  
      return value;
  };
  var getPlayerName = function() {
      var name = "";
      
          while (name === "" || name === null) {
              name = prompt("What is your robot's name?");
          }
  
      console.log("Your robot's name is " + name);
      return name;
  };
  var playerInfo = {
      name: getPlayerName(),
      health: 100,
      attack: 11,
      money: 10,
      reset: function() {
          this.health = 100;
          this.money = 10;
          this.attack = 11;
      },
      refillHealth: function() {
          if (this.money >= 7) {
              window.alert("Refilling player's health by 20 for 7 dollars.");
              this.health += 20;
              this.money -= 7;
          } 
          else {
              window.alert("You don't have enough money there friend");
          }
      },
      upgradeAttack: function() {
          if (this.money >= 7) {
              window.alert("Upgrading player's attack by 6 for 7 dollars.");
              this.attack += 6;
              this.money -= 7;
          } 
          else {
              window.alert("Your broke, come back when you're not broke.");
          }
      }
  };
  
  var enemyInfo = [
      {
          name: "Roborto",
          attack: randomNumber(10, 14)
      },
      {
          name: "Amy Android",
          attack: randomNumber(10, 14)
      },
      {
          name: "Robo Trumble",
          attack: randomNumber(10, 14)
      }
  ]; 
  
  startGame();
