window.GAME = {
  "id": "raf-london",
  "title": "Percy's Flying Mission",
  "museum": "RAF Museum London",
  "ages": "4–8",
  "lang": "en-GB",
  "brand": {
    "header": "RAF MUSEUM",
    "sub": "SECRET MISSIONS",
    "logo": ""
  },
  "guide": {
    "name": "Percy",
    "character": "penguin",
    "image": ""
  },
  "theme": {
    "primary": "#071d35",
    "accent": "#ffd36d",
    "link": "#145d94",
    "background": "#eaf3f7",
    "font": "rounded"
  },
  "words": {
    "zone": "hangar",
    "zones": "hangars",
    "stop": "aircraft",
    "stops": "aircraft"
  },
  "levels": [
    {
      "id": "junior",
      "label": "Ages 4–8",
      "emoji": "🐣",
      "stopsToPass": 1,
      "showAnswerAfter": 2,
      "readAloud": true
    }
  ],
  "text": {
    "intro": [
      "Hello! I am Percy the penguin.",
      "Penguins can't fly... but I really, really want to!",
      "Brrr! First I need my flying kit. Will you help me earn it?"
    ],
    "introChips": [
      "About 1 hour, to test",
      "Bring a grown-up"
    ],
    "introGrown": "Go through the hangars in order, 1 to 6. In each hangar, find at least one aircraft to win a stamp. Find all three for a gold stamp. Please help with reading and stay behind the barriers.",
    "namePrompt": "What is your name, pilot?",
    "mapHelp": "Visit the hangars in order. Find at least one aircraft in each hangar to get a stamp.",
    "mapDone": "You got a stamp from every hangar! Now let's design my plane.",
    "pickStop": "Which aircraft will you find? Find one to get a stamp. Find all three for a gold stamp!",
    "stampMore": "Can you find the other aircraft here too? Or let's go to the next hangar!",
    "stampGold": "You found all the aircraft here. Amazing!",
    "certTitle": "Official Flying Mission crew",
    "certLine": "helped Percy learn to fly through the RAF story.",
    "certThanks": "Thank you! Now I can fly",
    "collection": "My hangar"
  },
  "zones": [
    {
      "id": "h1",
      "label": "Hangar 1",
      "title": "The RAF story begins",
      "era": "1918 to 2018",
      "sign": "sun",
      "story": [
        "We are in Hangar 1. This is where the RAF story starts.",
        "The RAF began in 1918. That is more than 100 years ago!",
        "Let's find three amazing aircraft."
      ],
      "grown": "Hangar 1 shows RAF Stories, the first 100 years. The Spitfire may be displayed high up, so look up together.",
      "stops": [
        {
          "id": "seaking",
          "name": "Sea King",
          "art": "helicopter",
          "body": "#f5c518",
          "wing": "#1f3b57",
          "image": "",
          "look": "Find the big yellow rescue helicopter.",
          "fact": "The rotor blades spin very fast. They lift the helicopter straight up. Sea Kings rescued people from the sea and the mountains.",
          "talk": "Who do you think the rescue crew helped?",
          "tasks": {
            "junior": {
              "type": "hotspot",
              "q": "Tap the part that spins round to lift the helicopter up.",
              "options": [
                {
                  "label": "Top blades",
                  "x": 50.0,
                  "y": 17.0
                },
                {
                  "label": "Body",
                  "x": 52.0,
                  "y": 54.0
                },
                {
                  "label": "Tail",
                  "x": 16.0,
                  "y": 46.0
                }
              ],
              "answer": 1
            }
          }
        },
        {
          "id": "spitfire5",
          "name": "Spitfire",
          "art": "fighter",
          "body": "#6f7f5f",
          "wing": "#6f7f5f",
          "image": "",
          "look": "Find the Spitfire. You may need to look up!",
          "fact": "The Spitfire's curved wings are famous all over the world.",
          "talk": "Can you draw the wing shape in the air with your finger?",
          "tasks": {
            "junior": {
              "type": "choice",
              "q": "What shape are the Spitfire's wings?",
              "options": [
                {
                  "label": "Curved",
                  "icon": "wing:curved"
                },
                {
                  "label": "Triangle",
                  "icon": "wing:delta"
                },
                {
                  "label": "Straight",
                  "icon": "wing:straight"
                }
              ],
              "answer": 1
            }
          },
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
          "fact": "The Sunderland is a flying boat. It took off and landed on water!",
          "talk": "Penguins love water too! Would you like a plane that lands on water?",
          "tasks": {
            "junior": {
              "type": "jigsaw",
              "q": "Find each part on the real Sunderland to finish the puzzle.",
              "items": [
                "Find the boat-shaped bottom",
                "Find a propeller",
                "Find a window",
                "Find the tail"
              ]
            }
          }
        }
      ],
      "reward": {
        "outfit": "scarf",
        "outfitLabel": "A warm scarf",
        "outfitWhy": "It is cold up in the sky!",
        "part": "The body of your plane",
        "unlock": [
          "shape"
        ]
      }
    },
    {
      "id": "h2",
      "label": "Hangar 2",
      "title": "The first war planes",
      "era": "1914 to 1918",
      "sign": "cloud",
      "story": [
        "Brrr! The first planes were cold to fly.",
        "They were made of wood and cloth. Pilots sat in the open air, in the wind.",
        "Just like a penguin on the ice!"
      ],
      "grown": "Hangar 2 shows the First World War in the Air. Some aircraft hang from the ceiling.",
      "stops": [
        {
          "id": "se5a",
          "name": "SE5a",
          "art": "biplane",
          "body": "#7a8a5c",
          "wing": "#c9b27c",
          "image": "",
          "look": "Find the SE5a. It has wings on top of wings.",
          "fact": "A plane with two sets of wings is called a biplane. \"Bi\" means two!",
          "talk": "The pilot sat outside in the wind. How do you think that felt?",
          "tasks": {
            "junior": {
              "type": "choice",
              "q": "How many wings are stacked up?",
              "options": [
                {
                  "label": "1",
                  "icon": "stack:1"
                },
                {
                  "label": "2",
                  "icon": "stack:2"
                },
                {
                  "label": "3",
                  "icon": "stack:3"
                }
              ],
              "answer": 2
            }
          }
        },
        {
          "id": "camel",
          "name": "Sopwith Camel",
          "art": "biplane",
          "body": "#8a6a3c",
          "wing": "#b89a62",
          "image": "",
          "look": "Find the Sopwith Camel. It may be hanging up high!",
          "fact": "It is called the Sopwith Camel. The bump in front of the pilot looks a bit like a camel's hump!",
          "talk": "If you named a plane after an animal, which animal would you pick?",
          "tasks": {
            "junior": {
              "type": "choice",
              "q": "This plane is named after an animal. Which one?",
              "options": [
                {
                  "label": "Camel",
                  "icon": "🐪"
                },
                {
                  "label": "Elephant",
                  "icon": "🐘"
                },
                {
                  "label": "Penguin",
                  "icon": "🐧"
                }
              ],
              "answer": 1
            }
          }
        },
        {
          "id": "triplane",
          "name": "Sopwith Triplane",
          "art": "triplane",
          "body": "#7f7350",
          "wing": "#cdb98a",
          "image": "",
          "look": "Find the Sopwith Triplane. Count its wings carefully!",
          "fact": "Three sets of wings! This is called a triplane. \"Tri\" means three.",
          "talk": "Can you find a plane with two wings, and one with three?",
          "tasks": {
            "junior": {
              "type": "truefalse",
              "q": "True or false? The Triplane has 2 sets of wings. Go and count!",
              "answer": false
            }
          }
        }
      ],
      "reward": {
        "outfit": "goggles",
        "outfitLabel": "A flying helmet and goggles",
        "outfitWhy": "Early pilots sat in the open air. Goggles kept the wind out of their eyes.",
        "part": "Paint for your plane",
        "unlock": [
          "colour"
        ]
      }
    },
    {
      "id": "h34",
      "label": "Hangars 3 and 4",
      "title": "Faster and higher",
      "era": "1918 to 1980",
      "sign": "rainbow",
      "story": [
        "Whoosh! Planes got faster and faster.",
        "New pilots had to learn how to fly.",
        "And people invented helicopters and jets!"
      ],
      "grown": "Hangars 3 and 4 are one big space, separated by pillars. Look for the Harvard, the Hoverfly and the Phantom.",
      "stops": [
        {
          "id": "harvard",
          "name": "Harvard",
          "art": "trainer",
          "body": "#f2b632",
          "wing": "#f2b632",
          "image": "",
          "look": "Find the Harvard. Learner pilots flew this plane.",
          "fact": "The learner sat in one seat. The teacher sat in the other seat.",
          "talk": "What would you like to learn if you were a pilot?",
          "tasks": {
            "junior": {
              "type": "choice",
              "q": "Learner pilots flew with a teacher. How many seats does it have?",
              "options": [
                {
                  "label": "1 seat",
                  "icon": "💺"
                },
                {
                  "label": "2 seats",
                  "icon": "💺💺"
                },
                {
                  "label": "3 seats",
                  "icon": "💺💺💺"
                }
              ],
              "answer": 2
            }
          },
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
          "fact": "The Hoverfly was one of the first helicopters the RAF used.",
          "talk": "Is it bigger or smaller than the Sea King in Hangar 1?",
          "tasks": {
            "junior": {
              "type": "choice",
              "q": "Count the big blades on top. How many?",
              "options": [
                {
                  "label": "2",
                  "icon": "blades:2"
                },
                {
                  "label": "3",
                  "icon": "blades:3"
                },
                {
                  "label": "4",
                  "icon": "blades:4"
                }
              ],
              "answer": 2
            }
          }
        },
        {
          "id": "phantom",
          "name": "Phantom",
          "art": "jet",
          "body": "#7c8790",
          "wing": "#7c8790",
          "image": "",
          "look": "Find the Phantom. It is a big, grey jet.",
          "fact": "Jet engines push hot air out of the back, very fast. Whoosh!",
          "talk": "Can you make a jet engine noise?",
          "tasks": {
            "junior": {
              "type": "choice",
              "q": "What makes the Phantom go?",
              "options": [
                {
                  "label": "Propellers",
                  "icon": "🌀"
                },
                {
                  "label": "Jet engines",
                  "icon": "🔥"
                },
                {
                  "label": "Pedals",
                  "icon": "🚲"
                }
              ],
              "answer": 2
            }
          },
          "wingShape": "swept"
        }
      ],
      "reward": {
        "outfit": "jacket",
        "outfitLabel": "A flying jacket",
        "outfitWhy": "It keeps a pilot warm high up, where the air is freezing.",
        "part": "An engine for your plane",
        "unlock": [
          "trail"
        ]
      }
    },
    {
      "id": "h5",
      "label": "Hangar 5",
      "title": "The Second World War",
      "era": "1939 to 1945",
      "sign": "moon",
      "story": [
        "This is the Bomber Hall.",
        "Here are big, heavy planes from the Second World War.",
        "Many of them flew at night, in the dark."
      ],
      "grown": "Hangar 5 is the Bomber Hall. The Lancaster 'S for Sugar' is the star. The Komet is very small, so look carefully.",
      "stops": [
        {
          "id": "lancaster",
          "name": "Lancaster",
          "art": "bomber",
          "body": "#2f3b2e",
          "wing": "#2f3b2e",
          "image": "",
          "look": "Find the very big Lancaster. Its name is S for Sugar.",
          "fact": "The Lancaster has four engines. Each one turns a propeller. Big planes need lots of power!",
          "talk": "Why do you think a big plane needs so many engines?",
          "tasks": {
            "junior": {
              "type": "choice",
              "q": "Count the propellers on the wings. How many?",
              "options": [
                {
                  "label": "2",
                  "icon": "props:2"
                },
                {
                  "label": "4",
                  "icon": "props:4"
                },
                {
                  "label": "6",
                  "icon": "props:6"
                }
              ],
              "answer": 2
            }
          }
        },
        {
          "id": "mustang",
          "name": "Mustang",
          "art": "fighter",
          "body": "#c3c9cf",
          "wing": "#c3c9cf",
          "image": "",
          "look": "Find the Mustang. It is a shiny fighter plane.",
          "fact": "The Mustang's propeller has four blades. They spin round to pull the plane through the air.",
          "talk": "A mustang is a kind of horse. Why do you think they chose that name?",
          "tasks": {
            "junior": {
              "type": "silhouette",
              "q": "Whose shadow is this? Find it in the hangar!",
              "options": [
                {
                  "label": "Lancaster",
                  "icon": "1"
                },
                {
                  "label": "Mustang",
                  "icon": "2"
                },
                {
                  "label": "Komet",
                  "icon": "3"
                }
              ],
              "answer": 2
            }
          },
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
          "fact": "The Komet had a rocket engine. It was tiny, but very, very fast!",
          "talk": "Is the Komet bigger or smaller than the Lancaster?",
          "tasks": {
            "junior": {
              "type": "choice",
              "q": "The Komet was super fast. What made it go?",
              "options": [
                {
                  "label": "A rocket",
                  "icon": "🚀"
                },
                {
                  "label": "Pedals",
                  "icon": "🚲"
                },
                {
                  "label": "A sail",
                  "icon": "⛵"
                }
              ],
              "answer": 1
            }
          }
        }
      ],
      "reward": {
        "outfit": "map",
        "outfitLabel": "A map and compass",
        "outfitWhy": "Navigators used maps to find the way in the dark.",
        "part": "Markings for your plane",
        "unlock": [
          "pattern",
          "sticker"
        ]
      }
    },
    {
      "id": "h6",
      "label": "Hangar 6",
      "title": "Modern times",
      "era": "1980 to today",
      "sign": "star",
      "story": [
        "Beep beep! Now we are in modern times.",
        "Some planes here can change shape.",
        "One has no pilot inside at all!"
      ],
      "grown": "Hangar 6 is The RAF in an Age of Uncertainty, 1980 to today. Some aircraft are displayed as if flying.",
      "stops": [
        {
          "id": "predator",
          "name": "Predator",
          "art": "drone",
          "body": "#c3cad1",
          "wing": "#a9b2ba",
          "image": "",
          "look": "Find the Predator. It is long and grey, with no windows at the front.",
          "fact": "The Predator crew fly it from the ground. They watch screens a long way away.",
          "talk": "Would you like to fly inside a plane, or from the ground?",
          "tasks": {
            "junior": {
              "type": "choice",
              "q": "Where is the pilot of the Predator?",
              "options": [
                {
                  "label": "Inside the plane",
                  "icon": "🧑‍✈️"
                },
                {
                  "label": "On the ground",
                  "icon": "🖥️"
                },
                {
                  "label": "On the wing",
                  "icon": "🪂"
                }
              ],
              "answer": 2
            }
          }
        },
        {
          "id": "tornado",
          "name": "Tornado",
          "art": "jet",
          "body": "#7d8a80",
          "wing": "#7d8a80",
          "image": "",
          "look": "Find the Tornado. Its wings can move!",
          "fact": "The wings swing back to fly fast, and forwards to take off and land.",
          "talk": "Hold your arms out like wings. Now sweep them back. Zoom!",
          "tasks": {
            "junior": {
              "type": "choice",
              "q": "The Tornado's wings can move. Which way are they for flying fast?",
              "options": [
                {
                  "label": "Swept back",
                  "icon": "wing:swept"
                },
                {
                  "label": "Straight out",
                  "icon": "wing:straight"
                }
              ],
              "answer": 1
            }
          },
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
          "fact": "The Typhoon has small wings near the front. They help it twist and turn quickly.",
          "talk": "Which plane in this hangar do you like best? Why?",
          "tasks": {
            "junior": {
              "type": "choice",
              "q": "Where are the Typhoon's tiny wings?",
              "options": [
                {
                  "label": "At the front",
                  "icon": "⬅️"
                },
                {
                  "label": "On the tail",
                  "icon": "➡️"
                },
                {
                  "label": "No tiny wings",
                  "icon": "❌"
                }
              ],
              "answer": 1
            }
          }
        }
      ],
      "reward": {
        "outfit": "wings",
        "outfitLabel": "A pilot's wings badge",
        "outfitWhy": "Pilots earn their wings when they finish their training.",
        "part": "Nose art and a lucky number",
        "unlock": [
          "nose"
        ]
      }
    }
  ],
  "finale": {
    "type": "plane",
    "label": "Back in Hangar 1",
    "title": "Design Percy's plane",
    "story": [
      "I can't fly with my flippers...",
      "...but I CAN fly in a plane!",
      "Will you design a plane for me?"
    ],
    "grown": "Hangar 1 also has a real \"Design your own plane\" activity in First to the Future."
  },
  "legal": "Prototype for RAF Museum London, ages 4–8. Percy is a made-up character. Drawings are simple and not accurate. Aircraft locations were checked on public sources in November 2026; route, sign places, viewing points and all facts must be checked by Museum staff before use. Do not touch the aircraft or climb barriers. Children must stay with their grown-up.",
  "map": {
    "image": "images/raf-london-map.svg",
    "pins": {
      "h1": {
        "x": 19,
        "y": 60
      },
      "h2": {
        "x": 19,
        "y": 19
      },
      "h34": {
        "x": 52,
        "y": 24
      },
      "h5": {
        "x": 83,
        "y": 24
      },
      "h6": {
        "x": 80,
        "y": 66
      }
    }
  },
  "ranks": [
    [
      0,
      "Cadet"
    ],
    [
      2,
      "Pilot Officer"
    ],
    [
      4,
      "Flying Officer"
    ],
    [
      7,
      "Flight Lieutenant"
    ],
    [
      10,
      "Squadron Leader"
    ],
    [
      13,
      "Wing Commander"
    ],
    [
      15,
      "Group Captain"
    ]
  ]
};
