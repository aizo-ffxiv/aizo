// ╔══════════════════════════════════════════════════════════════╗
// ║   📋 成員資料 — 機関 KIKAN                                    ║
// ║                                                            ║
// ║   欄位:                                                     ║
// ║     id:        排序用,不顯示在前端                           ║
// ║     name:      中文姓名 (僅在右側詳情顯示)                    ║
// ║     nameEn:    羅馬拼音 (僅在右側詳情顯示)                    ║
// ║     alias:     英文代稱 (列表卡片 & 詳情都會顯示)             ║
// ║     title:     職位 (僅在右側詳情顯示)                       ║
// ║     avatar:    小頭像                                       ║
// ║     photo:     大張直式照片                                  ║
// ║     bio:       簡介(換行用 \n)                              ║
// ║     links:     [{ label, url }]                            ║
// ║                                                            ║
// ╚══════════════════════════════════════════════════════════════╝

const MEMBERS = [
  {
    id: "01",
    name: "伊萊諾斯",
    nameEn: "ILAINOSU",
    alias: "Liminal",
    title: "執行者",
    avatar: "assets/ilainosu_kikan_avatar.png",
    photo: "assets/ilainosu_kikan_photo.png",
    bio: `透過蠶食人心維繫生命，替人解決問題作為美味煩惱的回報。`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@ilainosu.ffxiv?hl=zh-tw" }
    ]
  }
  // ─── 之後新增成員,複製上面格式即可 ───
];


// ──────────────────────────────────────
//  渲染邏輯
// ──────────────────────────────────────

function initials(name) {
  return name ? name.charAt(0) : "?";
}

const MEMBER_MAP = new Map();
MEMBERS.forEach(m => MEMBER_MAP.set(m.id, m));

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
    <div class="member-detail__photo">
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

  // 點擊時讓詳情滾入視窗(桌面版才需要)
  if (scrollToView && window.innerWidth > 900) {
    requestAnimationFrame(() => {
      detail.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}


document.addEventListener("DOMContentLoaded", () => {
  // 自動標記當前頁面導覽列
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar__link").forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("is-active");
    } else {
      link.classList.remove("is-active");
    }
  });

  renderMembers();

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