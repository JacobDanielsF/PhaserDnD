// CMPM 179
// Baby DnD (tentative title)
// main.js
// DnD Class Quiz

var game;

// game settings
var config = {
    width: 900,
    height: 600,
    renderer: Phaser.AUTO,
    antialias: false,
}

// initialize states
window.onload = function() {
	game = new Phaser.Game(config);
	
	game.state.add('Start', Start);
	game.state.add('Question', Question);
	game.state.add('Results', Results);
	
	game.state.start('Start');
}

var MAIN_FONT = 'Verdana'; // main font
var MAIN_STYLE = 'bold'; // main font style
var BUTTON_WIDTH = 193;
var BUTTON_HEIGHT = 71;

var PROPERTIES =
{
	CLASS_BUCKETS: {
		Fighter: 0,
		Barbarian: 0,
		Paladin: 0,
		Cleric: 0,
		Rogue: 0,
		Bard: 0,
		Ranger: 0,
		Sorcerer: 0,
		Warlock: 0,
		Wizard: 0,
		Monk: 0,
		Druid: 0,
	},
	
	QUESTION: 0,
};

function Shuffle(t){
	var n = t.length-1;
	while (n >= 0) {
		var k = game.rnd.integerInRange(0, n);
		var temp = t[n];
		t[n] = t[k];
		t[k] = temp;
		n--;
	}
	return t;
}

var CLASS_QUESTIONS =
{
	Q1:
	{
		Q: "You’re ambushed by an enemy!\nWhat do you have on you?",
		A:
		{
			[0]: { TEXT: "A heavy greatsword!", REWARD: ["Barbarian", "Paladin", "Fighter", "Cleric"] },
			[1]: { TEXT: "A short sword hidden in your boot!", REWARD: ["Rogue", "Bard", "Ranger"] },
			[2]: { TEXT: "Weapon? What weapon? You just need the spells in your head!", REWARD: ["Sorcerer", "Warlock", "Wizard"] },
			[3]: { TEXT: "The two fists nature gave me!", REWARD: ["Monk"] }
		}
	},
	
	Q2:
	{
		Q: "You're on a long journey.\nAfter the bare essentials,\nwhat extra things will you pack?",
		A:
		{
			[0]: { TEXT: "An extra book to read.", REWARD: ["Wizard"] },
			[1]: { TEXT: "An instrument to provide entertainment.", REWARD: ["Bard"] },
			[2]: { TEXT: "Workout gear to keep up those gains.", REWARD: ["Barbarian", "Fighter"] },
			[3]: { TEXT: "Extra food that you like.", REWARD: ["Ranger", "Druid", "Monk"] },
			[4]: { TEXT: "A tome for the being you worship.", REWARD: ["Warlock", "Paladin", "Cleric"] }
		}
	},
	
	Q3:
	{
		Q: "You are approached by an enemy!\nWhat do you do?",
		A:
		{
			[0]: { TEXT: "Try to get the help of a higher power.", REWARD: ["Paladin", "Cleric", "Warlock"] },
			[1]: { TEXT: "Try to get on their good side before anything happens.", REWARD: ["Bard", "Sorcerer"] },
			[2]: { TEXT: "KILL!!", REWARD: ["Barbarian", "Fighter", "Rogue", "Monk"] },
		}
	},
	
	Q4:
	{
		Q: "You’re in a tomb and there’s a door with a puzzle on it.\nWhat do you do to get through it?",
		A:
		{
			[0]: { TEXT: "Try to find a different way around it.", REWARD: ["Rogue", "Ranger", "Druid", "Sorcerer"] },
			[1]: { TEXT: "Just first try to open it...", REWARD: ["Bard", "Monk"] },
			[2]: { TEXT: "Just SMASH THROUGH IT.", REWARD: ["Barbarian", "Fighter"] },
			[3]: { TEXT: "Solve the puzzle.", REWARD: ["Wizard", "Cleric"] },
		}
	},
	
	Q5:
	{
		Q: "When you are in trouble, what do you fall back on?",
		A:
		{
			[0]: { TEXT: "The being I worship!", REWARD: ["Paladin", "Cleric", "Warlock"] },
			[1]: { TEXT: "My friends! Help me!", REWARD: ["Bard", "Druid"] },
			[2]: { TEXT: "Nothing! I'm confient in my ability.", REWARD: ["Barbarian", "Fighter", "Rogue", "Sorcerer"] },
			[3]: { TEXT: "The clarity of my mind!", REWARD: ["Monk", "Ranger", "Wizard"] },
		}
	},
	
	Q6:
	{
		Q: "How much patience do you have solving a rubix cube?",
		A:
		{
			[0]: { TEXT: "I sit there until it's done.", REWARD: ["Wizard", "Monk", "Ranger"] },
			[1]: { TEXT: "I'll smash it to bits!", REWARD: ["Barbarian", "Sorcerer"] },
			[2]: { TEXT: "I immediately give up.", REWARD: ["Druid", "Paladin"] },
			[3]: { TEXT: "I'll try it out, see what happens.", REWARD: ["Bard", "Fighter"] },
			[4]: { TEXT: "I'll get someone else to solve it for me.", REWARD: ["Rogue", "Warlock"] },
		}
	},
	
	Q7:
	{
		Q: "There’s a test coming up.\nWhat do you do to prepare for it?",
		A:
		{
			[0]: { TEXT: "Study studiously.", REWARD: ["Wizard", "Monk", "Cleric"] },
			[1]: { TEXT: "I can get away with cheating.", REWARD: ["Warlock", "Rogue"] },
			[2]: { TEXT: "I'll just wing it.", REWARD: ["Sorcerer"] },
		}
	},
	
	Q8:
	{
		Q: "You are in the treasury of a dragon.\nYou have time to pick up one object before it wakes up.\nWhat do you look for?",
		A:
		{
			[0]: { TEXT: "Go for the gold!", REWARD: ["Rogue"] },
			[1]: { TEXT: "Play it safe and leave.", REWARD: ["Monk", "Ranger", "Druid"] },
			[2]: { TEXT: "Find some rare books.", REWARD: ["Bard", "Wizard"] },
			[3]: { TEXT: "An elegant sword or shield.", REWARD: ["Fighter", "Barbarian", "Paladin"] },
		}
	},
	
	Q9:
	{
		Q: "If you pick up a sword, why do you do it?",
		A:
		{
			[0]: { TEXT: "For the skill!", REWARD: ["Fighter", "Wizard"] },
			[1]: { TEXT: "To defend others!", REWARD: ["Paladin", "Cleric"] },
			[2]: { TEXT: "To fight!", REWARD: ["Barbarian"] },
			[3]: { TEXT: "For my own gain...", REWARD: ["Rogue", "Sorcerer", "Warlock"] },
		}
	},
	
	Q10:
	{
		Q: "Where do you feel most at home?",
		A:
		{
			[0]: { TEXT: "A battlefield.", REWARD: ["Barbarian", "Fighter"] },
			[1]: { TEXT: "In the forest.", REWARD: ["Druid", "Ranger"] },
			[2]: { TEXT: "In a library.", REWARD: ["Wizard", "Sorcerer"] },
			[3]: { TEXT: "The temple of my god.", REWARD: ["Cleric", "Monk", "Paladin"] },
			[4]: { TEXT: "A busy town square.", REWARD: ["Bard"] },
		}
	},
	
	Q11:
	{
		Q: "What kind of company do you keep?",
		A:
		{
			[0]: { TEXT: "I hang out with shady people.", REWARD: ["Rogue", "Warlock"] },
			[1]: { TEXT: "I'm friends with everyone!", REWARD: ["Bard", "Fighter"] },
			[2]: { TEXT: "The animals in the forest.", REWARD: ["Druid", "Ranger"] },
			[3]: { TEXT: "Fellow followers of my faith.", REWARD: ["Cleric", "Monk", "Paladin"] },
		}
	},
	
	Q12:
	{
		Q: "What do you prefer to do in a battle?",
		A:
		{
			[0]: { TEXT: "Assist my friend when they need it.", REWARD: ["Bard", "Druid"] },
			[1]: { TEXT: "Heal those in need.", REWARD: ["Cleric"] },
			[2]: { TEXT: "Be on the front lines.", REWARD: ["Barbarian", "Fighter", "Paladin"] },
			[3]: { TEXT: "I like to see explosions.", REWARD: ["Wizard", "Sorcerer", "Warlock"] },
			[4]: { TEXT: "Look for the perfect opening to strike.", REWARD: ["Rogue", "Ranger"] },
		}
	},
}

var Start = function(game) {};
Start.prototype = {
	preload: function() 
	{
		game.load.spritesheet('button', 'assets/img/button_sprite_sheet2.png', 193, 71);
	},
	
	create: function() 
	{
		game.stage.backgroundColor = '#000000';
		
		for (var key in PROPERTIES.CLASS_BUCKETS)
		{
			PROPERTIES.CLASS_BUCKETS[key] = 0;
		}
		
		function onUp(button, pointer, isOver)
		{
			if (isOver)
			{
				PROPERTIES.QUESTION++;
				game.state.start('Question');
			}
		}
		
		button = game.add.button(game.world.centerX, game.world.centerY, 'button', onUp, this, 2, 1, 0);
		button.anchor.x = 0.5;
		button.anchor.y = 0.5;
		
		buttonText = game.add.text(game.world.centerX, game.world.centerY + 3, 'Start Quiz', { font: MAIN_FONT, fontStyle: MAIN_STYLE, fontSize: '20px', fill: '#ffffff', align: "center" });
		buttonText.anchor.x = 0.5;
		buttonText.anchor.y = 0.5;
		
		button.scale.setTo((buttonText.width/BUTTON_WIDTH) + 0.15, (buttonText.height/BUTTON_HEIGHT) + 0.3);
	},
	
	update: function() 
	{
		
	}

}

var Question = function(game) {};
Question.prototype = {
	preload: function()
	{
		
	},
	
	create: function()
	{
		QVal = "Q" + PROPERTIES.QUESTION;
		
		QData = CLASS_QUESTIONS[QVal];
		Q = QData.Q;
		
		QText = game.add.text(game.world.centerX, 100, Q, { font: MAIN_FONT, fontStyle: MAIN_STYLE, fontSize: '25px', fill: '#ffffff', align: "center" });
		QText.anchor.x = 0.5;
		QText.anchor.y = 0.5;
		
		function nextState()
		{
			if (PROPERTIES.QUESTION < Object.keys(CLASS_QUESTIONS).length)
			{
				PROPERTIES.QUESTION++;
				game.state.start('Question');
			}
			else
			{
				PROPERTIES.QUESTION = 0;
				game.state.start('Results');
			}
		}
		
		if (Object.keys(QData.A).length >= 1)
		{
			function onUp1(button, pointer, isOver)
			{
				if (isOver)
				{
					var rewards = QData.A[0].REWARD;
					
					for (var k = 0; k < rewards.length; k++)
					{
						PROPERTIES.CLASS_BUCKETS[rewards[k]]++;
					}
					
					nextState();
				}
			}
			
			var AButton1 = game.add.button(game.world.centerX, 225 + (75 * 0), 'button', onUp1, this, 2, 1, 0);
			AButton1.anchor.x = 0.5;
			AButton1.anchor.y = 0.5;
			
			var AText1 = game.add.text(game.world.centerX, 225 + (75 * 0) + 3, QData.A[0].TEXT, { font: MAIN_FONT, fontStyle: MAIN_STYLE, fontSize: '18px', fill: '#ffffff', align: "center" });
			AText1.anchor.x = 0.5;
			AText1.anchor.y = 0.5;
			
			AButton1.scale.setTo((AText1.width/BUTTON_WIDTH) + 0.15, (AText1.height/BUTTON_HEIGHT) + 0.3);
		}
		
		if (Object.keys(QData.A).length >= 2)
		{
			function onUp2(button, pointer, isOver)
			{
				if (isOver)
				{
					var rewards = QData.A[1].REWARD;
					
					for (var k = 0; k < rewards.length; k++)
					{
						PROPERTIES.CLASS_BUCKETS[rewards[k]]++;
					}
					
					nextState();
				}
			}
			
			var AButton2 = game.add.button(game.world.centerX, 225 + (75 * 1), 'button', onUp2, this, 2, 1, 0);
			AButton2.anchor.x = 0.5;
			AButton2.anchor.y = 0.5;
			
			var AText2 = game.add.text(game.world.centerX, 225 + (75 * 1) + 3, QData.A[1].TEXT, { font: MAIN_FONT, fontStyle: MAIN_STYLE, fontSize: '18px', fill: '#ffffff', align: "center" });
			AText2.anchor.x = 0.5;
			AText2.anchor.y = 0.5;
			
			AButton2.scale.setTo((AText2.width/BUTTON_WIDTH) + 0.15, (AText2.height/BUTTON_HEIGHT) + 0.3);
		}
		
		if (Object.keys(QData.A).length >= 3)
		{
			function onUp3(button, pointer, isOver)
			{
				if (isOver)
				{
					var rewards = QData.A[2].REWARD;
					
					for (var k = 0; k < rewards.length; k++)
					{
						PROPERTIES.CLASS_BUCKETS[rewards[k]]++;
					}
					
					nextState();
				}
			}
			
			var AButton3 = game.add.button(game.world.centerX, 225 + (75 * 2), 'button', onUp3, this, 2, 1, 0);
			AButton3.anchor.x = 0.5;
			AButton3.anchor.y = 0.5;
			
			var AText3 = game.add.text(game.world.centerX, 225 + (75 * 2) + 3, QData.A[2].TEXT, { font: MAIN_FONT, fontStyle: MAIN_STYLE, fontSize: '18px', fill: '#ffffff', align: "center" });
			AText3.anchor.x = 0.5;
			AText3.anchor.y = 0.5;
			
			AButton3.scale.setTo((AText3.width/BUTTON_WIDTH) + 0.15, (AText3.height/BUTTON_HEIGHT) + 0.3);
		}
		
		if (Object.keys(QData.A).length >= 4)
		{
			function onUp4(button, pointer, isOver)
			{
				if (isOver)
				{
					var rewards = QData.A[3].REWARD;
					
					for (var k = 0; k < rewards.length; k++)
					{
						PROPERTIES.CLASS_BUCKETS[rewards[k]]++;
					}
					
					nextState();
				}
			}
			
			var AButton4 = game.add.button(game.world.centerX, 225 + (75 * 3), 'button', onUp4, this, 2, 1, 0);
			AButton4.anchor.x = 0.5;
			AButton4.anchor.y = 0.5;
			
			var AText4 = game.add.text(game.world.centerX, 225 + (75 * 3), QData.A[3].TEXT, { font: MAIN_FONT, fontStyle: MAIN_STYLE, fontSize: '18px', fill: '#ffffff', align: "center" });
			AText4.anchor.x = 0.5;
			AText4.anchor.y = 0.5;
			
			AButton4.scale.setTo((AText4.width/BUTTON_WIDTH) + 0.15, (AText4.height/BUTTON_HEIGHT) + 0.3);
		}
		
		if (Object.keys(QData.A).length >= 5)
		{
			function onUp5(button, pointer, isOver)
			{
				if (isOver)
				{
					var rewards = QData.A[4].REWARD;
					
					for (var k = 0; k < rewards.length; k++)
					{
						PROPERTIES.CLASS_BUCKETS[rewards[k]]++;
					}
					
					nextState();
				}
			}
			
			var AButton5 = game.add.button(game.world.centerX, 225 + (75 * 4), 'button', onUp5, this, 2, 1, 0);
			AButton5.anchor.x = 0.5;
			AButton5.anchor.y = 0.5;
			
			var AText5 = game.add.text(game.world.centerX, 225 + (75 * 4) + 3, QData.A[4].TEXT, { font: MAIN_FONT, fontStyle: MAIN_STYLE, fontSize: '18px', fill: '#ffffff', align: "center" });
			AText5.anchor.x = 0.5;
			AText5.anchor.y = 0.5;
			
			AButton5.scale.setTo((AText5.width/BUTTON_WIDTH) + 0.15, (AText5.height/BUTTON_HEIGHT) + 0.3);
		}
		
	},
	
	update: function()
	{
		
	}
}


var Results = function(game) {};
Results.prototype = {
	preload: function() 
	{
		
	},
	
	create: function() 
	{
		RText = game.add.text(game.world.centerX, 120, "Your results:", { font: MAIN_FONT, fontStyle: MAIN_STYLE, fontSize: '25px', fill: '#ffffff', align: "center" });
		RText.anchor.x = 0.5;
		RText.anchor.y = 0.5;
		
		var temp = ["Fighter", "Barbarian", "Paladin", "Cleric", "Rogue", "Bard", "Ranger", "Sorcerer", "Warlock", "Wizard", "Monk", "Druid"],
		temp = Shuffle(temp);
		var results = [];
		
		for (var i = 0; i < 4; i++)
		{
			var bestScore = 0;
			var bestClass = null;
			
			for (var c = 0; c < temp.length; c++)
			{
				if (!results.includes(temp[c]))
				{
					var thisBucket = PROPERTIES.CLASS_BUCKETS[temp[c]];
					
					if (thisBucket > bestScore)
					{
						bestScore = thisBucket;
						bestClass = temp[c];
					}
				}
			}
			
			results.push(bestClass);
		}
		
		for (var i = 0; i < results.length; i++)
		{
			var num = i+1;
			var newString = num + ": " + results[i] + " (+" + PROPERTIES.CLASS_BUCKETS[results[i]] + ")";
			
			newText = game.add.text(game.world.centerX - 90, 200 + (50*i), newString, { font: MAIN_FONT, fontStyle: MAIN_STYLE, fontSize: '20px', fill: '#ffffff', align: "left" });
			newText.anchor.x = 0;
			newText.anchor.y = 0.5;
		}
		
		function onUp(button, pointer, isOver)
		{
			for (var key in PROPERTIES.CLASS_BUCKETS)
			{
				PROPERTIES.CLASS_BUCKETS[key] = 0;
			}
			
			if (isOver)
			{
				PROPERTIES.QUESTION = 1;
				game.state.start('Question');
			}
		}
		
		button = game.add.button(game.world.centerX, game.world.centerY + 180, 'button', onUp, this, 2, 1, 0);
		button.anchor.x = 0.5;
		button.anchor.y = 0.5;
		
		buttonText = game.add.text(game.world.centerX, game.world.centerY + 183, 'Restart Quiz', { font: MAIN_FONT, fontStyle: MAIN_STYLE, fontSize: '20px', fill: '#ffffff', align: "center" });
		buttonText.anchor.x = 0.5;
		buttonText.anchor.y = 0.5;
		
		button.scale.setTo((buttonText.width/BUTTON_WIDTH) + 0.15, (buttonText.height/BUTTON_HEIGHT) + 0.3);
	},
	
	update: function() 
	{
		
	}

}