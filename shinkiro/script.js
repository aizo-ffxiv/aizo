// ╔══════════════════════════════════════════════════════════════╗
// ║   蜃気楼 SHINKIRŌ                                              ║
// ║                                                              ║
// ║   要新增/修改/刪除成員? → 編輯 assets/members.json              ║
// ║   要修改活動?           → 編輯 assets/events.json               ║
// ║   要修改香檳塔?         → 編輯 assets/cascade.json              ║
// ║   要修改預約?           → 編輯 assets/entry.json                ║
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
//  活動 EVENTS 載入與渲染
// ═══════════════════════════════════════

async function loadEvents() {
  try {
    const response = await fetch("assets/events.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("載入活動資料失敗:", err);
    return null;
  }
}

function renderUpcomingEvent(event) {
  const highlightsHTML = event.highlights && event.highlights.length > 0
    ? `<ul class="event-card__highlights">${event.highlights.map(h => `<li>${h}</li>`).join("")}</ul>`
    : "";

  const descriptionHTML = (event.description || "")
    .split(/\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0)
    .map(p => `<p>${p}</p>`)
    .join("");

  const imageHTML = event.image
    ? `<div class="event-card__image"><img src="${event.image}" alt="${event.title}"></div>`
    : "";

  const tagList = Array.isArray(event.tags) && event.tags.length > 0
    ? event.tags
    : (event.tag ? [event.tag] : []);
  const tagHTML = tagList.length > 0
    ? `<div class="event-card__tags">${tagList.map(t => `<span class="event-card__tag">${t}</span>`).join("")}</div>`
    : "";

  let metaHTML = "";
  if (Array.isArray(event.sessions) && event.sessions.length > 0) {
    const dateHTML = event.date
      ? `<div class="event-card__meta-item"><span class="event-card__meta-label">DATE</span><span class="event-card__meta-value">${event.date}</span></div>`
      : "";
    const sessionsHTML = event.sessions.map(s => `
      <div class="event-session">
        <div class="event-session__name">${s.name || ""}</div>
        <div class="event-session__rows">
          ${s.time ? `<div class="event-session__row"><span class="event-session__label">TIME</span><span class="event-session__value">${s.time}</span></div>` : ""}
          ${s.location ? `<div class="event-session__row"><span class="event-session__label">PLACE</span><span class="event-session__value">${s.location}</span></div>` : ""}
          ${s.access ? `<div class="event-session__row"><span class="event-session__label">ACCESS</span><span class="event-session__value">${s.access}</span></div>` : ""}
        </div>
      </div>
    `).join("");
    metaHTML = `
      <div class="event-card__meta">${dateHTML}</div>
      <div class="event-card__sessions">${sessionsHTML}</div>
    `;
  } else {
    metaHTML = `
      <div class="event-card__meta">
        ${event.date ? `<div class="event-card__meta-item"><span class="event-card__meta-label">DATE</span><span class="event-card__meta-value">${event.date}</span></div>` : ""}
        ${event.time ? `<div class="event-card__meta-item"><span class="event-card__meta-label">TIME</span><span class="event-card__meta-value">${event.time}</span></div>` : ""}
        ${event.location ? `<div class="event-card__meta-item"><span class="event-card__meta-label">PLACE</span><span class="event-card__meta-value">${event.location}</span></div>` : ""}
      </div>
    `;
  }

  return `
    <article class="event-card" data-id="${event.id}">
      ${imageHTML}
      <div class="event-card__body">
        ${tagHTML}
        ${event.subtitle ? `<div class="event-card__subtitle">${event.subtitle}</div>` : ""}
        <h3 class="event-card__title">${event.title}</h3>
        ${event.intro ? `<p class="event-card__intro">${event.intro}</p>` : ""}
        ${metaHTML}
        ${descriptionHTML ? `<div class="event-card__description">${descriptionHTML}</div>` : ""}
        ${highlightsHTML}
      </div>
    </article>
  `;
}

function renderRegularEvent(event) {
  return `
    <article class="event-mini" data-id="${event.id}">
      ${event.tag ? `<span class="event-mini__tag">${event.tag}</span>` : ""}
      ${event.date ? `<div class="event-mini__date">${event.date}</div>` : ""}
      <h3 class="event-mini__title">${event.title}</h3>
      ${event.subtitle ? `<div class="event-mini__subtitle">${event.subtitle}</div>` : ""}
      ${event.time ? `<div class="event-mini__time">${event.time}</div>` : ""}
      ${event.intro ? `<p class="event-mini__intro">${event.intro}</p>` : ""}
    </article>
  `;
}

function renderPastEvent(event) {
  const tagList = Array.isArray(event.tags) && event.tags.length > 0
    ? event.tags
    : (event.tag ? [event.tag] : []);
  const tagsHTML = tagList.length > 0
    ? `<div class="past-event__tags">${tagList.map(t => `<span class="past-event__tag">${t}</span>`).join("")}</div>`
    : "";

  const descHTML = (event.description || "")
    .split(/\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0)
    .map(p => `<p class="past-event__desc">${p}</p>`)
    .join("");

  const sessionsHTML = Array.isArray(event.sessions) && event.sessions.length > 0
    ? `
      <div class="past-event__section-label">SESSIONS</div>
      <div class="past-event__sessions">
        ${event.sessions.map(s => `
          <div class="past-event__session">
            <div class="past-event__session-name">${s.name || ""}</div>
            ${s.time ? `<div class="past-event__session-row"><span class="past-event__session-label">TIME</span><span>${s.time}</span></div>` : ""}
            ${s.location ? `<div class="past-event__session-row"><span class="past-event__session-label">PLACE</span><span>${s.location}</span></div>` : ""}
            ${s.access ? `<div class="past-event__session-row"><span class="past-event__session-label">ACCESS</span><span>${s.access}</span></div>` : ""}
          </div>
        `).join("")}
      </div>
    ` : "";

  const highlightsHTML = Array.isArray(event.highlights) && event.highlights.length > 0
    ? `
      <div class="past-event__section-label">HIGHLIGHTS</div>
      <div class="past-event__highlights">
        ${event.highlights.map(h => `<span class="past-event__highlight">${h}</span>`).join("")}
      </div>
    ` : "";

  const hasDetails = event.intro || descHTML || sessionsHTML || highlightsHTML;

  const bodyHTML = hasDetails ? `
    <div class="past-event__body">
      <div class="past-event__body-inner">
        ${event.intro ? `<p class="past-event__intro">${event.intro}</p>` : ""}
        ${sessionsHTML}
        ${descHTML ? `<div class="past-event__section-label">DESCRIPTION</div>${descHTML}` : ""}
        ${highlightsHTML}
      </div>
    </div>
  ` : "";

  const arrowHTML = hasDetails ? `<span class="past-event__arrow">▾</span>` : "";
  const clickableClass = hasDetails ? "is-clickable" : "";

  return `
    <article class="past-event ${clickableClass}" data-id="${event.id}">
      <div class="past-event__head">
        ${event.date ? `<span class="past-event__date">${event.date}</span>` : ""}
        <div class="past-event__main">
          <h3 class="past-event__title">${event.title}</h3>
          ${event.subtitle ? `<div class="past-event__subtitle">${event.subtitle}</div>` : ""}
          ${tagsHTML}
        </div>
        ${arrowHTML}
      </div>
      ${bodyHTML}
    </article>
  `;
}

async function initEventsPage() {
  const upcomingList = document.getElementById("upcomingList");
  const regularList = document.getElementById("regularList");
  const pastList = document.getElementById("pastList");
  if (!upcomingList && !regularList && !pastList) return;

  const data = await loadEvents();
  if (!data) {
    if (upcomingList) {
      upcomingList.innerHTML = `<div style="text-align: center; padding: 3rem; color: var(--muted);"><p>⚠ 無法載入活動資料</p></div>`;
    }
    return;
  }

  if (upcomingList) {
    if (data.upcoming && data.upcoming.length > 0) {
      upcomingList.innerHTML = data.upcoming.map(renderUpcomingEvent).join("");
      const sec = document.getElementById("upcomingSection");
      if (sec) sec.style.display = "block";
    } else {
      const sec = document.getElementById("upcomingSection");
      if (sec) sec.style.display = "none";
    }
  }

  if (regularList) {
    if (data.regular && data.regular.length > 0) {
      regularList.innerHTML = data.regular.map(renderRegularEvent).join("");
      const sec = document.getElementById("regularSection");
      if (sec) sec.style.display = "block";
    } else {
      const sec = document.getElementById("regularSection");
      if (sec) sec.style.display = "none";
    }
  }

  if (pastList) {
    if (data.past && data.past.length > 0) {
      const sorted = [...data.past].sort((a, b) => {
        const ka = a.sortKey || a.id || "";
        const kb = b.sortKey || b.id || "";
        return kb.localeCompare(ka);
      });
      pastList.innerHTML = sorted.map(renderPastEvent).join("");
      const sec = document.getElementById("pastSection");
      if (sec) sec.style.display = "block";
    } else {
      const sec = document.getElementById("pastSection");
      if (sec) sec.style.display = "none";
    }
  }
}

// ═══════════════════════════════════════
//  CASCADE 香檳塔頁面
// ═══════════════════════════════════════

async function loadCascade() {
  try {
    const response = await fetch("assets/cascade.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("載入香檳塔資料失敗:", err);
    return null;
  }
}

function renderCascadeTier(tier, romanIdx) {
  const romans = ["Ⅰ", "Ⅱ", "Ⅲ"];
  const accessHTML = tier.access
    ? `<div class="cascade-tier__access">${tier.access}</div>` : "";
  const positioningHTML = tier.positioning
    ? `<div class="cascade-tier__positioning">${tier.positioning}</div>` : "";
  const perksHTML = Array.isArray(tier.perks) && tier.perks.length > 0
    ? `
      <div class="cascade-tier__perks-label">— FLOW ・ 流程 —</div>
      <ul class="cascade-tier__perks">${tier.perks.map(p => `<li>${p}</li>`).join("")}</ul>
    ` : "";

  return `
    <div class="cascade-tier">
      <div class="cascade-tier__roman">${romans[romanIdx] || ""}</div>
      <div class="cascade-tier__name">${tier.name || ""}</div>
      ${tier.nameJp ? `<div class="cascade-tier__name-jp">${tier.nameJp}</div>` : ""}
      <div class="cascade-tier__bottles">${tier.bottles || ""}</div>
      ${accessHTML}
      ${positioningHTML}
      ${perksHTML}
    </div>
  `;
}

function renderCascadeRanking(ranking) {
  if (!ranking || !Array.isArray(ranking.entries) || ranking.entries.length === 0) {
    const sec = document.getElementById("cascadeRankingSection");
    if (sec) sec.style.display = "none";
    return;
  }

  const entries = ranking.entries.slice(0, 10);
  const podium = entries.slice(0, 3);
  const rest = entries.slice(3, 10);

  const podiumHTML = podium.map((entry, i) => {
    const rank = i + 1;
    const medals = ["I", "II", "III"];
    const firstChar = entry.name ? entry.name.charAt(0) : "?";

    // ✨ blur-bg
    const photoBgStyle = entry.photo
      ? `style="--photo-bg: url('${entry.photo}')"`
      : '';

    const photoHTML = entry.photo
      ? `<img src="${entry.photo}" alt="${entry.name}" onerror="this.outerHTML='<div class=\\'cascade-podium-photo-placeholder\\'>${firstChar}</div>'">`
      : `<div class="cascade-podium-photo-placeholder">${firstChar}</div>`;

    return `
      <div class="cascade-podium-card cascade-podium-card--${rank}">
        <div class="cascade-podium-medal">${medals[i]}</div>
        <div class="cascade-podium-photo-wrap" ${photoBgStyle}>
          ${photoHTML}
        </div>
        <div class="cascade-podium-name">${entry.name || ""}</div>
        <div class="cascade-podium-count">
          ${entry.count || 0}<span class="cascade-podium-count-unit">支</span>
        </div>
      </div>
    `;
  }).join("");

  const restHTML = rest.map((entry, i) => {
    const rank = i + 4;
    return `
      <div class="cascade-rest__row">
        <div class="cascade-rest__rank">${rank}</div>
        <div class="cascade-rest__name">${entry.name || ""}</div>
        <div class="cascade-rest__count">${entry.count || 0}<span class="cascade-rest__count-unit">支</span></div>
      </div>
    `;
  }).join("");

  const podiumWrap = document.getElementById("cascadePodium");
  const restWrap = document.getElementById("cascadeRest");
  const updatedEl = document.getElementById("cascadeUpdated");

  if (podiumWrap) podiumWrap.innerHTML = podiumHTML;
  if (restWrap) restWrap.innerHTML = restHTML;
  if (updatedEl) {
    if (ranking.lastUpdated) {
      updatedEl.textContent = `LAST UPDATED ・ ${ranking.lastUpdated}`;
    } else {
      updatedEl.style.display = "none";
    }
  }
}

async function initCascadePage() {
  const tiersWrap = document.getElementById("cascadeTiers");
  if (!tiersWrap) return;

  const data = await loadCascade();
  if (!data) {
    tiersWrap.innerHTML = `<div style="text-align: center; padding: 3rem; color: var(--muted); grid-column: 1 / -1;"><p>⚠ 無法載入香檳塔資料</p></div>`;
    return;
  }

  // 渲染三檔位
  if (Array.isArray(data.tiers)) {
    tiersWrap.innerHTML = data.tiers.map((t, i) => renderCascadeTier(t, i)).join("");
  }

  // intro
  const introEl = document.getElementById("cascadeIntro");
  if (introEl && data.intro) introEl.textContent = data.intro;

  // 基礎單價
  const baseSection = document.getElementById("cascadeBasePrice");
  if (baseSection && data.basePrice && data.basePrice.amount) {
    const labelEl = document.getElementById("cascadeBasePriceLabel");
    const amountEl = document.getElementById("cascadeBasePriceAmount");
    const unitEl = document.getElementById("cascadeBasePriceUnit");
    if (labelEl) labelEl.textContent = data.basePrice.label || "";
    if (amountEl) amountEl.textContent = data.basePrice.amount || "";
    if (unitEl) unitEl.textContent = data.basePrice.unit || "";
    baseSection.hidden = false;
  }

  // 排名
  renderCascadeRanking(data.ranking);
}

// ═══════════════════════════════════════
//  ENTRY 預約頁面
// ═══════════════════════════════════════

async function loadEntry() {
  try {
    const response = await fetch("assets/entry.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("載入預約資料失敗:", err);
    return null;
  }
}

function renderEntryCard(card, label) {
  const perksHTML = Array.isArray(card.perks) && card.perks.length > 0
    ? `<ul class="entry-card__perks">${card.perks.map(p => `<li>${p}</li>`).join("")}</ul>`
    : "";

  const priceHTML = card.price ? `
    <div class="entry-card__price">
      <span class="entry-card__price-amount">${card.price}</span>
      ${card.priceNote ? `<span class="entry-card__price-note">${card.priceNote}</span>` : ""}
    </div>
  ` : "";

  return `
    <div class="entry-card">
      <div class="entry-card__label">${label}</div>
      <div class="entry-card__title">${card.title || ""}</div>
      ${card.subtitle ? `<div class="entry-card__subtitle">${card.subtitle}</div>` : ""}
      ${card.slots ? `<div class="entry-card__slots">${card.slots}</div>` : ""}
      ${priceHTML}
      ${card.desc ? `<div class="entry-card__desc">${card.desc}</div>` : ""}
      ${perksHTML}
    </div>
  `;
}

function renderEntryGuideline(g) {
  const itemsHTML = Array.isArray(g.items) && g.items.length > 0
    ? `<ul class="entry-guideline__list">${g.items.map(i => `<li>${i}</li>`).join("")}</ul>`
    : "";

  return `
    <div class="entry-guideline">
      <div class="entry-guideline__head">
        <div class="entry-guideline__title">${g.title || ""}</div>
        ${g.titleEn ? `<div class="entry-guideline__title-en">${g.titleEn}</div>` : ""}
      </div>
      ${itemsHTML}
    </div>
  `;
}

async function initEntryPage() {
  const reservationsWrap = document.getElementById("entryReservations");
  const guidelinesWrap = document.getElementById("entryGuidelines");
  if (!reservationsWrap && !guidelinesWrap) return;

  const data = await loadEntry();
  if (!data) {
    if (reservationsWrap) {
      reservationsWrap.innerHTML = `<div style="text-align: center; padding: 3rem; color: var(--muted); grid-column: 1 / -1;"><p>⚠ 無法載入預約資料</p></div>`;
    }
    return;
  }

  if (reservationsWrap) {
    let html = "";
    if (data.vip) html += renderEntryCard(data.vip, "VIP RESERVATION");
    if (data.general) html += renderEntryCard(data.general, "GENERAL RESERVATION");
    reservationsWrap.innerHTML = html;
  }

  if (guidelinesWrap && Array.isArray(data.guidelines)) {
    guidelinesWrap.innerHTML = data.guidelines.map(renderEntryGuideline).join("");
  }
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

  // 活動頁
  await initEventsPage();

  // 香檳塔頁
  await initCascadePage();

  // 預約頁
  await initEntryPage();

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

// ===== 過往活動展開/收合 =====
document.addEventListener('click', e => {
  const card = e.target.closest('.past-event.is-clickable');
  if (!card) return;
  card.classList.toggle('is-open');
});