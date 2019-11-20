var Intro = function(game) {};
Intro.prototype = {
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
		
		var button = game.add.button(game.world.centerX, 225 + (75 * 0), 'button', onUp, this, 2, 1, 0);
		button.anchor.x = 0.5;
		button.anchor.y = 0.5;
			
		var text = game.add.text(game.world.centerX, 225 + (75 * 0) + 3, "Start quiz!", textStyle);
		text.anchor.x = 0.5;
		text.anchor.y = 0.5;
			
		// button.scale.setTo((text/BUTTON_WIDTH) + 0.15, (text/BUTTON_HEIGHT) + 0.3);
	},
	
	update: function() 
	{
		
	}

}