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

// Character display config
const CHAR_CONFIG = {
  narrator: { label: '', className: 'story-narrator' },
  fluffy:   { label: '\u{1F984} Fluffy', className: 'story-fluffy' },
  elder:    { label: '\u2728 Council Elder', className: 'story-elder' },
  baker:    { label: '\u{1F9C1} Baker', className: 'story-other' },
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
      p.innerHTML = '<span class="story-char-name">' + config.label + ':</span> ' + text;
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
