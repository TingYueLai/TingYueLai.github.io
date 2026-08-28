const player = {
  stats: {
    academic: 0,
    coding: 0,
    social: 0,
    energy: 100,
    money: 5000,
    liver: 0,
    club: 0,
    path: null
  },
  
  init() {
    this.stats = {
      academic: 10,
      coding: 5,
      social: 10,
      energy: 100,
      money: 5000,
      liver: 0,
      club: 0,
    path: null
    };
    this.updateUI();
  },

  updateStat(key, amount) {
    if (amount === 0) return;
    
    this.stats[key] += amount;
    // Bounds checking
    if(key === 'energy') {
      if(this.stats.energy > 100) this.stats.energy = 100;
      if(this.stats.energy < 0) this.stats.energy = 0;
    }
    if(key === 'liver' && this.stats.liver < 0) this.stats.liver = 0;
    if(key === 'money' && this.stats.money < 0) this.stats.money = 0;
    
    this.updateUI();
    this.showFloatingText(key, amount);
  },

  updateUI() {
    document.getElementById('stat-academic').innerText = this.stats.academic;
    document.getElementById('stat-coding').innerText = this.stats.coding;
    document.getElementById('stat-social').innerText = this.stats.social;
    document.getElementById('stat-energy').innerText = this.stats.energy;
    document.getElementById('stat-money').innerText = this.stats.money;
    document.getElementById('stat-liver').innerText = this.stats.liver;
    document.getElementById('stat-club').innerText = this.stats.club;
  },

  showFloatingText(key, amount) {
    const el = document.getElementById(`stat-${key}`);
    if (!el) return;
    
    const floater = document.createElement('span');
    floater.classList.add('floating-text');
    if (amount > 0) {
      floater.innerText = `+${amount}`;
      floater.classList.add('positive');
    } else {
      floater.innerText = `${amount}`;
      floater.classList.add('negative');
    }
    
    el.parentNode.appendChild(floater);
    
    setTimeout(() => {
      floater.remove();
    }, 1500);
  }
};
