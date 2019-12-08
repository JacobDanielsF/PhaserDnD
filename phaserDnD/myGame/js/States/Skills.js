var Skills = function(game) {};
Skills.prototype = {
	preload: function() 
	{
		game.load.spritesheet('checkbox', 'assets/img/checkbox.png', 51, 50,2);

	},
	
	onContinue: function(button, pointer, isOver)
	{
		if (isOver)
		{
			game.state.start('End');
		}
	},

	create: function() 
	{

		var topText = game.add.text(game.world.centerX, 60, 
			"Choose any " + SKILLS[PROPERTIES.CLASS].CHOOSE + " skills:", titleTextStyle);
		topText.anchor.x = 0.5;
		topText.anchor.y = 0.5;

		var description = game.add.text(game.world.centerX, 145, 
			"These will help your character surmount challenges as you roleplay!" +
			"\nYou should choose skills based on what you think your character\nwould be good at or interested in.", textStyle);
		description.anchor.x = 0.5;
		description.anchor.y = 0.5;
    	description.fontSize = "24px"; 
		description.fontStyle = "italic";

		var skills = SKILLS[PROPERTIES.CLASS].SKILLS;

		//add each skill
		lineSpacing = 70;
		width = 275; 
		numCols = 3; 
		totalHeight = 0; //to know where to put the continue button so it aint just floating way down there
		for (var i = 0; i < skills.length; i++) {
			var skill = new Skill(110 + (width * (i % numCols)), 240 + (lineSpacing * Math.floor(i / numCols)),
				'checkbox', this, skills[i], SKILL_DESCRIPTIONS[skills[i]], game);
			if (skill.y > totalHeight)
				totalHeight = skill.y;
			game.add.existing(skill);
		}

		var continueButton = game.add.button(game.world.centerX, totalHeight + 60, 'button', this.onContinue, this, 2, 1, 0);
		continueButton.anchor.x = 0.5;
		continueButton.anchor.y = 0.5;
		continueButton.alpha = .5;

		var continueText = game.add.text(game.world.centerX, totalHeight + 60, "Continue", titleTextStyle);
		continueText.anchor.x = 0.5;
		continueText.anchor.y = 0.5;

		continueButton.scale.setTo((continueText.width/BUTTON_WIDTH) + 0.15, (continueText.height/BUTTON_HEIGHT) + 0.3);

		this.errorText = game.add.text(game.world.centerX, totalHeight + 95, "You need to select " +
			SKILLS[PROPERTIES.CLASS].CHOOSE + " skills! ", titleTextStyle);
		this.errorText.anchor.x = 0.5;
		this.errorText.anchor.y = 0.5;
	    this.errorText.fontSize = 18;
	    this.errorText.fill = '#ffcffb';
	    this.errorText.alpha = 0;
	},

	onContinue: function(button, pointer, isOver)
	{
		if (PROPERTIES.SKILLS.length < SKILLS[PROPERTIES.CLASS].CHOOSE) {
			this.errorText.alpha = 1; 
		}
		else if (isOver)
		{
			game.state.start('End');
		}
	},

	update: function() 
	{

	}
}
