// 加载注释 JSON 到全局变量
window.stepNotes = {};

fetch("annotation.json")
  .then((res) => res.json())
  .then((notes) => {
    window.stepNotes = notes;
    console.log(notes);
  });

// 显示每一步的 tooltip 注释
window.showStepNote = function (stepIndex, lineNumber, domRoot) {
  console.log("Calling showStepNote on step", stepIndex, "line", lineNumber);

  const allCodeCells = domRoot.find("td.cod");

  // 清除旧的 tooltip
  allCodeCells.each(function () {
    if (this._tippy) {
      this._tippy.destroy();
    }
  });

  // 找到对应的 td
  const targetTd = allCodeCells.get(lineNumber - 1); // 注意是从 0 开始
  const note = window.stepNotes[lineNumber]; // ✅ 改为 lineNumber

  console.log("targetTd is", targetTd);
  console.log("tooltip content is", note);

  // 显示注释
  if (targetTd && note) {
    const tip = tippy(targetTd, {
      content: note,
      showOnCreate: true,
      placement: "right",
      theme: "light-border",
      trigger: "manual",
      hideOnClick: false,
      interactive: true,
    });

    // 添加 IntersectionObserver 监听滚动可视性
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log("🎯 rootBounds:", entry.rootBounds);
          if (entry.isIntersecting) {
            console.log("✅ 可见比例：", entry.intersectionRatio);
            targetTd._tippy?.show();
          } else {
            console.log("❌ 元素被遮挡或不在视野内");
            targetTd._tippy?.hide();
          }
        });
      },
      {
        threshold: 0.5, // 只要 50% 进入就算“在视野内”
      }
    );

    observer.observe(targetTd);
  }
};
