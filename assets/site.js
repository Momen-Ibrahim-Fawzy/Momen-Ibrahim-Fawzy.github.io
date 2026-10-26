(function () {
  var root = document.documentElement;

  // Theme: follows the system unless the visitor picks one (remembered when storage is available)
  try { var saved = localStorage.getItem("theme"); if (saved) root.setAttribute("data-theme", saved); } catch (e) {}
  var themeBtn = document.getElementById("theme");
  if (themeBtn) themeBtn.addEventListener("click", function () {
    var dark = root.getAttribute("data-theme") === "dark" ||
      (!root.getAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches);
    var next = dark ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // Photo: show initials until photo.jpg exists
  document.querySelectorAll(".avatar img").forEach(function (img) {
    img.addEventListener("error", function () { img.remove(); });
    if (img.complete && !img.naturalWidth) img.remove();
  });

  // Watermark demo: the highlighted words are the "green list" picks of a keyed substitution
  var demo = document.getElementById("demo");
  if (demo) {
    var p = demo.querySelector(".text"), btn = demo.querySelector("button"), score = demo.querySelector(".score");
    var greens = (p.getAttribute("data-green") || "").split(",");
    p.innerHTML = p.textContent.trim().split(/(\s+)/).map(function (t) {
      if (/^\s+$/.test(t)) return t;
      var bare = t.replace(/[.,:;!?،؛؟"“”()]/g, "").toLowerCase();
      return '<span class="w' + (greens.indexOf(bare) > -1 ? " g" : "") + '">' + t + "</span>";
    }).join("");
    var n = p.querySelectorAll(".w").length, g = p.querySelectorAll(".w.g").length;
    var z = ((g - 0.25 * n) / Math.sqrt(n * 0.25 * 0.75)).toFixed(1);
    btn.addEventListener("click", function () {
      var on = demo.classList.toggle("on");
      btn.setAttribute("aria-pressed", on);
      btn.textContent = on ? btn.getAttribute("data-hide") : btn.getAttribute("data-show");
      score.textContent = on ? score.getAttribute("data-on").replace("{z}", z) : score.getAttribute("data-off");
    });
  }

  // Email is assembled on click so scrapers don't harvest it
  var mail = document.getElementById("email-btn");
  if (mail) mail.addEventListener("click", function () {
    var a = ["momenibrahimfawzy982000", "gmail.com"].join("@");
    var link = document.createElement("a");
    link.className = "btn filled"; link.href = "mailto:" + a; link.textContent = a; link.dir = "ltr";
    mail.replaceWith(link);
  });

  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();
})();
