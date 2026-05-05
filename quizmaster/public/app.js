
const API = "/api";
let questions = [];

async function loadTopics() {
  const res = await fetch(API + "/topics");
  const data = await res.json();
  const select = document.getElementById("topic");
  data.forEach(t => {
    select.innerHTML += `<option value="${t._id}">${t.name}</option>`;
  });
}

async function loadQuiz() {
  const topicId = document.getElementById("topic").value;
  const res = await fetch(`${API}/questions/${topicId}`);
  questions = await res.json();
  let html = "";
  questions.forEach((q, i) => {
    html += `<p>${q.question}</p>`;
    q.options.forEach(opt => {
      html += `<input type="radio" name="q${i}" value="${opt}"> ${opt}<br>`;
    });
  });
  document.getElementById("quiz").innerHTML = html;
}

async function submitQuiz() {
  let score = 0;
  questions.forEach((q, i) => {
    const ans = document.querySelector(`input[name="q${i}"]:checked`);
    if (ans && ans.value === q.answer) score++;
  });
  document.getElementById("result").innerText = `Điểm: ${score}/${questions.length}`;
}

loadTopics();
