var BUTTON_WIDTH = 193;
var BUTTON_HEIGHT = 71;

var Question = function(game) {};
Question.prototype = {
	preload: function()
	{
		
	},
	
	create: function()
	{


		//Question text
		QVal = "Q" + PROPERTIES.QUESTION;
		
		QData = CLASS_QUESTIONS[QVal];
		Q = QData.Q;
		
		QText = game.add.text(game.world.centerX, 100, Q, { font: MAIN_FONT, fontStyle: MAIN_STYLE, fontSize: '25px', fill: '#ffffff', align: "center" });
		QText.anchor.x = 0.5;
		QText.anchor.y = 0.5;
		
		
		if (Object.keys(QData.A).length >= 1)
		{
			// function onUp1(button, pointer, isOver)
			// {
			// 	if (isOver)
			// 	{
			// 		var rewards = QData.A[0].REWARD;
					
			// 		for (var k = 0; k < rewards.length; k++)
			// 		{
			// 			PROPERTIES.CLASS_BUCKETS[rewards[k]]++;
			// 		}
					
			// 		nextState();
			// 	}
			// }

			button = new AnswerButton(game, game.world.centerX, 225, 'button',
				this, QData.A[0].REWARD);
			game.add.existing(button);
			
			var AText1 = game.add.text(game.world.centerX, 225 + (75 * 0) + 3, QData.A[0].TEXT, { font: MAIN_FONT, fontStyle: MAIN_STYLE, fontSize: '18px', fill: '#ffffff', align: "center" });
			AText1.anchor.x = 0.5;
			AText1.anchor.y = 0.5;
			
			button.scale.setTo((AText1.width/BUTTON_WIDTH) + 0.15, (AText1.height/BUTTON_HEIGHT) + 0.3);
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
		
	},

	onUp: function(button, pointer, isOver, rewards) 
	{
		if (isOver)
		{	

			for (var k = 0; k < rewards.length; k++)
			{
				PROPERTIES.CLASS_BUCKETS[rewards[k]]++;
			}
		
			nextState();
		}
	}

}