var Intro = function(game) {};

Intro.prototype = {
	preload: function() 
	{
		game.load.spritesheet('button', 'assets/img/button_sprite_sheet2.png', 193, 71);
	},
	
	create: function() 
	{
		//-----SET ALL GAME CONFIGURATIONS-----

		//align in center of page
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;

		//background color
		game.stage.backgroundColor = '#4C5760';

		//-------------------------------------

		for (var key in PROPERTIES.CLASS_BUCKETS)
		{
			PROPERTIES.CLASS_BUCKETS[key] = 0;
		}
		
		PROPERTIES.QUESTION = 0;
		PROPERTIES.CLASS = null;
		
		//event timer to make sure all google texts are loaded before generating text
		game.time.events.add(Phaser.Timer.SECOND, this.makeText, this);

	},
	
	update: function() 
	{
		
	},

	//for button to move to next state
	onUp: function(button, pointer, isOver)
	{
		if (isOver)
		{
			PROPERTIES.QUESTION++;
			game.state.start('Question');
		}
	},

	makeText: function() {

		var title = game.add.text(game.world.centerX, standardTitleHeight + (75 * 0) + 3, 
			"Welcome to What is Not Called Baby DnD!", titleTextStyle);
		title.anchor.x = 0.5;
		title.anchor.y = 0.5;

		var description = game.add.text(game.world.centerX, standardTitleHeight + (100 * 1) + 3, 
		"We're not patronizing!!!", textStyle);
		description.anchor.x = 0.5;
		description.anchor.y = 0.5;

		description = game.add.text(game.world.centerX, standardTitleHeight + (100 * 2) + 3, 
		"This tool will help you create a level 1 character in D&D edition 5!", textStyle);
		description.anchor.x = 0.5;
		description.anchor.y = 0.5;

		description = game.add.text(game.world.centerX, standardTitleHeight + (100 * 3) + 3, 
		"Go ahead and...", textStyle);
		description.anchor.x = 0.5;
		description.anchor.y = 0.5;

		var button = game.add.button(game.world.centerX, standardTitleHeight + (100 * 4), 'button', this.onUp, this, 2, 1, 0);
		button.anchor.x = 0.5;
		button.anchor.y = 0.5;
		button.alpha = .5;

		var text = game.add.text(game.world.centerX, standardTitleHeight + (100 * 4) + 4, "start quiz!", titleTextStyle);
		text.anchor.x = 0.5;
		text.anchor.y = 0.5;
		
		button.scale.setTo((text.width/BUTTON_WIDTH) + 0.15, (text.height/BUTTON_HEIGHT) + 0.3);
	}

}


