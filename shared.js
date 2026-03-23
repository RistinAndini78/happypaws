/**
 * HappyPaws Shared Interactivity System
 * Provides global functions for Modals, Toasts, and Animations.
 */

window.HappyPaws = {
  // --- MODAL SYSTEM ---
  showModal: function(title, content) {
    let overlay = document.getElementById('hp-modal-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'hp-modal-overlay';
      overlay.className = 'modal-overlay';
      overlay.innerHTML = `
        <div class="modal-content">
          <button class="modal-close" onclick="HappyPaws.closeModal()">&times;</button>
          <h2 id="hp-modal-title" style="margin-bottom:16px; font-size:18px; font-weight:800; color:var(--pr);"></h2>
          <div id="hp-modal-body" style="font-size:14px; color:var(--muted); line-height:1.6;"></div>
        </div>
      `;
      document.body.appendChild(overlay);
      overlay.onclick = (e) => { if(e.target === overlay) this.closeModal(); };
    }
    
    document.getElementById('hp-modal-title').innerText = title;
    document.getElementById('hp-modal-body').innerHTML = content;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  closeModal: function() {
    const overlay = document.getElementById('hp-modal-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  // --- TOAST SYSTEM ---
  showToast: function(message, type = 'success') {
    let container = document.getElementById('hp-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'hp-toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? '✓' : '✕';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    
    container.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-20px)';
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  },

  // --- CHART SYSTEM (SVG Based) ---
  createChart: function(containerId, data, labels) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const max = Math.max(...data);
    const html = `
      <div style="display:flex; align-items:flex-end; gap:8px; height:100%; padding-top:20px;">
        ${data.map((v, i) => `
          <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:8px;">
            <div class="chart-bar stagger-${(i%4)+1}" style="width:100%; height:${(v/max)*100}%; min-height:4px; border-radius:6px 6px 0 0; background:linear-gradient(to top, var(--pr), var(--sc));"></div>
            <span style="font-size:9px; font-weight:700; color:var(--muted);">${labels[i]}</span>
          </div>
        `).join('')}
      </div>
    `;
    container.innerHTML = html;
  },

  // --- UTILS ---
  initInteractivity: function() {
    // Add click sounds or haptic feel (simulated by scale animations)
    document.querySelectorAll('.btn-primary, .nav-item, .pet-card, .menu-row').forEach(el => {
      el.addEventListener('click', () => {
        // Haptic feedback logic could go here
      });
    });
  }
};

// Auto init on load
document.addEventListener('DOMContentLoaded', () => {
  HappyPaws.initInteractivity();
});
