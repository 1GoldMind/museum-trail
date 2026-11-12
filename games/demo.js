window.GAME = {
  "id": "demo",
  "title": "Bolt's Big Adventure",
  "museum": "The Example Museum",
  "lang": "en-GB",
  "brand": {
    "header": "THE EXAMPLE MUSEUM",
    "sub": "FAMILY TRAIL",
    "logo": ""
  },
  "guide": {
    "name": "Bolt",
    "character": "robot",
    "image": ""
  },
  "theme": {
    "primary": "#3b1d5e",
    "accent": "#5ee0b5",
    "link": "#6a3fb5",
    "background": "#f3effa",
    "font": "rounded",
    "textSize": "medium",
    "spacing": "normal",
    "corners": "round"
  },
  "words": {
    "zone": "gallery",
    "zones": "galleries",
    "stop": "exhibit",
    "stops": "exhibits"
  },
  "levels": [
    {
      "id": "junior",
      "label": "Little Explorers",
      "emoji": "🐣",
      "stopsToPass": 1,
      "showAnswerAfter": 2,
      "readAloud": true,
      "desc": "Count, spot and find. Read aloud for ages 4–8.",
      "minutes": "30",
      "teaches": "Looking closely, counting",
      "price": "Free",
      "paid": false
    },
    {
      "id": "explorer",
      "label": "The Battery Mystery",
      "emoji": "🕵️",
      "stopsToPass": 2,
      "showAnswerAfter": 3,
      "readAloud": false,
      "desc": "Crack codes and collect clues to find out who switched off Bolt. Ages 9–14.",
      "minutes": "45",
      "teaches": "Observation, reading labels, reasoning",
      "price": "£3",
      "prices": {
        "1": "£3",
        "2": "£5",
        "3": "£6"
      },
      "paid": true,
      "mystery": {
        "q": "Who switched off Bolt's battery?",
        "options": [
          "🦖 The T. rex",
          "🧑‍🚀 The astronaut",
          "🐙 The octopus"
        ],
        "answer": 3
      }
    }
  ],
  "text": {
    "intro": [
      "Beep boop! I am Bolt the robot.",
      "I want to learn everything in this museum.",
      "Will you help me explore?"
    ],
    "introChips": [
      "Demo trail",
      "Bring a grown-up"
    ],
    "introGrown": "This is a demo trail for a made-up museum. It shows every game type. Choose an age group, then visit the galleries in order.",
    "certTitle": "Official museum explorer",
    "certLine": "explored the whole museum with Bolt.",
    "certThanks": "Beep boop! Thank you"
  },
  "zones": [
    {
      "id": "dino",
      "label": "Dinosaur Hall",
      "title": "Giants of long ago",
      "era": "Millions of years ago",
      "sign": "leaf",
      "story": [
        "Stomp, stomp! Dinosaurs lived here long, long ago.",
        "Some were as tall as a house.",
        "Let's find them!"
      ],
      "grown": "Start at the big skeleton in the middle of the hall.",
      "stops": [
        {
          "id": "trex",
          "name": "T. rex",
          "emoji": "🦖",
          "image": "",
          "look": "Find the T. rex skeleton. Look at its tiny arms!",
          "fact": "T. rex had only <strong>two fingers</strong> on each tiny hand.",
          "talk": "Why do you think its arms were so small?",
          "tasks": {
            "junior": {
              "type": "choice",
              "q": "How many fingers are on each hand?",
              "options": [
                {
                  "label": "2",
                  "icon": "2"
                },
                {
                  "label": "3",
                  "icon": "3"
                },
                {
                  "label": "5",
                  "icon": "5"
                }
              ],
              "answer": 1
            },
            "explorer": {
              "type": "estimate",
              "q": "How long was a big T. rex, nose to tail?",
              "min": 2,
              "max": 30,
              "step": 1,
              "answer": 12,
              "tolerance": 2,
              "unit": "metres",
              "fact": "A big T. rex was about <strong>12 metres</strong> long. That is longer than a bus."
            }
          }
        },
        {
          "id": "trike",
          "name": "Triceratops",
          "emoji": "🦴",
          "image": "",
          "look": "Find the Triceratops skull. Look at its head.",
          "fact": "Triceratops means <strong>three-horned face</strong>.",
          "talk": "What would you use three horns for?",
          "tasks": {
            "junior": {
              "type": "count",
              "q": "Count the horns on its head. How many?",
              "answer": 3,
              "max": 10
            },
            "explorer": {
              "type": "spot",
              "q": "Our fact card has 2 mistakes. Check the real skull. Tap the mistakes.",
              "options": [
                {
                  "label": "It has 5 horns",
                  "icon": "5",
                  "diff": true
                },
                {
                  "label": "It has a bony frill",
                  "icon": "🛡️"
                },
                {
                  "label": "It has wings",
                  "icon": "🪽",
                  "diff": true
                }
              ]
            }
          }
        },
        {
          "id": "fossils",
          "name": "Fossil wall",
          "emoji": "🐚",
          "image": "",
          "look": "Find the wall of fossils.",
          "fact": "A <strong>fossil</strong> is the shape of a living thing, kept in rock for millions of years.",
          "talk": "Which fossil is your favourite?",
          "tasks": {
            "junior": {
              "type": "spy",
              "q": "What can you find? Tap each one you see. Find 3!",
              "need": 3,
              "options": [
                {
                  "label": "A shell",
                  "icon": "🐚"
                },
                {
                  "label": "A leaf",
                  "icon": "🍃"
                },
                {
                  "label": "A bone",
                  "icon": "🦴"
                },
                {
                  "label": "A footprint",
                  "icon": "🐾"
                }
              ]
            },
            "explorer": {
              "type": "order",
              "q": "Put these in order. Start with the oldest.",
              "items": [
                "The first dinosaurs",
                "Woolly mammoths",
                "The pyramids of Egypt",
                "The first smartphone"
              ],
              "fact": "Dinosaurs came <strong>millions of years</strong> before mammoths, and long before any people."
            }
          }
        }
      ],
      "clue": "The culprit has no bones.",
      "reward": {
        "part": "The shape of your badge",
        "unlock": [
          "shape"
        ]
      }
    },
    {
      "id": "space",
      "label": "Space Gallery",
      "title": "Up among the stars",
      "era": "Today and tomorrow",
      "sign": "rocket",
      "story": [
        "3, 2, 1... lift-off!",
        "People have flown to the Moon.",
        "Robots like me have gone even further!"
      ],
      "grown": "The planets model hangs from the ceiling, so look up.",
      "stops": [
        {
          "id": "suit",
          "name": "Space suit",
          "emoji": "🧑‍🚀",
          "image": "",
          "look": "Find the space suit.",
          "fact": "A space suit carries <strong>air to breathe</strong>. There is no air in space.",
          "talk": "What would you take to the Moon?",
          "tasks": {
            "junior": {
              "type": "silhouette",
              "q": "Whose shadow is this? Find it in the gallery!",
              "options": [
                {
                  "label": "Space suit",
                  "icon": "🧑‍🚀"
                },
                {
                  "label": "Rocket",
                  "icon": "🚀"
                },
                {
                  "label": "Planets",
                  "icon": "🪐"
                }
              ],
              "answer": 1
            },
            "explorer": {
              "type": "code",
              "q": "In which year did people first walk on the Moon?",
              "answer": "1969",
              "hint": "It starts with 196.",
              "fact": "People first walked on the Moon in <strong>1969</strong>."
            }
          }
        },
        {
          "id": "planets",
          "name": "Planets model",
          "emoji": "🪐",
          "image": "",
          "look": "Find the model of the Sun and its planets.",
          "fact": "<strong>Eight planets</strong> go round our Sun. Earth is the third one.",
          "talk": "Which planet would you visit?",
          "tasks": {
            "junior": {
              "type": "count",
              "q": "Count the planets going round the Sun. How many?",
              "answer": 8,
              "max": 12
            },
            "explorer": {
              "type": "match",
              "q": "Match each planet to its clue.",
              "pairs": [
                [
                  "Mars",
                  "The red planet"
                ],
                [
                  "Saturn",
                  "Has bright rings"
                ],
                [
                  "Jupiter",
                  "The biggest planet"
                ],
                [
                  "Earth",
                  "Our home"
                ]
              ]
            }
          }
        },
        {
          "id": "rocket",
          "name": "Rocket",
          "emoji": "🚀",
          "image": "",
          "look": "Find the tall rocket.",
          "fact": "Rockets push fire <strong>down</strong>. That pushes the rocket <strong>up</strong>!",
          "talk": "Can you count down from 10 and blast off?",
          "tasks": {
            "junior": {
              "type": "truefalse",
              "q": "True or false? The fire comes out of the TOP of the rocket. Go and look!",
              "answer": false
            },
            "explorer": {
              "type": "padlock",
              "q": "Code breaker! Find each number in this gallery to open the lock.",
              "clues": [
                [
                  "Planets in the model",
                  "8"
                ],
                [
                  "Minutes for sunlight to reach Earth (read the label)",
                  "8"
                ],
                [
                  "People who first walked on the Moon in 1969",
                  "2"
                ]
              ],
              "fact": "The code was <strong>8 8 2</strong>. You found every number by looking closely."
            }
          }
        }
      ],
      "clue": "The culprit has never been to space.",
      "reward": {
        "part": "Colours for your badge",
        "unlock": [
          "colour"
        ]
      }
    },
    {
      "id": "ocean",
      "label": "Ocean Room",
      "title": "Under the sea",
      "era": "Right now",
      "sign": "fish",
      "story": [
        "Splish, splash! Welcome to the sea.",
        "Careful, I am a robot. I must not get wet!",
        "Help me look from here."
      ],
      "grown": "The whale model is very long. Walk its whole length together.",
      "stops": [
        {
          "id": "octopus",
          "name": "Octopus",
          "emoji": "🐙",
          "image": "",
          "look": "Find the octopus.",
          "fact": "An octopus has <strong>eight arms</strong> and <strong>three hearts</strong>!",
          "talk": "What would you do with eight arms?",
          "tasks": {
            "junior": {
              "type": "count",
              "q": "Count its arms. How many?",
              "answer": 8,
              "max": 12
            },
            "explorer": {
              "type": "choice",
              "q": "How many hearts does an octopus have?",
              "options": [
                {
                  "label": "One",
                  "icon": "1"
                },
                {
                  "label": "Two",
                  "icon": "2"
                },
                {
                  "label": "Three",
                  "icon": "3"
                }
              ],
              "answer": 3
            }
          }
        },
        {
          "id": "whale",
          "name": "Blue whale",
          "emoji": "🐋",
          "image": "",
          "look": "Find the blue whale model.",
          "fact": "The blue whale is the <strong>biggest animal</strong> that has ever lived.",
          "talk": "How many steps long is the whale?",
          "tasks": {
            "junior": {
              "type": "jigsaw",
              "q": "Find each part on the real whale to finish the puzzle.",
              "items": [
                "Find its tail",
                "Find its eye",
                "Find its flipper",
                "Find its mouth"
              ]
            },
            "explorer": {
              "type": "poll",
              "q": "Would you rather...",
              "options": [
                {
                  "label": "Swim beside a blue whale",
                  "icon": "🐋"
                },
                {
                  "label": "Explore a coral reef",
                  "icon": "🪸"
                }
              ],
              "fact": "A blue whale can grow to about <strong>30 metres</strong>. A coral reef is home to thousands of animals."
            }
          }
        },
        {
          "id": "reef",
          "name": "Coral reef",
          "emoji": "🪸",
          "image": "",
          "look": "Find the coral reef.",
          "fact": "Coral looks like a plant or a rock. It is really made by tiny <strong>animals</strong>.",
          "talk": "How many colours can you see?",
          "tasks": {
            "junior": {
              "type": "spy",
              "q": "Find these colours on the reef. Find 3!",
              "need": 3,
              "options": [
                {
                  "label": "Red",
                  "icon": "🔴"
                },
                {
                  "label": "Yellow",
                  "icon": "🟡"
                },
                {
                  "label": "Blue",
                  "icon": "🔵"
                },
                {
                  "label": "Stripes",
                  "icon": "🦓"
                }
              ]
            },
            "explorer": {
              "type": "photo",
              "q": "Photo mission: take a photo of the most colourful thing in this room."
            }
          }
        }
      ],
      "clue": "The culprit has eight arms.",
      "reward": {
        "part": "A pattern and picture for your badge",
        "unlock": [
          "pattern",
          "sticker"
        ]
      }
    }
  ],
  "finale": {
    "type": "badge",
    "label": "At the exit",
    "title": "Design your explorer badge",
    "story": [
      "Beep boop! We explored everything.",
      "Now design your own explorer badge!"
    ],
    "grown": ""
  },
  "legal": "Demo trail for a made-up museum. Bolt is a made-up character. Replace all content before use. Children must stay with their grown-up.",
  "family": true,
  "map": {
    "image": "images/demo-map.svg",
    "pins": {
      "dino": {
        "x": 22,
        "y": 40
      },
      "space": {
        "x": 54,
        "y": 20
      },
      "ocean": {
        "x": 81,
        "y": 70
      }
    }
  },
  "pay": {
    "provider": "demo",
    "api": "",
    "shop": ""
  },
  "ranks": [
    [
      0,
      "New Explorer"
    ],
    [
      3,
      "Junior Explorer"
    ],
    [
      6,
      "Senior Explorer"
    ],
    [
      9,
      "Chief Explorer"
    ]
  ]
};
