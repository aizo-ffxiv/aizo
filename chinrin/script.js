// ╔══════════════════════════════════════════════════════════════╗
// ║   沈淪域 CHINRIN-IKI                                          ║
// ║                                                              ║
// ║   要新增/修改/刪除成員? → 編輯 assets/members.json              ║
// ║   要修改酒單?           → 編輯 assets/menu.json                 ║
// ║                                                              ║
// ╚══════════════════════════════════════════════════════════════╝

let MEMBERS = [];
const MEMBER_MAP = new Map();

function initials(name) {
  return name ? name.charAt(0) : "?";
}

async function loadMembers() {
  try {
    const response = await fetch("assets/members.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    MEMBERS = await response.json();
    MEMBERS.forEach(m => MEMBER_MAP.set(m.id, m));
    return true;
  } catch (err) {
    console.error("載入成員資料失敗:", err);
    const grid = document.getElementById("membersGrid");
    if (grid) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--muted);">
          <p style="margin-bottom: 0.5rem;">⚠ 無法載入成員資料</p>
          <p style="font-size: 0.8rem; opacity: 0.6;">請確認 assets/members.json 是否存在且格式正確</p>
        </div>
      `;
    }
    return false;
  }
}

function renderMembers() {
  const grid = document.getElementById("membersGrid");
  if (!grid) return;

  grid.innerHTML = MEMBERS.map((m, i) => {
    const avatarHTML = m.avatar
      ? `<img src="${m.avatar}" alt="${m.alias || m.name}" onerror="this.outerHTML='<span class=\\'member-card__initials\\'>${initials(m.alias || m.name)}</span>'">`
      : `<span class="member-card__initials">${initials(m.alias || m.name)}</span>`;

    return `
      <div class="member-card" data-id="${m.id}" style="animation-delay: ${i * 0.04}s">
        <div class="member-card__avatar">${avatarHTML}</div>
        <div class="member-card__alias">${m.alias || m.name}</div>
      </div>
    `;
  }).join("");

  grid.querySelectorAll(".member-card").forEach(card => {
    card.addEventListener("click", () => openMemberDetail(card.dataset.id));
  });

  // 桌機版：預設展開第一位
  if (MEMBERS.length > 0 && window.innerWidth > 900) {
    openMemberDetail(MEMBERS[0].id);
  }
}

function buildMemberDetailHTML(member) {
  const bioHTML = (member.bio || "")
    .split(/\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0)
    .map(p => `<p>${p}</p>`)
    .join("");

  const photoBgStyle = member.photo
    ? `style="--photo-bg: url('${member.photo}')"`
    : '';

  return `
    <div class="member-detail__photo" data-ratio="square" ${photoBgStyle}>
      ${member.photo
        ? `<img src="${member.photo}" alt="${member.name}" onerror="this.outerHTML='<div class=\\'member-detail__photo-placeholder\\'>PHOTO</div>'">`
        : `<div class="member-detail__photo-placeholder">PHOTO</div>`}
    </div>
    <div>
      <div class="member-detail__info">
        <div class="member-detail__info-text">
          ${member.title ? `<div class="member-detail__title">${member.title}</div>` : ""}
          <div class="member-detail__name">${member.name}</div>
          ${member.nameEn ? `<div class="member-detail__name-en">${member.nameEn}</div>` : ""}
        </div>
        ${member.alias ? `<div class="member-detail__alias-big">${member.alias}</div>` : ""}
      </div>
      <div class="member-detail__bio">${bioHTML}</div>
      ${member.links && member.links.length > 0 ? `
        <div class="member-detail__links">
          ${member.links.map(l => `<a href="${l.url}" class="member-detail__link" target="_blank">→ ${l.label}</a>`).join("")}
        </div>
      ` : ""}
    </div>
  `;
}

function attachPhotoRatioDetect(container) {
  const photoBox = container.querySelector(".member-detail__photo");
  const img = photoBox?.querySelector("img");
  if (!img) return;
  const detectRatio = () => {
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    if (!w || !h) return;
    const ratio = w / h;
    if (ratio > 1.15) photoBox.setAttribute("data-ratio", "landscape");
    else if (ratio < 0.85) photoBox.setAttribute("data-ratio", "portrait");
    else photoBox.setAttribute("data-ratio", "square");
  };
  if (img.complete) detectRatio();
  else img.addEventListener("load", detectRatio);
}

function openMemberDetail(id) {
  const member = MEMBER_MAP.get(id);
  if (!member) return;

  document.querySelectorAll(".member-card").forEach(c => {
    c.classList.toggle("is-active", c.dataset.id === id);
  });

  const isMobile = window.innerWidth <= 900;
  const html = buildMemberDetailHTML(member);

  if (isMobile) {
    const modal = document.getElementById("memberModal");
    const target = document.getElementById("memberDetailMobile");
    if (!modal || !target) return;
    target.innerHTML = html;
    attachPhotoRatioDetect(target);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  } else {
    const target = document.getElementById("memberDetail");
    if (!target) return;
    target.innerHTML = html;
    attachPhotoRatioDetect(target);
  }
}

function closeMemberModal() {
  const modal = document.getElementById("memberModal");
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  document.querySelectorAll(".member-card.is-active").forEach(c => c.classList.remove("is-active"));
}

// ═══════════════════════════════════════
//  MENU 酒單頁
// ═══════════════════════════════════════

async function loadMenu() {
  try {
    const response = await fetch("assets/menu.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("載入酒單資料失敗:", err);
    return null;
  }
}

function renderMenuItem(item, idx) {
  const romans = ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ", "Ⅷ", "Ⅸ", "Ⅹ"];
  const roman = romans[idx] || (idx + 1);

  const imageAlt = item.name ? `飲品：${item.name}` : "MENU 圖片";
  const imageHTML = item.image
    ? `<div class="menu-item__image"><img src="${item.image}" alt="${imageAlt}"></div>`
    : "";

  return `
    <article class="menu-item" style="animation-delay: ${idx * 0.05}s">
      ${imageHTML}
      <div class="menu-item__content">
        <div class="menu-item__head">
          <div class="menu-item__roman">${roman}</div>
          <div class="menu-item__title-block">
            <div class="menu-item__name">${item.name || ""}</div>
            ${item.nameJp ? `<div class="menu-item__name-jp">${item.nameJp}</div>` : ""}
            ${item.nameEn ? `<div class="menu-item__name-en">${item.nameEn}</div>` : ""}
          </div>
          ${item.price ? `<div class="menu-item__price">${item.price}<span class="menu-item__price-unit">${item.priceUnit || "GIL"}</span></div>` : ""}
        </div>
        ${item.desc ? `<p class="menu-item__desc">${item.desc}</p>` : ""}
        ${item.quote ? `<div class="menu-item__quote">「${item.quote}」</div>` : ""}
      </div>
    </article>
  `;
}

async function initMenuPage() {
  const list = document.getElementById("menuList");
  if (!list) return;

  const data = await loadMenu();
  if (!data || !Array.isArray(data) || data.length === 0) {
    list.innerHTML = `<div style="text-align: center; padding: 3rem; color: var(--muted); grid-column: 1 / -1;"><p>⚠ 無法載入酒單</p></div>`;
    return;
  }

  list.innerHTML = data.map((item, i) => renderMenuItem(item, i)).join("");
}

// ═══════════════════════════════════════
//  初始化
// ═══════════════════════════════════════

document.addEventListener("DOMContentLoaded", async () => {
  // 自動標記當前頁面導覽列
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar__link").forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage) link.classList.add("is-active");
    else link.classList.remove("is-active");
  });

  // 成員頁
  if (document.getElementById("membersGrid")) {
    const success = await loadMembers();
    if (success) renderMembers();

    // 詳情跳窗（手機版用）關閉事件
    const modal = document.getElementById("memberModal");
    if (modal) {
      const overlay = modal.querySelector(".member-modal__overlay");
      const closeBtn = modal.querySelector(".member-modal__close");
      overlay?.addEventListener("click", closeMemberModal);
      closeBtn?.addEventListener("click", closeMemberModal);
      document.addEventListener("keydown", e => {
        if (e.key === "Escape" && modal.classList.contains("is-open")) closeMemberModal();
      });
    }
  }

  // 酒單頁
  await initMenuPage();

  // 漢堡選單
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("is-open");
      menu.classList.toggle("is-open");
      document.body.style.overflow = menu.classList.contains("is-open") ? "hidden" : "";
    });

    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        toggle.classList.remove("is-open");
        menu.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }
});