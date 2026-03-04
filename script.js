// --- TAB SYSTEM ---
function showTab(tab){
  ['profile-tab','people-tab','liked-tab','chats-tab'].forEach(t=>{
    document.getElementById(t).style.display = (t === tab+'-tab') ? 'block' : 'none';
  });
}
showTab('profile');

// --- DEMO PROFILES ---
let profiles = [
  {name:"Emily",age:23,gender:"Female",location:"USA",interest:"Friends 💚",pic:"https://randomuser.me/api/portraits/women/44.jpg"},
  {name:"Daniel",age:27,gender:"Male",location:"UK",interest:"Football",pic:"https://randomuser.me/api/portraits/men/32.jpg"},
  {name:"Sophia",age:22,gender:"Female",location:"Paris",interest:"Hangout 🩵",pic:"https://randomuser.me/api/portraits/women/1.jpg"}
];

let currentIndex = 0;
let likes = [];
let chatMessages = {};
const swipeContainer = document.getElementById('swipe-container');
const likedContainer = document.getElementById('liked-container');
const chatBox = document.getElementById('chat-box');
const chatUsersDiv = document.getElementById('chat-users');

// --- SHOW PROFILE SWIPE ---
function showProfile(){
  if(currentIndex >= profiles.length){
    swipeContainer.innerHTML = "No more profiles!";
    return;
  }
  const p = profiles[currentIndex];
  swipeContainer.innerHTML = `
    <div class="card">
      <img src="${p.pic}" width="100%">
      <h3>${p.name}, ${p.age}</h3>
      <p>${p.gender} | ${p.location}</p>
      <p>Interest: ${p.interest}</p>
      <button onclick="likeProfile()">💖 Like</button>
      <button onclick="ignoreProfile()">❌ Ignore</button>
      <button onclick="startChat('${p.name}')">💬 Message</button>
    </div>
  `;
}
showProfile();

function likeProfile(){
  likes.push(profiles[currentIndex]);
  updateLikes();
  currentIndex++;
  showProfile();
}
function ignoreProfile(){
  currentIndex++;
  showProfile();
}
function updateLikes(){
  likedContainer.innerHTML = likes.map(l=>`<div class="card">${l.name}, ${l.age}</div>`).join('');
}

// --- CHAT ---
function startChat(name){
  if(!chatMessages[name]) chatMessages[name] = [];
  showTab('chats');
  updateChatUsers();
  openChat(name);
}
function updateChatUsers(){
  chatUsersDiv.innerHTML = Object.keys(chatMessages).map(u=>`<div onclick="openChat('${u}')">${u}</div>`).join('');
}
let currentChatUser = "";
function openChat(user){
  currentChatUser = user;
  chatBox.innerHTML = chatMessages[user].map(m=>`<p>${m}</p>`).join('');
}
function sendMessage(){
  const msg = document.getElementById('messageInput').value;
  if(!msg) return;
  chatMessages[currentChatUser].push("You: "+msg);
  document.getElementById('messageInput').value = "";
  openChat(currentChatUser);
}

// --- PROFILE SAVE ---
function saveProfile(){
  alert("Profile saved!");
}
