// CMPM 179
// Baby DnD (tentative title)
// main.js
// DnD Class Quiz

var game;

// game settings
var config = {
    width: 900,
    height: 700,
    renderer: Phaser.AUTO,
    antialias: false,
};

// initialize states
window.onload = function() {
	game = new Phaser.Game(config);
	game.state.add('Intro', Intro);
	game.state.add('Question', Question);
	game.state.add('Results', Results);
	game.state.add('Race', Race);

	game.state.start('Intro');
};


//STYLE VARS
var titleTextStyle = { font: 'PT Serif', fontStyle: 'bold',  fontSize: '43px',
	fill: '#FFFFFF', align: "center", wordWrap: true, wordWrapWidth: 800 };
var textStyle = { font: 'Overlock', fontSize: '28px', fill: '#FFFFFF', align: "center" };

//use this to keep header heights consistent
var standardTitleHeight = 170;
//this is for paragraph / bullet point heights
var standardTextHeight = 300;

var BUTTON_WIDTH = 193;
var BUTTON_HEIGHT = 71;

var PROPERTIES =
{
	CLASS_BUCKETS: {
		Fighter: 0,
		Barbarian: 0,
		Paladin: 0,
		Cleric: 0,
		Rogue: 0,
		Bard: 0,
		Ranger: 0,
		Sorcerer: 0,
		Warlock: 0,
		Wizard: 0,
		Monk: 0,
		Druid: 0,
	},
	
	QUESTION: 0,
};

var CLASS_DESCRIPTIONS =
{
	Fighter: "A master of combat, proficient with many weapons.",
	Barbarian: "A fierce warrior full of battle rage.",
	Paladin: "A holy soldier, bound by an oath.",
	Cleric: "A divine preist who is faithful to a higher power.",
	Rogue: "A master of stealth and deception, out for their own self-interests.",
	Bard: "A curious musician with magical powers.",
	Ranger: "A soldier of the wild, skilled in martial combat and nature magic.",
	Sorcerer: "A spellcaster who possesses innate magical power.",
	Warlock: "A magic user who draws their power from pacts with supernatural entities.",
	Wizard: "A spellcaster who is dedicated to their magical studies.",
	Monk: "A martial artist with a deep spiritual connection.",
	Druid: "A nature-bound priest with a wide variety of nature-based powers.",
};

var RACE_DESCRIPTIONS =
{
	Dwarf: "A short, stout and stubborn race who traditionally live underground.",
	Elf: "A graceful, ancient race with great interest in adventure.",
	Dragonborn: "Half-dragon humanoids with unique origins and skills.",
	Halfling: "A race of smallish people who possess great stealth and social skills",
	Human: "The most average race. Humans have a bit of skill in many areas.",
	Gnome: "A very enthusiastic and curious race who enjoy a good prank.",
	Half-orc: "A tall and strong race descending from orcs. Often prejudiced.",
	Tiefling: "A race of demonic humanoids who are widely prejudiced wherever they go.",
}

var CLASS_QUESTIONS =
{
	Q1:
	{
		Q: "You’re ambushed by an enemy! What do you have on you?",
		A:
		{
			[0]: { TEXT: "A heavy greatsword!", REWARD: ["Barbarian", "Paladin", "Fighter", "Cleric"] },
			[1]: { TEXT: "A short sword hidden in your boot!", REWARD: ["Rogue", "Bard", "Ranger"] },
			[2]: { TEXT: "Weapon? What weapon? You just need the spells in your head!", REWARD: ["Sorcerer", "Warlock", "Wizard"] },
			[3]: { TEXT: "The two fists nature gave me!", REWARD: ["Monk"] }
		}
	},
	
	Q2:
	{
		Q: "You're on a long journey. After the bare essentials, what extra things will you pack?",
		A:
		{
			[0]: { TEXT: "An extra book to read.", REWARD: ["Wizard"] },
			[1]: { TEXT: "An instrument to provide entertainment.", REWARD: ["Bard"] },
			[2]: { TEXT: "Workout gear to keep up those gains.", REWARD: ["Barbarian", "Fighter"] },
			[3]: { TEXT: "Extra food that you like.", REWARD: ["Ranger", "Druid", "Monk"] },
			[4]: { TEXT: "A tome for the being you worship.", REWARD: ["Warlock", "Paladin", "Cleric"] }
		}
	},
	
	Q3:
	{
		Q: "You are approached by an enemy! What do you do?",
		A:
		{
			[0]: { TEXT: "Try to get the help of a higher power.", REWARD: ["Paladin", "Cleric", "Warlock"] },
			[1]: { TEXT: "Try to get on their good side before anything happens.", REWARD: ["Bard", "Sorcerer"] },
			[2]: { TEXT: "KILL!!", REWARD: ["Barbarian", "Fighter", "Rogue", "Monk"] },
		}
	},
	
	Q4:
	{
		Q: "You’re in a tomb and there’s a door with a puzzle on it. What do you do to get through it?",
		A:
		{
			[0]: { TEXT: "Try to find a different way around it.", REWARD: ["Rogue", "Ranger", "Druid", "Sorcerer"] },
			[1]: { TEXT: "Just first try to open it...", REWARD: ["Bard", "Monk"] },
			[2]: { TEXT: "Just SMASH THROUGH IT.", REWARD: ["Barbarian", "Fighter"] },
			[3]: { TEXT: "Solve the puzzle.", REWARD: ["Wizard", "Cleric"] },
		}
	},
	
	Q5:
	{
		Q: "When you are in trouble, what do you fall back on?",
		A:
		{
			[0]: { TEXT: "The being I worship!", REWARD: ["Paladin", "Cleric", "Warlock"] },
			[1]: { TEXT: "My friends! Help me!", REWARD: ["Bard", "Druid"] },
			[2]: { TEXT: "Nothing! I'm confient in my ability.", REWARD: ["Barbarian", "Fighter", "Rogue", "Sorcerer"] },
			[3]: { TEXT: "The clarity of my mind!", REWARD: ["Monk", "Ranger", "Wizard"] },
		}
	},
	
	Q6:
	{
		Q: "How much patience do you have solving a rubix cube?",
		A:
		{
			[0]: { TEXT: "I sit there until it's done.", REWARD: ["Wizard", "Monk", "Ranger"] },
			[1]: { TEXT: "I'll smash it to bits!", REWARD: ["Barbarian", "Sorcerer"] },
			[2]: { TEXT: "I immediately give up.", REWARD: ["Druid", "Paladin"] },
			[3]: { TEXT: "I'll try it out, see what happens.", REWARD: ["Bard", "Fighter"] },
			[4]: { TEXT: "I'll get someone else to solve it for me.", REWARD: ["Rogue", "Warlock"] },
		}
	},
	
	Q7:
	{
		Q: "There’s a test coming up. What do you do to prepare for it?",
		A:
		{
			[0]: { TEXT: "Study studiously.", REWARD: ["Wizard", "Monk", "Cleric"] },
			[1]: { TEXT: "I can get away with cheating.", REWARD: ["Warlock", "Rogue"] },
			[2]: { TEXT: "I'll just wing it.", REWARD: ["Sorcerer"] },
		}
	},
	
	Q8:
	{
		Q: "You are in the treasury of a dragon. You have time to pick up one object before it wakes up. What do you look for?",
		A:
		{
			[0]: { TEXT: "Go for the gold!", REWARD: ["Rogue"] },
			[1]: { TEXT: "Play it safe and leave.", REWARD: ["Monk", "Ranger", "Druid"] },
			[2]: { TEXT: "Find some rare books.", REWARD: ["Bard", "Wizard"] },
			[3]: { TEXT: "An elegant sword or shield.", REWARD: ["Fighter", "Barbarian", "Paladin"] },
		}
	},
	
	Q9:
	{
		Q: "If you pick up a sword, why do you do it?",
		A:
		{
			[0]: { TEXT: "For the skill!", REWARD: ["Fighter", "Wizard"] },
			[1]: { TEXT: "To defend others!", REWARD: ["Paladin", "Cleric"] },
			[2]: { TEXT: "To fight!", REWARD: ["Barbarian"] },
			[3]: { TEXT: "For my own gain...", REWARD: ["Rogue", "Sorcerer", "Warlock"] },
		}
	},
	
	Q10:
	{
		Q: "Where do you feel most at home?",
		A:
		{
			[0]: { TEXT: "A battlefield.", REWARD: ["Barbarian", "Fighter"] },
			[1]: { TEXT: "In the forest.", REWARD: ["Druid", "Ranger"] },
			[2]: { TEXT: "In a library.", REWARD: ["Wizard", "Sorcerer"] },
			[3]: { TEXT: "The temple of my god.", REWARD: ["Cleric", "Monk", "Paladin"] },
			[4]: { TEXT: "A busy town square.", REWARD: ["Bard"] },
		}
	},
	
	Q11:
	{
		Q: "What kind of company do you keep?",
		A:
		{
			[0]: { TEXT: "I hang out with shady people.", REWARD: ["Rogue", "Warlock"] },
			[1]: { TEXT: "I'm friends with everyone!", REWARD: ["Bard", "Fighter"] },
			[2]: { TEXT: "The animals in the forest.", REWARD: ["Druid", "Ranger"] },
			[3]: { TEXT: "Fellow followers of my faith.", REWARD: ["Cleric", "Monk", "Paladin"] },
		}
	},
	
	Q12:
	{
		Q: "What do you prefer to do in a battle?",
		A:
		{
			[0]: { TEXT: "Assist my friend when they need it.", REWARD: ["Bard", "Druid"] },
			[1]: { TEXT: "Heal those in need.", REWARD: ["Cleric"] },
			[2]: { TEXT: "Be on the front lines.", REWARD: ["Barbarian", "Fighter", "Paladin"] },
			[3]: { TEXT: "I like to see explosions.", REWARD: ["Wizard", "Sorcerer", "Warlock"] },
			[4]: { TEXT: "Look for the perfect opening to strike.", REWARD: ["Rogue", "Ranger"] },
		}
	},
};


var RACE_SUGGESTIONS =
{
	Barbarian:
	{
		TIP: "Barbarians require high strength and constitution.",
		[0]: { TEXT: "These races provide high strength:", RACES: ["Half-orc", "Dragonborn"] },
		[1]: { TEXT: "These races provide high constitution:", RACES: ["Dwarf", "Gnome"] },
		[2]: { TEXT: "These races have multiple skills:", RACES: ["Human"] },
	},
	
	Bard:
	{
		TIP: "Bards require high charima.",
		[0]: { TEXT: "These races provide high charisma:", RACES: ["Half-elf", "Halfling", "Dragonborn", "Tiefling"] },
		[1]: { TEXT: "These races have multiple skills:", RACES: ["Human"] },
	},
	
	Cleric:
	{
		TIP: "Clerics require high wisdom.",
		[0]: { TEXT: "These races provide high wisdom:", RACES: ["Dwarf"] },
		[1]: { TEXT: "These races have multiple skills:", RACES: ["Human"] },
	},
	
	Druid:
	{
		TIP: "Druids require high wisdom.",
		[0]: { TEXT: "These races provide high wisdom:", RACES: ["Dwarf"] },
		[1]: { TEXT: "These races have multiple skills:", RACES: ["Human"] },
	},
	
	Fighter:
	{
		TIP: "Fighters require high strength or dexterity.",
		[0]: { TEXT: "These races provide high strength:", RACES: ["Half-orc", "Dragonborn"] },
		[1]: { TEXT: "These races provide high dexterity:", RACES: ["Elf", "Halfling"] },
		[2]: { TEXT: "These races have multiple skills:", RACES: ["Human"] },
	},
	
	Monk:
	{
		TIP: "Monks require high wisdom or dexterity.",
		[0]: { TEXT: "These races provide high wisdom:", RACES: ["Dwarf"] },
		[1]: { TEXT: "These races provide high dexterity:", RACES: ["Elf", "Halfling"] },
		[2]: { TEXT: "These races have multiple skills:", RACES: ["Human"] },
	},
	
	Paladin:
	{
		TIP: "Paladins require high strength or charisma.",
		[0]: { TEXT: "These races provide high strength:", RACES: ["Half-orc"] },
		[1]: { TEXT: "These races provide high charisma:", RACES: ["Half-elf", "Halfling", "Tiefling"] },
		[2]: { TEXT: "These races have multiple skills:", RACES: ["Human", "Dragonborn"] },
	},
	
	Ranger:
	{
		TIP: "Rangers require high dexterity or widsom.",
		[0]: { TEXT: "These races provide high dexterity:", RACES: ["Elf", "Halfling"] },
		[1]: { TEXT: "These races provide high wisdom:", RACES: ["Dwarf"] },
		[2]: { TEXT: "These races have multiple skills:", RACES: ["Human"] },
	},
	
	Rogue:
	{
		TIP: "Rogues require high dexterity.",
		[0]: { TEXT: "These races provide high dexterity:", RACES: ["Elf", "Halfling"] },
		[1]: { TEXT: "These races have multiple skills:", RACES: ["Human"] },
	},
	
	Sorcerer:
	{
		TIP: "Sorcerers require high charisma.",
		[0]: { TEXT: "These races provide high charisma:", RACES: ["Half-elf", "Halfling", "Tiefling", "Dragonborn"] },
		[1]: { TEXT: "These races have multiple skills:", RACES: ["Human"] },
	},
	
	Warlock:
	{
		TIP: "Warlocks require high charisma.",
		[0]: { TEXT: "These races provide high charisma:", RACES: ["Half-elf", "Halfling", "Tiefling", "Dragonborn"] },
		[1]: { TEXT: "These races have multiple skills:", RACES: ["Human"] },
	},
	
	Wizard:
	{
		TIP: "Wizards require high intelligence.",
		[0]: { TEXT: "These races provide high intelligence:", RACES: ["Elf", "Gnome", "Tiefling"] },
		[1]: { TEXT: "These races have multiple skills:", RACES: ["Human"] },
	},
};