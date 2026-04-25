// 進場淡入效果
document.addEventListener("DOMContentLoaded", () => {
  const gates = document.querySelectorAll(".gate");
  gates.forEach((gate, i) => {
    gate.style.opacity = "0";
    gate.style.transform = "translateY(20px)";
    gate.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    setTimeout(() => {
      gate.style.opacity = "1";
      gate.style.transform = "translateY(0)";
    }, 300 + i * 200);
  });
});