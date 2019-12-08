//prefab for race icons
//when clicked, icon will store what race was kept and will send player to next screen
//icons increase in size slightly when hovered over

function RaceIcon(x, y, atlas, race, game)
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
}

RaceIcon.prototype = Object.create(Phaser.Image.prototype);
RaceIcon.prototype.constructor = RaceIcon;

RaceIcon.prototype.update = function()
{
    var sizeIncrease = 10;
    if (this.input.pointerOver())
    {
        this.width = this.originalWidth + sizeIncrease;
        this.height = this.originalHeight + sizeIncrease;
    }
    else
    {
        this.width = this.originalWidth;
        this.height = this.originalHeight; 
    }

}

function clickRace(raceIcon) {
    PROPERTIES.RACE = this.race;
    game.state.start('Stats');
}
