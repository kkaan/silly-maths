/* ============================================================
   Story Engine — The Fairy Kingdom Needs Maths
   ============================================================ */

const STORY_BEATS = {
  1: {
    title: 'The Arrival',
    lines: [
      { char: 'narrator', text: 'Once upon a time, in the Fairy Kingdom of Mathlandia, there lived a unicorn named Fluffy. Fluffy was beautiful, majestic, and graceful. She was also ALWAYS hungry.' },
      { char: 'fluffy', text: 'Did somebody say SKITTLES?! I haven\'t eaten in twenty minutes and I think I might actually PERISH.' },
      { char: 'narrator', text: 'One day, a mysterious portal opened, and out tumbled {PLAYER} \u2014 a child from the Human World.' },
      { char: 'fluffy', text: 'Ooh! A human! Do you have any snacks? No? That\'s okay. Do you like maths? Because this kingdom has a BIG problem.' },
      { char: 'narrator', text: 'You see, the Royal Mathematician had just retired to open an ice cream shop. And now NOBODY could do the maths to keep the kingdom running.' },
      { char: 'fluffy', text: 'The road signs are wrong, the bridges are the wrong length, and someone ordered a MILLION kilograms of fairy dust instead of a million GRAMS. It was very dusty. I sneezed for three days.' },
      { char: 'narrator', text: 'The Fairy Council heard about {PLAYER}\'s arrival and had an idea \u2014 perhaps this human child could help save Mathlandia!' },
      { char: 'fluffy', text: 'Come on, {PLAYER}! If you help fix the maths, I bet they\'ll give us ice cream. I mean give YOU ice cream. I mean give US ice cream. Let\'s GO!' },
    ],
  },
  3: {
    title: 'The Eaten Road Signs',
    lines: [
      { char: 'narrator', text: 'BREAKING NEWS from the Mathlandia Gazette: Fluffy has eaten all the road signs between Sparkle Town and Glitter City.' },
      { char: 'fluffy', text: 'In my defence, they LOOKED like rainbow wafers! And I was hungry! I\'m ALWAYS hungry!' },
      { char: 'narrator', text: 'Now nobody knows if it\'s 2 kilometres or 200,000 centimetres to the next town.' },
      { char: 'fluffy', text: 'Wait \u2014 IS that the same thing?! SEE, this is why we need you, {PLAYER}! I\'m just a unicorn! I eat signs!' },
      { char: 'narrator', text: 'Thanks to {PLAYER}\'s quick conversions, new signs were made \u2014 this time out of metal. Fluffy tried to eat them anyway.' },
      { char: 'fluffy', text: '\u2026These ones are crunchy.' },
    ],
  },
  5: {
    title: 'The Great Fairy Dust Disaster',
    lines: [
      { char: 'narrator', text: 'The Fairy Dust Factory was in chaos. Someone had mixed up grams and kilograms AGAIN.' },
      { char: 'fluffy', text: 'The fairies are ankle-deep in fairy dust. One of them sneezed so hard she flew backwards through a wall.' },
      { char: 'narrator', text: 'But {PLAYER} calmly converted the measurements and saved the factory. The Fairy Council was impressed.' },
      { char: 'elder', text: 'This child shows great promise. Perhaps\u2026 perhaps they could train as a Fairy Apprentice?' },
      { char: 'fluffy', text: 'GASP! An APPRENTICE?! That means you\'d get a MAGIC WAND! Do you think a magic wand could make skittles? Asking for a friend. The friend is me.' },
      { char: 'narrator', text: 'The Council said {PLAYER} would need to prove themselves worthy. Five more levels of maths mastery, and the wand would be theirs\u2026' },
    ],
  },
  8: {
    title: 'Fluffy\'s Ice Cream Emergency',
    lines: [
      { char: 'fluffy', text: '{PLAYER}! EMERGENCY! CODE RED! CODE SPRINKLES!' },
      { char: 'narrator', text: 'Fluffy had discovered that the Mathlandia Ice Cream Truck was using the wrong measurements. Every "small" cone was actually 1000 millilitres \u2014 that\'s a whole LITRE of ice cream.' },
      { char: 'fluffy', text: '\u2026Wait. I don\'t see the problem.' },
      { char: 'narrator', text: 'The townspeople were drowning in ice cream.' },
      { char: 'fluffy', text: 'I STILL don\'t see the problem.' },
      { char: 'narrator', text: '{PLAYER} fixed the measurements. Fluffy "helped" by eating all the extra ice cream.' },
      { char: 'fluffy', text: 'I regret NOTHING. Also \u2014 only TWO more levels until you get that wand! I\'ve been PRACTISING my wand-waving. I knocked over a lamp.' },
    ],
  },
  10: {
    title: 'The Magic Wand',
    lines: [
      { char: 'narrator', text: 'The trumpets sounded. The fairies gathered. Even the grumpy bridge troll showed up (he owed {PLAYER} a favour after that kilometres-to-metres incident).' },
      { char: 'elder', text: '{PLAYER}, you have proven your skill with conversions. You have saved our roads, our factories, and our ice cream supply. We hereby name you\u2026 FAIRY APPRENTICE!' },
      { char: 'narrator', text: 'The Elder presented {PLAYER} with a gleaming Magic Wand. It sparkled with the light of a thousand solved equations.' },
      { char: 'fluffy', text: 'OOOOH! SHINY! Can it make skittles?! TRY MAKING SKITTLES!' },
      { char: 'narrator', text: '\u2026Nothing happened.' },
      { char: 'fluffy', text: 'Try again but think about skittles HARDER.' },
      { char: 'narrator', text: 'The wand, as it turned out, could not make skittles. But it DID unlock new and more powerful maths abilities. Area conversions, rates, even money problems were now within {PLAYER}\'s reach.' },
      { char: 'fluffy', text: 'I mean that\'s cool I GUESS but it\'s no skittles.' },
    ],
  },
  11: {
    title: 'Area of Concern',
    lines: [
      { char: 'narrator', text: 'As a Fairy Apprentice, {PLAYER} was called to their first real mission. The Royal Garden was a mess.' },
      { char: 'fluffy', text: 'They tried to plant flowers in a garden that was "100 square centimetres." That\'s the size of a POSTAGE STAMP.' },
      { char: 'narrator', text: 'They meant 100 square METRES.' },
      { char: 'fluffy', text: 'The fairies were trying to plant a rose bush on a tiny square no bigger than a book. The rose bush kept falling over. It was very sad. The rose bush was crying. I was crying. Everyone was crying.' },
      { char: 'narrator', text: '{PLAYER} taught the gardeners about area conversions. Flowers bloomed. The kingdom was beautiful again.' },
      { char: 'elder', text: 'This child may one day be more than an apprentice. Keep an eye on them. A TIARA might be in their future\u2026' },
      { char: 'fluffy', text: 'Did somebody say tiara?! I want a tiara! Do they come in unicorn size?' },
    ],
  },
  14: {
    title: 'Fluffy\'s Budget',
    lines: [
      { char: 'narrator', text: 'Fluffy had been given a weekly pocket money budget of $5.00 to buy snacks. She spent it in four minutes.' },
      { char: 'fluffy', text: 'The skittles were $2.50 and the ice cream was $3.75 and I don\'t see the problem.' },
      { char: 'narrator', text: 'That\'s $6.25. That\'s $1.25 more than you have.' },
      { char: 'fluffy', text: 'BUT I NEED BOTH. Can\'t you just convert the dollars to be more dollars?! That\'s how maths works, right?! RIGHT?!' },
      { char: 'narrator', text: 'That is not how maths works. {PLAYER} helped Fluffy create a budget. Fluffy stuck to it for almost eleven seconds.' },
      { char: 'fluffy', text: 'What if I eat half the skittles and ALL the ice cream? What\'s half of $2.50? \u2026Don\'t tell me. I don\'t want to know. Actually tell me. No don\'t. OKAY TELL ME.' },
    ],
  },
  17: {
    title: 'The Bridge Incident',
    lines: [
      { char: 'narrator', text: 'A CRISIS! The Rainbow Bridge \u2014 the only crossing between East Mathlandia and West Mathlandia \u2014 had collapsed!' },
      { char: 'fluffy', text: 'It wasn\'t my fault! I was just crossing it! While carrying a very large amount of ice cream!' },
      { char: 'narrator', text: 'The bridge had been built to hold 500 kilograms. Fluffy and her ice cream weighed 500,000 grams.' },
      { char: 'fluffy', text: '\u2026Is that the same thing?' },
      { char: 'narrator', text: 'Yes. But the EXTRA 200 scoops of ice cream pushed it over the limit.' },
      { char: 'narrator', text: '{PLAYER} was called in to calculate the correct measurements for a new bridge \u2014 stronger, wider, and with a "Maximum Ice Cream" sign.' },
      { char: 'fluffy', text: 'I feel personally targeted by that sign.' },
      { char: 'narrator', text: 'The new bridge held. {PLAYER}\'s reputation grew across the land. Whispers of the Fairy Princess title grew louder\u2026' },
    ],
  },
  20: {
    title: 'The Silver Tiara',
    lines: [
      { char: 'narrator', text: 'The entire kingdom gathered. Fairy lights twinkled. Fluffy had been told to "look presentable" and was wearing a bow that she\'d already tried to eat twice.' },
      { char: 'elder', text: '{PLAYER}, your skills have saved this kingdom time and time again. You have mastered conversions, area, rates, and money. You have endured Fluffy\'s snack emergencies with grace and patience. We hereby crown you\u2026 FAIRY PRINCESS!' },
      { char: 'narrator', text: 'A Silver Tiara was placed upon {PLAYER}\'s head. It glittered with mathematical precision.' },
      { char: 'fluffy', text: 'THIS IS THE MOST BEAUTIFUL THING I HAVE EVER SEEN! After ice cream! And skittles! So third most beautiful! STILL VERY BEAUTIFUL THOUGH!' },
      { char: 'narrator', text: 'But the Elder\'s face grew serious.' },
      { char: 'elder', text: 'Fairy Princess, we must warn you. A great challenge approaches. The Dark Fraction is spreading across the land. Numbers are splitting into pieces. Decimals are appearing where they shouldn\'t. Percentages are EVERYWHERE.' },
      { char: 'fluffy', text: 'Yesterday I found a decimal point in my cereal. I ate it. It tasted like a full stop.' },
      { char: 'narrator', text: 'Only someone who can master fractions, decimals, and percentages can save Mathlandia now. And that someone\u2026 is you.' },
      { char: 'drumpf', text: 'Excuse me! EXCUSE ME! I believe you\'ll find that the Dark Fraction was MY idea! I summoned it! With magic! Very impressive magic!' },
      { char: 'fluffy', text: '\u2026You\'re the weird purple man who got a tiara stuck on his hat. Nobody believes you.' },
      { char: 'fluffy', text: 'No pressure! Also I ate your congratulations cake. Sorry. It looked like a very big skittle.' },
    ],
  },
  21: {
    title: 'The Dark Fraction',
    lines: [
      { char: 'narrator', text: 'The Dark Fraction had arrived. Strange things were happening across Mathlandia.' },
      { char: 'fluffy', text: 'My bag of 20 skittles is now 0.5 bags! WHAT DOES THAT MEAN?! IS IT HALF?! IS IT LESS THAN HALF?! {PLAYER} HELP!' },
      { char: 'narrator', text: 'It means half, Fluffy. You have 10 skittles.' },
      { char: 'fluffy', text: 'TEN?! I can\'t live on TEN! I\'m a GROWING unicorn!' },
      { char: 'narrator', text: 'The Dark Fraction was turning everything into confusing numbers. Shop prices showed "0.75 of a dollar" instead of 75 cents. Speed signs read "50% of 120 km/h" instead of just saying 60.' },
      { char: 'narrator', text: 'Only Fairy Princess {PLAYER} had the skills to translate the chaos.' },
      { char: 'elder', text: 'If you can defeat the Dark Fraction\u2026 the Royal Sceptre and the title of Sovereign Fairy Princess shall be yours.' },
      { char: 'fluffy', text: 'A SCEPTRE! Like a wand but FANCIER! I bet THAT one can make skittles!' },
    ],
  },
  24: {
    title: 'The 75% Disaster',
    lines: [
      { char: 'narrator', text: 'The kingdom\'s only bakery was in trouble. The recipe called for 3/4 of a kilogram of sugar, but the baker only understood percentages.' },
      { char: 'baker', text: 'What\'s 3/4 as a percentage?! My cakes are COLLAPSING!' },
      { char: 'fluffy', text: 'I\'ll eat the collapsed ones. For QUALITY CONTROL.' },
      { char: 'narrator', text: '{PLAYER} helped the baker understand that 3/4 = 0.75 = 75%. The cakes were saved.' },
      { char: 'fluffy', text: 'I waff fhtill helping wiff quality confrol.' },
      { char: 'narrator', text: 'Fluffy ate seven cakes. She showed no remorse.' },
    ],
  },
  27: {
    title: 'The Final Exam',
    lines: [
      { char: 'narrator', text: 'The Dark Fraction was growing stronger. Numbers were in chaos. The Fairy Council called an emergency meeting.' },
      { char: 'elder', text: 'The kingdom\'s treasury has been scrambled! We have "0.2 of our gold" in one vault, "1/5" in another, and "20 percent" in a third. We don\'t know if that\'s ALL our gold in three places or just a FRACTION of it!' },
      { char: 'fluffy', text: 'That\'s all the same number! \u2026I think? I actually don\'t know, I\'m a unicorn. {PLAYER}, is that the same number?' },
      { char: 'narrator', text: 'It was indeed all the same number. The three vaults all contained the same amount. {PLAYER} untangled the whole mess with fractions, decimals, and percentages.' },
      { char: 'elder', text: 'We are running out of time. The final challenge awaits. Are you ready, Princess {PLAYER}?' },
      { char: 'fluffy', text: 'WE\'RE ready! I\'m providing emotional support! And I brought snacks! \u2026I brought snacks five minutes ago. They\'re gone now.' },
    ],
  },
  30: {
    title: 'Sovereign Fairy Princess of All the Lands',
    lines: [
      { char: 'narrator', text: 'The sky turned gold. Every fairy, unicorn, elf, and talking mushroom in Mathlandia gathered in the Grand Meadow. Even the grumpy bridge troll wore a bowtie.' },
      { char: 'elder', text: '{PLAYER}. You arrived in this kingdom as a stranger. You became an Apprentice. Then a Princess. You saved our roads, our bridges, our factories, our bakeries, and our sanity. You defeated the Dark Fraction. You survived Fluffy\'s snack emergencies.' },
      { char: 'fluffy', text: 'I\'m not crying, my eyes are just leaking because I\'m so proud and also I just ate a very spicy skittle.' },
      { char: 'elder', text: 'You have mastered conversions, area, rates, money, fractions, decimals, and percentages. There is nothing left to teach you. And so, with the power vested in me by the Royal Fairy Council\u2026 I crown you SOVEREIGN FAIRY PRINCESS OF ALL THE LANDS!' },
      { char: 'narrator', text: 'The Royal Sceptre was placed in {PLAYER}\'s hand. It blazed with rainbow light. The crowd cheered. Fluffy did a backflip \u2014 well, she attempted a backflip. She mostly just fell over sideways and then pretended she meant to do that.' },
      { char: 'fluffy', text: 'I ALWAYS believed in you! From the very first day! Even when you got stuff wrong I believed in you! Even when I was eating road signs I was believing in you IN MY HEART!' },
      { char: 'narrator', text: 'And so {PLAYER} ruled Mathlandia with wisdom, kindness, and extremely good maths. The kingdom prospered. The bridges held. The recipes worked. The budgets balanced.' },
      { char: 'narrator', text: 'And Fluffy?' },
      { char: 'fluffy', text: 'I got an all-you-can-eat pass to the Royal Ice Cream Buffet! FOREVER! THIS IS THE BEST DAY OF MY LIFE!' },
      { char: 'narrator', text: 'And they all lived mathematically ever after. THE END\u2026 or is it? There\'s always more maths to practise!' },
      { char: 'fluffy', text: 'AND MORE SKITTLES TO EAT!' },
    ],
  },
};

// === MID-LEVEL BEATS — Fluffy's Philosophy of Maths ===
// Triggered halfway through each level (at 10 correct into a level)
const MID_LEVEL_BEATS = {
  2: { title: "Fluffy's First Question", lines: [
    { char: 'fluffy', text: '{PLAYER}, if I eat zero skittles\u2026 did I still eat? Like, is zero a real number or is it just\u2026 nothing pretending to be something?' },
    { char: 'narrator', text: 'This was the first sign that Fluffy was not an ordinary unicorn.' },
  ]},
  3: { title: 'The Librarian', lines: [
    { char: 'narrator', text: '{PLAYER} noticed a tall tower of crystal and old oak at the edge of the square. A sign read: "Sparkle Town Library \u2014 All Are Welcome."' },
    { char: 'sage', text: 'Ah! A visitor! I am Sage, the Royal Librarian. Come in, come in! I have catalogued every book in this library. Every book has its number, and every number has its place.' },
    { char: 'fluffy', text: 'Sage has been here for TWO HUNDRED YEARS. She knows EVERYTHING. Except how to make skittles. Nobody\'s perfect.' },
    { char: 'sage', text: 'Welcome to Mathlandia, {PLAYER}. If you ever need answers, you\'ll find them here. Knowledge is free. Unlike skittles.' },
  ]},
  4: { title: 'Fluffy Discovers Infinity', lines: [
    { char: 'fluffy', text: 'If I could eat infinite skittles, would I ever feel full? Or would I just be infinitely hungry AND infinitely eating? {PLAYER}, I\'m scared.' },
    { char: 'narrator', text: '{PLAYER} wisely chose not to answer.' },
  ]},
  6: { title: 'Fluffy Questions Reality', lines: [
    { char: 'fluffy', text: 'Is a square metre a real thing you can touch, or is it just an IDEA? Like, can I stand on a square metre? Can I eat on a square metre? These are important questions.' },
    { char: 'narrator', text: 'The answer to all three was yes.' },
  ]},
  7: { title: 'Fluffy on Negative Numbers', lines: [
    { char: 'fluffy', text: 'If I have 3 skittles and I eat 5, do I have negative 2 skittles? Does that mean I OWE someone skittles? I don\'t like this. Maths is getting personal.' },
    { char: 'narrator', text: 'Fluffy briefly considered a career change before remembering she was a unicorn.' },
  ]},
  9: { title: "Fluffy's Decimal Crisis", lines: [
    { char: 'fluffy', text: 'Is 0.999999 forever the same as 1? Because if it IS, I have been doing maths wrong my entire life. If it ISN\'T, then what\'s in the gap?! WHAT LIVES IN THE GAP, {PLAYER}?!' },
    { char: 'narrator', text: 'Mathematicians have argued about this for centuries. Fluffy resolved it by eating a biscuit.' },
  ]},
  12: { title: 'Fluffy on Measurement', lines: [
    { char: 'fluffy', text: 'Who decided a metre was a metre? Like, one day someone just PICKED a length and everyone agreed? What if they\'d picked a longer metre? Would I be shorter?' },
    { char: 'narrator', text: 'Fluffy would be the same size. But she worried about it for the rest of the day.' },
  ]},
  13: { title: 'Fluffy on Pi', lines: [
    { char: 'fluffy', text: 'I heard there\'s a number called Pi that goes on FOREVER and never repeats. That\'s like a skittle flavour you can never finish tasting. Actually that sounds AMAZING.' },
    { char: 'narrator', text: 'Fluffy spent the next hour trying to taste Pi. She ate a pie instead. Close enough.' },
  ]},
  15: { title: 'Fluffy on Speed', lines: [
    { char: 'fluffy', text: 'If I run at 20 km/h for zero hours, I\'ve gone nowhere. But I was still RUNNING. Does effort count if distance doesn\'t? This is basically philosophy, {PLAYER}.' },
    { char: 'narrator', text: 'It was, in fact, basically philosophy.' },
  ]},
  16: { title: 'Fluffy on Money', lines: [
    { char: 'fluffy', text: 'Money is just numbers we all AGREE are real, right? So if everyone agreed skittles were money, I\'d be RICH. I\'d also be broke immediately because I\'d eat all my money.' },
    { char: 'narrator', text: 'This is actually not far from how some economists think.' },
  ]},
  18: { title: 'Fluffy on Patterns', lines: [
    { char: 'fluffy', text: 'Why does maths work? Like, why do numbers DESCRIBE things? The universe didn\'t HAVE to be mathsy. It could have been all vibes and feelings. But no. It chose MATHS.' },
    { char: 'narrator', text: 'This is called the Unreasonable Effectiveness of Mathematics. Fluffy discovered it between her second and third ice cream.' },
  ]},
  19: { title: "Fluffy's Pre-Tiara Thought", lines: [
    { char: 'fluffy', text: 'If I become exactly 50% more royal when you get the tiara, and I was already 100% fabulous, does that make me 150% fabulous? Can you be more than 100% of something?!' },
    { char: 'narrator', text: 'In Fluffy\'s case, yes. Absolutely yes.' },
  ]},
  22: { title: 'Fluffy on Fractions', lines: [
    { char: 'fluffy', text: 'If I cut a skittle in half, are there two skittles now? Or two HALF-skittles? At what point does a piece of skittle stop being a skittle? This keeps me up at night, {PLAYER}.' },
    { char: 'narrator', text: 'This is known as the Ship of Theseus problem. But with skittles.' },
  ]},
  23: { title: 'Fluffy on Percentages', lines: [
    { char: 'fluffy', text: 'If I give 110%, where does the extra 10% come from?! Am I borrowing it from tomorrow? Is future Fluffy going to be missing 10% of herself?! I need to lie down.' },
    { char: 'narrator', text: 'Fluffy lay down. Then she ate a skittle. Then she felt better.' },
  ]},
  25: { title: 'Fluffy on Symmetry', lines: [
    { char: 'fluffy', text: 'My horn is symmetrical. A rainbow is symmetrical. Skittles are round, which is ALL the symmetries. Is that why they\'re perfect? Is symmetry the same as deliciousness?' },
    { char: 'narrator', text: 'Science has not yet confirmed this theory. But it hasn\'t denied it either.' },
  ]},
  26: { title: 'Fluffy on Coincidence', lines: [
    { char: 'fluffy', text: '{PLAYER}, what are the CHANCES that you fell through a portal into a kingdom that needed maths, and I happened to be here, and I happened to be hungry? Is anything random, or is it all just maths we haven\'t figured out yet?' },
    { char: 'narrator', text: 'Fluffy accidentally invented determinism. She then forgot about it and ate a biscuit.' },
  ]},
  28: { title: 'Fluffy on Proof', lines: [
    { char: 'fluffy', text: 'How do you KNOW that 1 + 1 = 2? Like really REALLY know? Has anyone checked? What if it\'s been wrong this whole time and we\'ve all just been too polite to say?' },
    { char: 'narrator', text: 'A mathematician named Bertrand Russell once spent 360 pages proving that 1 + 1 = 2. Fluffy felt validated.' },
  ]},
  29: { title: "Fluffy's Final Wonder", lines: [
    { char: 'fluffy', text: '{PLAYER}, when you finish all the maths\u2026 will there be more maths? Or does maths end? If it ends, what\'s after it? If it doesn\'t end, then we\'ll need more skittles.' },
    { char: 'narrator', text: 'Maths does not end. And neither does Fluffy\'s appetite.' },
  ]},
};

function showMidLevelBeat(level) {
  const beat = MID_LEVEL_BEATS[level];
  if (!beat) return;
  showStoryBeatFromData(beat);
}

// ============================================================
// DRUMPF BEATS — Triggered at 5 correct per level
// ============================================================
const DRUMPF_BEATS = {
  7: {
    title: 'The Uninvited Guest',
    lines: [
      { char: 'narrator', text: 'A puff of purple smoke erupted in the middle of Sparkle Town square. When it cleared, a short man in an oversized robe and a very pointy hat stood coughing dramatically.' },
      { char: 'drumpf', text: 'GREETINGS, pathetic fairy-folk! I am DRUMPF! The GREATEST magician in all of Grimoria! Perhaps the greatest magician EVER! Many people are saying this!' },
      { char: 'fluffy', text: '\u2026Who is this purple walnut?' },
      { char: 'drumpf', text: 'I am here to WARN you! Maths is a HOAX! A fairy conspiracy! Numbers are just\u2026 squiggles! Meaningless squiggles!' },
      { char: 'narrator', text: 'Drumpf waved his wand to make all numbers disappear. Instead, he turned a lamppost into a carrot.' },
      { char: 'drumpf', text: '\u2026That was on PURPOSE. I meant to do that. Goodbye!' },
      { char: 'fluffy', text: 'Can I eat the carrot?' },
    ],
  },
  8: {
    title: 'The Best Maths',
    lines: [
      { char: 'drumpf', text: 'Listen, I know maths. I have the BEST maths. Some people say the GREATEST maths ever. Tremendous maths. Beautiful maths.' },
      { char: 'fluffy', text: 'Oh no, he\'s back.' },
      { char: 'drumpf', text: 'For example! Two plus two equals FIVE! Because I FEEL like it should be five. Five is a better number. A winner\'s number.' },
      { char: 'narrator', text: 'A five-year-old fairy tugged on Drumpf\'s robe.' },
      { char: 'narrator', text: '"Excuse me mister, two plus two is four. I learned that when I was THREE." The crowd giggled. Drumpf turned the colour of a beetroot.' },
      { char: 'drumpf', text: 'That\u2026 that child is CLEARLY a maths spy! Sent by the Fairy Council! I\'m being VERY treated unfairly!' },
    ],
  },
  9: {
    title: 'Trust Your Gut',
    lines: [
      { char: 'drumpf', text: 'Numbers LIE, people! You know what doesn\'t lie? Your GUT! Trust your gut! My gut is very smart. Very big. Very reliable.' },
      { char: 'narrator', text: 'To demonstrate, Drumpf stood on the old wooden bridge over Glitter Creek.' },
      { char: 'drumpf', text: 'My gut says this bridge is STRONG ENOUGH for anything! Forget your silly "weight calculations" and "structural engineering"!' },
      { char: 'narrator', text: 'The bridge, which had a clearly posted 50kg weight limit, collapsed under Drumpf and his ego. He landed in the creek with a magnificent splash.' },
      { char: 'fluffy', text: 'I give that splash a 9 out of 10. Would have been a 10 but he didn\'t do a flip.' },
      { char: 'drumpf', text: '*spluttering* The creek is BIASED!' },
    ],
  },
  10: {
    title: 'The Gatekeeper',
    lines: [
      { char: 'narrator', text: 'As the Fairy Council prepared to award {PLAYER} the Magic Wand, a familiar purple figure burst through the doors.' },
      { char: 'drumpf', text: 'STOP! This human doesn\'t BELONG in Mathlandia! They\'re not even from here! Maths doesn\'t even belong in Mathlandia!' },
      { char: 'fluffy', text: '\u2026It\'s literally in the NAME.' },
      { char: 'drumpf', text: 'The name is\u2026 WRONG! It should be called\u2026 Gut-Feelings-Landia! Where everyone just GUESSES and nobody has to do HOMEWORK!' },
      { char: 'elder', text: 'Guards, please escort the purple gentleman outside. {PLAYER} has EARNED this wand through courage, practice, and excellent metric conversions.' },
      { char: 'fluffy', text: '{PLAYER} belongs here MORE than anyone. Except me. Because I live here. And I\'m hungry.' },
    ],
  },
  11: {
    title: 'Maths is Boring',
    lines: [
      { char: 'drumpf', text: 'Maths is BORING! And USELESS! I have never needed maths in my LIFE! Everything I do is powered by pure TALENT and INSTINCT!' },
      { char: 'narrator', text: 'Drumpf marched to the ice cream cart and demanded three cones at 2 coins each.' },
      { char: 'drumpf', text: 'Here! Four coins! That\'s MORE than enough for three ice creams!' },
      { char: 'narrator', text: 'The ice cream seller, a patient fairy named Pip, sighed.' },
      { char: 'narrator', text: '"That\'s not enough, dear. Three times two is six, not four." The queue behind Drumpf began to murmur.' },
      { char: 'drumpf', text: 'This is a SCAM! The ice cream industry is RIGGED against me!' },
      { char: 'fluffy', text: 'Maybe if you\'d paid attention in maths class you could afford ice cream. Just saying.' },
    ],
  },
  12: {
    title: 'Alternative Conversions',
    lines: [
      { char: 'narrator', text: 'Drumpf had been busy overnight. Pamphlets were plastered across Sparkle Town.' },
      { char: 'drumpf', text: 'READ IT AND WEEP, maths-lovers! According to MY very smart research, 1 kilometre equals 7 metres! Many experts agree! The best experts!' },
      { char: 'fluffy', text: 'Which experts?' },
      { char: 'drumpf', text: '\u2026Expert experts. You wouldn\'t know them. They go to a different school. In Grimoria.' },
      { char: 'narrator', text: 'Farmer Gus, who had read the pamphlet, planted his crops 7 metres apart thinking it was 1 kilometre. His entire farm now fitted inside his kitchen.' },
      { char: 'narrator', text: 'Gus stood in his kitchen, surrounded by tiny rows of lettuce, and said a word that we cannot print in a children\'s game.' },
      { char: 'drumpf', text: 'Those pamphlets were\u2026 a DRAFT! A first draft! The final version will be much more\u2026 numbery!' },
    ],
  },
  13: {
    title: 'The Scramble Spell',
    lines: [
      { char: 'drumpf', text: 'ENOUGH! Today I use my MOST POWERFUL SPELL! I shall scramble this human child\'s maths brain FOREVER!' },
      { char: 'narrator', text: 'Drumpf raised his wand dramatically. Lightning crackled. The sky darkened. He chanted mysterious words.' },
      { char: 'drumpf', text: 'SCRAMBLEUS MATHEMATICUS BRAINUS\u2026 uh\u2026 DESTRUCTO!' },
      { char: 'narrator', text: 'The spell backfired spectacularly. Instead of scrambling {PLAYER}\'s brain, it scrambled Drumpf\'s ability to speak. He could only talk backwards.' },
      { char: 'drumpf', text: '!em pleh !gnorw tnew gnihtyrevE !on oN' },
      { char: 'fluffy', text: 'Honestly? He makes more sense this way.' },
    ],
  },
  14: {
    title: 'Drumpf\'s Rally',
    lines: [
      { char: 'narrator', text: 'Drumpf, having recovered his speech, organised an "Anti-Maths Rally" in the town square. He\'d booked the big stage.' },
      { char: 'drumpf', text: 'WELCOME to this HISTORIC event! As you can see, THOUSANDS of supporters have come to\u2014' },
      { char: 'narrator', text: 'The audience consisted of three beings. One was a lost tourist looking for the bakery. One was a fairy who thought this was a comedy show. And one was a pigeon.' },
      { char: 'drumpf', text: '\u2026The others are running late! Traffic! There\'s\u2026 very bad traffic in the Enchanted Forest today!' },
      { char: 'narrator', text: 'The pigeon cooed. Drumpf took this as applause.' },
      { char: 'drumpf', text: 'Thank you! THANK YOU! You see? The PEOPLE have spoken!' },
      { char: 'fluffy', text: 'That\'s a pigeon, mate.' },
    ],
  },
  15: {
    title: 'The Fake Skittles Incident',
    lines: [
      { char: 'narrator', text: 'Drumpf had a new strategy: bribery. He approached Fluffy with a suspicious-looking bag.' },
      { char: 'drumpf', text: 'Psst! Unicorn! How would you like a bag of UNLIMITED SKITTLES in exchange for\u2026 convincing your human friend that maths is fake?' },
      { char: 'fluffy', text: 'UNLIMITED SKITTLES?! Wait\u2026 these are VERY heavy for skittles.' },
      { char: 'narrator', text: 'Fluffy bit into one. It was a pebble. A painted pebble.' },
      { char: 'fluffy', text: 'These\u2026 taste\u2026 like LIES.' },
      { char: 'drumpf', text: 'That\'s the flavour of FREEDOM! Freedom from numbers!' },
      { char: 'fluffy', text: 'I have NEVER been more offended in my LIFE. And someone once called me a donkey. You have made an ENEMY today, purple man.' },
      { char: 'narrator', text: 'Fluffy ate the rest of the pebbles out of spite. Her dentist would not be pleased.' },
    ],
  },
  16: {
    title: 'Drumpf Academy',
    lines: [
      { char: 'narrator', text: 'A banner appeared across from the Mathlandia School: "DRUMPF\'S ACADEMY OF GUT FEELINGS \u2014 Where Numbers Don\'t Matter and Neither Do Facts!"' },
      { char: 'drumpf', text: 'Welcome to MY academy! Our curriculum is simple: BELIEVE hard enough, and the answer changes! Two plus two? Whatever you FEEL it is! That\'s the Drumpf Promise!' },
      { char: 'narrator', text: 'Drumpf\'s sole student was the confused pigeon from the rally. It sat on a tiny desk, staring blankly.' },
      { char: 'drumpf', text: 'Excellent work, Gerald! You\'re my BEST student! Also my only student! But BEST!' },
      { char: 'fluffy', text: 'Gerald the pigeon is getting a better education than anyone at that academy. And Gerald eats gravel.' },
      { char: 'narrator', text: 'By lunchtime, Gerald had flown away. Drumpf awarded him an honorary degree in absentia.' },
    ],
  },
  17: {
    title: 'The Tiara Heist (Rehearsal)',
    lines: [
      { char: 'narrator', text: 'The town guard found Drumpf behind the Royal Treasury at midnight, practising a heist on a cardboard replica of the Silver Tiara.' },
      { char: 'drumpf', text: 'I was NOT rehearsing a theft! I was\u2026 testing gravity! Seeing if tiaras fall! For SCIENCE!' },
      { char: 'narrator', text: 'He had a hand-drawn map labelled "DEFINITELY NOT A HEIST PLAN" and a grappling hook made of string and a fork.' },
      { char: 'fluffy', text: 'The map has arrows pointing to "the shiny thing" and your escape route goes through a wall.' },
      { char: 'drumpf', text: 'Walls are just doors that haven\'t been OPENED yet! You wouldn\'t understand! It\'s very advanced!' },
      { char: 'narrator', text: 'He attempted to scale the Treasury wall, fell off after two bricks, and claimed the wall was "structurally unfair."' },
    ],
  },
  18: {
    title: 'Expert Testimony',
    lines: [
      { char: 'drumpf', text: 'Today I have brought a RENOWNED maths expert from Grimoria to PROVE that maths is wrong! Please welcome Professor\u2026 um\u2026 Drumpfington!' },
      { char: 'narrator', text: 'A figure shuffled onstage wearing an obviously fake beard, the same purple robe, and a graduation cap made of newspaper.' },
      { char: 'narrator', text: '"Ahem. Yes. I am Professor Drumpfington. Definitely a different person. Pi equals three because round numbers are more HONEST."' },
      { char: 'fluffy', text: 'That\'s\u2026 that\'s just you in a fake beard.' },
      { char: 'drumpf', text: 'SLANDER! Professor Drumpfington is a COMPLETELY different person! He\'s taller! And more\u2026 beardy!' },
      { char: 'narrator', text: 'The fake beard fell off. Drumpf claimed it was a "planned demonstration of beard physics."' },
    ],
  },
  19: {
    title: 'The Petition',
    lines: [
      { char: 'drumpf', text: 'I have gathered THOUSANDS of signatures on my petition to BAN ALL NUMBERS from Mathlandia! Read it and weep!' },
      { char: 'narrator', text: 'Drumpf slammed a scroll on the table. It had three signatures: "Drumpf," "D. Rumpf," and "Gerald (pigeon)." Gerald\'s signature was a footprint.' },
      { char: 'fluffy', text: 'Drumpf. Your "Ban All Numbers" petition\u2026 is numbered. It says "Petition #47" at the top.' },
      { char: 'drumpf', text: '\u2026' },
      { char: 'fluffy', text: 'You USED a NUMBER on your ANTI-NUMBER petition.' },
      { char: 'drumpf', text: 'That\u2026 that\'s a LEGACY number! It was already there when I found the paper! Numbers are SNEAKY like that!' },
      { char: 'narrator', text: 'Fluffy laughed so hard she fell over. Twice.' },
    ],
  },
  21: {
    title: 'Not My Fault (But Also My Fault)',
    lines: [
      { char: 'narrator', text: 'The Dark Fraction was spreading chaos across Mathlandia. And Drumpf saw an opportunity.' },
      { char: 'drumpf', text: 'BEHOLD! The Dark Fraction was MY doing! I summoned it with my INCREDIBLE power! Tremble before\u2014' },
      { char: 'narrator', text: 'A price tag floated past reading "0.75 of a dollar." Drumpf stared at it in confusion.' },
      { char: 'drumpf', text: 'What\u2026 what IS that? Zero point\u2026 seven\u2026 Is that a lot? Is that more than one? Help.' },
      { char: 'fluffy', text: 'Wait. You DIDN\'T do this, did you?' },
      { char: 'drumpf', text: 'I absolutely DID! I just\u2026 don\'t understand the specific details of my own evil plan! Great leaders DELEGATE!' },
      { char: 'narrator', text: 'A speed sign reading "50% of 120 km/h" drifted past. Drumpf\'s eye twitched.' },
    ],
  },
  22: {
    title: 'Fractions Aren\'t Real',
    lines: [
      { char: 'drumpf', text: 'Fractions! Are! NOT! REAL! You can\'t have HALF of something! It\'s either ALL of something or NOTHING! This is basic gut science!' },
      { char: 'fluffy', text: 'Oh really?' },
      { char: 'narrator', text: 'Fluffy pulled out a skittle and carefully split it in two. She held out one half towards Drumpf.' },
      { char: 'fluffy', text: 'Want half a skittle?' },
      { char: 'narrator', text: 'Drumpf\'s hand shot out towards it before he could stop himself.' },
      { char: 'drumpf', text: '\u2026That proves NOTHING! My hand moved on its own! It\'s a reflex! A SKITTLE reflex!' },
      { char: 'fluffy', text: 'Your gut seems to understand halves just fine.' },
    ],
  },
  23: {
    title: 'The Negotiation',
    lines: [
      { char: 'narrator', text: 'Drumpf had decided to negotiate with the Dark Fraction directly. He stood in the town square addressing the swirling mathematical chaos.' },
      { char: 'drumpf', text: 'Listen, Dark Fraction! Let\'s make a DEAL! You keep the percentages, and I\'ll take all the POWER! I\'m a great dealmaker! The best!' },
      { char: 'narrator', text: 'The Dark Fraction responded by turning Drumpf\'s robe into 75% of a robe. The bottom quarter simply vanished.' },
      { char: 'drumpf', text: 'It\'s\u2026 drafty. This is VERY drafty. Where did my robe go?!' },
      { char: 'fluffy', text: 'Looks like the Dark Fraction took 25% off your outfit. That\'s fractions for you.' },
      { char: 'drumpf', text: 'I DEMAND to speak to the Dark Fraction\'s MANAGER!' },
    ],
  },
  25: {
    title: 'The Wall of Feelings',
    lines: [
      { char: 'drumpf', text: 'NEW PLAN! I\'m going to build a WALL! A BEAUTIFUL wall around all of Mathlandia to keep the numbers OUT!' },
      { char: 'narrator', text: 'Drumpf had ordered ten thousand bricks. Or so he thought.' },
      { char: 'drumpf', text: 'I calculated\u2014 I mean, I GUT-ESTIMATED that we need\u2026 some bricks. A wall\'s worth of bricks.' },
      { char: 'narrator', text: 'The wall was two bricks tall and three bricks wide. A beetle walked over it.' },
      { char: 'fluffy', text: 'I\'ve seen bigger walls in a dollhouse.' },
      { char: 'drumpf', text: 'Phase one! This is PHASE ONE! The rest of the wall is\u2026 coming. It\'s being shipped. From Grimoria. Very big shipment.' },
      { char: 'narrator', text: 'It was not coming.' },
    ],
  },
  27: {
    title: 'The Letter from Grimoria',
    lines: [
      { char: 'narrator', text: 'A dark raven circled Sparkle Town three times before landing on the fountain. It carried a letter sealed with black wax \u2014 the seal of the Queen of Grimoria.' },
      { char: 'narrator', text: 'Drumpf opened it with trembling hands. As the seal broke, a cold purple light spilled out. The sky darkened. The air grew heavy.' },
      { char: 'drumpf', text: 'The Queen has\u2026 sent reinforcements. Real magic. Not my magic \u2014 HER magic.' },
      { char: 'narrator', text: 'Something changed. The baker, who had always laughed at Drumpf, suddenly nodded along as Drumpf spoke. The road-sign painter shrugged and wrote "1 km = who cares." A child put down their maths book and said, "What\'s the point?"' },
      { char: 'fluffy', text: '{PLAYER}\u2026 something is wrong. Really wrong. People are\u2026 BELIEVING him. They never believed him before.' },
      { char: 'elder', text: 'The Queen of Grimoria\u2019s enchantment. It feeds on doubt and makes lies feel like truth. This is no longer a joke. This is the oldest magic of Grimoria.' },
      { char: 'narrator', text: 'For the first time, nobody laughed at Drumpf. And that was the most frightening thing of all.' },
    ],
  },
  28: {
    title: 'The Spreading Darkness',
    lines: [
      { char: 'narrator', text: 'Half the kingdom had stopped counting. The market ran on guesswork. Bridges were built by "feeling" and one had already collapsed. The baker thought three-quarters was the same as three-fortieths.' },
      { char: 'drumpf', text: 'See? I TOLD you! Numbers lie! The Queen has shown everyone the TRUTH! Feelings are all you need!' },
      { char: 'narrator', text: 'But Drumpf\'s smile was stiff. This wasn\'t his magic. The Queen\'s power was vast, ancient, and cold. He was a puppet now, and somewhere deep down, he knew it.' },
      { char: 'fluffy', text: 'I went to buy skittles today. The shopkeeper said "take however many feels right." It should have been a DREAM. But it felt\u2026 empty. Nothing tastes good when nobody can count how many you ate.' },
      { char: 'elder', text: 'Fairy Princess, only you can break this enchantment. The Queen\'s magic is powerful, but it cannot survive against truth. And maths IS truth. Every correct answer weakens the spell.' },
      { char: 'narrator', text: '{PLAYER} gripped their wand. The road ahead was dark. But the numbers still made sense. And that was enough.' },
    ],
  },
  29: {
    title: 'The Truth Equation',
    lines: [
      { char: 'narrator', text: '{PLAYER} stood in the centre of Sparkle Town. The sky was grey. The enchantment hung like fog over every mind.' },
      { char: 'narrator', text: 'But with every fraction simplified, every percentage calculated, every decimal placed correctly \u2014 a crack appeared in the Queen\'s spell. Light poured through.' },
      { char: 'narrator', text: 'One by one, people blinked. The baker looked at her scales and gasped: "Three-quarters is NOT three-fortieths! What was I THINKING?!" The road signs corrected themselves. The child picked up their maths book again.' },
      { char: 'drumpf', text: 'No\u2026 no no NO! They\'re THINKING again! They\'re CHECKING my numbers! This wasn\'t supposed to\u2014' },
      { char: 'narrator', text: 'The Queen of Grimoria\'s magic shattered like dark glass. Without lies to feed on, it crumbled into nothing. Drumpf\'s borrowed power evaporated.' },
      { char: 'drumpf', text: 'This isn\'t OVER! I\'ll be BACK! With BETTER magic! And a BIGGER hat!' },
      { char: 'narrator', text: 'Drumpf ran towards the Grimoria border, tripping over his 75%-of-a-robe twice.' },
      { char: 'fluffy', text: 'Don\'t forget your pumpkin hat! \u2026Also you still owe me for those fake skittles. I\'m sending an INVOICE.' },
    ],
  },
};

function showDrumpfBeat(level) {
  const beat = DRUMPF_BEATS[level];
  if (!beat) return;
  showStoryBeatFromData(beat);
}

// ============================================================
// LIFE & LORE BEATS — Triggered at 15 correct per level
// ============================================================
const LIFE_BEATS = {
  1: {
    title: 'Welcome to Mathlandia',
    lines: [
      { char: 'narrator', text: 'As {PLAYER} walked through Mathlandia for the first time, something magical became clear: maths was EVERYWHERE.' },
      { char: 'narrator', text: 'The trees grew in spiralling patterns \u2014 each branch splitting into exactly the next Fibonacci number. The bees built hexagonal honeycombs because hexagons tessellate perfectly. Even the butterflies had precisely symmetrical wings.' },
      { char: 'fluffy', text: 'See those flowers? They ALWAYS have a Fibonacci number of petals. 3, 5, 8, 13\u2026 Nobody tells them to! They just DO it! Flowers are basically tiny mathematicians!' },
      { char: 'narrator', text: '{PLAYER} looked around with new eyes. Maths wasn\'t something people invented. It was woven into everything. It had been there all along, waiting to be noticed.' },
    ],
  },
  2: {
    title: 'The Market',
    lines: [
      { char: 'narrator', text: 'Morning in Sparkle Town market. The air smelled of fresh bread and possibility.' },
      { char: 'narrator', text: 'The baker weighed flour on gleaming brass scales. The farmer counted eggs into baskets of twelve. The tailor measured ribbon with a long golden ruler, murmuring "twice around the waist, once for luck."' },
      { char: 'fluffy', text: 'I love market day! Everything is measuring and counting and delicious. Mostly delicious.' },
      { char: 'narrator', text: 'Nobody here thought maths was boring or pointless. It was just\u2026 how things worked. As natural as breathing. Quieter than magic, but just as important.' },
    ],
  },
  3: {
    title: 'Inside the Library',
    lines: [
      { char: 'narrator', text: 'Sage led {PLAYER} deeper into the library. The shelves spiralled upward like a nautilus shell, each level holding older and more mysterious books.' },
      { char: 'sage', text: 'This floor is measurements. That floor is shapes. Up there is the History of Numbers \u2014 did you know that zero was invented? Someone had to IMAGINE nothing and give it a symbol.' },
      { char: 'fluffy', text: 'There\'s a whole SECTION on Mathlandia! Sage, tell {PLAYER} about the kingdom!' },
      { char: 'sage', text: 'Mathlandia was founded by the Mathamagicians \u2014 an ancient order who could bend reality with logic. Every road, every bridge, every building was calculated to be exactly right. Maths isn\'t decoration here, {PLAYER}. It\'s the foundation of everything.' },
      { char: 'sage', text: 'And now that the Royal Mathematician has retired\u2026 well. That\'s why we need you.' },
    ],
  },
  5: {
    title: 'The Bridge Builder',
    lines: [
      { char: 'narrator', text: 'Near the edge of town, {PLAYER} met a stout fairy with sawdust in her wings and a protractor behind her ear.' },
      { char: 'archie', text: 'Name\'s Archie! I build bridges. My great-grandmother built the Rainbow Bridge using nothing but geometry and stubbornness. Triangles! Triangles are the STRONGEST shape! Don\'t let anyone tell you different!' },
      { char: 'fluffy', text: 'Archie once spent three weeks arguing with a hexagon enthusiast. It was intense.' },
      { char: 'archie', text: 'Hexagons are fine for BEES! But you want to cross a river? TRIANGLES. Every arch, every truss, every support beam \u2014 it all comes down to angles. Maths holds up the world. Literally.' },
    ],
  },
  6: {
    title: 'The Mathamagicians of Old',
    lines: [
      { char: 'elder', text: '{PLAYER}, sit with me a moment. Let me tell you of the Mathamagicians \u2014 the ancient order that founded this kingdom.' },
      { char: 'elder', text: 'Long ago, the Mathamagicians could bend reality with pure logic. Their theorems were spells. A proof was an incantation. To SOLVE was to CONJURE.' },
      { char: 'narrator', text: 'The Elder\'s eyes glittered with old memory.' },
      { char: 'elder', text: 'They could calculate trajectories to redirect rivers, use symmetry to heal broken bones, and prove theorems so elegant that reality itself would rearrange to match. The greatest among them was Queen Nightingale. But\u2026 that is a story for another day.' },
      { char: 'fluffy', text: 'Ooh! A cliffhanger! I love cliffhangers! Almost as much as snacks!' },
    ],
  },
  8: {
    title: 'The Counting Forest',
    lines: [
      { char: 'narrator', text: 'On the way to the Fairy Dust Factory, {PLAYER} walked through the Counting Forest \u2014 a place where every tree had a prime number of branches.' },
      { char: 'fluffy', text: '2, 3, 5, 7, 11, 13\u2026 Nobody plants them that way. They just GROW like that. It\'s creepy. But cool. Creepy-cool.' },
      { char: 'sage', text: 'The Counting Forest is one of the oldest places in Mathlandia. The Mathamagicians believed that primes are the atoms of numbers \u2014 everything else is built from them.' },
      { char: 'narrator', text: 'Deep in the forest, the oldest tree had exactly 97 branches. It had been growing since before anyone could remember. Maths wasn\'t something people invented here. It was something they discovered.' },
    ],
  },
  10: {
    title: 'Apprentice Day',
    lines: [
      { char: 'narrator', text: 'Sparkle Town was decorated with bunting and balloons for Apprentice Day \u2014 a festival celebrating all the Fairy Apprentices who came before {PLAYER}.' },
      { char: 'elder', text: 'Our greatest apprentice, Theorem the Brave, once calculated the exact amount of fairy dust needed for sustained flight. Before her, fairies just\u2026 flapped and hoped for the best.' },
      { char: 'fluffy', text: 'And there was Shortest-Path Sam! He worked out the quickest route between EVERY town in Mathlandia. Saved everyone hours! He was very popular at parties.' },
      { char: 'elder', text: 'You carry on a proud tradition, {PLAYER}. Every apprentice has left Mathlandia better than they found it. We have no doubt you will too.' },
    ],
  },
  11: {
    title: 'The Honey Calculator',
    lines: [
      { char: 'narrator', text: '{PLAYER} visited the Mathlandia Apiary, where Buzz the beekeeper tended twenty thousand bees with mathematical precision.' },
      { char: 'buzz', text: 'Each bee visits about 300 flowers a day! I need to know exactly how much honey we\'ll produce, how many jars to prepare, and how far each bee travels. Without maths, the whole hive gets confused!' },
      { char: 'fluffy', text: 'I tried to help once. I ate the honey. I was not invited back.' },
      { char: 'buzz', text: 'A single jar of honey takes about 60,000 bee-flights. That\'s a LOT of arithmetic! But every drop is worth it.' },
      { char: 'narrator', text: 'Buzz handed {PLAYER} a small jar of golden honey. "For the road," she said. "Calculated with love."' },
    ],
  },
  13: {
    title: 'Queen Nightingale (Part 1)',
    lines: [
      { char: 'elder', text: '{PLAYER}, you asked about Queen Nightingale. It is time you heard her story.' },
      { char: 'elder', text: 'During the First Grim War, Grimorian soldiers laid siege to the border towns. Our fighters fell ill \u2014 not from battle wounds, but from something invisible. Everyone assumed it was Grimorian dark magic.' },
      { char: 'narrator', text: 'But one young healer disagreed. Her name was Nightingale, and she did something nobody else thought to do.' },
      { char: 'elder', text: 'She COUNTED. She counted the sick. She counted where they fell ill. She counted what they ate, what they drank, where they slept. And she wrote it all down.' },
      { char: 'fluffy', text: 'She counted things? That\u2026 doesn\'t sound very dramatic.' },
      { char: 'elder', text: 'What she found would change everything. But the story continues another day.' },
    ],
  },
  14: {
    title: 'Queen Nightingale (Part 2)',
    lines: [
      { char: 'elder', text: 'Nightingale\'s numbers told a story that no one wanted to hear.' },
      { char: 'elder', text: 'More soldiers were dying from dirty water and crowded shelters than from battle wounds. It wasn\'t dark magic killing them \u2014 it was bad sanitation. The generals laughed at her.' },
      { char: 'narrator', text: 'So Nightingale made charts. Beautiful, clear, undeniable charts. Bar graphs. Pie charts. Diagrams that even the most stubborn general couldn\'t ignore.' },
      { char: 'elder', text: 'Her STATISTICS saved more lives than any sword or spell. She proved that COUNTING and MEASURING and GRAPHING could reveal truth that was invisible to the naked eye.' },
      { char: 'fluffy', text: '\u2026She saved people with CHARTS? That\'s\u2026 actually really cool.' },
      { char: 'elder', text: 'The pen is mightier than the sword, Fluffy. But the graph is mightier than both.' },
    ],
  },
  16: {
    title: 'The Weather Witch',
    lines: [
      { char: 'narrator', text: 'High on Crystal Peak, {PLAYER} met Nimbus \u2014 the Weather Witch of Mathlandia \u2014 surrounded by spinning instruments and probability charts.' },
      { char: 'nimbus', text: 'There\'s a 70% chance of rainbow showers today, a 20% chance of sparkle-hail, and a 10% chance of\u2026 hmm\u2026 flying frogs. It happens sometimes.' },
      { char: 'fluffy', text: 'Nimbus is NEVER wrong! Well, she\'s wrong 10% of the time about the frogs. But she ACCOUNTS for that!' },
      { char: 'nimbus', text: 'That\'s the beauty of probability! You don\'t have to be right every time. You just have to know HOW right you are. Maths doesn\'t lie. The sky doesn\'t lie. Only people lie.' },
      { char: 'narrator', text: 'Right on cue, it rained rainbows. Nimbus smiled. "Seventy percent," she said, and sipped her tea.' },
    ],
  },
  18: {
    title: 'The Music Maker',
    lines: [
      { char: 'narrator', text: 'In a garden of crystalline flowers, {PLAYER} heard the most beautiful music \u2014 and found Melody the fairy, plucking strings that hummed with mathematical precision.' },
      { char: 'melody', text: 'An octave is a 2-to-1 ratio! A perfect fifth is 3-to-2! Every chord, every harmony \u2014 it\'s all ratios and fractions dancing together. Maths IS music!' },
      { char: 'narrator', text: 'Melody played a sequence of notes based on the Fibonacci series. Around her, flowers bloomed in time with the music.' },
      { char: 'melody', text: 'The ancient Mathamagicians didn\'t separate maths from art. A beautiful proof and a beautiful song \u2014 they come from the same place.' },
      { char: 'fluffy', text: 'Can you play the "Skittle Song"? It goes: skittles, skittles, skittles, more skittles, please.' },
      { char: 'melody', text: '\u2026That\'s not really a song, Fluffy. But I appreciate the passion.' },
    ],
  },
  20: {
    title: 'Princess Duties',
    lines: [
      { char: 'narrator', text: 'Now that {PLAYER} was Fairy Princess, Sage appeared with a very large stack of books.' },
      { char: 'sage', text: 'Congratulations on the tiara! Now \u2014 a ruler must understand the kingdom\'s resources. How much grain grows in each field. How far the borders stretch. What the people need and when they need it.' },
      { char: 'fluffy', text: 'Wait. Being a princess involves MATHS?!' },
      { char: 'sage', text: 'Being ANYTHING important involves maths, Fluffy. Doctors measure medicine. Architects calculate loads. Even bakers measure flour.' },
      { char: 'sage', text: 'Numbers serve the people, {PLAYER}. And now, so do you. Use them wisely.' },
    ],
  },
  22: {
    title: 'The Old Observatory',
    lines: [
      { char: 'narrator', text: '{PLAYER} climbed the spiral stairs of the Old Observatory, where ancient star-charts covered every wall.' },
      { char: 'narrator', text: 'The star-reader, an elderly fairy with silver wings, traced patterns across the ceiling with a long pointer.' },
      { char: 'narrator', text: '"The constellations follow mathematical patterns," she said. "The ancients navigated by the stars. They didn\'t have GPS \u2014 they had geometry."' },
      { char: 'narrator', text: '"This star returns every 76 years. This one traces an ellipse. That cluster forms a perfect equilateral triangle. The universe itself is a mathematician."' },
      { char: 'fluffy', text: 'Space maths! That\'s the fanciest maths there IS!' },
    ],
  },
  24: {
    title: 'The Grim Wars',
    lines: [
      { char: 'elder', text: '{PLAYER}\u2026 it is time you understood Grimoria. Sit.' },
      { char: 'elder', text: 'Grimoria has always feared Mathlandia. Not our armies \u2014 we have very few. Not our magic \u2014 theirs is darker and older. They fear our LOGIC.' },
      { char: 'elder', text: 'Grimorian magic relies on confusion, fear, and misdirection. When people think clearly, when they can REASON and CALCULATE and CHECK\u2026 Grimorian spells lose their power.' },
      { char: 'elder', text: 'This is why the Grim Wars were fought. Not over land or gold. Over whether people would be allowed to THINK.' },
      { char: 'narrator', text: '{PLAYER} understood now why Drumpf was so afraid of maths. It wasn\'t just numbers he hated. It was the clear thinking that came with them.' },
      { char: 'elder', text: 'Truth is our greatest weapon. Remember that, Princess.' },
    ],
  },
  26: {
    title: 'Queen Nightingale (Part 3)',
    lines: [
      { char: 'elder', text: 'The final chapter of Nightingale\'s story. After the Grim Wars, Nightingale stood before the Grim King himself.' },
      { char: 'elder', text: 'She didn\'t bring an army. She brought her CHARTS. She showed him \u2014 in numbers he couldn\'t deny \u2014 that his own soldiers suffered just as much from the same problems. Dirty water. Poor shelter. Bad measurements.' },
      { char: 'elder', text: 'He laughed at her. So she did something braver. She showed the PEOPLE. Both sides. And knowledge spread like light through darkness.' },
      { char: 'narrator', text: 'The Grim King\'s power crumbled. Not from swords. From UNDERSTANDING. The people stopped believing his lies because they could finally CHECK them.' },
      { char: 'elder', text: 'Nightingale became Queen not through conquest, but through truth. And truth \u2014 as you\'re about to learn, {PLAYER} \u2014 is very hard to defeat.' },
    ],
  },
  27: {
    title: 'The Silence',
    lines: [
      { char: 'narrator', text: '{PLAYER} pushed open the library doors. For the first time, the reading room was empty. No students. No curious fairies. No one browsing the shelves. Just silence.' },
      { char: 'sage', text: '\u2026Oh. Hello, {PLAYER}. You came.' },
      { char: 'narrator', text: 'Sage sat at her desk, carefully cataloguing books that no one was coming to read.' },
      { char: 'sage', text: 'They stopped coming last week. They say books are boring. They say numbers don\'t matter. One child told me that "feelings are better than facts." She was SEVEN.' },
      { char: 'narrator', text: 'Sage\'s hands were steady. She kept filing. Kept cataloguing. Quietly. Faithfully. As she had for two hundred years.' },
      { char: 'sage', text: 'I\'ll keep the lights on, {PLAYER}. For when they come back. They always come back.' },
    ],
  },
  28: {
    title: 'The Last Lantern',
    lines: [
      { char: 'narrator', text: 'The Rainbow Bridge was cracking. {PLAYER} found Archie underneath it, patching cracks with trembling hands.' },
      { char: 'archie', text: 'The new builders don\'t use geometry anymore. They build by "gut feeling." This arch has no calculations behind it. It\'s just\u2026 bricks stacked and hoped for the best.' },
      { char: 'narrator', text: 'Another crack split the stone. Archie caught it with a brace.' },
      { char: 'archie', text: 'There used to be ten of us bridge-builders in Mathlandia. Now it\'s just me. The others said\u2026 what\'s the point of measuring? Nobody cares anymore.' },
      { char: 'archie', text: 'But I care. Triangles are still the strongest shape. Even if nobody\'s listening.' },
      { char: 'narrator', text: 'Archie kept working. One bridge. One lantern still lit in the darkness.' },
    ],
  },
  29: {
    title: 'Nightingale\'s Legacy',
    lines: [
      { char: 'narrator', text: 'As the Queen of Grimoria\'s enchantment weakened, {PLAYER} found a mural hidden in the library basement. Nightingale, young and fierce, standing before the Grim King with nothing but a rolled-up chart.' },
      { char: 'sage', text: 'She didn\'t defeat the Grim King with a sword. She defeated him with a CHART. A chart so clear, so truthful, that even his own people turned away from his lies.' },
      { char: 'sage', text: 'Truth is patient, {PLAYER}. It doesn\'t shout. It doesn\'t threaten. It just\u2026 waits. And eventually, people come looking for it.' },
      { char: 'narrator', text: 'Above them, through the library ceiling, light was breaking through the grey sky. The enchantment was cracking.' },
      { char: 'sage', text: 'Go now. Finish what Nightingale started. The maths will hold. It always does.' },
    ],
  },
  30: {
    title: 'Ever After',
    lines: [
      { char: 'narrator', text: 'Weeks after the coronation, Sparkle Town was bustling again. The market was full. The bridges stood strong. And the library\u2026' },
      { char: 'sage', text: 'Full again. Every seat taken. Three children asked me about prime numbers today. PRIME NUMBERS! I nearly wept.' },
      { char: 'archie', text: 'I\'ve got four new apprentices! FOUR! And they all know their triangles. The bridges will outlast us all.' },
      { char: 'buzz', text: 'The bees are happy. The honey is flowing. All the calculations check out.' },
      { char: 'nimbus', text: 'Ninety-five percent chance of clear skies and continued mathematical thinking. Five percent chance of flying frogs. Standard deviation.' },
      { char: 'narrator', text: 'And in the library, on a high shelf, Sage placed a new book: "The Story of {PLAYER}, the Princess Who Counted." Right next to Nightingale\'s.' },
      { char: 'sage', text: 'Maths was always going to win. It just needed someone brave enough to do it.' },
    ],
  },
};

function showLifeBeat(level) {
  const beat = LIFE_BEATS[level];
  if (!beat) return;
  showStoryBeatFromData(beat);
}

// Character display config
const CHAR_CONFIG = {
  narrator:    { label: '', className: 'story-narrator' },
  fluffy:      { label: 'Fluffy', className: 'story-fluffy', hasPortrait: true },
  drumpf:      { label: '\u{1F3A9} Drumpf', className: 'story-drumpf', hasPortrait: true },
  elder:       { label: '\u2728 Council Elder', className: 'story-elder' },
  baker:       { label: '\u{1F9C1} Baker', className: 'story-other' },
  sage:        { label: '\u{1F4DA} Sage', className: 'story-sage', hasPortrait: true },
  archie:      { label: '\u{1F309} Archie', className: 'story-archie', hasPortrait: true },
  buzz:        { label: '\u{1F41D} Buzz', className: 'story-buzz', hasPortrait: true },
  nimbus:      { label: '\u{1F327}\uFE0F Nimbus', className: 'story-nimbus', hasPortrait: true },
  melody:      { label: '\u{1F3B5} Melody', className: 'story-melody', hasPortrait: true },
  nightingale: { label: '\u{1F451} Queen Nightingale', className: 'story-nightingale', hasPortrait: true },
};

function showStoryBeat(level) {
  const beat = STORY_BEATS[level];
  if (!beat) return;
  showStoryBeatFromData(beat);
}

function showStoryBeatFromData(beat) {
  const playerName = FirebaseSync.getSavedUsername() || 'Hero';

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'story-overlay';

  const panel = document.createElement('div');
  panel.className = 'story-panel';

  // Title
  const title = document.createElement('div');
  title.className = 'story-title';
  title.textContent = beat.title;
  panel.appendChild(title);

  // Dialogue lines
  const content = document.createElement('div');
  content.className = 'story-content';

  beat.lines.forEach(line => {
    const config = CHAR_CONFIG[line.char] || CHAR_CONFIG.narrator;
    const p = document.createElement('p');
    p.className = config.className;

    const text = line.text.replace(/\{PLAYER\}/g, playerName);

    if (config.label) {
      var nameSpan = document.createElement('span');
      nameSpan.className = 'story-char-name';

      if (config.hasPortrait) {
        var portrait = null;
        if (line.char === 'fluffy' && typeof FluffySprites !== 'undefined' && FluffySprites.ready) {
          portrait = FluffySprites.createGrumpySprite('portrait', 32, 32);
        } else if (line.char === 'drumpf' && typeof DrumpfSprites !== 'undefined' && DrumpfSprites.ready) {
          portrait = DrumpfSprites.createSprite('portrait', 32, 32);
        } else if (typeof CharacterSprites !== 'undefined' && CharacterSprites.ready && CharacterSprites.frames[line.char]) {
          portrait = CharacterSprites.createSprite(line.char, 32, 32);
        }
        if (portrait) {
          portrait.className = 'story-char-portrait';
          nameSpan.appendChild(portrait);
        }
      }

      nameSpan.appendChild(document.createTextNode(config.label + ':'));
      p.appendChild(nameSpan);
      p.appendChild(document.createTextNode(' ' + text));
    } else {
      p.textContent = text;
    }
    content.appendChild(p);
  });

  panel.appendChild(content);

  // Continue button
  const btn = document.createElement('button');
  btn.className = 'go-btn story-continue';
  btn.textContent = 'Continue';
  btn.addEventListener('click', () => overlay.remove());
  panel.appendChild(btn);

  overlay.appendChild(panel);
  document.body.appendChild(overlay);

  // Focus the button so Enter key works
  requestAnimationFrame(() => btn.focus());
}
