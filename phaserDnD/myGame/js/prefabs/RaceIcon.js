//prefab for race icons
//when clicked, icon will store what race was kept and will send player to next screen
//icons increase in size slightly when hovered over

function RaceIcon(x, y, atlas, race, text, game)
{
	Phaser.Image.call(this, game, x, y, atlas, race);
    this.anchor.x = 0.5; //for positioning

    //enable click
    this.inputEnabled = true;
    this.events.onInputDown.add(clickRace, this);

    this.race = race; 

    //store original height/width
    this.originalWidth = this.width;
    this.originalHeight = this.height;

    //use for keeping track in Update()
    this.pointerOver = false; 

    //add textbox image
    this.backRect = game.add.image(x, y + 35, 'textBox');

    //add text
    this.blurbText = game.add.text(x, y + 45, text, textStyle);
    this.blurbText.fontSize = 18;
    this.blurbText.fill = '#EEE8FC';
    this.blurbText.wordWrap = true;
    this.blurbText.wordWrapWidth = 400;

    //adjust textbox size to text
    this.backRect.width = this.blurbText.width + 20;
    this.backRect.height = this.blurbText.height + 15;
    this.backRect.alpha = .95;

    //initialize
    this.backRect.alpha = 0;
    this.blurbText.alpha = 0;

    //make sure text is always on screen
    if (this.backRect.x + this.backRect.width > game.width) {
        this.blurbText.x = game.width - this.blurbText.width - 20;
        this.backRect.x = game.width - this.backRect.width - 10;
    }
    if (this.backRect.y + this.backRect.height > game.height) {
        this.blurbText.y = game.height - this.blurbText.height - 15;
        this.backRect.y = game.height - this.backRect.height - 10;
    }
}

RaceIcon.prototype = Object.create(Phaser.Image.prototype);
RaceIcon.prototype.constructor = RaceIcon;

RaceIcon.prototype.update = function()
{
    var sizeIncrease = 10;
    if (this.input.pointerOver())
    {
        //popup size
        this.width = this.originalWidth + sizeIncrease;
        this.height = this.originalHeight + sizeIncrease;

        //show tooltip
        this.backRect.alpha = .8;
        this.blurbText.alpha = 1;

        //position correctly
        this.blurbText.x = this.worldPosition.x-190;
        this.blurbText.y = this.worldPosition.y+130;
        this.backRect.x = this.worldPosition.x-200;
        this.backRect.y = this.worldPosition.y+120;

        if (this.backRect.x + this.backRect.width > game.width) {
            this.blurbText.x = game.width - this.blurbText.width - 20;
            this.backRect.x = game.width - this.backRect.width - 10;
        }
        if (this.backRect.y + this.backRect.height > game.height) {
            this.blurbText.y = game.height - this.blurbText.height - 15;
            this.backRect.y = game.height - this.backRect.height - 10;
        }
        if (this.backRect.x < 0) {
            this.blurbText.x = 20;
            this.backRect.x = 10;
        }


        //prevent tooltip flickering 
        if (!this.pointerOver) {
            this.backRect.bringToTop();
            this.blurbText.bringToTop();
        }

        this.pointerOver = true; 
    }
    else
    {
        //back to original size
        this.width = this.originalWidth;
        this.height = this.originalHeight; 

        //hide tooltip
        this.backRect.alpha = 0;
        this.blurbText.alpha = 0;

        this.pointerOver = false; 
    }
}

function clickRace(raceIcon) {
    PROPERTIES.RACE = this.race;
    game.state.start('Stats');
}
