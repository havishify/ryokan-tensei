import playMusic, { stopMusic } from "@/audio/music";
import { playSoundBodyFall, playSoundDoor, playSoundIce, playSoundSitting, playSoundSummon } from "@/audio/sound";
import { ScenarioGroupProps } from "@/types";
import sleep from "@/utils/sleep";
import { changeCinematicimg, cinematicFadein, cinematicFadeout, dm } from "@/main";

const scenarioIntro: ScenarioGroupProps[] = [
  {
    group: [
      {
        type: "narrator",
        str: [
          "당신은 어느 ㅈ소기업에 다니는 직장인.",
          "산처럼 쌓여있는 업무를 처리해야 해서",
          "야근을 하다가 밤 12시가 넘었다는 사실을 깨닫는다.",
        ]
      },
      {
        type: "narrator",
        str: [
          "동시에 흐르는 코피를 자연스럽게 휴지로 막으면서",
          "자리에서 일어나 퇴근 준비를 시작하는 당신."
        ]
      },
    ],
  },

  {
    group: [
      {
        type: "narrator",
        str: "허나 그 순간..."
      },
      {
        type: "natural",
        str: "털썩ㅡ!",
        callback: async () => playSoundBodyFall()
      },
      {
        type: "narrator",
        str: [
          "아무도 없는 어두운 사무실에서 쓰러지는 당신.",
          "분명 과로가 원인일 것이다."
        ]
      },
      {
        type: "narrator",
        str: [
          "동시에 휴지가 떨어지면서",
          "코피가 사무실 바닥에 흐르기 시작한다."
        ]
      }
    ],
  },

  {
    group: [
      {
        type: "narrator",
        str: "몸이 움직이지 않는 당신.",
      },
      {
        type: "narrator",
        str: [
          "왠지 모르겠지만 당신은 몸이 점점 편해지기 시작한다.",
          "차가운 공기와 바닥이 느껴지지 않고 무감각해진다."
        ],
      },
      {
        type: "narrator",
        str: "그리고 서서히 눈이 감기는 당신..."
      },
      {
        type: "narrator",
        str: "마치 어머니의 품에 안기는 것처럼 편안해진다."
      }
    ],
    callback: async () => {
      cinematicFadein();

      await sleep(1250);

      changeCinematicimg("/image/none.webp");

      await sleep(1250);

      cinematicFadeout();

      if (dm) dm.innerHTML = "";
    },
  },

  {
    group: [
      {
        type: "narrator",
        str: "당신은 정신을 차린다."
      },
      {
        type: "narrator",
        str: [
          "정신을 차리자 마자 신기하게도,",
          "당신은 오랜 시간이 지났다는 것을 알 수 있었다."
        ]
      },
    ]
  },
  
  {
    group: [
      {
        type: "narrator",
        str: [
          "또한, 더 이상 육체의 감각이 느껴지지 않았다.",
          "오로지 정신만 존재하는 이 느낌.",
          "당신은 드디어 죽었다고 생각하게 된다.",
        ]
      },
      {
        type: "narrator",
        str: [
          "하지만 뭔가 이상했다.",
          "어디선가 들려오는 바람소리...",
          "무언가 말로 형언할 수 없는 이 감각."
        ]
      }
    ]
  },

  {
    group: [
      {
        type: "narrator",
        str: [
          "오랫동안 고민해봤지만, 당신은 알 수 없었다.",
          "이 고통스러운 시간을 벗어날 수 없었다."
        ]
      },
      {
        type: "mind",
        str: "사후세계가 이런 것이었나...",
      },
      {
        type: "narrator",
        str: "라고 생각하는 순간..."
      }
    ],
    callback: async () => {
      cinematicFadein();
      
      stopMusic();

      await sleep(1000);

      playSoundDoor();
      changeCinematicimg("/image/intro/2.webp");

      await sleep(1500);

      cinematicFadeout();

      playMusic("orgol");
    }
  },

  {
    group: [
      {
        type: "speech",
        str: "아무도 없네...",
        voice: new Audio("/audio/voice/intro/1.mp3")
      },
      {
        type: "narrator",
        str: [
          "그녀의 목소리와 함께, 당신의 눈앞에 끝없이 펼쳐졌던",
          "어둠이 사라지며, 그녀의 모습이 드러난다."
        ]
      },
      {
        type: "narrator",
        str: [
          "당신이 만화, 애니를 통해 봤었던",
          "'미소녀'라고 함은 바로 이 여성을 가리키는 것이 분명했다."
        ]
      }
    ]
  },

  {
    group: [
      {
        type: "narrator",
        str: "새하얀 머리카락과 피부, 푸른 눈동자, 매우 아름다운 얼굴."
      },
      {
        type: "mind",
        str: [
          "이런 사람이 실제로 존재하긴 하는구나.",
          "그런데 너무 말랐네..."
        ]
      },
      {
        type: "narrator",
        str: [
          "당신은 아름다운 외모에 놀라지만",
          "그녀의 '가냘픔'때문에 약간의 아쉬움을 느낀다..."
        ]
      }
    ]
  },

  {
    group: [
      {
        type: "speech",
        str: [
          "이상해... 이런 곳에 여관이라니.",
          "분명 저번까지만 해도..."
        ],
        voice: new Audio("/audio/voice/intro/2.mp3")
      },
      {
        type: "narrator",
        str: [
          "그녀는 당황하면 여관을 둘러보기 시작한다."
        ]
      },
      {
        type: "narrator",
        str: [
          "당신은 자신의 눈으로 그녀를 보는 것이 아닌",
          "마치 게임에서 관전 시점으로 상황을 보는 것 같은",
          "기이한 느낌이 든다."
        ]
      }
    ]
  },

  {
    group: [
      {
        type: "narrator",
        str: [
          "아니, 이 상황 자체가 기이했다.",
        ]
      },
      {
        type: "narrator",
        str: [
          "죽어서 사후세계에 간 줄 알았더니",
          "어느 미소녀와 중세 여관이 보이질 않나..."
        ]
      },
      {
        type: "narrator",
        str: [
          "이내 당신의 마음 속은",
          "이제부터 어떻게 될까라는",
          "미래에 대한 두려움으로 가득차게 된다."
        ]
      }
    ]
  },

  {
    group: [
      {
        type: "narrator",
        str: [
          "하지만 그런 생각들은",
          "당신의 마음 속에서 사라지게 된다.",
        ]
      },
      {
        type: "narrator",
        str: [
          "아름다운 그녀를 보면 볼수록",
          "당신의 마음 속의 불안감이",
          "조금씩 해소된다."
        ]
      },
      {
        type: "narrator",
        str: [
          "말로 형언할 수 없는 기분.",
          "당신은 약간이나마 안심한다."
        ]
      },
    ]
  },

  {
    group: [
      {
        type: "narrator",
        str: "아무래도 그녀는 당신이 안보이는듯 하다."
      },
      {
        type: "narrator",
        str: [
          "육체가 없고, 마치 매체에 나오는 영혼같은 느낌.",
          "사물을 통과할 수 있으며 주변 사람에게 보이지 않음.",
          "이 현상을 설명할 수 있는 건 그것 뿐이었다.",
          
        ]
      },
      {
        type: "mind",
        str: "유령..."
      },
      {
        type: "narrator",
        str: "정말로 죽었구나라고 생각하는 당신."
      }
    ],
    callback: async () => {
      playSoundSitting();
      changeCinematicimg("/image/intro/3.webp");
    }
  },

  {
    group: [
      {
        type: "speech",
        str: "조금... 기다려 볼까...",
        voice: new Audio("/audio/voice/intro/3.mp3")
      },
      {
        type: "narrator",
        str: [
          "그녀는 빈 자리에 앉는다.",
          "아무래도 이 여관의 주인을 기다리려는 것처럼 보인다.",
        ]
      },
      {
        type: "narrator",
        str: [
          "한 20분정도 지났을까",
          "여관 주인은 모습을 보이지 않는다.",
          "그럼에도 그녀는 여전히 기다리고 있었다."
        ]
      }
    ]
  },

  {
    group: [
      {
        type: "narrator",
        str: [
          "이런 상황 속에서 당신은 분노하며",
          "마음 속으로 소리지른다."
        ]
      },
      {
        type: "mind",
        str: [
          "여관 주인은 뭐하는거야?",
          "나같으면 물이라도 한잔 줄텐데..."
        ]
      },
      {
        type: "narrator",
        str: [
          "그렇게 마음 속으로 궁시렁대면서",
          "여관 주인을 기다리는 당신.",
          "그 순간..."
        ]
      }
    ],
    callback: async () => {
      stopMusic();
      playSoundSummon();
      changeCinematicimg("/image/intro/4.webp");
    }
  },

  {
    group: [
      {
        type: "narrator",
        str: [
          "그녀가 앉아있던 테이블 위에",
          "물 한컵이 소환된다.",
        ]
      },
      {
        type: "narrator",
        str: [
          "유리 와인잔에 담긴",
          "순수하고 깨끗한 냉수."
        ]
      },
      {
        type: "narrator",
        str: [
          "마법같은 이펙트가 펼쳐지면서 테이블 중앙에",
          "물 한컵이 소환되는 그 장면은",
          "당신과 그녀를 모두 놀라게 만들었다."
        ]
      }
    ]
  },

  {
    group: [
      {
        type: "speech",
        str: "에에...???",
        voice: new Audio("/audio/voice/intro/4.mp3")
      },
      {
        type: "narrator",
        str: [
          "당신 또한 갑자기 나타난",
          "물 한컵을 보고 놀란다."
        ]
      },
      {
        type: "narrator",
        str: "바로 그때..."
      }
    ]
  },

  {
    group: [
      {
        type: "speech",
        str: [
          "마스터",
          "1 포인트를 사용하여 물을 소환하는데 성공했습니다.",
          "남은 포인트는 254포인트 입니다."
        ],
        voice: new Audio("/audio/voice/intro/5.mp3")
      }
    ]
  },

  {
    group: [
      {
        type: "narrator",
        str: "이게 대체 무슨 일인가..."
      },
      {
        type: "narrator",
        str: [
          "여관 주인을 욕하며 물 한잔을 생각하던 당신.",
          "그리고 마법처럼 소환된 물 한잔과",
          "소환이 끝난 직후 들려온 기계 목소리."
        ]
      }
    ]
  },

  {
    group: [
      {
        type: "mind",
        str: "마... 스터? 나?"
      },
      {
        type: "narrator",
        str: [
          "당신은 그 기계 목소리를 듣고 생각한다.",
          "이 상황에서 마스터라니.",
        ]
      },
      {
        type: "mind",
        str: "나 죽은 거 아니었어?"
      }
    ]
  },

  {
    group: [
      {
        type: "speech",
        str: [
          "아닙니다.",
          "마스터는 이 여관의 주인이십니다."
        ],
        voice: new Audio("/audio/voice/intro/6.mp3")
      }
    ],
  },

  {
    group: [
      {
        type: "speech",
        str: [
          "정확히는...",
          "마스터가 곧 여관이고, 여관이 곧 마스터입니다."
        ],
        voice: new Audio("/audio/voice/intro/7.mp3")
      }
    ],
  },

  {
    group: [
      {
        type: "mind",
        str: "하하... 잘못... 들었나?"
      },
      {
        type: "narrator",
        str: [
          "당신은 무슨 소리인지 알아들었지만...",
          "부정하고 싶었다. 사람도 아니고 뭐?",
          "여관?"
        ]
      }
    ]
  },

  {
    group: [
      {
        type: "narrator",
        str: [
          "사실 내심 기대하고 있었던 당신.",
          "아무리 보아도 느껴도 상황 자체가",
          "이세계물의 도입부 같았다."
        ]
      },
      {
        type: "narrator",
        str: [
          '"드디어 나도 고통에서 해방되어"',
          '"이세계 전생이라는 상을 받는구나..."',
          "라고 생각한 당신이었다."
        ]
      },
    ]
  },

  {
    group: [
      {
        type: "mind",
        str: "내 이세계 전생 돌려줘요..."
      },
      {
        type: "narrator",
        str: [
          "눈물이 날리가 없지만",
          "눈물이 흐르는 느낌이 드는 당신..."
        ]
      },
    ],
    callback: async () => {
      playSoundIce();
      changeCinematicimg("/image/intro/5.webp");
    }
  },

  {
    group: [
      {
        type: "narrator",
        str: [
          "그 순간",
          "갑자기 그녀는 벌떡 일어나",
          "마법을 부리더니 얼음으로 이루어진",
          "검을 만들어낸다."
        ]
      },
      {
        type: "narrator",
        str: [
          "이후 그 얼음의 검을 잡고",
          "자세를 취하며 그녀는 말하기 시작한다."
        ]
      }
    ]
  },

  {
    group: [
      {
        type: "speech",
        str: [
          "역시.",
          "요즘 모험가들이 이 근방에서 실종됐던 건",
          "이 장소 때문이었구나."
        ],
        voice: new Audio("/audio/voice/intro/8.mp3")
      }
    ]
  },

  {
    group: [
      {
        type: "speech",
        str: [
          "있잖아. 몇명이나 잡아먹었어?",
          "아직도 배고파?"
        ],
        voice: new Audio("/audio/voice/intro/9.mp3")
      }
    ]
  },

  {
    group: [
      {
        type: "speech",
        str: [
          "너같이 끈질긴 고블린은 처음이야.",
          "저런 고급 환각 마법도 쓸 줄 알고...",
          "역시 너는 그때 죽여야 했어.",
          "빨리 튀어나와."
        ],
        voice: new Audio("/audio/voice/intro/10.mp3")
      }
    ],
    callback: async () => playMusic("heroine1_theme")
  },

  {
    group: [
      {
        type: "mind",
        str: "무슨 소리지?"
      },
      {
        type: "narrator",
        str: [
          "그녀의 말을 들은 당신의 첫 반응이었다.",
          "몇 \"명\"을 잡아먹었냐고?",
          "고블린? 환각 마법?"
        ]
      },
      {
        type: "narrator",
        str: [
          "그녀가 무언가 착각하고 있음이",
          "분명헀다."
        ]
      }
    ]
  },

  {
    group: [
      {
        type: "speech",
        str: [
          "마스터",
          "그녀를 막으셔야 합니다.",
          "이곳, 아니 이 지역 전체를 얼어붙게 만드려 하고 있어요."
        ],
        voice: new Audio("/audio/voice/intro/11.mp3")
      }
    ]
  },

  {
    group: [
      {
        type: "speech",
        str: [
          "그렇게 된다면 마스터는 사망하게 될 것입니다."
        ],
        voice: new Audio("/audio/voice/intro/12.mp3")
      }
    ]
  },

  {
    group: [
      {
        type: "mind",
        str: [
          "이 지역 자체를 얼려버린다고?",
          "아니 그 전에... 또 죽는다고?"
        ]
      },
      {
        type: "narrator",
        str: [
          "당신은 어처구니가 없었다. 갑자기?",
          "무슨 오해가 있는 것이 틀림없었다.",
          "우선 그 전에, 이 상황을 해결해야 했다.",
        ]
      }
    ]
  },

  {
    group: [
      {
        type: "narrator",
        str: [
          `당신은 자신을 "마스터"라고 부르는 기계 목소리에게`,
          "마음 속으로 질문을 던진다."
        ]
      },
      {
        type: "mind",
        str: [
          "그... 나를 마스터라고 부르는 너...!",
          "그녀를 막으려면... 어떻게 해야 해?"
        ]
      }
    ]
  },

  {
    group: [
      {
        type: "speech",
        str: [
          "죽이시면 됩니다, 마스터.",
          "간단하게 그녀의 머리 속에",
          "우동 한 그릇을 소환한다면 한 방에..."
        ],
        voice: new Audio("/audio/voice/intro/13.mp3")
      },
    ]
  },

  {
    group: [
      {
        type: "mind",
        str: [
          "안돼! 그녀에게 어떤 사정이 있을거야.",
          "죽여서는 안돼."
        ]
      }
    ]
  },

  {
    group: [
      {
        type: "speech",
        str: [
          "...그렇다면 그녀가 좋아하는 음식과",
          "마스터의 진심을 담은 메모를 소환하시면 어떨지요?",
        ],
        voice: new Audio("/audio/voice/intro/14.mp3")
      }
    ]
  },

  {
    group: [
      {
        type: "speech",
        str: "물을 소환하셨던 것처럼 시도해보세요.",
        voice: new Audio("/audio/voice/intro/15.mp3")
      }
    ]
  },

  {
    group: [
      {
        type: "narrator",
        str: [
          "일촉즉발의 상황.",
          "음식과 메모를 소환?",
          "당신은 마음 속이 어지러워진다."
        ]
      },
      {
        type: "mind",
        str: "할 수 밖에 없어... 시도는 해봐야지."
      }
    ]
  }
];

export default scenarioIntro;