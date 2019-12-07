//Create an editable text box for stats, along with displaying the ability modifier

//initial value: what will be put in the text box initially
//stat type: Intelligence, Strength, etc.
function StatTextBox(game, x, y, initialValue, statType) {

	//create textbox
	this.textBox = game.add.inputField(x, y, {
	    font: '28px Overlock',
	    fill: '#fff',
	    fontWeight: 'bold',
	    width: 30,
	    padding: 8,
	    borderWidth: 1,
	    borderColor: '#a5b5aa',
	    backgroundColor: '#a5b5aa',
	    borderRadius: 4,
	    placeHolderColor: '#fff',
	    min: "0",
		max: "20",
	    placeHolder: initialValue.toString(),
	    type: PhaserInput.InputType.number
	});

	//add in miniStat
	Phaser.Text.call(this, game, x + 55, y + 7, calculateMiniStat(initialValue), textStyle);

	//initialize properties
	this.statType = statType; 
	PROPERTIES.STATS[this.statType] = initialValue;
}

StatTextBox.prototype = Object.create(Phaser.Text.prototype);
StatTextBox.prototype.constructor = StatTextBox;

//set Properties and miniStat on update
//it's janky and there's probably a non-overkill way of doing it but it works
//(I couldn't find any way for textbox to send a signal that the user changed the text inside)
StatTextBox.prototype.update = function() {
	//update properties & ministat in case user changed textBox 
	//if / else bc these work in mysterious ways...
	if (this.textBox.text.text != "") {
		PROPERTIES.STATS[this.statType] = this.textBox.text.text; 
		this.text = calculateMiniStat(parseInt(this.textBox.text.text));	
	} 
	else  {
		PROPERTIES.STATS[this.statType] = this.textBox.placeHolder.text; 
		this.text = calculateMiniStat(parseInt(this.textBox.placeHolder.text));
	}

}

//calculates the ability modifier
//param: int
//returns: string
function calculateMiniStat(value) {

	var miniStat = Math.floor((value - 10) / 2);
	
	var sign = "+";
	
	if (miniStat < 0)
	{
		sign = "";
	}

	return "(" + sign + miniStat + ")";
}