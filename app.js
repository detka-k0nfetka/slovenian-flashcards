const SHEET_ID = '1dZYhC06nLSQQcS5vepXDoxyw6xY2h_SuNu36jEfFYj4'; // replace with your sheet ID
const SHEET_GID = '0'; // sheet gid (tab id)

let units = [];
let currentUnit = 0;
let currentTopic = 0;
let wordIndex = 0;
let show = false;

async function loadData() {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${SHEET_GID}`;

  const res = await fetch(url);
  const csv = await res.text();
  return parseCsv(csv);
}

function parseCsv(text) {
  const lines = text.trim().split('\n');
  const data = {};
  for (const line of lines.slice(1)) {
    const [unit, topic, sl, ru] = line.split(',').map(s => s.trim());
    if (!data[unit]) data[unit] = {};
    if (!data[unit][topic]) data[unit][topic] = [];
    data[unit][topic].push([sl, ru]);
  }
  return Object.entries(data).map(([uName, topics]) => ({
    name: uName,
    topics: Object.entries(topics).map(([tName, words]) => ({ name: tName, words }))
  }));
}

async function init() {
  units = await loadData();
  populateUnitSelect();
  populateTopicSelect();
  render();
}

function populateUnitSelect() {
  const select = document.getElementById('unitSelect');
  select.innerHTML = units.map((u, i) => `<option value="${i}">${u.name}</option>`).join('');
  select.onchange = () => {
    currentUnit = parseInt(select.value, 10);
    currentTopic = 0;
    wordIndex = 0;
    populateTopicSelect();
    render();
  };
}

function populateTopicSelect() {
  const select = document.getElementById('topicSelect');
  const topics = units[currentUnit].topics;
  select.innerHTML = topics.map((t, i) => `<option value="${i}">${t.name}</option>`).join('');
  select.onchange = () => {
    currentTopic = parseInt(select.value, 10);
    wordIndex = 0;
    render();
  };
}

function render() {
  const wordList = units[currentUnit].topics[currentTopic].words;
  const [sl, ru] = wordList[wordIndex];
  document.getElementById('app').innerHTML = `
    <h1>Словенский ⇄ Русский</h1>
    <h3>${units[currentUnit].name} – ${units[currentUnit].topics[currentTopic].name}</h3>
    <h2>${sl} <button onclick="speak('${sl}', 'sl-SI')">🔊</button></h2>
    ${show ? `<p>${ru} <button onclick="speak('${ru}', 'ru-RU')">🔊</button></p>` : ''}
    <div>
      <button onclick="toggle()">${show ? 'Скрыть' : 'Показать'} перевод</button>
      <button onclick="next()">Следующее слово</button>
    </div>
  `;
}

function speak(text, lang) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = lang;
  window.speechSynthesis.speak(msg);
}

function toggle() {
  show = !show;
  render();
}

function next() {
  const words = units[currentUnit].topics[currentTopic].words;
  wordIndex = (wordIndex + 1) % words.length;
  show = false;
  render();
}

document.addEventListener('DOMContentLoaded', init);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
