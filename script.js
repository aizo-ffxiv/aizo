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