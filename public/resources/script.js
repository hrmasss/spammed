const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];

const themeTrigger = $("#theme-trigger");
let themeIndex = Math.floor(Math.random() * themes.length);

const setTheme = function (theme) {
  $("html").attr("data-theme", theme);
};

const nextTheme = function () {
  setTheme(themes[themeIndex]);
  if (themeIndex === themes.length - 1) {
    themeIndex = 0;
  } else {
    themeIndex++;
  }
};

themeTrigger.on("click", nextTheme);

nextTheme();
