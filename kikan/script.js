// ╔══════════════════════════════════════════════════════════════╗
// ║   機関 KIKAN                                                   ║
// ║                                                              ║
// ║   要新增/修改/刪除成員? → 編輯 assets/members.json              ║
// ║   要修改服務?           → 編輯 assets/services.json             ║
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
//  SERVICES 服務頁
// ═══════════════════════════════════════

let SERVICES = [];

async function loadServices() {
  try {
    const response = await fetch("assets/services.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    SERVICES = await response.json();
    return true;
  } catch (err) {
    console.error("載入服務資料失敗:", err);
    return false;
  }
}

function renderServices() {
  const grid = document.getElementById("servicesGrid");
  if (!grid) return;

  if (MEMBERS.length === 0) {
    grid.innerHTML = `<p style="color: var(--muted); text-align: center; padding: 3rem; grid-column: 1 / -1;">⚠ 成員資料尚未載入</p>`;
    return;
  }

  grid.innerHTML = SERVICES.map((s, i) => {
    const member = MEMBER_MAP.get(s.memberId);
    if (!member) return "";

    const avatarHTML = member.avatar
      ? `<img src="${member.avatar}" alt="${member.alias || member.name}" onerror="this.outerHTML='<span class=\\'service-card__initials\\'>${initials(member.alias || member.name)}</span>'">`
      : `<span class="service-card__initials">${initials(member.alias || member.name)}</span>`;

    const itemsHTML = Array.isArray(s.items) && s.items.length > 0
      ? s.items.map(item => {
          const hasPrice = item.price && item.price.trim();
          const subNameHTML = item.subName ? `<span class="service-card__item-subname">${item.subName}</span>` : "";
          const noteHTML = item.note ? `<span class="service-card__item-note">${item.note}</span>` : "";
          return `
            <li class="service-card__item">
              <div class="service-card__item-namewrap">
                <span class="service-card__item-name">${item.name || ""}</span>
                ${subNameHTML}
              </div>
              <span class="service-card__item-leader" aria-hidden="true"></span>
              <div class="service-card__item-pricewrap">
                <span class="service-card__item-price${hasPrice ? "" : " service-card__item-price--empty"}">${hasPrice ? item.price : "詳情請洽詢"}</span>
                ${noteHTML}
              </div>
            </li>
          `;
        }).join("")
      : `<li class="service-card__item service-card__item--placeholder">服務內容待補上</li>`;

    return `
      <article class="service-card" data-id="${s.memberId}" role="button" tabindex="0" aria-label="預約 ${member.name}" style="animation-delay: ${i * 0.05}s">
        <header class="service-card__header">
          <div class="service-card__avatar">${avatarHTML}</div>
          <div class="service-card__meta">
            ${member.title ? `<div class="service-card__role">${member.title}</div>` : ``}
            <div class="service-card__name">${member.name}</div>
            ${member.nameEn ? `<div class="service-card__name-en">${member.nameEn}</div>` : ``}
          </div>
          ${member.alias ? `<div class="service-card__alias">${member.alias}</div>` : ``}
        </header>
        <ul class="service-card__items">
          ${itemsHTML}
        </ul>
      </article>
    `;
  }).join("");

  // 點卡片即開啟預約 modal
  grid.querySelectorAll(".service-card").forEach(card => {
    const open = () => {
      const id = card.dataset.id;
      if (id) openBookingModal(id);
    };
    card.addEventListener("click", open);
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  });
}

async function initServicesPage() {
  const grid = document.getElementById("servicesGrid");
  if (!grid) return;

  await loadMembers();
  await loadServices();
  await loadConfig();
  renderServices();
}

// ═══════════════════════════════════════
//  BOOKING 預約功能
// ═══════════════════════════════════════

let CONFIG = {};
let BOOKING_CURRENT_MEMBER_ID = null;
const BOOKING_THROTTLE_MS = 30000;
const BOOKING_LAST_KEY = "kikan_booking_last_submit";

async function loadConfig() {
  try {
    const response = await fetch("assets/config.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    CONFIG = await response.json();
  } catch (err) {
    console.warn("載入 config.json 失敗，預約服務將停用:", err);
    CONFIG = {};
  }
}

function isWebhookConfigured() {
  const url = CONFIG && CONFIG.discordWebhookUrl;
  if (typeof url !== "string") return false;
  const trimmed = url.trim();
  if (trimmed === "") return false;
  if (trimmed.includes("<貼這裡>") || trimmed.includes("<paste-here>")) return false;
  return /^https:\/\/discord\.com\/api\/webhooks\//.test(trimmed);
}

function escapeForOption(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

function formatServiceLabel(item) {
  if (!item) return "";
  const subName = item.subName ? `（${item.subName}）` : "";
  const note = item.note ? ` ・ ${item.note}` : "";
  const price = item.price && item.price.trim() ? ` — ${item.price.trim()}` : "";
  return `${item.name || ""}${subName}${price}${note}`;
}

function openBookingModal(memberId) {
  const member = MEMBER_MAP.get(memberId);
  const service = SERVICES.find(s => s.memberId === memberId);
  if (!member || !service) return;

  BOOKING_CURRENT_MEMBER_ID = memberId;

  const modal = document.getElementById("bookingModal");
  const form = document.getElementById("bookingForm");
  const closedBlock = document.getElementById("bookingClosed");

  // 不開放預約：顯示關閉狀態，隱藏表單
  if (service.bookable === false) {
    if (form) form.hidden = true;
    if (closedBlock) closedBlock.hidden = false;
    if (modal) {
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    return;
  }

  // 可預約：顯示表單、隱藏關閉狀態
  if (form) form.hidden = false;
  if (closedBlock) closedBlock.hidden = true;

  // 店員資訊
  const staffEl = document.getElementById("bookingStaffValue");
  if (staffEl) {
    const aliasPart = member.alias ? ` ・ ${member.alias}` : "";
    staffEl.textContent = `${member.name}${aliasPart}`;
  }

  // 服務下拉
  const serviceSelect = document.getElementById("bookingService");
  if (serviceSelect) {
    const items = Array.isArray(service.items) ? service.items : [];
    serviceSelect.innerHTML = '<option value="">— 請選擇 —</option>' +
      items.map(item => {
        const label = formatServiceLabel(item);
        return `<option value="${escapeForOption(label)}">${escapeForOption(label)}</option>`;
      }).join("");
  }

  // 時段下拉
  const slotSelect = document.getElementById("bookingSlot");
  if (slotSelect) {
    const slots = Array.isArray(service.slots) ? service.slots : [];
    if (slots.length === 0) {
      slotSelect.innerHTML = '<option value="">（暫無可預約時段，請另洽）</option>';
      slotSelect.disabled = true;
    } else {
      slotSelect.disabled = false;
      slotSelect.innerHTML = '<option value="">— 請選擇 —</option>' +
        slots.map(s => `<option value="${escapeForOption(s)}">${escapeForOption(s)}</option>`).join("");
    }
  }

  // 重置欄位
  if (form) {
    const nameInput = form.querySelector('input[name="name"]');
    const discordInput = form.querySelector('input[name="discord"]');
    const honeypotInput = form.querySelector('input[name="website"]');
    const noteInput = form.querySelector('textarea[name="note"]');
    if (nameInput) nameInput.value = "";
    if (discordInput) discordInput.value = "";
    if (honeypotInput) honeypotInput.value = "";
    if (noteInput) noteInput.value = "";
    setBookingMessage("", "");
    const submitBtn = document.getElementById("bookingSubmit");
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "送出預約";
    }
  }

  if (modal) {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    // 自動聚焦到第一個輸入欄
    setTimeout(() => {
      const firstInput = modal.querySelector('input[name="name"]');
      if (firstInput) firstInput.focus();
    }, 100);
  }
}

function closeBookingModal() {
  const modal = document.getElementById("bookingModal");
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  BOOKING_CURRENT_MEMBER_ID = null;
}

function setBookingMessage(text, type) {
  const el = document.getElementById("bookingMessage");
  if (!el) return;
  el.textContent = text || "";
  el.className = "booking-form__message" + (type ? ` booking-form__message--${type}` : "");
}

async function handleBookingSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const submitBtn = document.getElementById("bookingSubmit");

  // honeypot：若被填，靜默 reject
  const honeypot = form.querySelector('input[name="website"]');
  if (honeypot && honeypot.value.trim() !== "") {
    setBookingMessage("提交失敗，請重新嘗試。", "error");
    return;
  }

  // 30 秒節流
  const lastSubmit = parseInt(sessionStorage.getItem(BOOKING_LAST_KEY) || "0", 10);
  const now = Date.now();
  if (lastSubmit && now - lastSubmit < BOOKING_THROTTLE_MS) {
    const wait = Math.ceil((BOOKING_THROTTLE_MS - (now - lastSubmit)) / 1000);
    setBookingMessage(`請稍候 ${wait} 秒後再送出。`, "error");
    return;
  }

  // 取值
  const data = new FormData(form);
  const name = (data.get("name") || "").toString().trim();
  const discord = (data.get("discord") || "").toString().trim();
  const service = (data.get("service") || "").toString().trim();
  const slot = (data.get("slot") || "").toString().trim();
  const note = (data.get("note") || "").toString().trim();

  // 必填驗證
  if (!name || !discord || !service || !slot) {
    setBookingMessage("請填寫所有必填欄位（標 * 者）。", "error");
    return;
  }

  // webhook 設定檢查
  if (!isWebhookConfigured()) {
    setBookingMessage("預約服務尚未啟用，請聯繫管理員。", "error");
    return;
  }

  // 取得成員顯示名稱
  const member = MEMBER_MAP.get(BOOKING_CURRENT_MEMBER_ID);
  const memberDisplay = member
    ? (member.alias ? `${member.name} ・ ${member.alias}` : member.name)
    : "—";

  // 組 webhook payload（embed 格式，紅色 #c8102e）
  const payload = {
    embeds: [{
      title: "✨ 新預約 ・ NEW BOOKING",
      color: 0xc8102e,
      fields: [
        { name: "店員", value: memberDisplay, inline: false },
        { name: "服務", value: service, inline: true },
        { name: "時段", value: slot, inline: true },
        { name: "賓客", value: name, inline: true },
        { name: "Discord", value: discord, inline: true },
        { name: "備註", value: note || "—", inline: false }
      ],
      footer: { text: "蜃気樓 機関 ・ KIKAN" },
      timestamp: new Date().toISOString()
    }]
  };

  // 送出
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "送出中...";
  }
  setBookingMessage("", "");

  try {
    const response = await fetch(CONFIG.discordWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Webhook returned ${response.status}`);
    }

    sessionStorage.setItem(BOOKING_LAST_KEY, String(Date.now()));
    setBookingMessage("預約成功！我們會透過 Discord 與您聯繫。", "success");
    if (submitBtn) submitBtn.textContent = "已送出";

    setTimeout(() => closeBookingModal(), 2500);
  } catch (err) {
    console.error("Booking submission failed:", err);
    setBookingMessage("送出失敗，請稍後再試或直接聯繫管理員。", "error");
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "送出預約";
    }
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

  // 服務頁
  if (document.getElementById("servicesGrid")) {
    await initServicesPage();

    // 預約 modal 關閉事件
    const bookingModal = document.getElementById("bookingModal");
    if (bookingModal) {
      bookingModal.querySelector(".booking-modal__overlay")?.addEventListener("click", closeBookingModal);
      bookingModal.querySelector(".booking-modal__close")?.addEventListener("click", closeBookingModal);
      document.addEventListener("keydown", e => {
        if (e.key === "Escape" && bookingModal.classList.contains("is-open")) closeBookingModal();
      });
    }

    // 預約表單送出事件
    const bookingForm = document.getElementById("bookingForm");
    if (bookingForm) bookingForm.addEventListener("submit", handleBookingSubmit);
  }

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