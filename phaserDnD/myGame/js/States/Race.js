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

	},
}