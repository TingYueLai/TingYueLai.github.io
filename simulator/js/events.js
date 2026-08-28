const fixedEvents = [
  {
    id: "freshman_join",
    title: "大一新生與資訊社",
    desc: "剛進入中興大學，你在社團博覽會上走到資訊社攤位前。學長熱情地招手：『學弟妹，對程式有興趣嗎？』",
    options: [
      { text: "好啊！立刻入社並繳交社費 (資訊社專屬彩蛋 ✨)", effect: () => { 
        player.updateStat("club", 50); 
        player.updateStat("social", 20); 
        player.updateStat("coding", 20); 
        player.updateStat("money", -500); 
        alert("🎉 觸發專屬彩蛋：【學長姐的庇護】！\n獲得大量程式碼傳承與考古題，全能力大幅提升！"); 
      } },
      { text: "我只是想蹭免學分的課...", effect: () => { player.updateStat("club", 5); player.updateStat("coding", 5); } },
      { text: "我要參加熱舞社！", effect: () => { player.updateStat("social", 20); player.updateStat("club", -10); player.updateStat("academic", -5); } }
    ]
  },
  {
    id: "junior_path",
    title: "大三的分歧點",
    desc: "升上大三，必修變少了，但專題與未來方向迫在眉睫。你決定未來的一年要專攻什麼領域？",
    options: [
      { text: "LLM 與 AI 應用 (跟風一波)", effect: () => { player.updateStat("coding", 20); player.updateStat("liver", 15); player.stats.path = 'AI'; } },
      { text: "資訊安全 (成為黑客)", effect: () => { player.updateStat("coding", 15); player.updateStat("club", 10); player.stats.path = 'Sec'; } },
      { text: "演算法競賽 (CPE/ICPC)", effect: () => { player.updateStat("coding", 30); player.updateStat("liver", 25); player.updateStat("energy", -20); player.stats.path = 'CP'; } },
      { text: "全端軟體工程 (實務派)", effect: () => { player.updateStat("coding", 15); player.updateStat("social", 5); player.stats.path = 'Web'; } },
      { text: "我不寫程式了，轉考公職", effect: () => { player.updateStat("academic", 20); player.updateStat("coding", -10); player.stats.path = 'Gov'; } }
    ]
  },
  {
    id: "senior_graduation",
    title: "畢業前夕的抉擇",
    desc: "大學最後一個月，看著空蕩蕩的宿舍，你該為下一步做打算了。接下來你想做什麼？",
    options: [
      { text: "直接進入職場當軟體工程師", effect: () => { player.stats.future = "work"; player.updateStat("money", 10000); player.updateStat("liver", 10); } },
      { text: "報考國內研究所繼續升學", effect: () => { player.stats.future = "grad_school"; player.updateStat("academic", 20); player.updateStat("money", -2000); player.updateStat("liver", 15); } },
      { text: "出國留學闖蕩", req: (s) => s.money >= 3000, effect: () => { player.stats.future = "study_abroad"; player.updateStat("money", -3000); player.updateStat("academic", 30); } },
      { text: "技術性延畢一年再說", effect: () => { player.stats.future = "delay"; player.updateStat("energy", 30); player.updateStat("academic", -20); } }
    ]
  }
];

function getFixedEvent(id) { return fixedEvents.find(e => e.id === id); }

const allEvents = [
  // --- 資訊社相關事件 (10+) ---
  {
    id: "itc_1",
    title: "社團博覽會",
    desc: "你走在黑森林旁，看到資訊社的攤位，學長熱情地向你招手。桌上擺著閃閃發光的機械鍵盤。",
    options: [
      { text: "靠過去了解並填寫入社表", effect: () => { player.updateStat("club", 15); player.updateStat("social", 5); } },
      { text: "拿了傳單就走", effect: () => { player.updateStat("club", 2); } },
      { text: "假裝沒看到，快步走過", effect: () => { player.updateStat("social", -2); } }
    ]
  },
  {
    id: "itc_2",
    title: "第一次期初大會",
    desc: "今天是資訊社的期初大會，現場備有免費披薩。你要坐在哪裡？",
    options: [
      { text: "坐在第一排，瘋狂問問題", effect: () => { player.updateStat("club", 10); player.updateStat("coding", 5); player.updateStat("social", 5); } },
      { text: "默默在角落吃披薩", effect: () => { player.updateStat("energy", 10); player.updateStat("club", 2); } },
      { text: "跟旁邊的人搭話", effect: () => { player.updateStat("social", 10); player.updateStat("club", 5); } }
    ]
  },
  {
    id: "itc_3",
    title: "基礎網頁開發社課",
    desc: "今天的社課教 HTML 與 CSS，講師正在示範如何把字變成紅色。",
    options: [
      { text: "認真跟著打 Code", effect: () => { player.updateStat("coding", 8); player.updateStat("liver", 2); player.updateStat("energy", -5); } },
      { text: "覺得太簡單，自己在底下寫 React", effect: () => { player.updateStat("coding", 12); player.updateStat("liver", 5); } },
      { text: "睡覺，反正有錄影", effect: () => { player.updateStat("energy", 15); player.updateStat("coding", -2); } }
    ]
  },
  {
    id: "itc_4",
    title: "深夜的 Discord 頻道",
    desc: "凌晨 2 點，資訊社的 Discord 語音頻道還有 5 個人在裡面。",
    options: [
      { text: "進去跟著大家一起肝", effect: () => { player.updateStat("coding", 10); player.updateStat("club", 10); player.updateStat("liver", 15); player.updateStat("energy", -20); } },
      { text: "進去聊個天就去睡", effect: () => { player.updateStat("social", 8); player.updateStat("club", 5); player.updateStat("energy", -5); } },
      { text: "安靜睡覺保肝", effect: () => { player.updateStat("energy", 20); player.updateStat("liver", -5); } }
    ]
  },
  {
    id: "itc_5",
    title: "黑客松比賽 (Hackathon)",
    desc: "資訊社學長在揪團參加台中的黑客松比賽，預計週末兩天不睡覺。",
    options: [
      { text: "熱血報名！", effect: () => { player.updateStat("coding", 20); player.updateStat("club", 15); player.updateStat("liver", 30); player.updateStat("energy", -40); } },
      { text: "只當吉祥物/簡報手", effect: () => { player.updateStat("social", 15); player.updateStat("club", 10); player.updateStat("energy", -15); } },
      { text: "裝死不參加", effect: () => { player.updateStat("energy", 10); player.updateStat("club", -5); } }
    ]
  },
  {
    id: "itc_6",
    title: "社辦的冷氣",
    desc: "夏天好熱，資訊社的社辦冷氣超強，但裡面有幾個不認識的學長在打 Game。",
    options: [
      { text: "勇敢走進去蹭冷氣並搭話", effect: () => { player.updateStat("social", 10); player.updateStat("club", 8); player.updateStat("energy", 10); } },
      { text: "默默找個角落打開筆電寫作業", effect: () => { player.updateStat("academic", 5); player.updateStat("energy", 10); } },
      { text: "太尷尬了，還是去圖書館吧", effect: () => { player.updateStat("academic", 8); player.updateStat("energy", -5); } }
    ]
  },
  {
    id: "itc_7",
    title: "期末社群聚餐",
    desc: "資訊社辦在旱溪夜市附近的期末聚餐，一個人要 400 元。",
    options: [
      { text: "當然要去！", req: (s) => s.money >= 400, effect: () => { player.updateStat("money", -400); player.updateStat("club", 15); player.updateStat("social", 12); player.updateStat("energy", 10); } },
      { text: "說自己要寫期末專案不去", effect: () => { player.updateStat("academic", 10); player.updateStat("club", -5); } },
      { text: "窮到吃土，在宿舍吃泡麵", effect: () => { player.updateStat("money", -50); player.updateStat("energy", 5); } }
    ]
  },
  {
    id: "itc_8",
    title: "社長的傳承",
    desc: "現任社長拍了拍你的肩膀：「學弟/妹，明年資訊社幹部要不要考慮一下？」",
    options: [
      { text: "接下幹部重任！", effect: () => { player.updateStat("club", 30); player.updateStat("social", 15); player.updateStat("liver", 20); player.updateStat("academic", -10); } },
      { text: "我當個幽靈社員就好", effect: () => { player.updateStat("club", -10); player.updateStat("academic", 5); } }
    ]
  },
  {
    id: "itc_9",
    title: "迎新講員招募",
    desc: "社團在找下學期迎新活動的講師，教新生寫 Python。",
    options: [
      { text: "挑戰當講師", effect: () => { player.updateStat("coding", 15); player.updateStat("club", 20); player.updateStat("social", 10); player.updateStat("liver", 10); } },
      { text: "當台下的助教幫忙解 Bug", effect: () => { player.updateStat("coding", 8); player.updateStat("club", 10); } },
      { text: "不關我的事", effect: () => {} }
    ]
  },
  {
    id: "itc_10",
    title: "社網大翻修",
    desc: "資訊社的官方網站已經 5 年沒更新了，有人提議用 Next.js 重寫。",
    options: [
      { text: "自告奮勇當主揪", effect: () => { player.updateStat("coding", 25); player.updateStat("club", 25); player.updateStat("liver", 25); player.updateStat("academic", -5); } },
      { text: "幫忙寫幾個 Component", effect: () => { player.updateStat("coding", 10); player.updateStat("club", 10); } },
      { text: "看戲", effect: () => { player.updateStat("club", -2); } }
    ]
  },

  // --- 程式相關事件 (5+) ---
  {
    id: "code_1",
    title: "Git Merge 衝突",
    desc: "跟同學做分組專題時，發現 Git 噴了滿滿的 Merge Conflict。",
    options: [
      { text: "仔細一行一行解", effect: () => { player.updateStat("coding", 10); player.updateStat("energy", -15); player.updateStat("liver", 5); } },
      { text: "git push -f 強制覆蓋", effect: () => { player.updateStat("social", -20); player.updateStat("coding", -5); } },
      { text: "叫 ChatGPT 幫我解", effect: () => { player.updateStat("coding", 2); player.updateStat("energy", -5); } }
    ]
  },
  {
    id: "code_2",
    title: "無解的 Bug",
    desc: "一個 NullPointerException 卡了你 3 個小時，明天就要 Demo 了。",
    options: [
      { text: "熬夜死磕到底", effect: () => { player.updateStat("coding", 12); player.updateStat("liver", 15); player.updateStat("energy", -25); player.updateStat("academic", 5); } },
      { text: "問萬能的資訊社學長", effect: () => { player.updateStat("club", 5); player.updateStat("coding", 8); player.updateStat("social", 5); } },
      { text: "睡覺，明天 Demo 裝傻", effect: () => { player.updateStat("energy", 20); player.updateStat("academic", -15); } }
    ]
  },
  {
    id: "code_3",
    title: "新技術的誘惑",
    desc: "網路上突然開始流行某個超酷的新 Framework，但你的作業還沒寫。",
    options: [
      { text: "先學新技術再說！", effect: () => { player.updateStat("coding", 15); player.updateStat("academic", -10); player.updateStat("liver", 10); } },
      { text: "乖乖寫作業", effect: () => { player.updateStat("academic", 10); player.updateStat("coding", 5); } }
    ]
  },
  {
    id: "code_4",
    title: "硬碟陣亡",
    desc: "你的筆電硬碟突然發出怪聲，然後就抓不到了！",
    options: [
      { text: "還好我有用 Git / 雲端備份", effect: () => { player.updateStat("coding", 5); player.updateStat("money", -3000); } },
      { text: "完全沒備份，心態崩潰", effect: () => { player.updateStat("energy", -40); player.updateStat("academic", -20); player.updateStat("money", -3000); } }
    ]
  },
  {
    id: "code_5",
    title: "接案賺外快",
    desc: "有親戚問你會不會「修電腦」或「做個簡單的購物網站」。",
    options: [
      { text: "開價接案，挑戰全端", effect: () => { player.updateStat("coding", 15); player.updateStat("money", 5000); player.updateStat("liver", 20); player.updateStat("energy", -20); } },
      { text: "拒絕，親戚案子最坑了", effect: () => { player.updateStat("social", -5); player.updateStat("energy", 5); } },
      { text: "免費幫忙修電腦", effect: () => { player.updateStat("social", 15); player.updateStat("coding", 2); player.updateStat("liver", 5); } }
    ]
  },

  // --- 學業專屬事件 (5+) ---
  {
    id: "aca_1",
    title: "期末考前抱佛腳",
    desc: "明天就是微積分期末考，你現在連課本都還沒翻開。",
    options: [
      { text: "衝去計中通宵狂讀", effect: () => { player.updateStat("academic", 15); player.updateStat("liver", 15); player.updateStat("energy", -20); } },
      { text: "睡覺最重要，直接放推", effect: () => { player.updateStat("academic", -15); player.updateStat("energy", 20); } },
      { text: "請大神同學教我 (請客)", req: (s) => s.money >= 100, effect: () => { player.updateStat("academic", 10); player.updateStat("social", 5); player.updateStat("money", -100); } }
    ]
  },
  {
    id: "aca_2",
    title: "傳說中的營養學分",
    desc: "這學期你選到了一門傳說中超好過的通識課，教授說只要交一份 2000 字報告就好。",
    options: [
      { text: "認真查資料寫出一份好報告", effect: () => { player.updateStat("academic", 12); player.updateStat("energy", -10); } },
      { text: "跟同學分工合作", effect: () => { player.updateStat("academic", 8); player.updateStat("social", 8); } },
      { text: "最後一天才用 AI 產生", effect: () => { player.updateStat("academic", 5); player.updateStat("coding", 5); } }
    ]
  },
  {
    id: "aca_3",
    title: "實驗課大魔王",
    desc: "這週的實驗數據超級醜，根本配不出理論值。",
    options: [
      { text: "熬夜重做數據並寫出完美報告", effect: () => { player.updateStat("academic", 18); player.updateStat("liver", 10); player.updateStat("energy", -15); } },
      { text: "假造數據，看起來合理就好", effect: () => { player.updateStat("academic", -5); player.updateStat("liver", -5); } },
      { text: "抱大腿，把報告交給神人隊友", effect: () => { player.updateStat("academic", 8); player.updateStat("social", 5); } }
    ]
  },
  {
    id: "aca_4",
    title: "助教的 Office Hour",
    desc: "演算法的作業太難了，剛好助教今天有開課後輔導時間。",
    options: [
      { text: "拿著講義去問助教", effect: () => { player.updateStat("academic", 15); player.updateStat("social", 5); player.updateStat("energy", -5); } },
      { text: "自己上網查 Stack Overflow", effect: () => { player.updateStat("coding", 10); player.updateStat("academic", 5); player.updateStat("energy", -10); } },
      { text: "放棄這題，扣點分沒差", effect: () => { player.updateStat("academic", -8); player.updateStat("energy", 10); } }
    ]
  },
  {
    id: "aca_5",
    title: "學長姐的考古題",
    desc: "班上群組傳來了一份歷年考古題雲端硬碟連結，據說命中率高達 80%。",
    options: [
      { text: "把考古題全部做過三遍", effect: () => { player.updateStat("academic", 20); player.updateStat("energy", -15); player.updateStat("liver", 5); } },
      { text: "只看解答背下來", effect: () => { player.updateStat("academic", 10); player.updateStat("energy", -5); } },
      { text: "我相信自己的實力，不看考古題", effect: () => { player.updateStat("academic", -15); player.updateStat("energy", 10); } }
    ]
  },

  // --- 校園生活事件 (10+) ---
  {
    id: "cam_1",
    title: "開學第一堂課",
    desc: "微積分教授在台上講得口沫橫飛，你覺得...",
    options: [
      { text: "認真做筆記", effect: () => { player.updateStat("academic", 8); player.updateStat("energy", -10); } },
      { text: "滑手機", effect: () => { player.updateStat("energy", 5); player.updateStat("academic", -5); } },
      { text: "睡覺", effect: () => { player.updateStat("energy", 15); player.updateStat("academic", -8); } }
    ]
  },
  {
    id: "cam_2",
    title: "中興湖的鵝",
    desc: "走在中興湖畔，一隻大白鵝突然對你展開翅膀發出嘶嘶聲。",
    options: [
      { text: "跟牠對峙！", effect: () => { player.updateStat("energy", -15); player.updateStat("social", 5); /* 被路人看到覺得很勇 */ } },
      { text: "落荒而逃", effect: () => { player.updateStat("energy", -5); } },
      { text: "拍照發 IG", effect: () => { player.updateStat("social", 8); } }
    ]
  },
  {
    id: "cam_3",
    title: "選課大戰",
    desc: "選課系統塞爆了，你想要的通識課一直轉圈圈。",
    options: [
      { text: "寫 Python 腳本自動刷", effect: () => { player.updateStat("coding", 10); player.updateStat("academic", 5); player.updateStat("liver", 5); } },
      { text: "狂按 F5", effect: () => { player.updateStat("energy", -10); player.updateStat("academic", 2); } },
      { text: "算了，選冷門硬課", effect: () => { player.updateStat("academic", 12); player.updateStat("energy", -15); } }
    ]
  },
  {
    id: "cam_4",
    title: "腳踏車被拖吊",
    desc: "你把腳踏車停在綜合教學大樓門口，下課出來發現不見了。地上有粉筆字。",
    options: [
      { text: "走路去拖吊場贖車", effect: () => { player.updateStat("money", -50); player.updateStat("energy", -15); } },
      { text: "直接買台新的二手車", req: (s) => s.money >= 500, effect: () => { player.updateStat("money", -500); player.updateStat("energy", 5); } },
      { text: "從此走路當運動", effect: () => { player.updateStat("energy", -5); } }
    ]
  },
  {
    id: "cam_5",
    title: "期中考週",
    desc: "這週有三科主科要考試，還有兩份報告要交。",
    options: [
      { text: "喝紅牛，圖書館通宵！", effect: () => { player.updateStat("academic", 15); player.updateStat("liver", 25); player.updateStat("energy", -30); } },
      { text: "抱大腿，求神人筆記", effect: () => { player.updateStat("social", 10); player.updateStat("academic", 8); } },
      { text: "躺平，聽天由命", effect: () => { player.updateStat("academic", -20); player.updateStat("energy", 30); player.updateStat("liver", -10); } }
    ]
  },
  {
    id: "cam_6",
    title: "打工機會",
    desc: "圖書館在徵工讀生，時薪 183 元，工作是可以坐在櫃檯發呆。",
    options: [
      { text: "應徵打工", effect: () => { player.updateStat("money", 2000); player.updateStat("energy", -10); player.updateStat("academic", 2); } },
      { text: "拿去寫 Code 比較實在", effect: () => { player.updateStat("coding", 10); player.updateStat("money", -200); } },
      { text: "我只想要睡覺", effect: () => { player.updateStat("energy", 20); } }
    ]
  },
  {
    id: "cam_7",
    title: "室友雷包",
    desc: "你的室友半夜兩點還在打 LOL，狂按青軸鍵盤並且大吼大叫。",
    options: [
      { text: "直接開噴", effect: () => { player.updateStat("social", -15); player.updateStat("energy", -10); } },
      { text: "戴上抗噪耳機忍耐", effect: () => { player.updateStat("energy", -5); player.updateStat("money", -50); } },
      { text: "加入他一起打", effect: () => { player.updateStat("social", 10); player.updateStat("liver", 15); player.updateStat("energy", -20); } }
    ]
  },
  {
    id: "cam_8",
    title: "月底吃土",
    desc: "月底了，生活費只剩 100 元，距離下個月還有三天。",
    options: [
      { text: "天天吃學餐白飯配滷汁", effect: () => { player.updateStat("energy", -15); player.updateStat("money", -50); } },
      { text: "跟室友借錢", effect: () => { player.updateStat("social", -5); player.updateStat("money", 500); } },
      { text: "回家啃老", effect: () => { player.updateStat("money", 2000); player.updateStat("social", -2); } }
    ]
  },
  {
    id: "cam_9",
    title: "聯誼抽鑰匙",
    desc: "同學揪你去大坑看夜景聯誼，要騎機車載人。",
    options: [
      { text: "衝了！脫單趁現在", effect: () => { player.updateStat("social", 15); player.updateStat("money", -300); player.updateStat("energy", -15); } },
      { text: "抱歉，我的副駕只放筆電", effect: () => { player.updateStat("coding", 8); player.updateStat("social", -5); } },
      { text: "我沒機車...", effect: () => { player.updateStat("social", -2); player.updateStat("energy", 5); } }
    ]
  },
  {
    id: "cam_10",
    title: "校慶園遊會",
    desc: "班上要在校慶園遊會擺攤賣炒泡麵。",
    options: [
      { text: "當大廚炒麵", effect: () => { player.updateStat("social", 10); player.updateStat("energy", -20); player.updateStat("liver", 5); } },
      { text: "幫忙顧收銀", effect: () => { player.updateStat("social", 5); player.updateStat("academic", 2); } },
      { text: "當天裝病翹掉", effect: () => { player.updateStat("social", -15); player.updateStat("energy", 20); } }
    ]
  },

  // --- 中興大學特色事件 ---
  {
    id: "nchu_1",
    title: "圓廳吃飯",
    desc: "中午十二點，圓廳擠滿了人。你想吃點什麼？",
    options: [
      { text: "排隊吃學餐", effect: () => { player.updateStat("energy", 10); player.updateStat("money", -70); } },
      { text: "買小木屋鬆餅", effect: () => { player.updateStat("energy", 15); player.updateStat("social", 5); player.updateStat("money", -80); } },
      { text: "太多人了，不吃了繼續寫 Code", effect: () => { player.updateStat("coding", 10); player.updateStat("energy", -10); } }
    ]
  },
  {
    id: "nchu_2",
    title: "康橋泛舟",
    desc: "期末考結束，同學揪你去中興湖旁邊的康橋划船。",
    options: [
      { text: "好啊，順便拍個限動", effect: () => { player.updateStat("social", 20); player.updateStat("energy", -10); } },
      { text: "水好髒，拒絕", effect: () => { player.updateStat("energy", 5); } },
      { text: "趁大家去玩，自己在宿舍補眠", effect: () => { player.updateStat("energy", 25); } }
    ]
  },
  {
    id: "nchu_3",
    title: "農夫市集",
    desc: "假日早上中興大學有農夫市集，你被各種有機蔬菜和水果吸引。",
    options: [
      { text: "買杯新鮮果汁", effect: () => { player.updateStat("energy", 20); player.updateStat("money", -100); } },
      { text: "好貴，回宿舍吃泡麵", effect: () => { player.updateStat("money", -30); player.updateStat("energy", 5); } },
      { text: "早起運動一下", effect: () => { player.updateStat("energy", 15); player.updateStat("liver", -5); } }
    ]
  },
  {
    id: "nchu_4",
    title: "男宿網路斷線",
    desc: "晚上 10 點，男宿的網路突然全部斷掉，你剛好在推 Code！",
    options: [
      { text: "連手機熱點硬扛", effect: () => { player.updateStat("coding", 5); player.updateStat("money", -10); } },
      { text: "直接睡覺", effect: () => { player.updateStat("energy", 20); player.updateStat("liver", -10); } },
      { text: "跟室友一起抱怨宿網", effect: () => { player.updateStat("social", 10); player.updateStat("energy", -5); } }
    ]
  },
  {
    id: "nchu_5",
    title: "圖書館 K 書",
    desc: "期中考前夕，中興大學圖書館人滿為患。你想在哪裡讀書？",
    options: [
      { text: "去地下室自習室", effect: () => { player.updateStat("academic", 15); player.updateStat("energy", -10); } },
      { text: "在多媒體區看電影", effect: () => { player.updateStat("energy", 15); player.updateStat("academic", -5); } },
      { text: "到沙發區睡覺", effect: () => { player.updateStat("energy", 25); player.updateStat("academic", -10); } }
    ]
  },

  // --- 搞笑/梗事件 (5+) ---
  {
    id: "meme_1",
    title: "不小心 sudo rm -rf /",
    desc: "你在 Linux 虛擬機裡手滑輸入了毀滅指令，系統瞬間安靜了。",
    options: [
      { text: "發文到 Dcard 討拍", effect: () => { player.updateStat("social", 10); player.updateStat("coding", -5); } },
      { text: "熬夜重灌裝好", effect: () => { player.updateStat("coding", 10); player.updateStat("liver", 20); player.updateStat("energy", -20); } },
      { text: "轉系去中文系好了", effect: () => { player.updateStat("academic", -10); player.updateStat("energy", -5); } }
    ]
  },
  {
    id: "meme_2",
    title: "AI 生成作業",
    desc: "通識課要求交 3000 字心得，你打開了 ChatGPT。",
    options: [
      { text: "全權交給 AI，複製貼上", effect: () => { player.updateStat("academic", 2); player.updateStat("energy", 10); } },
      { text: "用 AI 產生大綱，自己認真寫", effect: () => { player.updateStat("academic", 10); player.updateStat("coding", 5); player.updateStat("energy", -5); } },
      { text: "純手工打字，我鄙視 AI", effect: () => { player.updateStat("academic", 8); player.updateStat("energy", -15); } }
    ]
  },
  {
    id: "meme_3",
    title: "學長教你拜綠色乖乖",
    desc: "伺服器一直無故當機，資訊社學長拿出一包過期的綠色乖乖放在機櫃上。",
    options: [
      { text: "跟著拜，玄學也是科學", effect: () => { player.updateStat("club", 5); player.updateStat("coding", 2); } },
      { text: "偷吃掉乖乖", effect: () => { player.updateStat("club", -20); player.updateStat("coding", -10); player.updateStat("energy", 10); } },
      { text: "我相信科學，拆開機殼查修", effect: () => { player.updateStat("coding", 8); player.updateStat("liver", 10); } }
    ]
  },
  {
    id: "meme_4",
    title: "中興湖都市傳說",
    desc: "聽說半夜 12 點繞著中興湖走三圈，會遇到...資工系學長在 Debug。",
    options: [
      { text: "半夜去探險", effect: () => { player.updateStat("energy", -10); player.updateStat("club", 5); player.updateStat("coding", 5); } },
      { text: "在宿舍睡覺", effect: () => { player.updateStat("energy", 15); } },
      { text: "我就是那個在 Debug 的學長", effect: () => { player.updateStat("liver", 20); player.updateStat("coding", 15); player.updateStat("energy", -15); } }
    ]
  },
  {
    id: "meme_5",
    title: "Stack Overflow 倒閉了？",
    desc: "有一天你寫 Code 到一半，發現 Stack Overflow 當機連不上。",
    options: [
      { text: "崩潰，今天不寫 Code 了", effect: () => { player.updateStat("coding", -5); player.updateStat("energy", 10); } },
      { text: "開始翻官方 Document", effect: () => { player.updateStat("coding", 20); player.updateStat("liver", 15); player.updateStat("energy", -20); } },
      { text: "看別人的 GitHub 抄", effect: () => { player.updateStat("coding", 8); player.updateStat("liver", 5); } }
    ]
  }
];

let seenEvents = new Set();

function resetEvents() {
  seenEvents.clear();
}

function getRandomEvent() {
  // 過濾掉不符合條件的選項 (如果有 req 函式)
  let availableEvents = allEvents.map(evt => {
    return {
      ...evt,
      options: evt.options.filter(opt => !opt.req || opt.req(player.stats))
    };
  }).filter(evt => evt.options.length > 0 && !seenEvents.has(evt.id));

  // 如果事件庫抽乾了，重新洗牌
  if (availableEvents.length === 0) {
    seenEvents.clear();
    availableEvents = allEvents.map(evt => {
      return {
        ...evt,
        options: evt.options.filter(opt => !opt.req || opt.req(player.stats))
      };
    }).filter(evt => evt.options.length > 0);
  }

  const index = Math.floor(Math.random() * availableEvents.length);
  const selectedEvent = availableEvents[index];
  seenEvents.add(selectedEvent.id);
  
  return selectedEvent;
}
