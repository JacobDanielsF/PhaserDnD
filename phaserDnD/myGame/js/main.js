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
var BUTTON_WIDTH = 193;
var BUTTON_HEIGHT = 71;

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
		
		for (var key in PROPERTIES.CLASS_BUCKETS)
		{
			PROPERTIES.CLASS_BUCKETS[key] = 0;
		}
		
		//console.log(PROPERTIES.CLASS_BUCKETS);
		
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
		//console.log(QVal);
		
		QData = CLASS_QUESTIONS[QVal];
		Q = QData.Q;
		
		QText = game.add.text(game.world.centerX, 100, Q, { font: MAIN_FONT, fontStyle: MAIN_STYLE, fontSize: '25px', fill: '#ffffff', align: "center" });
		QText.anchor.x = 0.5;
		QText.anchor.y = 0.5;
		
		if (Object.keys(QData.A).length >= 1)
		{
			function onUp1(button, pointer, isOver)
			{
				if (isOver)
				{
					//console.log(PROPERTIES.CLASS_BUCKETS);
					//console.log(QData.A[0].REWARD);
					//console.log(QData.A[0]);
					var rewards = QData.A[0].REWARD;
					
					for (var k = 0; k < rewards.length; k++)
					{
						//console.log(rewards[k]);
						PROPERTIES.CLASS_BUCKETS[rewards[k]]++;
					}
					
					//console.log(PROPERTIES.CLASS_BUCKETS);
					
					PROPERTIES.QUESTION = 0;
					game.state.start('Start');
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
					//console.log(PROPERTIES.CLASS_BUCKETS);
					//console.log(QData.A[1].REWARD);
					//console.log(QData.A[1]);
					var rewards = QData.A[1].REWARD;
					
					for (var k = 0; k < rewards.length; k++)
					{
						//console.log(rewards[k]);
						PROPERTIES.CLASS_BUCKETS[rewards[k]]++;
					}
					
					//console.log(PROPERTIES.CLASS_BUCKETS);
					
					PROPERTIES.QUESTION = 0;
					game.state.start('Start');
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
					//console.log(PROPERTIES.CLASS_BUCKETS);
					//console.log(QData.A[i].REWARD);
					//console.log(QData.A[2]);
					var rewards = QData.A[2].REWARD;
					
					for (var k = 0; k < rewards.length; k++)
					{
						//console.log(rewards[k]);
						PROPERTIES.CLASS_BUCKETS[rewards[k]]++;
					}
					
					//console.log(PROPERTIES.CLASS_BUCKETS);
					
					PROPERTIES.QUESTION = 0;
					game.state.start('Start');
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
					//console.log(PROPERTIES.CLASS_BUCKETS);
					//console.log(QData.A[3].REWARD);
					//console.log(QData.A[3]);
					var rewards = QData.A[3].REWARD;
					
					for (var k = 0; k < rewards.length; k++)
					{
						//console.log(rewards[k]);
						PROPERTIES.CLASS_BUCKETS[rewards[k]]++;
					}
					
					//console.log(PROPERTIES.CLASS_BUCKETS);
					
					PROPERTIES.QUESTION = 0;
					game.state.start('Start');
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
					//console.log(PROPERTIES.CLASS_BUCKETS);
					//console.log(QData.A[4].REWARD);
					//console.log(QData.A[4]);
					var rewards = QData.A[4].REWARD;
					
					for (var k = 0; k < rewards.length; k++)
					{
						//console.log(rewards[k]);
						PROPERTIES.CLASS_BUCKETS[rewards[k]]++;
					}
					
					//console.log(PROPERTIES.CLASS_BUCKETS);
					
					PROPERTIES.QUESTION = 0;
					game.state.start('Start');
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