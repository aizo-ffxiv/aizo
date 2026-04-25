// ╔══════════════════════════════════════════════════════════════╗
// ║                                                            ║
// ║   📋 成員資料 — 蜃気楼 SHINKIRŌ                              ║
// ║                                                            ║
// ║   檔名規則: {id}_shinkiro_avatar.png                        ║
// ║            {id}_shinkiro_photo.png                         ║
// ║                                                            ║
// ╚══════════════════════════════════════════════════════════════╝

const MEMBERS = [
  {
    id: "max",
    name: "MAX",
    nameEn: "MAX",
    title: "機關長",
    avatar: "assets/max_shinkiro_avatar.png",
    photo: "assets/max_shinkiro_photo.png",
    bio: `我是 Max。在泡沫破滅前，盡情起舞吧。`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@max_azk0327?hl=zh-tw" }
    ]
  },
  {
    id: "blpanda",
    name: "我是胖達",
    nameEn: "BLPANDA",
    title: "舞團",
    avatar: "assets/blpanda_shinkiro_avatar.png",
    photo: "assets/blpanda_shinkiro_photo.png",
    bio: `『無論遇到什麼困難，屁股永遠在你身後。』我是胖達☆*―公肥控！立志當WAX的狗。`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@blpanda_1123?hl=zh-tw" }
    ]
  },
  {
    id: "deepdark",
    name: "月費",
    nameEn: "",
    title: "舞團",
    avatar: "assets/deepdark_shinkiro_avatar.png",
    photo: "assets/deepdark_shinkiro_photo.png",
    bio: `付一輩子月費跳一輩子舞，你各位也要來一輩子愛憎喔!（伊萊幫我想）`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@deepdarkfantsy_14" }
    ]
  },
  {
    id: "shireen_maru",
    name: "雪冽希鈴 & 雪小丸",
    nameEn: "SHIREEN & MARU",
    title: "舞團",
    avatar: "assets/shireen_maru_shinkiro_avatar.png",
    photo: "assets/shireen_maru_shinkiro_photo.png",
    bio: `―「在我們之間，沒有祕密，只有共鳴。命運...將你.我.緊緊相連。」`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@snowshireen" }
    ]
  },
  {
    id: "soybean",
    name: "豆漿",
    nameEn: "",
    title: "櫃台",
    avatar: "assets/soybean_shinkiro_avatar.png",
    photo: "assets/soybean_shinkiro_photo.png",
    bio: `給我魯加男或高原男，我給你我的全部`,
    links: []
  },
  {
    id: "yun",
    name: "沄",
    nameEn: "YUN",
    title: "櫃台",
    avatar: "assets/yun_shinkiro_avatar.png",
    photo: "assets/yun_shinkiro_photo.png",
    bio: `幻想藥中毒的變色龍，每次遇到的我都不一定會是同樣的。我會推薦適合您的調酒。`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@cc.yday" }
    ]
  },
  {
    id: "rug",
    name: "地毯",
    nameEn: "RUG",
    title: "舞",
    avatar: "assets/rug_shinkiro_avatar.png",
    photo: "assets/rug_shinkiro_photo.png",
    bio: `閉嘴，踩我。

一想到你的屎沖進下水道和別人的黏在一起我就吃醋。`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@ff14_rug" }
    ]
  },
  {
    id: "mumu",
    name: "姆姆貓",
    nameEn: "MUMU",
    title: "舞團",
    avatar: "assets/mumu_shinkiro_avatar.png",
    photo: "assets/mumu_shinkiro_photo.png",
    bio: `我可是你的學姊呢！所以今天、明天、後天、放學後...所有你覺得寂寞的時間，就來找我吧♡(依萊我努力了TTTTTTT)`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@mumu.ff14" }
    ]
  },
  {
    id: "cb",
    name: "貓蟲",
    nameEn: "C.B.",
    title: "櫃台",
    avatar: "assets/cb_shinkiro_avatar.png",
    photo: "assets/cb_shinkiro_photo.png",
    bio: `在你徹底迷失之前，我會是這片虛幻中唯一的座標。我一直都在，負責確保你的方位。`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@silverflag_ffxiv" }
    ]
  },
  {
    id: "ebull",
    name: "牛牛",
    nameEn: "E-BULL",
    title: "舞團長",
    avatar: "assets/ebull_shinkiro_avatar.png",
    photo: "assets/ebull_shinkiro_photo.png",
    bio: `[你問我為什麼穿衣服? 穿了你只會問我是誰]`,
    links: []
  },
  {
    id: "lychee",
    name: "小梨子",
    nameEn: "LYCHEE",
    title: "舞團",
    avatar: "assets/lychee_shinkiro_avatar.png",
    photo: "assets/lychee_shinkiro_photo.png",
    bio: `有人說梨子吃起來清甜，但我的舞……可能會讓你有點『上火』。

接下來這幾分鐘，你的眼睛歸我管。準備好感受這份危險的甜味了嗎？`,
    links: []
  },
  {
    id: "taro",
    name: "芋頭",
    nameEn: "TARO",
    title: "舞團",
    avatar: "assets/taro_shinkiro_avatar.png",
    photo: "assets/taro_shinkiro_photo.png",
    bio: `26年2月1日在海督遇見牛哥從此之後走上這條牛郎之路 (伊萊救救我...)`,
    links: [
      { label: "Threads", url: "https://www.threads.com/?hl=zh-tw" }
    ]
  },
  {
    id: "chichy",
    name: "是奇奇",
    nameEn: "CHICHY",
    title: "攝影組",
    avatar: "assets/chichy_shinkiro_avatar.png",
    photo: "assets/chichy_shinkiro_photo.png",
    bio: `80%時間是一隻兔子。觀測命運包含留下時空畫面，記得看到我可以擺個你最有記憶點的姿勢讓我留下時光碎片 💕`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@crazyrabbit777777" }
    ]
  },
  {
    id: "heisenberg",
    name: "東吉",
    nameEn: "HEISENBERG",
    title: "內場巡場",
    avatar: "assets/heisenberg_shinkiro_avatar.png",
    photo: "assets/heisenberg_shinkiro_photo.png",
    bio: `阿咪狗，你要不要來點GOOD SHIT，我這邊有一批很屌的開心龍男汁，喝了包爽。`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@ericchen0626" }
    ]
  },
  {
    id: "tilly",
    name: "安緹莉",
    nameEn: "TILLY",
    title: "內場巡場",
    avatar: "assets/tilly_shinkiro_avatar.png",
    photo: "assets/tilly_shinkiro_photo.png",
    bio: `神秘的常客，時不時會在這裡看見她的蹤影。`,
    links: []
  },
  {
    id: "jason",
    name: "韓",
    nameEn: "JASON",
    title: "舞團",
    avatar: "assets/jason_shinkiro_avatar.png",
    photo: "assets/jason_shinkiro_photo.png",
    bio: `我的兄弟都叫我韓。`,
    links: []
  },
  {
    id: "lio",
    name: "Lio",
    nameEn: "LIO",
    title: "場記",
    avatar: "assets/lio_shinkiro_avatar.png",
    photo: "assets/lio_shinkiro_photo.png",
    bio: `在迷失於無邊的浮光掠影前，請記得我這裡永遠為你留著位置。`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@lio04_26?igshid=NTc4MTIwNjQ2YQ==" }
    ]
  }
];


// ──────────────────────────────────────
//  渲染邏輯(與其他子站共用)
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
    const isLeader = i === 0;
    const number = String(i + 1).padStart(2, "0");

    const avatarHTML = m.avatar
      ? `<img src="${m.avatar}" alt="${m.name}" onerror="this.outerHTML='<span class=\\'member-card__initials\\'>${initials(m.name)}</span>'">`
      : `<span class="member-card__initials">${initials(m.name)}</span>`;

    return `
      <div class="member-card ${isLeader ? "is-leader" : ""}" data-id="${m.id}" style="animation-delay: ${i * 0.04}s">
        <div class="member-card__number">${number}</div>
        ${isLeader ? `<div class="member-card__badge">LEADER</div>` : ""}
        <div class="member-card__avatar">${avatarHTML}</div>
        <div class="member-card__name">${m.name}</div>
        <div class="member-card__title">${m.title || ""}</div>
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
    <div class="member-detail__info">
      ${member.title ? `<div class="member-detail__title">${member.title}</div>` : ""}
      <div class="member-detail__name">${member.name}</div>
      ${member.nameEn ? `<div class="member-detail__name-en">${member.nameEn}</div>` : ""}
      <div class="member-detail__bio">${bioHTML}</div>
      ${member.links && member.links.length > 0 ? `
        <div class="member-detail__links">
          ${member.links.map(l => `<a href="${l.url}" class="member-detail__link" target="_blank">→ ${l.label}</a>`).join("")}
        </div>
      ` : ""}
    </div>
  `;

  detail.scrollTop = 0;
}


document.addEventListener("DOMContentLoaded", () => {
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