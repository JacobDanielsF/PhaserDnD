var game;

// game settings
var config = {
    width: 800,
    height: 600,
    renderer: Phaser.AUTO,
    antialias: false,
}

// initialize states
window.onload = function() {
	game = new Phaser.Game(config);
	
	game.state.add('Start', Start);
	game.state.add('Question', Question);
	
	game.state.start('Start');
}

var MAIN_FONT = 'Verdana'; // main font
var MAIN_STYLE = 'bold'; // main font style

var PROPERTIES =
{
	CLASS_BUCKETS: {
		FIGHTER: 0,
		BARBARIAN: 0,
		PALADIN: 0,
		CLERIC: 0,
		ROUGE: 0,
		BARD: 0,
		RANGER: 0,
		SORCERER: 0,
		WARLOCK: 0,
		WIZARD: 0,
		MONK: 0,
		DRUID: 0,
	},
	
	QUESTION: 0,
};

var CLASS_QUESTIONS =
{
	Q1:
	{
		Q: "You’re ambushed by an enemy!\nWhat do you have on you?",
		A:
		{
			[0]: { TEXT: "A heavy greatsword!", REWARD: ["BARBARIAN", "PALADIN", "FIGHTER", "CLERIC"] },
			[1]: { TEXT: "A short sword hidden in your boot!", REWARD: ["ROUGE", "BARD", "RANGER"] },
			[2]: { TEXT: "Weapon? What weapon? You just need the spells in your head!", REWARD: ["SORCERER", "WARLOCK", "WIZARD"] },
			[3]: { TEXT: "The two fists nature gave me!", REWARD: ["MONK"] }
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
		console.log(QVal);
		
		QData = CLASS_QUESTIONS[QVal];
		Q = QData.Q;
		
		QText = game.add.text(game.world.centerX, 100, Q, { font: MAIN_FONT, fontStyle: MAIN_STYLE, fontSize: '25px', fill: '#ffffff', align: "center" });
		QText.anchor.x = 0.5;
		QText.anchor.y = 0.5;
		
		
		for (var i = 0; i < Object.keys(QData.A).length; i++)
		{
			function onUp(button, pointer, isOver)
			{
				if (isOver)
				{
					console.log(PROPERTIES.CLASS_BUCKETS);
					//console.log(QData.A[i].REWARD);
					console.log(QData.A[i]);
					var rewards = QData.A[i].REWARD;
					
					for (var k = 0; k < rewards.length; k++)
					{
						console.log(rewards[k]);
						PROPERTIES.CLASS_BUCKETS[rewards[k]]++;
					}
					
					console.log(PROPERTIES.CLASS_BUCKETS);
					
					PROPERTIES.QUESTION = 0;
					game.state.start('Start');
				}
			}
			
			var AButton = game.add.button(game.world.centerX, 225 + (75 * i), 'button', onUp, this, 2, 1, 0);
			AButton.anchor.x = 0.5;
			AButton.anchor.y = 0.5;
			
			var AText = game.add.text(game.world.centerX, 225 + (75 * i), QData.A[i].TEXT, { font: MAIN_FONT, fontStyle: MAIN_STYLE, fontSize: '18px', fill: '#ffffff', align: "center" });
			AText.anchor.x = 0.5;
			AText.anchor.y = 0.5;
		}
	},
	
	update: function()
	{
		
	}
}