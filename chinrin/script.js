// ╔══════════════════════════════════════════════════════════════╗
// ║                                                            ║
// ║   📋 成員資料 — 沉淪域 CHINRIN-IKI                           ║
// ║                                                            ║
// ║   檔名規則: {id}_chinrin_avatar.png                         ║
// ║            {id}_chinrin_photo.png                          ║
// ║                                                            ║
// ╚══════════════════════════════════════════════════════════════╝

const MEMBERS = [
  {
    id: "max",
    name: "MAX",
    nameEn: "MAX",
    title: "機關長",
    avatar: "assets/max_chinrin_avatar.png",
    photo: "assets/max_chinrin_photo.png",
    bio: `我是 Max。今晚，請將你的面具留在門外。`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@max_azk0327?hl=zh-tw" }
    ]
  },
  {
    id: "blpanda",
    name: "我是胖達",
    nameEn: "BLPANDA",
    title: "舞團",
    avatar: "assets/blpanda_chinrin_avatar.png",
    photo: "assets/blpanda_chinrin_photo.png",
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
    avatar: "assets/deepdark_chinrin_avatar.png",
    photo: "assets/deepdark_chinrin_photo.png",
    bio: `付一輩子月費跳一輩子舞，你各位也要來一輩子愛憎喔!（伊萊幫我想）`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@deepdarkfantsy_14" }
    ]
  },
  {
    id: "maru",
    name: "雪小丸",
    nameEn: "MARU",
    title: "樂手 / 舞團",
    avatar: "assets/maru_chinrin_avatar.png",
    photo: "assets/maru_chinrin_photo.png",
    bio: `「有些話說不出口，所以我選擇用琴弦來傳遞這份心情。」`,
    links: []
  },
  {
    id: "shireen",
    name: "雪冽希鈴",
    nameEn: "SHIREEN",
    title: "舞團",
    avatar: "assets/shireen_chinrin_avatar.png",
    photo: "assets/shireen_chinrin_photo.png",
    bio: `在凜冽的王座之上歌唱著旋律—『來吧，一起共舞圓舞曲，從黃昏到黎明...被欲望所填滿，在"依存"的深淵之中...讓我來俯視你...順從就好...順從你的欲望…跪下吧。』`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@snowshireen" }
    ]
  },
  {
    id: "soybean",
    name: "豆漿",
    nameEn: "",
    title: "櫃台",
    avatar: "assets/soybean_chinrin_avatar.png",
    photo: "assets/soybean_chinrin_photo.png",
    bio: `給我魯加男或高原男，我給你我的全部`,
    links: []
  },
  {
    id: "yun",
    name: "沄",
    nameEn: "YUN",
    title: "櫃台",
    avatar: "assets/yun_chinrin_avatar.png",
    photo: "assets/yun_chinrin_photo.png",
    bio: `幻想藥中毒的變色龍，每次遇到的我都不一定會是同樣的。我會推薦適合您的調酒。`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@cc.yday" }
    ]
  },
  {
    id: "noah",
    name: "諾亞恩佩里特",
    nameEn: "NOAH",
    title: "接待 / 轉播台",
    avatar: "assets/noah_chinrin_avatar.png",
    photo: "assets/noah_chinrin_photo.png",
    bio: `正裝/套裝愛好者，偶爾會歪掉的冷面兔男。大家都叫我少爺，在這領域裡，你可以把這稱呼當作是我的真名。

「我的眨眼不代表承諾，但絕對代表我現在只注視著您；如果您不知道該成為什麼樣的面貌，也許能從我的注視裡尋得您想要的答案。」`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@snowshireen" }
    ]
  },
  {
    id: "rug",
    name: "地毯",
    nameEn: "RUG",
    title: "舞團",
    avatar: "assets/rug_chinrin_avatar.png",
    photo: "assets/rug_chinrin_photo.png",
    bio: `閉嘴，踩我。

一想到你的屎沖進下水道和別人的黏在一起我就吃醋。`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@ff14_rug" }
    ]
  },
  {
    id: "cb",
    name: "貓蟲",
    nameEn: "C.B.",
    title: "櫃台",
    avatar: "assets/cb_chinrin_avatar.png",
    photo: "assets/cb_chinrin_photo.png",
    bio: `在你徹底迷失之前，我會是這片虛幻中唯一的座標。我一直都在，負責確保你的方位。`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@silverflag_ffxiv" }
    ]
  },
  {
    id: "ebull",
    name: "牛牛",
    nameEn: "E-BULL",
    title: "舞團",
    avatar: "assets/ebull_chinrin_avatar.png",
    photo: "assets/ebull_chinrin_photo.png",
    bio: `『可以掰我的屁股嗎?我需要幫忙』`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@ilainosu.ffxiv" }
    ]
  },
  {
    id: "heisenberg",
    name: "東吉",
    nameEn: "HEISENBERG",
    title: "內場巡場",
    avatar: "assets/heisenberg_chinrin_avatar.png",
    photo: "assets/heisenberg_chinrin_photo.png",
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
    avatar: "assets/tilly_chinrin_avatar.png",
    photo: "assets/tilly_chinrin_photo.png",
    bio: `神秘的常客，時不時能在這裡看見她的蹤影。`,
    links: []
  },
  {
    id: "chichy",
    name: "是奇奇",
    nameEn: "CHICHY",
    title: "攝影組",
    avatar: "assets/chichy_chinrin_avatar.png",
    photo: "assets/chichy_chinrin_photo.png",
    bio: `80%時間是一隻兔子。觀測命運包含留下時空畫面，記得看到我可以擺個你最有記憶點的姿勢讓我留下時光碎片 💕`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@crazyrabbit777777" }
    ]
  },
  {
    id: "lychee",
    name: "小梨子",
    nameEn: "LYCHEE",
    title: "舞團",
    avatar: "assets/lychee_chinrin_avatar.png",
    photo: "assets/lychee_chinrin_photo.png",
    bio: `在台上，我不是在跳舞，是在收割靈魂。想看我跳舞嗎？先提醒妳，看完之後，妳心裡就再也裝不下別人了。

準備好被我『梨』不開了嗎？`,
    links: []
  },
  {
    id: "jason",
    name: "韓",
    nameEn: "JASON",
    title: "舞團",
    avatar: "assets/jason_chinrin_avatar.png",
    photo: "assets/jason_chinrin_photo.png",
    bio: `「妳一直看我，是有事，還是只是好奇？」

我的兄弟都叫我韓。`,
    links: []
  },
  {
    id: "mumu",
    name: "姆姆貓",
    nameEn: "MUMU",
    title: "舞團",
    avatar: "assets/mumu_chinrin_avatar.png",
    photo: "assets/mumu_chinrin_photo.png",
    bio: `我可是你的學姊呢！所以今天、明天、後天、放學後...所有你覺得寂寞的時間，就來找我吧♡(依萊我努力了TTTTTTT)`,
    links: []
  },
  {
    id: "lio",
    name: "Lio",
    nameEn: "LIO",
    title: "場記",
    avatar: "assets/lio_chinrin_avatar.png",
    photo: "assets/lio_chinrin_photo.png",
    bio: `請悄然前來找我，我習慣將言語沉入更幽深的靜默之中。`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@lio04_26?igshid=NTc4MTIwNjQ2YQ==" }
    ]
  }
];


// ──────────────────────────────────────
//  渲染邏輯(各子站共用)
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
  // 自動標記當前頁面
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