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
	game.state.add('Stats', Stats);
	game.state.add('Skills', Skills);

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

	STATS: {
		Strength: 0,
		Dexterity: 0,
		Constitution: 0,
		Intelligence: 0,
		Wisdom: 0,
		Charisma: 0,
	},

	SKILLS: [],
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
	['Half-elf']: "A race that lies between between timeless elves and ambitious humans.",
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
		Q: "How much patience does your character have solving a rubics cube?",
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
			[2]: { TEXT: "Fully utilizing the land you are fighting on to your advantage.", REWARD: ["Rogue", "Druid", "Ranger"] },
		}
	},
};


var RACE_SUGGESTIONS =
{
	Barbarian:
	{
		TIP: "Barbarians require high strength and constitution.",
		[0]: { TEXT: "These races provide high strength:", RACES: ["Dragonborn"] },
		[1]: { TEXT: "These races provide high constitution:", RACES: ["Dwarf", "Gnome"] },
		[2]: { TEXT: "These races have multiple skills:", RACES: ["Half-orc", "Human"] },
	},
	
	Bard:
	{
		TIP: "Bards require high charima.",
		[0]: { TEXT: "These races provide high charisma:", RACES: ["Halfling", "Dragonborn", "Tiefling", "Half-elf"] },
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
		[1]: { TEXT: "These races provide high charisma:", RACES: ["Halfling", "Tiefling", "Half-elf"] },
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
		[0]: { TEXT: "These races provide high charisma:", RACES: ["Halfling", "Tiefling", "Dragonborn", "Half-elf"] },
		[1]: { TEXT: "These races have multiple skills:", RACES: ["Human"] },
	},
	
	Warlock:
	{
		TIP: "Warlocks require high charisma.",
		[0]: { TEXT: "These races provide high charisma:", RACES: ["Halfling", "Tiefling", "Dragonborn", "Half-elf"] },
		[1]: { TEXT: "These races have multiple skills:", RACES: ["Human"] },
	},
	
	Wizard:
	{
		TIP: "Wizards require high intelligence.",
		[0]: { TEXT: "These races provide high intelligence:", RACES: ["Elf", "Gnome", "Tiefling"] },
		[1]: { TEXT: "These races have multiple skills:", RACES: ["Human"] },
	},
};

var STAT_GUIDE =
{
	//[STR, DEX, CON, INT, WIS, CHA]
	//[0    1    2    3    4    5  ]
	//nth stat gets nth highest number
	
	Wizard: [4, 2, [0, 1, 3, 5], [0, 1, 3, 5], [0, 1, 3, 5], [0, 1, 3, 5]],
	
	Druid: [4, 1, 2, 5, 3, 0],
	
	Warlock: [5, 2, 1, 4, 0, 3],
	
	Sorcerer: [5, 1, 2, 4, 3, 0],
	
	Fighter: [[0, 1], 2, [0, 1], 5, 4, 3],
	
	Barbarian: [2, 0, 1, 5, 4, 3],
	
	Rogue: [1, 5, 0, 2, 4, 3],
	
	Monk: [1, 4, [2, 5], [2, 5], 3, 0],
	
	Bard: [5, 1, 2, 4, 0, 3],
	
	Ranger: [1, 4, 2, 5, 3, 0],
	
	Cleric: [4, [0, 1], 2, 5, [0, 1], 3],
	
	Paladin: [0, 2, 5, 1, 4, 3],
}

var ABILITY_SCORE =
{
	//[STR, DEX, CON, INT, WIS, CHA]
	
	Dwarf: [0, 0, 2, 0, 1, 0],
	Elf: [0, 2, 0, 1, 0, 0],
	Dragonborn: [2, 0, 0, 0, 0, 1],
	Halfling: [0, 2, 0, 0, 0, 1],
	Human: [1, 1, 1, 1, 1, 1],
	Gnome: [0, 0, 1, 2, 0, 0],
	['Half-orc']: [2, 0, 1, 0, 0, 0],
	['Half-elf']: [0, 0, 0, 0, 0, 2],
	Tiefling: [0, 0, 0, 1, 0, 2],
}

var SKILLS = 
{
	Bard: {
		CHOOSE: 3,
		SKILLS: ["Acrobatics", "Athletics", "Animal Handling", "Arcana", "Deception","History",
			"Insight","Intimidation", "Investigation", "Medicine", "Nature", "Perception",
			"Performance", "Persuasion", "Religion", "Sleight of Hand", "Stealth", "Survival"]
	},
	Barbarian: {
		CHOOSE: 2,
		SKILLS: ["Animal Handling","Athletics", "Intimidation", "Nature", "Percption", "Survival"]
	},
	Fighter: {
		CHOOSE: 2,
		SKILLS: ["Acrobatics", "Animal Handling", "Athletics", "History", "Insight", "Intimidation",
			"Perception", "Survival"]
	},
	Monk: {
		CHOOSE: 2,
		SKILLS: ["Acrobatics", "Athletics", "History", "Insight", "Religion", "Stealth"]
	},
	Cleric: {
		CHOOSE: 2,
		SKILLS: ["History", "Insight", "Medicine", "Persuasion", "Religion"]
	},
	Wizard: {
		CHOOSE: 2,
		SKILLS: ["Arcana", "History", "Insight", "Investigation", "Medicine", "Religion"]
	},
	Druid: {
		CHOOSE: 2,
		SKILLS: ["Animal Handling", "Insight", "Medicine", "Nature", "Perception"]
	},
	Sorcerer: {
		CHOOSE: 2,
		SKILLS: ["Arcana", "Deception", "Insight", "Investigation", "Medicine", "Religion"]
	},
	Warlock: {
		CHOOSE: 2,
		SKILLS: ["Arcana", "Deception", "History", "Intimidation", "Investigation", "Nature", "Religion"]
	},	
	Cleric: {
		CHOOSE: 2,
		SKILLS: ["Athletics", "Insight", "Intimidiation", "Medicine", "Persuasion", "Religion"]
	},
	Rogue: {
		CHOOSE: 4,
		SKILLS: ["Acrobatics", "Athletics", "Deception",
			"Insight","Intimidation", "Investigation", "Perception",
			"Persuasion", "Sleight of Hand", "Stealth"]
	},

}

var SKILL_DESCRIPTIONS = {
	['Animal Handling']: "Your character's ability to calm or interact with an animal. Also helps them understand an animals’ intention. Examples include calming one’s horse and realizing an animal is scared.",

	Insight: "Your character's ability to see another’s true intention. Examples include seeing through lies and guessing what someone is about to do.",

	Medicine: "Your character's ability in medicine. Examples include diagnosing an illness, treating minor wounds, and stabilizing major injuries.",

	Perception: "Your character's general awareness and keenness of senses. Examples include spotting an ambush, finding a secret door, and hearing someone sneaking up behind them.",

	Survival: "Your character's ability to survive in the wilderness. Examples include tracking animals, guiding others through a wasteland, and predicting or avoiding natural hazards.",

	Athletics: "Your character's ability in jumping, climbing, and swimming. Examples include swimming across a raging river, clinging to a creature trying to throw them off, and attempting any sort of extra difficult jump.",

	Acrobatics: "Your character's ability to keep their balance and perform acrobatic stunts. Examples include performing a backflip, keeping balance on a slippery surface, and not falling while walking across a wooden beam.",

	['Sleight of Hand']: "Your character's ability in general trickery with hands. Examples include concealing an object they are carrying, taking something from another’s pocket without their noticing, and subtly placing an object in a persons’ pocket.",

	Stealth: "Your character's ability to conceal oneself. Examples include sneaking past guards, leaving a party without being noticed, and remaining unseen.",

	Arcana: "Your character's knowledge of magical lore. Examples include recalling details about spells, eldritch symbols, the planes of existence, and magical items.",

	History: "Your character's knowledge of historical events. Examples include recalling details about kings, wars, legends of the past, and past civilizations.",

	Investigation: "Your character's ability to discern, understand, and draw conclusions from clues. Examples include figuring out the location of a hidden key, looking through a town registry for specific details, finding a structural weak point, and deducing what person a weapon belonged to.",

	Nature: "Your character's knowledge of natural lore. Examples include recalling details about plants, geographical areas, and the weather.",

	Religion: "Your character's knowledge of religious lore. Examples include recalling details about deities, a religion’s practices, religious symbols, and information about cults.",

	Deception: "Your character's ability to hide the truth. Examples include misleading guards, proficiency at gambling, succeed at disguising oneself, or conning others.",

	Intimidation: "Your character's ability to implicitly or explicitly threaten others. Examples include interrogating someone, threatening someone with a weapon, and overplaying how dangerous one can be.",

	Performance: "Your character's ability to wow an audience. Examples include storytelling, dancing, and acting.",

	Persuasion: "Your character's ability to socially influence others, generally in good faith. Examples include convincing someone to be a friend, requesting someone for aid, and persuading guards it is important they let you pass."

}