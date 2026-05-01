// 進場淡入效果(三格依序錯位浮現)
document.addEventListener("DOMContentLoaded", () => {
  // 整體頁面淡入
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 1s ease";
  requestAnimationFrame(() => {
    document.body.style.opacity = "1";
  });

  // 三入口錯位浮現
  const gates = document.querySelectorAll(".gate");
  gates.forEach((gate, i) => {
    gate.style.opacity = "0";
    gate.style.transform = "translateY(30px)";
    gate.style.transition = "opacity 1s cubic-bezier(0.22, 1, 0.36, 1), transform 1s cubic-bezier(0.22, 1, 0.36, 1)";
    setTimeout(() => {
      gate.style.opacity = "1";
      gate.style.transform = "translateY(0)";
    }, 500 + i * 250);
  });

  // 標題稍早於入口浮現
  const logo = document.querySelector(".portal__logo");
  const tagline = document.querySelector(".portal__tagline");
  if (logo) {
    logo.style.opacity = "0";
    logo.style.transform = "translateY(-15px)";
    logo.style.transition = "opacity 1.2s ease, transform 1.2s ease";
    setTimeout(() => {
      logo.style.opacity = "1";
      logo.style.transform = "translateY(0)";
    }, 200);
  }
  if (tagline) {
    tagline.style.opacity = "0";
    tagline.style.transition = "opacity 1.2s ease 0.4s";
    setTimeout(() => {
      tagline.style.opacity = "1";
    }, 400);
  }
});

// ═══════════════════════════════════════
//  Co-Ops 合作店家彈窗
// ═══════════════════════════════════════

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("coopsBtn");
  const modal = document.getElementById("coopsModal");
  const overlay = modal?.querySelector(".modal__overlay");
  const closeBtn = modal?.querySelector(".modal__close");
  const shopsContainer = document.getElementById("coopsShops");

  if (!btn || !modal) return;

  // 載入合作店家資料
  async function loadShops() {
    try {
      const response = await fetch("assets/coops.json");
      if (!response.ok) throw new Error("載入失敗");
      const shops = await response.json();
      renderShops(shops);
    } catch (err) {
      console.error("載入合作店家失敗:", err);
      shopsContainer.innerHTML = `<p style="color: var(--muted); text-align: center;">⚠ 暫時無法載入</p>`;
    }
  }

function renderShops(shops) {
  shopsContainer.innerHTML = shops.map(shop => `
    <div class="shop-card">
      <div class="shop-card__image">
        <img src="${shop.image}" alt="${shop.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<span class=&quot;shop-card__placeholder&quot;>${shop.name.charAt(0)}</span>'">
      </div>
      <div class="shop-card__info">
        <div class="shop-card__name">${shop.name}</div>
        ${shop.address ? `<div class="shop-card__address">${shop.address}</div>` : ""}
      </div>
    </div>
  `).join("");
}

  function openModal() {
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    if (!shopsContainer.innerHTML) loadShops();
  }

  function closeModal() {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  btn.addEventListener("click", openModal);
  closeBtn?.addEventListener("click", closeModal);
  overlay?.addEventListener("click", closeModal);

  // ESC 鍵關閉
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
});/* ===== 最新通知跳窗 ===== */
(function initNotice() {
  fetch('assets/notice.json', { cache: 'no-store' })
    .then(r => r.ok ? r.json() : null)
    .then(data => {
      if (!data || !data.enabled) return;

      const modal = document.getElementById('notice-modal');
      if (!modal) return;

      // 標題區
      const subtitle = modal.querySelector('.notice-subtitle');
      const title = modal.querySelector('.notice-title');
      subtitle.textContent = data.subtitle || '';
      title.textContent = data.title || '';

      // 引言
      const intro = modal.querySelector('.notice-intro');
      if (data.intro && data.intro.trim()) {
        intro.textContent = data.intro;
        intro.hidden = false;
      }

      // 重點資訊區（highlight）
      const highlight = modal.querySelector('.notice-highlight');
      if (data.highlight && (data.highlight.date || data.highlight.label || (data.highlight.rows && data.highlight.rows.length))) {
        modal.querySelector('.notice-highlight__date').textContent = data.highlight.date || '';
        modal.querySelector('.notice-highlight__label').textContent = data.highlight.label || '';

        const rowsBox = modal.querySelector('.notice-highlight__rows');
        const rows = Array.isArray(data.highlight.rows) ? data.highlight.rows : [];
        rowsBox.innerHTML = rows.map(r => `
          <div class="notice-highlight__time">${r.time || ''}</div>
          <div class="notice-highlight__text">${r.text || ''}</div>
        `).join('');

        highlight.hidden = false;
      }

      // 結尾
      const outro = modal.querySelector('.notice-outro');
      if (data.outro && data.outro.trim()) {
        outro.textContent = data.outro;
        outro.hidden = false;
      }

      // 連結按鈕
      const link = modal.querySelector('.notice-link');
      if (data.linkText && data.linkUrl) {
        link.textContent = data.linkText;
        link.href = data.linkUrl;
        link.hidden = false;
      }

      // 顯示視窗
      modal.hidden = false;

      // 點任意處關閉（連結按鈕除外）
      modal.addEventListener('click', e => {
        if (e.target.closest('.notice-link')) return;
        modal.hidden = true;
      });
    })
    .catch(() => { /* 找不到檔案就靜默略過 */ });
})();