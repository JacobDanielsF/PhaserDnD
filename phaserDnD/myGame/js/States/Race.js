var Race = function(game) {};
Race.prototype = {

	preload: function() 
	{
		game.load.image('tempElf', 'assets/img/temp_elf.png');
		game.load.spritesheet('questionMark', 'assets/img/temp_question_mark.png', 48, 45);
		game.load.image('questionMark', 'assets/img/temp_question_mark.png');
		game.load.image('textBox', 'assets/img/textbox.png');
	},

	create: function()
	{
		//add title text
		QText = game.add.text(game.world.centerX, 75, "Select your character's race!", titleTextStyle);
		QText.anchor.x = 0.5;
		QText.anchor.y = 0.5;
		
		suggestions = RACE_SUGGESTIONS[PROPERTIES.CLASS]
		
		tipText = game.add.text(game.world.centerX, 145, suggestions.TIP, textStyle);
		tipText.anchor.x = 0.5;
		tipText.anchor.y = 0.5;
		
		//print(suggestions.length)
		
		var spacing = 0
		
		for (var i = 0; i < Object.keys(suggestions).length - 1; i++)
		{
			var statClasses = suggestions[i];
			
			var raceStatText = game.add.text(game.world.centerX, 220 + (spacing * 50), statClasses.TEXT, textStyle);
		    raceStatText.anchor.x = 0.5;
		    raceStatText.anchor.y = 0.5;
			
			var races = statClasses.RACES;
			
			var mid = (races.length-1)/2;
			var scale = 200;
			
			spacing++;
			
			for (var j = 0; j < races.length; j++)
			{
				var race = races[j];
				
				//if (race == 'Half_elf') race = 'Half-elf';
				//if (race == 'Half_orc') race = 'Half-orc';
				
				var raceText = game.add.text(game.world.centerX - 265, 220 + (spacing * 50), race, textStyle);
				raceText.anchor.x = 1;
				raceText.anchor.y = 0.5;
				
				var descText = game.add.text(game.world.centerX - 230, 220 + (spacing * 50), RACE_DESCRIPTIONS[races[j]], smallTextStyle);
				descText.anchor.x = 0;
				descText.anchor.y = 0.5;
				
				//create button for the answer
				button = new RaceButton(game, game.world.centerX - 250, 220 + (spacing * 50), 'button',
					this, races[j]);
				game.add.existing(button);
				
				//scale the button to the size of the text
				button.scale.setTo((raceText.width/BUTTON_WIDTH) + 0.15, 
					(raceText.height/BUTTON_HEIGHT) + 0.3);
				button.anchor.x = 1;
				button.anchor.y = 0.5;
				
				spacing++;
			}
			
			spacing += 0.5;
		}
		
		/*
		//add second row of races
		for (let j = game.width - game.width/10.5; j > 0; j -= game.width/5) {
			var race = new RaceIcon(j, 400, 'tempElf', 'elf', game);
			game.add.existing(race);
		}

		//add first row of races
		for (let j = game.width - game.width/5; j > 0; j -= game.width/5) {
			var race = new RaceIcon(j, 150, 'tempElf', 'elf', game);
			game.add.existing(race);
		}

		//add question marks for additional info
		//question marks added seperately bc otherwise get overlap issues w text
		for (let j = game.width - game.width/9; j > 0; j -= game.width/5) {
			var qMark = new QuestionMark(j - race.width/2, 350 + race.height,'questionMark', 
				'Elves are super neat! They have pointy ears\nand live a long time.', game);
			game.add.existing(qMark);
		}

		for (let j = game.width - game.width/5; j > 0; j -= game.width/5) {
			var qMark = new QuestionMark(j - race.width/2, 100 + race.height,'questionMark', 
				'Elves are super neat! They have pointy ears\nand live a long time.', game);
			game.add.existing(qMark);
		}
		*/
	},
}