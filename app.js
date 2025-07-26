
const wordList = [
  ["človek len", "ленивый человек"],
  ["požeruh", "обжора"],
  ["skopuh", "скупой"],
  ["pijan", "пьяный"],
  ["trezen", "трезвый"],
  ["suša", "засуха"],
  ["poplava", "наводнение"],
  ["požar", "пожар"],
  ["kaznivo dejanje", "преступное деяние"],
  ["pokrajina", "регион"],
  ["samostojnost", "независимость"],
  ["darilo", "подарок"],
  ["žep", "карман"],
  ["žur", "вечеринка"],
  ["čevlji", "обувь"],
  ["obleka", "одежда"],
  ["ura", "часы"],
  ["zapestnica", "браслет"],
  ["verižica", "цепочка"]
];

let index = 0;
let show = false;

function render() {
  const [sl, ru] = wordList[index];
  document.getElementById("app").innerHTML = `
    <h1>Словенский ⇄ Русский</h1>
    <h2>${sl}</h2>
    ${show ? `<p>${ru}</p>` : ""}
    <div>
      <button onclick="toggle()">${show ? "Скрыть" : "Показать"} перевод</button>
      <button onclick="next()">Следующее слово</button>
    </div>
  `;
}

function toggle() {
  show = !show;
  render();
}

function next() {
  index = (index + 1) % wordList.length;
  show = false;
  render();
}

render();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
