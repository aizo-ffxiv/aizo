// ╔══════════════════════════════════════════════════════════════╗
// ║                                                            ║
// ║   📋 成員資料                                                ║
// ║                                                            ║
// ║   第一筆 = 主管 (會標示為 LEADER)                            ║
// ║   其餘 = 成員                                               ║
// ║                                                            ║
// ║   每個人的欄位:                                              ║
// ║     id:       識別碼 (英文,不重複)                           ║
// ║     name:     姓名                                         ║
// ║     nameEn:   英文/羅馬拼音                                  ║
// ║     title:    職稱                                         ║
// ║     avatar:   小頭像 (卡片上顯示)                            ║
// ║     photo:    大張直式照片 (右側顯示)                         ║
// ║     bio:      簡介                                         ║
// ║     links:    [{ label, url }]  社群連結                    ║
// ║                                                            ║
// ╚══════════════════════════════════════════════════════════════╝

const MEMBERS = [
  {
    id: "max",
    name: "Max",
    nameEn: "MAX",
    title: "機關長",
    avatar: "assets/max_kikan_avatar.png",
    photo: "assets/max_kikan_photo.png",
    bio: `我是 Max。這裡不處理瑣事，我們只負責處理遺憾。`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@max_azk0327?hl=zh-tw" }
    ]
  },
  {
    id: "ilainosu",
    name: "伊萊諾斯",
    nameEn: "ILAINOSU",
    title: "執行者",
    avatar: "assets/ilainosu_kikan_avatar.png",
    photo: "assets/ilainosu_kikan_photo.png",
    bio: `在開幕前不請自來的新面孔，四處打工的偶像，深夜時會成為機關的執行者，透過蠶食人心維繫生命，替人解決問題作為美味煩惱的回報。`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@ilainosu.ffxiv?hl=zh-tw" }
    ]
  },
  {
    id: "chichy",
    name: "是奇奇",
    nameEn: "CHICHY",
    title: "命運觀測體",
    avatar: "assets/chichy_kikan_avatar.png",
    photo: "assets/chichy_kikan_photo.png",
    bio: `「時間」與「選擇」交織而成的觀測機關。當你感到焦慮、急於尋求出口，卻又在原地打轉時，她便會被激活。在沉淪域最隱密的角落，那雙粉紅長耳下藏著能看透因果的雙眼。`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@crazyrabbit777777" }
    ]
  },
  {
    id: "blpanda",
    name: "我是胖達",
    nameEn: "BLPANDA",
    title: "Wax的狗",
    avatar: "assets/blpanda_kikan_avatar.png",
    photo: "assets/blpanda_kikan_photo.png",
    bio: `『無論遇到什麼困難，屁股永遠在你身後。』我是胖達☆*―公肥控！龍女型態依舊是Wax的狗！`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@blpanda_1123?hl=zh-tw" }
    ]
  },
  {
    id: "yun",
    name: "沄",
    nameEn: "YUN",
    title: "幻想藥",
    avatar: "assets/yun_kikan_avatar.png",
    photo: "assets/yun_kikan_photo.png",
    bio: `幻想藥中毒的變色龍，這裡有個隨機掉落的店員、想收集完整版的人設？那得看你與我的緣分了。

簽繪服務(限額)文案：在曖昧的燈光下，想留下我們共處的證據嗎？
【愛憎】 限定「特製簽繪拍立得」，捕捉你我目光交會的剎那。

我會在相片上留下屬於我們的暗號，
讓這份午夜的悸動，成為你最珍貴的收藏。

🌙 可和店員挑選想要的動作或情境，最後由店員拍照與後製簽繪。
🔗 注意事項: 數量有限，請儘速向店員點購。簽繪工作天數３～５個工作天。
💌 領取方式: 共用雲端網址、發脆、或由店員私發給您。`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@cc.yday" }
    ]
  },
  {
    id: "shireen",
    name: "雪冽希鈴",
    nameEn: "SHIREEN",
    title: "邊境的白色魔女",
    avatar: "assets/shireen_kikan_avatar.png",
    photo: "assets/shireen_kikan_photo.png",
    bio: `—在那雨聲迴響朦朧的街燈上，即使你無處可去，但只要有吾在的地方...那就是你的歸屬。`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@snowshireen" }
    ]
  },
  {
    id: "noah",
    name: "諾亞恩佩里特",
    nameEn: "NOAH",
    title: "接待 / 轉播台",
    avatar: "assets/noah_kikan_avatar.png",
    photo: "assets/noah_kikan_photo.png",
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
    title: "舞",
    avatar: "assets/rug_kikan_avatar.png",
    photo: "assets/rug_kikan_photo.png",
    bio: `閉嘴，踩我。

一想到你的屎沖進下水道和別人的黏在一起我就吃醋。`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@ff14_rug" }
    ]
  },
  {
    id: "tilly",
    name: "安緹莉",
    nameEn: "TILLY",
    title: "業餘裝潢師",
    avatar: "assets/tilly_kikan_avatar.png",
    photo: "assets/tilly_kikan_photo.png",
    bio: `只有在裝潢的時候，我感到痛苦並快樂......`,
    links: []
  },
  {
    id: "cb",
    name: "貓蟲",
    nameEn: "C.B.",
    title: "意識引導者",
    avatar: "assets/cb_kikan_avatar.png",
    photo: "assets/cb_kikan_photo.png",
    bio: `在你徹底迷失之前，我會是這片虛幻中唯一的座標。我一直都在，負責確保你的方位。`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@silverflag_ffxiv" }
    ]
  },
  {
    id: "heisenberg",
    name: "東吉",
    nameEn: "HEISENBERG",
    title: "諮詢師",
    avatar: "assets/heisenberg_kikan_avatar.png",
    photo: "assets/heisenberg_kikan_photo.png",
    bio: `在樂聲與沉默之間，為你的秘密留一席之地。

感情、兩性、人際、生活、工作——皆可受理，感受、傾聽，最終被理解。`,
    links: [
      { label: "Threads", url: "https://www.threads.com/@ericchen0626" }
    ]
  },
  {
    id: "jason",
    name: "韓",
    nameEn: "JASON",
    title: "舞",
    avatar: "assets/jason_kikan_avatar.png",
    photo: "assets/jason_kikan_photo.png",
    bio: `他不是那種一眼就很熱情的人，反而安靜得有點過分，但只要妳踏進他的世界，就很難再離開。

我的兄弟都叫我韓。`,
    links: []
  },
  {
    id: "mumu",
    name: "姆姆貓",
    nameEn: "MUMU",
    title: "",
    avatar: "assets/mumu_kikan_avatar.png",
    photo: "assets/mumu_kikan_photo.png",
    bio: `哇勒`,
    links: []
  }
];


// ──────────────────────────────────────
//  以下為渲染邏輯,一般不需修改
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
      <div class="member-card ${isLeader ? "is-leader" : ""}" data-id="${m.id}" style="animation-delay: ${i * 0.05}s">
        <div class="member-card__number">${number}</div>
        ${isLeader ? `<div class="member-card__badge">LEADER</div>` : ""}
        <div class="member-card__avatar">${avatarHTML}</div>
        <div class="member-card__name">${m.name}</div>
        <div class="member-card__title">${m.title || ""}</div>
      </div>
    `;
  }).join("");

  grid.querySelectorAll(".member-card").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.dataset.id;
      openMemberDetail(id);
    });
  });

  if (MEMBERS.length > 0) {
    openMemberDetail(MEMBERS[0].id);
  }
}

function openMemberDetail(id) {
  const member = MEMBER_MAP.get(id);
  if (!member) return;

  const detail = document.getElementById("memberDetail");
  if (!detail) return;

  document.querySelectorAll(".member-card").forEach(c => {
    c.classList.toggle("is-active", c.dataset.id === id);
  });

  // 把 bio 的換行轉換成 <br>，保留段落感
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


// ╔══════════════════════════════════════════════════╗
// ║   漢堡選單                                        ║
// ╚══════════════════════════════════════════════════╝

document.addEventListener("DOMContentLoaded", () => {
  // 自動標記當前頁面的導覽列連結
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar__link").forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("is-active");
    } else {
      link.classList.remove("is-active");
    }
  });

  // 成員頁面初始化
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