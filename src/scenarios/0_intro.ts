import playMusic, { stopMusic } from "@/audio/music";
import { playSoundDoor } from "@/audio/sound";
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
          "이제서야 어느정도 정리된 업무를 뒤로 하고",
          "사무실을 나서는 당신."
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
        str: "털썩ㅡ!"
      },
      {
        type: "narrator",
        str: [
          "아무도 없는 어두운 사무실 입구에 쓰러지는 당신.",
          "분명 과로가 원인일 것이다."
        ]
      }
    ],
  },

  {
    group: [
      {
        type: "narrator",
        str: "어서 집에 가고 싶지만, 몸이 움직이지 않는 당신."
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
      }
    ],
    callback: async () => {
      cinematicFadein();

      await sleep(1250);

      changeCinematicimg("/image/none.webp");
      playMusic("wind");

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
          "새하얀 머리카락과 피부, 푸른 눈동자, 졸린 얼굴.",
          "그리고 아름다운 외모. 당신이 만화, 애니를 통해 봤었던",
          "'미소녀'라고 함은 바로 이 여성을 가리키는 것이 분명했다."
        ]
      }
    ],
    callback: async () => {
      changeCinematicimg("/image/intro/3.webp");
    }
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
          "그녀는 자리에 앉으며 작게 말헀다.",
        ]
      },
    ]
  },

  {
    group: [
      {
        type: "narrator",
        str: [
          "당신은 이 상황 자체가 이해가 가지 않는다.",
          "방금 전까지는 아무것도 보이지 않았는데,",
          "문이 열리는 소리가 나면서 눈이 보이는 것은 물론"
        ]
      },
      {
        type: "narrator",
        str: [
          "애초에 시점 자체가 이상했다.",
          "마치 게임에서 관전 모드로 돌아다니는 느낌...",
          "영혼 상태로 이리저리 돌아다니는 느낌..."
        ]
      },
    ]
  },

  {
    group: [
      {
        type: "narrator",
        str: [
          "기이하게도 그런 생각들은 당신의 마음 속에서 이내 사라진다.",
          "지금 당신에게 중요한 것은 그녀 뿐."
        ]
      },
      {
        type: "narrator",
        str: [
          "마치 어둠 속에 갇혀있던 자신을 끌어내준 것만 같은 그녀.",
        ]
      }
    ]
  },

  {
    group: [

    ]
  }
];

export default scenarioIntro;