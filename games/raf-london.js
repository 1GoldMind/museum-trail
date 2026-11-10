window.GAME = {
  "id": "raf-london-percy-v3",
  "title": "Percy's Flying Mission",
  "museum": "RAF Museum London",
  "ages": "4–8",
  "headerBrand": "RAF MUSEUM",
  "headerSub": "SECRET MISSIONS",
  "legal": "Prototype for RAF Museum London, ages 4–8. Percy is a made-up character. Drawings are simple and not accurate. Aircraft locations were checked on public sources in November 2026; route, sign places, viewing points and all facts must be checked by Museum staff before use. Do not touch the aircraft or climb barriers. Children must stay with their grown-up.",
  "guide": {
    "name": "Percy",
    "character": "penguin"
  },
  "text": {
    "intro": [
      "Hello! I am Percy the penguin.",
      "Penguins can't fly... but I really, really want to!",
      "The RAF has been flying for over 100 years. Will you help me learn how they do it?"
    ],
    "introChips": [
      "5 hangars",
      "15 aircraft",
      "About 1 hour, to test",
      "Bring a grown-up"
    ],
    "introGrown": "Go through the hangars in order, 1 to 6. In each hangar, find at least one aircraft to win a stamp. Find all three for a gold stamp. Please help with reading and stay behind the barriers.",
    "namePrompt": "What is your name, pilot?",
    "mapHelp": "Visit the hangars in order. Find at least one aircraft in each hangar to get a stamp.",
    "mapDone": "You got a stamp from every hangar! Now let's design my plane.",
    "signTitle": "Find Percy's sign",
    "signHelp": [
      "Look for my sign in this hangar.",
      "What picture is on it? Tap the same picture."
    ],
    "signWrong": "Not that one. Look at the sign again!",
    "pickAircraft": "Which aircraft will you find? Find one to get a stamp. Find all three for a gold stamp!",
    "wrong": "Good try! Look at the real one again 👀",
    "showAnswer": "Here is a clue: try the green one!",
    "right": "Yes! Well done!",
    "finaleStory": [
      "I can't fly with my flippers...",
      "...but I CAN fly in a plane!",
      "Will you design a plane for me?"
    ],
    "certTitle": "Official Flying Mission crew",
    "certLine": "helped Percy learn to fly through the RAF story."
  },
  "signs": {
    "sun": {
      "sym": "☀️",
      "name": "Sun"
    },
    "cloud": {
      "sym": "☁️",
      "name": "Cloud"
    },
    "rainbow": {
      "sym": "🌈",
      "name": "Rainbow"
    },
    "moon": {
      "sym": "🌙",
      "name": "Moon"
    },
    "star": {
      "sym": "⭐",
      "name": "Star"
    },
    "rocket": {
      "sym": "🚀",
      "name": "Rocket"
    },
    "heart": {
      "sym": "❤️",
      "name": "Heart"
    },
    "tree": {
      "sym": "🌳",
      "name": "Tree"
    }
  },
  "finale": {
    "label": "Hangar 1",
    "title": "Design Percy's plane",
    "grown": "Hangar 1 also has a real \"Design your own plane\" activity in First to the Future."
  },
  "design": {
    "shapes": [
      [
        "fighter",
        "Propeller"
      ],
      [
        "jet",
        "Fast jet"
      ],
      [
        "biplane",
        "Biplane"
      ],
      [
        "helicopter",
        "Helicopter"
      ],
      [
        "flyingboat",
        "Flying boat"
      ],
      [
        "rocket",
        "Rocket plane"
      ]
    ],
    "colours": [
      [
        "#d6413a",
        "Red"
      ],
      [
        "#f07a2a",
        "Orange"
      ],
      [
        "#f2c230",
        "Yellow"
      ],
      [
        "#2f9e6a",
        "Green"
      ],
      [
        "#1f6fd1",
        "Blue"
      ],
      [
        "#8a4fd8",
        "Purple"
      ],
      [
        "#f07cb0",
        "Pink"
      ],
      [
        "#f4f4f4",
        "White"
      ],
      [
        "#2b2f36",
        "Black"
      ]
    ],
    "patterns": [
      [
        "none",
        "Plain"
      ],
      [
        "stripes",
        "Stripes"
      ],
      [
        "spots",
        "Spots"
      ],
      [
        "stars",
        "Stars"
      ],
      [
        "zigzag",
        "Zigzag"
      ],
      [
        "checks",
        "Checks"
      ]
    ],
    "stickers": [
      [
        "none",
        "None"
      ],
      [
        "roundel",
        "Roundel"
      ],
      [
        "star",
        "Star"
      ],
      [
        "heart",
        "Heart"
      ],
      [
        "bolt",
        "Lightning"
      ],
      [
        "fish",
        "Fish"
      ]
    ],
    "trails": [
      [
        "none",
        "None"
      ],
      [
        "smoke",
        "Smoke"
      ],
      [
        "rainbow",
        "Rainbow"
      ],
      [
        "sparkle",
        "Sparkles"
      ]
    ]
  },
  "_help": "Trail-wide settings. Hangars and aircraft come from Webflow CMS (run the 'Sync from Webflow' action). Edit words here, keep quote marks and commas.",
  "hangars": [
    {
      "id": "h1",
      "label": "Hangar 1",
      "era": "1918 to 2018",
      "title": "The RAF story begins",
      "sign": "sun",
      "story": [
        "We are in Hangar 1. This is where the RAF story starts.",
        "The RAF began in 1918. That is more than 100 years ago!",
        "Let's find three amazing aircraft."
      ],
      "grown": "Hangar 1 shows RAF Stories, the first 100 years. The Spitfire may be displayed high up, so look up together.",
      "aircraft": [
        {
          "id": "seaking",
          "name": "Sea King",
          "art": "helicopter",
          "body": "#f5c518",
          "wing": "#1f3b57",
          "image": "",
          "look": "Find the big yellow rescue helicopter.",
          "task": {
            "type": "hotspot",
            "q": "Tap the part that spins round to lift the helicopter up.",
            "answer": "1",
            "options": [
              {
                "v": "1",
                "label": "Top blades",
                "icon": "1",
                "x": 50.0,
                "y": 17.0
              },
              {
                "v": "2",
                "label": "Body",
                "icon": "2",
                "x": 52.0,
                "y": 54.0
              },
              {
                "v": "3",
                "label": "Tail",
                "icon": "3",
                "x": 16.0,
                "y": 46.0
              }
            ]
          },
          "fact": "The rotor blades spin very fast. They lift the helicopter straight up. Sea Kings rescued people from the sea and the mountains.",
          "talk": "Who do you think the rescue crew helped?"
        },
        {
          "id": "spitfire5",
          "name": "Spitfire",
          "art": "fighter",
          "body": "#6f7f5f",
          "wing": "#6f7f5f",
          "image": "",
          "look": "Find the Spitfire. You may need to look up!",
          "task": {
            "type": "choice",
            "q": "What shape are the Spitfire's wings?",
            "answer": "1",
            "options": [
              {
                "v": "1",
                "label": "Curved",
                "icon": "wing:curved"
              },
              {
                "v": "2",
                "label": "Triangle",
                "icon": "wing:delta"
              },
              {
                "v": "3",
                "label": "Straight",
                "icon": "wing:straight"
              }
            ]
          },
          "fact": "The Spitfire's curved wings are famous all over the world.",
          "talk": "Can you draw the wing shape in the air with your finger?",
          "wingShape": "curved"
        },
        {
          "id": "sunderland",
          "name": "Sunderland",
          "art": "flyingboat",
          "body": "#eef0e6",
          "wing": "#d9dccf",
          "image": "",
          "look": "Find the giant Sunderland. Its bottom is shaped like a boat.",
          "task": {
            "type": "choice",
            "q": "Where did the Sunderland land?",
            "answer": "1",
            "options": [
              {
                "v": "1",
                "label": "On water",
                "icon": "🌊"
              },
              {
                "v": "2",
                "label": "On snow",
                "icon": "❄️"
              },
              {
                "v": "3",
                "label": "In trees",
                "icon": "🌳"
              }
            ]
          },
          "fact": "The Sunderland is a flying boat. It took off and landed on water!",
          "talk": "Penguins love water too! Would you like a plane that lands on water?"
        }
      ]
    },
    {
      "id": "h2",
      "label": "Hangar 2",
      "era": "1914 to 1918",
      "title": "The first war planes",
      "sign": "cloud",
      "story": [
        "Brrr! The first planes were cold to fly.",
        "They were made of wood and cloth. Pilots sat in the open air, in the wind.",
        "Just like a penguin on the ice!"
      ],
      "grown": "Hangar 2 shows the First World War in the Air. Some aircraft hang from the ceiling.",
      "aircraft": [
        {
          "id": "se5a",
          "name": "SE5a",
          "art": "biplane",
          "body": "#7a8a5c",
          "wing": "#c9b27c",
          "image": "",
          "look": "Find the SE5a. It has wings on top of wings.",
          "task": {
            "type": "choice",
            "q": "How many wings are stacked up?",
            "answer": "2",
            "options": [
              {
                "v": "1",
                "label": "1",
                "icon": "stack:1"
              },
              {
                "v": "2",
                "label": "2",
                "icon": "stack:2"
              },
              {
                "v": "3",
                "label": "3",
                "icon": "stack:3"
              }
            ]
          },
          "fact": "A plane with two sets of wings is called a biplane. \"Bi\" means two!",
          "talk": "The pilot sat outside in the wind. How do you think that felt?"
        },
        {
          "id": "camel",
          "name": "Sopwith Camel",
          "art": "biplane",
          "body": "#8a6a3c",
          "wing": "#b89a62",
          "image": "",
          "look": "Find the Sopwith Camel. It may be hanging up high!",
          "task": {
            "type": "choice",
            "q": "This plane is named after an animal. Which one?",
            "answer": "1",
            "options": [
              {
                "v": "1",
                "label": "Camel",
                "icon": "🐪"
              },
              {
                "v": "2",
                "label": "Elephant",
                "icon": "🐘"
              },
              {
                "v": "3",
                "label": "Penguin",
                "icon": "🐧"
              }
            ]
          },
          "fact": "It is called the Sopwith Camel. The bump in front of the pilot looks a bit like a camel's hump!",
          "talk": "If you named a plane after an animal, which animal would you pick?"
        },
        {
          "id": "triplane",
          "name": "Sopwith Triplane",
          "art": "triplane",
          "body": "#7f7350",
          "wing": "#cdb98a",
          "image": "",
          "look": "Find the Sopwith Triplane. Count its wings carefully!",
          "task": {
            "type": "choice",
            "q": "How many wings are stacked up?",
            "answer": "3",
            "options": [
              {
                "v": "1",
                "label": "1",
                "icon": "stack:1"
              },
              {
                "v": "2",
                "label": "2",
                "icon": "stack:2"
              },
              {
                "v": "3",
                "label": "3",
                "icon": "stack:3"
              }
            ]
          },
          "fact": "Three sets of wings! This is called a triplane. \"Tri\" means three.",
          "talk": "Can you find a plane with two wings, and one with three?"
        }
      ]
    },
    {
      "id": "h34",
      "label": "Hangars 3 and 4",
      "era": "1918 to 1980",
      "title": "Faster and higher",
      "sign": "rainbow",
      "story": [
        "Whoosh! Planes got faster and faster.",
        "New pilots had to learn how to fly.",
        "And people invented helicopters and jets!"
      ],
      "grown": "Hangars 3 and 4 are one big space, separated by pillars. Look for the Harvard, the Hoverfly and the Phantom.",
      "aircraft": [
        {
          "id": "harvard",
          "name": "Harvard",
          "art": "trainer",
          "body": "#f2b632",
          "wing": "#f2b632",
          "image": "",
          "look": "Find the Harvard. Learner pilots flew this plane.",
          "task": {
            "type": "choice",
            "q": "Learner pilots flew with a teacher. How many seats does it have?",
            "answer": "2",
            "options": [
              {
                "v": "1",
                "label": "1 seat",
                "icon": "💺"
              },
              {
                "v": "2",
                "label": "2 seats",
                "icon": "💺💺"
              },
              {
                "v": "3",
                "label": "3 seats",
                "icon": "💺💺💺"
              }
            ]
          },
          "fact": "The learner sat in one seat. The teacher sat in the other seat.",
          "talk": "What would you like to learn if you were a pilot?",
          "wingShape": "straight"
        },
        {
          "id": "hoverfly",
          "name": "Hoverfly",
          "art": "helicopter",
          "body": "#8b9a8a",
          "wing": "#2c3e50",
          "image": "",
          "look": "Find the Hoverfly. It is a small, early helicopter.",
          "task": {
            "type": "choice",
            "q": "Count the big blades on top. How many?",
            "answer": "2",
            "options": [
              {
                "v": "1",
                "label": "2",
                "icon": "blades:2"
              },
              {
                "v": "2",
                "label": "3",
                "icon": "blades:3"
              },
              {
                "v": "3",
                "label": "4",
                "icon": "blades:4"
              }
            ]
          },
          "fact": "The Hoverfly was one of the first helicopters the RAF used.",
          "talk": "Is it bigger or smaller than the Sea King in Hangar 1?"
        },
        {
          "id": "phantom",
          "name": "Phantom",
          "art": "jet",
          "body": "#7c8790",
          "wing": "#7c8790",
          "image": "",
          "look": "Find the Phantom. It is a big, grey jet.",
          "task": {
            "type": "choice",
            "q": "What makes the Phantom go?",
            "answer": "2",
            "options": [
              {
                "v": "1",
                "label": "Propellers",
                "icon": "🌀"
              },
              {
                "v": "2",
                "label": "Jet engines",
                "icon": "🔥"
              },
              {
                "v": "3",
                "label": "Pedals",
                "icon": "🚲"
              }
            ]
          },
          "fact": "Jet engines push hot air out of the back, very fast. Whoosh!",
          "talk": "Can you make a jet engine noise?",
          "wingShape": "swept"
        }
      ]
    },
    {
      "id": "h5",
      "label": "Hangar 5",
      "era": "1939 to 1945",
      "title": "The Second World War",
      "sign": "moon",
      "story": [
        "This is the Bomber Hall.",
        "Here are big, heavy planes from the Second World War.",
        "Many of them flew at night, in the dark."
      ],
      "grown": "Hangar 5 is the Bomber Hall. The Lancaster 'S for Sugar' is the star. The Komet is very small, so look carefully.",
      "aircraft": [
        {
          "id": "lancaster",
          "name": "Lancaster",
          "art": "bomber",
          "body": "#2f3b2e",
          "wing": "#2f3b2e",
          "image": "",
          "look": "Find the very big Lancaster. Its name is S for Sugar.",
          "task": {
            "type": "choice",
            "q": "Count the propellers on the wings. How many?",
            "answer": "2",
            "options": [
              {
                "v": "1",
                "label": "2",
                "icon": "props:2"
              },
              {
                "v": "2",
                "label": "4",
                "icon": "props:4"
              },
              {
                "v": "3",
                "label": "6",
                "icon": "props:6"
              }
            ]
          },
          "fact": "The Lancaster has four engines. Each one turns a propeller. Big planes need lots of power!",
          "talk": "Why do you think a big plane needs so many engines?"
        },
        {
          "id": "mustang",
          "name": "Mustang",
          "art": "fighter",
          "body": "#c3c9cf",
          "wing": "#c3c9cf",
          "image": "",
          "look": "Find the Mustang. It is a shiny fighter plane.",
          "task": {
            "type": "choice",
            "q": "Count the blades on its propeller. How many?",
            "answer": "3",
            "options": [
              {
                "v": "1",
                "label": "2",
                "icon": "blades:2"
              },
              {
                "v": "2",
                "label": "3",
                "icon": "blades:3"
              },
              {
                "v": "3",
                "label": "4",
                "icon": "blades:4"
              }
            ]
          },
          "fact": "The Mustang's propeller has four blades. They spin round to pull the plane through the air.",
          "talk": "A mustang is a kind of horse. Why do you think they chose that name?",
          "wingShape": "straight"
        },
        {
          "id": "komet",
          "name": "Komet",
          "art": "rocket",
          "body": "#8a7a5a",
          "wing": "#8a7a5a",
          "image": "",
          "look": "Find the Komet. It is very small, with no tail at the back.",
          "task": {
            "type": "choice",
            "q": "The Komet was super fast. What made it go?",
            "answer": "1",
            "options": [
              {
                "v": "1",
                "label": "A rocket",
                "icon": "🚀"
              },
              {
                "v": "2",
                "label": "Pedals",
                "icon": "🚲"
              },
              {
                "v": "3",
                "label": "A sail",
                "icon": "⛵"
              }
            ]
          },
          "fact": "The Komet had a rocket engine. It was tiny, but very, very fast!",
          "talk": "Is the Komet bigger or smaller than the Lancaster?"
        }
      ]
    },
    {
      "id": "h6",
      "label": "Hangar 6",
      "era": "1980 to today",
      "title": "Modern times",
      "sign": "star",
      "story": [
        "Beep beep! Now we are in modern times.",
        "Some planes here can change shape.",
        "One has no pilot inside at all!"
      ],
      "grown": "Hangar 6 is The RAF in an Age of Uncertainty, 1980 to today. Some aircraft are displayed as if flying.",
      "aircraft": [
        {
          "id": "predator",
          "name": "Predator",
          "art": "drone",
          "body": "#c3cad1",
          "wing": "#a9b2ba",
          "image": "",
          "look": "Find the Predator. It is long and grey, with no windows at the front.",
          "task": {
            "type": "choice",
            "q": "Where is the pilot of the Predator?",
            "answer": "2",
            "options": [
              {
                "v": "1",
                "label": "Inside the plane",
                "icon": "🧑‍✈️"
              },
              {
                "v": "2",
                "label": "On the ground",
                "icon": "🖥️"
              },
              {
                "v": "3",
                "label": "On the wing",
                "icon": "🪂"
              }
            ]
          },
          "fact": "The Predator crew fly it from the ground. They watch screens a long way away.",
          "talk": "Would you like to fly inside a plane, or from the ground?"
        },
        {
          "id": "tornado",
          "name": "Tornado",
          "art": "jet",
          "body": "#7d8a80",
          "wing": "#7d8a80",
          "image": "",
          "look": "Find the Tornado. Its wings can move!",
          "task": {
            "type": "choice",
            "q": "The Tornado's wings can move. Which way are they for flying fast?",
            "answer": "1",
            "options": [
              {
                "v": "1",
                "label": "Swept back",
                "icon": "wing:swept"
              },
              {
                "v": "2",
                "label": "Straight out",
                "icon": "wing:straight"
              }
            ]
          },
          "fact": "The wings swing back to fly fast, and forwards to take off and land.",
          "talk": "Hold your arms out like wings. Now sweep them back. Zoom!",
          "wingShape": "swept"
        },
        {
          "id": "typhoon",
          "name": "Typhoon",
          "art": "jetCanard",
          "body": "#8e979e",
          "wing": "#8e979e",
          "image": "",
          "look": "Find the Typhoon. Look for tiny wings near its nose.",
          "task": {
            "type": "choice",
            "q": "Where are the Typhoon's tiny wings?",
            "answer": "1",
            "options": [
              {
                "v": "1",
                "label": "At the front",
                "icon": "⬅️"
              },
              {
                "v": "2",
                "label": "On the tail",
                "icon": "➡️"
              },
              {
                "v": "3",
                "label": "No tiny wings",
                "icon": "❌"
              }
            ]
          },
          "fact": "The Typhoon has small wings near the front. They help it twist and turn quickly.",
          "talk": "Which plane in this hangar do you like best? Why?"
        }
      ]
    }
  ]
};
