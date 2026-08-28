const game = {
  semesterIndex: 0,
  actionCount: 0,
  maxActionsPerSemester: 5,
  semesters: [
    "大一上", "大一下",
    "大二上", "大二下",
    "大三上", "大三下",
    "大四上", "大四下"
  ],

  start() {
    player.init();
    if(typeof resetEvents === 'function') resetEvents();
    this.semesterIndex = 0;
    this.actionCount = 0;
    this.updateHeader();
    showScreen('screen-game');
    this.nextEvent();
  },

  nextEvent() {
    if (this.actionCount >= this.maxActionsPerSemester) {
      this.semesterIndex++;
      this.actionCount = 0;
      
      if (this.semesterIndex >= this.semesters.length) {
        this.endGame();
        return;
      } else {
        this.showSemesterTransition();
        return;
      }
    }
    
    this.updateHeader();

    let evt;
    // Special Fixed Events
    if (this.semesterIndex === 0 && this.actionCount === 0) {
      evt = getFixedEvent("freshman_join");
    } else if (this.semesterIndex === 4 && this.actionCount === 0) { // 大三上
      evt = getFixedEvent("junior_path");
    } else if (this.semesterIndex === 7 && this.actionCount === 4) { // 大四下 最後一動
      evt = getFixedEvent("senior_graduation");
    } else {
      evt = getRandomEvent();
    }
    
    this.renderEvent(evt);
  },

  showSemesterTransition() {
    const prevSemester = this.semesters[this.semesterIndex - 1];
    document.getElementById('event-title').innerText = `${prevSemester} 結束！`;
    document.getElementById('event-desc').innerText = `時光飛逝，你即將邁入 ${this.semesters[this.semesterIndex]}...`;
    
    const optionsContainer = document.getElementById('event-options');
    optionsContainer.innerHTML = '';
    
    const btn = document.createElement('button');
    btn.innerText = "繼續下一學期";
    btn.onclick = () => {
      this.nextEvent();
    };
    optionsContainer.appendChild(btn);
    this.updateHeader();
  },

  renderEvent(evt) {
    document.getElementById('event-title').innerText = evt.title;
    document.getElementById('event-desc').innerText = evt.desc;
    
    const optionsContainer = document.getElementById('event-options');
    optionsContainer.innerHTML = '';
    
    evt.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.innerText = opt.text;
      btn.onclick = () => {
        // Record previous stats to show difference
        const prevStats = { ...player.stats };
        opt.effect();
        this.showStatChanges(prevStats, player.stats);
        
        this.actionCount++;
        this.nextEvent();
      };
      optionsContainer.appendChild(btn);
    });
  },

  showStatChanges(oldStats, newStats) {
    // Simple visual feedback for stat changes could be added here
    // For MVP, we will rely on player.updateUI() flashing colors or just updating.
    // Let's highlight changed elements in player.js instead.
  },

  updateHeader() {
    document.getElementById('ui-semester').innerText = this.semesters[this.semesterIndex] || "畢業";
    document.getElementById('ui-action-count').innerText = `行動: ${this.actionCount}/${this.maxActionsPerSemester}`;
  },

  endGame() {
    showScreen('screen-ending');
    const ending = checkEnding();
    document.getElementById('ending-title').innerText = ending.title;
    document.getElementById('ending-desc').innerText = ending.desc;
  }
};

// Event Listeners
document.getElementById('btn-new-game').addEventListener('click', () => {
  game.start();
});

document.getElementById('btn-restart').addEventListener('click', () => {
  showScreen('screen-start');
});
