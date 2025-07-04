const messages = [
  "Hoy, hindi ka nagkamali. So stop breaking yourself😤",
  "Breathe in... breathe out... now smile. Instant therapy 😌",
  "Walang forever sa pain, girl. Pero meron sa Shopee checkout mo 😎",
  "Kung hindi ka niya pinili, edi wag. Mas bagay ka sa mas maayos. Period. 💅",
  "Reminder: You’re a walking warm hug. Hindi lahat kayang magmahal ng ganyan.",
  "Pag pagod ka na, rest—not quit. Sleep muna, world can wait 😴",
  "If feelings could pay rent, rich ka na. Pero hindi, so smile muna 😂",
  "Your heart is gold, pero please wag mo ibigay sa mga discount buyers 😩💔",
  "Today ka lang malungkot, bukas pretty ka ulit. Promise. 💁‍♀️✨",
];

function newMessage() {
  const msg = messages[Math.floor(Math.random() * messages.length)];
  document.getElementById('message').textContent = msg;
}

function toggleMusic() {
  const music = document.getElementById("bgMusic");
  if (music.paused) music.play();
  else music.pause();
}

function bigHug() {
  alert("🤗 Sending a warm hug... tighter than overthinking! 💙");
}

async function askGemini() {
  const inputElement = document.getElementById('userInput');
  const userMessage = inputElement.value.trim();
  const chatThread = document.getElementById('chatThread');

  if (!userMessage) return;

  // Append user message
  const userBubble = document.createElement('div');
  userBubble.className = 'bubble user';
  userBubble.textContent = userMessage;
  chatThread.appendChild(userBubble);

  // Clear input and keep focus
  inputElement.value = '';
  inputElement.focus();

  // Scroll to bottom
  chatThread.scrollTop = chatThread.scrollHeight;

  // Show typing bubble
  const aiBubble = document.createElement('div');
  aiBubble.className = 'bubble ai';
  aiBubble.textContent = 'Typing... 🧠';
  chatThread.appendChild(aiBubble);
  chatThread.scrollTop = chatThread.scrollHeight;

  try {
    const res = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await res.json();

    // Update AI reply bubble
    aiBubble.textContent = data.reply || "Wala akong masabi... pero andito lang ako. 🤍";
  } catch (err) {
    aiBubble.textContent = "Oops, hindi ako makasagot ngayon 😢";
    console.error(err);
  }

  chatThread.scrollTop = chatThread.scrollHeight;
}


document.getElementById('userInput').addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    askGemini();
  }
});
document.getElementById('aiReply').scrollIntoView({ behavior: 'smooth' });
