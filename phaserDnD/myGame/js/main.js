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
	game.state.add('End', End);

	game.state.start('Intro');
};


//STYLE VARS
var titleTextStyle = { font: 'PT Serif', fontStyle: 'bold',  fontSize: '43px',
	fill: '#FFFFFF', align: "center", wordWrap: true, wordWrapWidth: 800 };
var textStyle = { font: 'Overlock', fontSize: '28px', fill: '#FFFFFF', align: "center" };
var smallTextStyle = { font: 'Overlock', fontSize: '20px', fontStyle: 'italic', fill: '#FFFFFF', align: "center" };
var shortTextStyle = { font: 'Overlock', fontSize: '16px', fontStyle: 'italic', fill: '#FFFFFF', align: "center", wordWrap: true, wordWrapWidth: 190 };

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
	
	CLASS: null,
	
	RACE: null,
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
	Halfling: "A race of smallish people who possess great stealth and social skills.",
	Human: "The most average race. Humans have a bit of skill in many areas.",
	Gnome: "A very enthusiastic and curious race who enjoy a good prank.",
	['Half-orc']: "A tall and strong race descending from orcs. Often prejudiced.",
	Tiefling: "A race of demonic humanoids who are widely prejudiced wherever they go.",
}

var CLASS_QUESTIONS =
{
	Q1:
	{
		Q: "Your character is setting out on a dangerous quest! What arms do they have on them?",
		A:
		{
			[0]: { TEXT: "A heavy greatsword slung across their back!", REWARD: ["Barbarian", "Paladin", "Fighter", "Cleric"] },
			[1]: { TEXT: "A short sword hidden in their boot!", REWARD: ["Rogue", "Bard", "Ranger"] },
			[2]: { TEXT: "Weapon? What weapon? You just need the spells in your head!", REWARD: ["Sorcerer", "Warlock", "Wizard"] },
			[3]: { TEXT: "The two fists nature gave them!", REWARD: ["Monk"] }
		}
	},
	
	Q2:
	{
		Q: "Your character is going on a long journey. After the bare essentials, what extra things will you pack?",
		A:
		{
			[0]: { TEXT: "Nothing! Their confidence gets them through everything!", REWARD: ["Sorcerer"] },
			[1]: { TEXT: "Workout gear to keep up those gains.", REWARD: ["Barbarian", "Fighter"] },
			[2]: { TEXT: "Extra food to stay prepared.", REWARD: ["Ranger", "Druid", "Monk"] },
			[3]: { TEXT: "A religious tome to slap dissenters with.", REWARD: ["Warlock", "Paladin", "Cleric"] }
		}
	},
	
	Q3:
	{
		Q: "An angry ogre waving a large club approaches your character! What will your character do?",
		A:
		{
			[0]: { TEXT: "Try to get the help of a higher power.", REWARD: ["Paladin", "Cleric", "Warlock"] },
			[1]: { TEXT: "Whisper a spell that quells the ogre's anger.", REWARD: ["Bard", "Wizard", "Sorcerer"] },
			[2]: { TEXT: "Slip away before the ogre even realizes it.", REWARD: ["Rogue", "Druid", "Ranger"] },
			[3]: { TEXT: "Try to look intimidating so the ogre backs off.", REWARD: ["Paladin", "Fighter"] },
			[3]: { TEXT: "Prepare for a brutal fight.", REWARD: ["Barbarian", "Monk"] },
		}
	},
	
	Q4:
	{
		Q: "Your character is in a dungeon and there’s a door with a puzzle on it. What do they do to get through it?",
		A:
		{
			[0]: { TEXT: "Try to find a sneaky way around it.", REWARD: ["Rogue", "Ranger", "Sorcerer"] },
			[1]: { TEXT: "Try the handle first.", REWARD: ["Bard", "Monk", "Druid"] },
			[2]: { TEXT: "Just SMASH THROUGH IT.", REWARD: ["Barbarian", "Fighter", "Warlock"] },
			[3]: { TEXT: "Sit down and think through the puzzle.", REWARD: ["Wizard", "Cleric"] },
		}
	},
	
	Q5:
	{
		Q: "When your character is in trouble, what do you fall back on?",
		A:
		{
			[0]: { TEXT: "The biggest hit they got.", REWARD: ["Warlock", "Barbarian"] },
			[1]: { TEXT: "Their friends!", REWARD: ["Bard", "Druid", "Cleric"] },
			[2]: { TEXT: "Their honed skill.", REWARD: ["Wizard", "Monk", "Fighter", "Paladin"] },
			[3]: { TEXT: "Whatever they can come up with in the moment.", REWARD: ["Sorcerer", "Rogue", "Ranger"] },
		}
	},
	
	Q6:
	{
		Q: "How much patience does your character have solving a rubix cube?",
		A:
		{
			[0]: { TEXT: "They sit there until it's done.", REWARD: ["Wizard", "Monk", "Ranger"] },
			[1]: { TEXT: "Smash it to bits!", REWARD: ["Barbarian", "Paladin"] },
			[2]: { TEXT: "Try it for a little bit and see what happens.", REWARD: ["Bard", "Fighter", "Druid"] },
			[3]: { TEXT: "Get someone else to solve it for them.", REWARD: ["Rogue", "Warlock", "Sorcerer"] },
		}
	},
	
	Q7:
	{
		Q: "There's a test coming up. What does your character do to prepare for it?",
		A:
		{
			[0]: { TEXT: "Hit them with books and study hard all day!", REWARD: ["Wizard", "Monk", "Cleric"] },
			[1]: { TEXT: "Cheat.", REWARD: ["Warlock", "Rogue"] },
			[2]: { TEXT: "Try to study a bit, but remember to live your life.", REWARD: ["Fighter", "Druid", "Monk"] },
			[3]: { TEXT: "Just wing it.", REWARD: ["Sorcerer", "Barbarian"] },
		}
	},
	
	Q8:
	{
		Q: "Your character is in the treasury of a dragon. They have time to pick up one object before it wakes up. What do they look for?",
		A:
		{
			[0]: { TEXT: "Go for the gold!", REWARD: ["Rogue", "Warlock"] },
			[1]: { TEXT: "Play it safe and leave.", REWARD: ["Monk", "Ranger", "Druid"] },
			[2]: { TEXT: "Find some rare books.", REWARD: ["Bard", "Wizard", "Cleric"] },
			[3]: { TEXT: "An elegant sword or shield.", REWARD: ["Fighter", "Barbarian", "Paladin"] },
		}
	},
	
	Q9:
	{
		Q: "Why does your character pick up arms?",
		A:
		{
			[0]: { TEXT: "To become more skilled!", REWARD: ["Fighter", "Wizard", "Monk"] },
			[1]: { TEXT: "To follow their beliefs!", REWARD: ["Paladin", "Cleric", "Druid", "Bard"] },
			[2]: { TEXT: "To fight!", REWARD: ["Barbarian"] },
			[3]: { TEXT: "They like things that look cool!", REWARD: ["Rogue", "Sorcerer", "Warlock"] },
		}
	},
	
	Q10:
	{
		Q: "Where does your character feel most at home?",
		A:
		{
			[0]: { TEXT: "A battlefield.", REWARD: ["Barbarian", "Fighter"] },
			[1]: { TEXT: "In the forest.", REWARD: ["Druid", "Ranger"] },
			[2]: { TEXT: "In a library.", REWARD: ["Wizard", "Sorcerer"] },
			[3]: { TEXT: "A temple.", REWARD: ["Cleric", "Monk", "Paladin"] },
			[4]: { TEXT: "A busy town square.", REWARD: ["Bard", "Rogue", "Warlock"] },
		}
	},
	
	Q11:
	{
		Q: "What kind of company does your character keep?",
		A:
		{
			[0]: { TEXT: "The kind not mentioned in polite company.", REWARD: ["Rogue", "Warlock"] },
			[1]: { TEXT: "They're pretty good friends with everyone.", REWARD: ["Bard", "Fighter", "Sorcerer"] },
			[2]: { TEXT: "They're solitary and don't really 'keep company.'", REWARD: ["Druid", "Ranger"] },
			[3]: { TEXT: "People who share their values.", REWARD: ["Cleric", "Monk", "Paladin"] },
		}
	},
	
	Q12:
	{
		Q: "What does your character prefer to do in a battle?",
		A:
		{
			[0]: { TEXT: "Fight hard on the front lines.", REWARD: ["Barbarian", "Fighter", "Paladin"] },
			[1]: { TEXT: "Use magic to enhance the abilities of their party.", REWARD: ["Bard", "Cleric", "Druid"] },
			[2]: { TEXT: "Make explosions!", REWARD: ["Wizard", "Sorcerer", "Warlock"] },
			[3]: { TEXT: "Look for the perfect opening to strike.", REWARD: ["Rogue", "Ranger"] },
		}
	},
	
	Q13:
	{
		Q: "Your character's ally has fallen in battle! What do they do?",
		A:
		{
			[0]: { TEXT: "Rush to their aid, of course!", REWARD: ["Cleric", "Bard"] },
			[1]: { TEXT: "Throw themselves into the fray of enemies to avenge them!", REWARD: ["Barbarian", "Ranger"] },
			[2]: { TEXT: "Stand by their friend's side with weapons raised to defend them!", REWARD: ["Paladin", "Fighter"] },
			[3]: { TEXT: "Use magic to make it difficult for the enemy to reach their ally.", REWARD: ["Wizard", "Druid", "Sorcerer"] },
		}
	},
	
	Q14:
	{
		Q: "Your character is exploring an ancient tomb. The air is heavy with the magic of the undead. What do they do?",
		A:
		{
			[0]: { TEXT: "Seek out the aberrations and destroy them.", REWARD: ["Paladin", "Druid", "Cleric"] },
			[1]: { TEXT: "Discover as much as possible about the history of the tomb.", REWARD: ["Bard", "Wizard"] },
			[2]: { TEXT: "Look for treasure hidden in the ruins.", REWARD: ["Rogue", "Sorcerer"] },
			[3]: { TEXT: "Warn your party about the undead.", REWARD: ["Ranger", "Monk"] },
		}
	},
	
	Q15:
	{
		Q: "As a player, what sounds most interesting for you to do in combat?",
		A:
		{
			[0]: { TEXT: "Having many options avaliable to you.", REWARD: ["Fighter", "Wizard", "Druid", "Monk", "Bard", "Sorcerer"] },
			[1]: { TEXT: "Having impactful or powerful attacks.", REWARD: ["Paladin", "Warlock", "Barbarian"] },
			[2]: { TEXT: "Look for treasure hidden in the ruins.", REWARD: ["Rogue", "Druid", "Ranger"] },
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
		[0]: { TEXT: "These races provide high charisma:", RACES: ["Halfling", "Dragonborn", "Tiefling"] },
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
		[1]: { TEXT: "These races provide high charisma:", RACES: ["Halfling", "Tiefling"] },
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
		[0]: { TEXT: "These races provide high charisma:", RACES: ["Halfling", "Tiefling", "Dragonborn"] },
		[1]: { TEXT: "These races have multiple skills:", RACES: ["Human"] },
	},
	
	Warlock:
	{
		TIP: "Warlocks require high charisma.",
		[0]: { TEXT: "These races provide high charisma:", RACES: ["Halfling", "Tiefling", "Dragonborn"] },
		[1]: { TEXT: "These races have multiple skills:", RACES: ["Human"] },
	},
	
	Wizard:
	{
		TIP: "Wizards require high intelligence.",
		[0]: { TEXT: "These races provide high intelligence:", RACES: ["Elf", "Gnome", "Tiefling"] },
		[1]: { TEXT: "These races have multiple skills:", RACES: ["Human"] },
	},
};