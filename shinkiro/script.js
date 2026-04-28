// ╔══════════════════════════════════════════════════════════════╗
// ║   蜃気楼 SHINKIRŌ 成員管理                                    ║
// ║                                                            ║
// ║   要新增/修改/刪除成員?                                       ║
// ║   → 編輯 assets/members.json 即可                             ║
// ║   → 不需要碰這個 script.js                                    ║
// ║                                                            ║
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

  if (MEMBERS.length > 0) openMemberDetail(MEMBERS[0].id);
}

function openMemberDetail(id) {
  const member = MEMBER_MAP.get(id);
  if (!member) return;

  const detail = document.getElementById("memberDetail");
  if (!detail) return;

  document.querySelectorAll(".member-card").forEach(c => {
    c.classList.toggle("is-active", c.dataset.id === id);
  });

  const bioHTML = (member.bio || "")
    .split(/\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0)
    .map(p => `<p>${p}</p>`)
    .join("");

  detail.innerHTML = `
    <div class="member-detail__photo" data-ratio="square">
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

  // 自動偵測圖片比例
  const photoBox = detail.querySelector(".member-detail__photo");
  const img = photoBox?.querySelector("img");
  if (img) {
    const detectRatio = () => {
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      if (!w || !h) return;
      const ratio = w / h;
      if (ratio > 1.15) {
        photoBox.setAttribute("data-ratio", "landscape");
      } else if (ratio < 0.85) {
        photoBox.setAttribute("data-ratio", "portrait");
      } else {
        photoBox.setAttribute("data-ratio", "square");
      }
    };
    if (img.complete) detectRatio();
    else img.addEventListener("load", detectRatio);
  }
  // 手機版:點擊後自動滾到詳情區
  if (window.innerWidth <= 900) {
    requestAnimationFrame(() => {
      detail.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
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
    ? `
      <ul class="event-card__highlights">
        ${event.highlights.map(h => `<li>${h}</li>`).join("")}
      </ul>
    ` : "";

  const descriptionHTML = (event.description || "")
    .split(/\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0)
    .map(p => `<p>${p}</p>`)
    .join("");

  const imageHTML = event.image
    ? `<div class="event-card__image"><img src="${event.image}" alt="${event.title}"></div>`
    : "";

  const tagHTML = event.tag
    ? `<span class="event-card__tag">${event.tag}</span>`
    : "";

  return `
    <article class="event-card" data-id="${event.id}">
      ${imageHTML}
      <div class="event-card__body">
        ${tagHTML}
        ${event.subtitle ? `<div class="event-card__subtitle">${event.subtitle}</div>` : ""}
        <h3 class="event-card__title">${event.title}</h3>
        ${event.intro ? `<p class="event-card__intro">${event.intro}</p>` : ""}
        <div class="event-card__meta">
          ${event.date ? `<div class="event-card__meta-item"><span class="event-card__meta-label">DATE</span><span class="event-card__meta-value">${event.date}</span></div>` : ""}
          ${event.time ? `<div class="event-card__meta-item"><span class="event-card__meta-label">TIME</span><span class="event-card__meta-value">${event.time}</span></div>` : ""}
          ${event.location ? `<div class="event-card__meta-item"><span class="event-card__meta-label">PLACE</span><span class="event-card__meta-value">${event.location}</span></div>` : ""}
        </div>
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

async function initEventsPage() {
  const upcomingList = document.getElementById("upcomingList");
  const regularList = document.getElementById("regularList");
  if (!upcomingList && !regularList) return;

  const data = await loadEvents();
  if (!data) {
    if (upcomingList) {
      upcomingList.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: var(--muted);">
          <p>⚠ 無法載入活動資料</p>
        </div>
      `;
    }
    return;
  }

  // 即將舉辦
  if (upcomingList) {
    if (data.upcoming && data.upcoming.length > 0) {
      upcomingList.innerHTML = data.upcoming.map(renderUpcomingEvent).join("");
      document.getElementById("upcomingSection").style.display = "block";
    } else {
      document.getElementById("upcomingSection").style.display = "none";
    }
  }

  // 定期活動
  if (regularList) {
    if (data.regular && data.regular.length > 0) {
      regularList.innerHTML = data.regular.map(renderRegularEvent).join("");
      document.getElementById("regularSection").style.display = "block";
    } else {
      document.getElementById("regularSection").style.display = "none";
    }
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar__link").forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage) link.classList.add("is-active");
    else link.classList.remove("is-active");
  });

if (document.getElementById("membersGrid")) {
    const success = await loadMembers();
    if (success) renderMembers();
  }

  // 載入活動
  await initEventsPage();

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