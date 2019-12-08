//use queue to keep three skills selected
skillToButtonDict = []; 

function Skill(x, y, key, callbackContext, skill, descriptionText, game)
{
    this.skill = skill;
    skillToButtonDict[skill] = this;
    this.selected = false; 

	Phaser.Button.call(this, game, x, y, key, doNothing, callbackContext, 0);
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.scale.setTo(.8, .8);

    this.events.onInputUp.add(selectSkill, this);
    this.events.onInputOver.add(hover, this);
    this.events.onInputOut.add(hover, this);
    this.events.onInputDown.add(doNothing, this);

    //add text
    this.skillText = this.game.add.text(x + 25, y, skill, textStyle);
    this.skillText.anchor.y = 0.5;
    this.skillText.inputEnabled = true; //hover to view tooltip

    //use for keeping track in Update()
    this.pointerOver = false; 

    //add tooltip text
    this.backRect = game.add.image(x + 25, y + 25, 'textBox');
    this.blurbText = game.add.text(x + 35, y + 35, descriptionText, textStyle);
    this.blurbText.fontSize = 18;
    this.blurbText.fill = '#EEE8FC';
    this.blurbText.wordWrap = true;
    this.blurbText.wordWrapWidth = 400;

    //adjust text box to tooltip text
    this.backRect.width = this.blurbText.width + 20;
    this.backRect.height = this.blurbText.height + 15;
    this.backRect.alpha = .95;

    //initialize
    this.backRect.alpha = 0;
    this.blurbText.alpha = 0;

    //make sure tooltip is always on screen
    if (this.backRect.x + this.backRect.width > game.width) {
        this.blurbText.x = game.width - this.blurbText.width - 20;
        this.backRect.x = game.width - this.backRect.width - 10;
    }
    if (this.backRect.y + this.backRect.height > game.height) {
        this.blurbText.y = game.height - this.blurbText.height - 20;
        this.backRect.y = game.height - this.backRect.height - 10;
    }


}

Skill.prototype = Object.create(Phaser.Button.prototype);
Skill.prototype.constructor = Skill;

Skill.prototype.update = function()
{
    if (this.skillText.input.pointerOver())
    {
        this.backRect.alpha = .8;
        this.blurbText.alpha = 1;

        //prevent flickering 
        if (!this.pointerOver) {
            this.backRect.bringToTop();
            this.blurbText.bringToTop();
        }

        this.pointerOver = true; 
    }
    else
    {
        this.backRect.alpha = 0;
        this.blurbText.alpha = 0;

        this.pointerOver = false; 
    }
}

function selectSkill(skillButton) {
    if (skillButton.selected) { //deselect
        deselect(skillButton.skill);
        skillButton.frame = 0;
        skillButton.selected = false;
    }
    else { //select
        enqueue(skillButton.skill);
        skillButton.frame = 1
        skillButton.selected = true; 
    }
}

//for some reason when I remove this it breaks...
function doNothing(skillButton) {
}

//buttons reset frames when pointer is hovered, so catch it
function hover(skillButton) {
    if (skillButton.selected)
        skillButton.frame = 1; 
    else
        skillButton.frame = 0;
}

function enqueue(skillButton){
   PROPERTIES.SKILLS.push(skillButton);
   if (PROPERTIES.SKILLS.length > SKILLS[PROPERTIES.CLASS].CHOOSE) //never choose over max amount of skills
       dequeue(); 
}

function dequeue() {
    var skill = PROPERTIES.SKILLS.shift(); 
    var button = skillToButtonDict[skill];
    button.selected = false;
    button.frame = 0; 
    return button;
}

function deselect(skillButton) {
    PROPERTIES.SKILLS.splice(PROPERTIES.SKILLS.indexOf(skillButton), 1 );
}