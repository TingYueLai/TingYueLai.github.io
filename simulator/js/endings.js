function checkEnding() {
  const s = player.stats;
  let title = "畢業生";
  let desc = "你度過了平凡但充實的大學四年，準備迎向社會。";
  let schoolOrCompany = "";

  // 1. 根據大四下的畢業選擇 (future) 與能力，決定最終去向
  if (s.future === "grad_school") {
    if (s.academic > 120 && s.coding > 100) schoolOrCompany = "台清交成資工所";
    else if (s.academic > 80) schoolOrCompany = "中興資工所 (直升)";
    else if (s.academic > 40) schoolOrCompany = "中正備取";
    else schoolOrCompany = "落榜 (被迫簽志願役)";
  } else if (s.future === "study_abroad") {
    if (s.coding > 120) schoolOrCompany = "史丹佛大學 (Stanford)";
    else schoolOrCompany = "國外不知名野雞大學";
  } else if (s.future === "work") {
    if (s.coding > 150 && s.club > 100) schoolOrCompany = "Google (矽谷總部)";
    else if (s.coding > 100) schoolOrCompany = "台積電 IT 部門";
    else if (s.coding > 60) schoolOrCompany = "內科系統廠";
    else schoolOrCompany = "接案打雜工程師";
  } else if (s.future === "delay") {
    schoolOrCompany = "中興大學 (大五)";
  }

  // 2. 結合大三的專攻領域 (path) 或是極端數值給予特殊稱號
  if (s.liver > 250 && s.coding > 100) {
    title = "爆肝之王";
    desc = `你的肝指數突破天際，大學四年都在熬夜寫程式。你最終進入了【${schoolOrCompany}】，成為了業界的爆肝傳奇，但也成了醫院常客...`;
  } else if (s.social > 150 && s.academic < 20) {
    title = "社交大師";
    desc = `四年來你參加了無數聯誼與夜唱，但學分慘不忍睹。你雖然只進入了【${schoolOrCompany}】，但靠著超強人脈混得風生水起。`;
  } else if (s.energy === 100 && s.liver === 0) {
    title = "睡仙";
    desc = `你把大學當成高級安養院，從不熬夜，每天睡滿 12 小時。你最終進入了【${schoolOrCompany}】，獲得了極致的健康，但腦袋空空。`;
  } else if (s.club > 150) {
    title = "中興資訊社傳奇";
    desc = `你在中興資訊社呼風喚雨，帶領社團拿下無數榮耀。帶著這份榮耀，你進入了【${schoolOrCompany}】，學弟妹至今仍流傳著你的傳說。`;
  } else if (s.coding > 150) {
    const pathName = s.path ? s.path : "程式";
    title = `頂尖${pathName}大神`;
    desc = `你的程式能力驚人，完全是天才等級。你順利進入了【${schoolOrCompany}】，準備在科技業大展身手！`;
  } else {
    // 平凡結局
    if (schoolOrCompany === "落榜 (被迫簽志願役)") {
      title = "迷惘青年";
      desc = "因為學業不佳又考不上研究所，你只能先去當兵思考人生了。";
    } else if (s.future === "delay") {
      title = "延畢生";
      desc = "必修被當光光，你只能繼續在中興大學多留幾年，看著學弟妹畢業。";
    } else {
      title = "社會新鮮人";
      desc = `你順利拿到畢業證書，並成功進入了【${schoolOrCompany}】，成為一名普通的社畜。`;
    }
  }

  return { title, desc };
}
