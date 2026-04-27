// ╔══════════════════════════════════════════════════════════════╗
// ║   📋 成員資料 — 機関 KIKAN                                    ║
// ║                                                            ║
// ║   欄位:                                                     ║
// ║     id:        排序用,不顯示在前端                           ║
// ║     name:      中文姓名 (詳情顯示)                            ║
// ║     nameEn:    羅馬拼音 (詳情顯示)                            ║
// ║     alias:     英文代稱 (列表卡片 & 詳情都顯示)               ║
// ║     title:     職位 (詳情顯示)                               ║
// ║     avatar:    小頭像                                       ║
// ║     photo:     大張詳情圖                                    ║
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
  },
  {
    id: "02",
    name: "沄",
    nameEn: "YUN",
    alias: "Mimic",
    title: "幻想藥",
    avatar: "assets/yun_kikan_avatar.png",
    photo: "assets/yun_kikan_photo.png",
    bio: `幻想藥中毒的變色龍，這裡有個隨機掉落的店員、想收集完整版的人設？那得看你與我的緣分了。`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@cc.yday" }
    ]
  },
  {
    id: "03",
    name: "Chichy",
    nameEn: "CHICHY",
    alias: "Chronicle",
    title: "觀測體",
    avatar: "assets/chichy_kikan_avatar.png",
    photo: "assets/chichy_kikan_photo.png",
    bio: `「時間」與「選擇」交織而成的觀測機關。當你感到焦慮、急於尋求出口，卻又在原地打轉時，她便會被激活。在沉淪域最隱密的角落，那雙粉紅長耳下藏著能看透因果的雙眼。`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@crazyrabbit777777" }
    ]
  },
  {
    id: "04",
    name: "東吉",
    nameEn: "DONJI",
    alias: "Confessor",
    title: "諮詢師",
    avatar: "assets/donji_kikan_avatar.png",
    photo: "assets/donji_kikan_photo.png",
    bio: `「在音符落下之前——你是自由的；感受、傾聽，最終被理解。」`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@ericchen0626" }
    ]
  },
  {
    id: "05",
    name: "安緹莉",
    nameEn: "TILLY",
    alias: "Architect",
    title: "築夢師",
    avatar: "assets/tilly_kikan_avatar.png",
    photo: "assets/tilly_kikan_photo.png",
    bio: `只有在裝潢的時候，我感到痛苦並快樂.......`,
    links: []
  },
  {
    id: "06",
    name: "姆姆貓",
    nameEn: "MUMU",
    alias: "Vibe",
    title: "律動",
    avatar: "assets/mumu_kikan_avatar.png",
    photo: "assets/mumu_kikan_photo.png",
    bio: `「在這裡，你是我的玩具。別試圖逃跑，那會讓我更興奮。」`,
    links: []
  },
  {
    id: "07",
    name: "雪冽希鈴",
    nameEn: "SHIREEN",
    alias: "Sentinel",
    title: "邊境的白色魔女",
    avatar: "assets/shireen_kikan_avatar.png",
    photo: "assets/shireen_kikan_photo.png",
    bio: `—在那雨聲迴響朦朧的街燈上，即使你無處可去，但只要有吾在的地方...那就是你的歸屬。`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@silverflag_ffxiv" }
    ]
  },
  {
    id: "08",
    name: "泡泡龍",
    nameEn: "BUBBLE",
    alias: "Mirage",
    title: "接待 / 轉播台",
    avatar: "assets/bubble_kikan_avatar.png",
    photo: "assets/bubble_kikan_photo.png",
    bio: `我是機關的財政總管，以諮詢與執行為名深情擁抱你，讓秘密在氣泡中得到永恆守護。`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@fiori852hz" }
    ]
  },
  {
    id: "09",
    name: "邪惡超布丁",
    nameEn: "PUDDING",
    alias: "Spark",
    title: "老闆娘",
    avatar: "assets/pudding_kikan_avatar.png",
    photo: "assets/pudding_kikan_photo.png",
    bio: `每當直視雙眼的時候，我都看的到你眼底的星空。於是我決定，要讓踏進店裡的你，在這黑白的城市中留下一抹你的色彩。`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@pudd.ind" }
    ]
  },
  {
    id: "10",
    name: "Max",
    nameEn: "",
    alias: "Curator",
    title: "駕駛員",
    avatar: "assets/max_kikan_avatar.png",
    photo: "assets/max_kikan_photo.png",
    bio: `「因果的終點，由我來畫下句點。」`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@max_azk0327?hl=zh-tw" }
    ]
  },
  {
    id: "11",
    name: "貓蟲",
    nameEn: "CATBUG",
    alias: "C.B.",
    title: "意識引導者",
    avatar: "assets/catbug_kikan_avatar.png",
    photo: "assets/catbug_kikan_photo.png",
    bio: `在你徹底迷失之前，我會是這片虛幻中唯一的座標。我一直都在，負責確保你的方位。`,
    links: []
  }
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