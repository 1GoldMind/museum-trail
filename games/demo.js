window.GAME = {
  "id": "demo",
  "title": "Bolt's Big Adventure",
  "museum": "The Example Museum",
  "lang": "en-GB",
  "brand": { "header": "THE EXAMPLE MUSEUM", "sub": "FAMILY TRAIL", "logo": "" },
  "guide": { "name": "Bolt", "character": "robot", "image": "" },
  "theme": { "primary": "#3b1d5e", "accent": "#5ee0b5", "link": "#6a3fb5", "background": "#f3effa" },
  "words": { "zone": "gallery", "zones": "galleries", "stop": "exhibit", "stops": "exhibits" },
  "levels": [
    { "id": "junior", "label": "Ages 4–8", "emoji": "🐣", "stopsToPass": 1, "showAnswerAfter": 2, "readAloud": true },
    { "id": "explorer", "label": "Ages 9–14", "emoji": "🧭", "stopsToPass": 2, "showAnswerAfter": 3, "readAloud": false }
  ],
  "text": {
    "intro": ["Beep boop! I am Bolt the robot.", "I want to learn everything in this museum.", "Will you help me explore?"],
    "introChips": ["Demo trail", "Bring a grown-up"],
    "introGrown": "This is a demo trail for a made-up museum. It shows every game type. Choose an age group, then visit the galleries in order.",
    "certTitle": "Official museum explorer",
    "certLine": "explored the whole museum with Bolt.",
    "certThanks": "Beep boop! Thank you"
  },
  "zones": [
    {
      "id": "dino", "label": "Dinosaur Hall", "title": "Giants of long ago", "era": "Millions of years ago", "sign": "leaf",
      "story": ["Stomp, stomp! Dinosaurs lived here long, long ago.", "Some were as tall as a house.", "Let's find them!"],
      "grown": "Start at the big skeleton in the middle of the hall.",
      "stops": [
        {
          "id": "trex", "name": "T. rex", "emoji": "🦖", "image": "",
          "look": "Find the T. rex skeleton. Look at its tiny arms!",
          "fact": "T. rex had only <strong>two fingers</strong> on each tiny hand.",
          "talk": "Why do you think its arms were so small?",
          "tasks": {
            "junior": { "type": "choice", "q": "How many fingers are on each hand?", "options": [{ "label": "2", "icon": "2" }, { "label": "3", "icon": "3" }, { "label": "5", "icon": "5" }], "answer": 1 },
            "explorer": { "type": "estimate", "q": "How long was a big T. rex, nose to tail?", "min": 2, "max": 30, "step": 1, "answer": 12, "tolerance": 2, "unit": "metres", "fact": "A big T. rex was about <strong>12 metres</strong> long. That is longer than a bus." }
          }
        },
        {
          "id": "trike", "name": "Triceratops", "emoji": "🦴", "image": "",
          "look": "Find the Triceratops skull. Look at its head.",
          "fact": "Triceratops means <strong>three-horned face</strong>.",
          "talk": "What would you use three horns for?",
          "tasks": {
            "junior": { "type": "count", "q": "Count the horns on its head. How many?", "answer": 3, "max": 10 },
            "explorer": { "type": "code", "q": "The 'Tri' in Triceratops is a number. Type the number.", "answer": "3|three", "hint": "Think of a triangle." }
          }
        },
        {
          "id": "fossils", "name": "Fossil wall", "emoji": "🐚", "image": "",
          "look": "Find the wall of fossils.",
          "fact": "A <strong>fossil</strong> is the shape of a living thing, kept in rock for millions of years.",
          "talk": "Which fossil is your favourite?",
          "tasks": {
            "junior": { "type": "spy", "q": "What can you find? Tap each one you see. Find 3!", "need": 3, "options": [{ "label": "A shell", "icon": "🐚" }, { "label": "A leaf", "icon": "🍃" }, { "label": "A bone", "icon": "🦴" }, { "label": "A footprint", "icon": "🐾" }] },
            "explorer": { "type": "order", "q": "Put these in order. Start with the oldest.", "items": ["The first dinosaurs", "Woolly mammoths", "The pyramids of Egypt", "The first smartphone"], "fact": "Dinosaurs came <strong>millions of years</strong> before mammoths, and long before any people." }
          }
        }
      ]
    },
    {
      "id": "space", "label": "Space Gallery", "title": "Up among the stars", "era": "Today and tomorrow", "sign": "rocket",
      "story": ["3, 2, 1... lift-off!", "People have flown to the Moon.", "Robots like me have gone even further!"],
      "grown": "The planets model hangs from the ceiling, so look up.",
      "stops": [
        {
          "id": "suit", "name": "Space suit", "emoji": "🧑‍🚀", "image": "",
          "look": "Find the space suit.",
          "fact": "A space suit carries <strong>air to breathe</strong>. There is no air in space.",
          "talk": "What would you take to the Moon?",
          "tasks": {
            "junior": { "type": "choice", "q": "What do astronauts wear in space?", "options": [{ "label": "A space suit", "icon": "🧑‍🚀" }, { "label": "A swimsuit", "icon": "🩱" }, { "label": "A raincoat", "icon": "🧥" }], "answer": 1 },
            "explorer": { "type": "code", "q": "In which year did people first walk on the Moon?", "answer": "1969", "hint": "It starts with 196.", "fact": "People first walked on the Moon in <strong>1969</strong>." }
          }
        },
        {
          "id": "planets", "name": "Planets model", "emoji": "🪐", "image": "",
          "look": "Find the model of the Sun and its planets.",
          "fact": "<strong>Eight planets</strong> go round our Sun. Earth is the third one.",
          "talk": "Which planet would you visit?",
          "tasks": {
            "junior": { "type": "count", "q": "Count the planets going round the Sun. How many?", "answer": 8, "max": 12 },
            "explorer": { "type": "match", "q": "Match each planet to its clue.", "pairs": [["Mars", "The red planet"], ["Saturn", "Has bright rings"], ["Jupiter", "The biggest planet"], ["Earth", "Our home"]] }
          }
        },
        {
          "id": "rocket", "name": "Rocket", "emoji": "🚀", "image": "",
          "look": "Find the tall rocket.",
          "fact": "Rockets push fire <strong>down</strong>. That pushes the rocket <strong>up</strong>!",
          "talk": "Can you count down from 10 and blast off?",
          "tasks": {
            "junior": { "type": "choice", "q": "Where does the fire come out?", "options": [{ "label": "The bottom", "icon": "⬇️" }, { "label": "The top", "icon": "⬆️" }, { "label": "The side", "icon": "➡️" }], "answer": 1 },
            "explorer": { "type": "estimate", "q": "How many minutes does sunlight take to reach Earth?", "min": 1, "max": 60, "step": 1, "answer": 8, "tolerance": 1, "unit": "minutes", "fact": "Sunlight takes about <strong>8 minutes</strong> to reach us." }
          }
        }
      ]
    },
    {
      "id": "ocean", "label": "Ocean Room", "title": "Under the sea", "era": "Right now", "sign": "fish",
      "story": ["Splish, splash! Welcome to the sea.", "Careful, I am a robot. I must not get wet!", "Help me look from here."],
      "grown": "The whale model is very long. Walk its whole length together.",
      "stops": [
        {
          "id": "octopus", "name": "Octopus", "emoji": "🐙", "image": "",
          "look": "Find the octopus.",
          "fact": "An octopus has <strong>eight arms</strong> and <strong>three hearts</strong>!",
          "talk": "What would you do with eight arms?",
          "tasks": {
            "junior": { "type": "count", "q": "Count its arms. How many?", "answer": 8, "max": 12 },
            "explorer": { "type": "choice", "q": "How many hearts does an octopus have?", "options": [{ "label": "One", "icon": "1" }, { "label": "Two", "icon": "2" }, { "label": "Three", "icon": "3" }], "answer": 3 }
          }
        },
        {
          "id": "whale", "name": "Blue whale", "emoji": "🐋", "image": "",
          "look": "Find the blue whale model.",
          "fact": "The blue whale is the <strong>biggest animal</strong> that has ever lived.",
          "talk": "How many steps long is the whale?",
          "tasks": {
            "junior": { "type": "choice", "q": "Which one is the biggest?", "options": [{ "label": "Blue whale", "icon": "🐋" }, { "label": "Elephant", "icon": "🐘" }, { "label": "Bus", "icon": "🚌" }], "answer": 1 },
            "explorer": { "type": "estimate", "q": "How long can a blue whale grow?", "min": 5, "max": 60, "step": 1, "answer": 30, "tolerance": 4, "unit": "metres", "fact": "A blue whale can grow to about <strong>30 metres</strong>." }
          }
        },
        {
          "id": "reef", "name": "Coral reef", "emoji": "🪸", "image": "",
          "look": "Find the coral reef.",
          "fact": "Coral looks like a plant or a rock. It is really made by tiny <strong>animals</strong>.",
          "talk": "How many colours can you see?",
          "tasks": {
            "junior": { "type": "spy", "q": "Find these colours on the reef. Find 3!", "need": 3, "options": [{ "label": "Red", "icon": "🔴" }, { "label": "Yellow", "icon": "🟡" }, { "label": "Blue", "icon": "🔵" }, { "label": "Stripes", "icon": "🦓" }] },
            "explorer": { "type": "choice", "q": "What is coral?", "options": [{ "label": "A plant", "icon": "🌿" }, { "label": "An animal", "icon": "🐛" }, { "label": "A rock", "icon": "🪨" }], "answer": 2 }
          }
        }
      ]
    }
  ],
  "finale": { "type": "badge", "label": "At the exit", "title": "Design your explorer badge", "story": ["Beep boop! We explored everything.", "Now design your own explorer badge!"], "grown": "" },
  "legal": "Demo trail for a made-up museum. Bolt is a made-up character. Replace all content before use. Children must stay with their grown-up."
};
