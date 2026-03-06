// --- Firebase Config ---
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "internal-match.firebaseapp.com",
  projectId: "internal-match",
  storageBucket: "internal-match.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// --- Current User ---
let currentUser = null;

// --- Tab Switching ---
function showTab(tab){
  ['profile-tab','people-tab','liked-tab','chats-tab'].forEach(t=>document.getElementById(t).style.display='none');
  document.getElementById(tab+'-tab').style.display='block';
}

// --- Profile ---
function loadUserProfile(){
  if(!currentUser) return;
  const userRef = db.ref('users/'+currentUser.uid);
  userRef.once('value').then(snapshot=>{
    const data = snapshot.val();
    if(!data) return;
    document.getElementById('edit-username').value = data.username || '';
    document.getElementById('edit-email').value = currentUser.email;
    document.getElementById('edit-age').value = data.age || '';
    document.getElementById('edit-location').value = data.location || '';
    document.getElementById('edit-gender').value = data.gender || 'Male';
    document.getElementById('edit-interest').value = data.interest || '';
    document.getElementById('edit-pic').value = data.pic || '';
    document.getElementById('user-profile-pic').src = data.pic || 'https://randomuser.me/api/portraits/lego/1.jpg';
  });
}

function saveProfile(){
  if(!currentUser) return alert("User not logged in");
  const userRef = db.ref('users/'+currentUser.uid);
  userRef.set({
    username: document.getElementById('edit-username').value,
    age: document.getElementById('edit-age').value,
    location: document.getElementById('edit-location').value,
    gender: document.getElementById('edit-gender').value,
    interest: document.getElementById('edit-interest').value,
    pic: document.getElementById('edit-pic').value
  }).then(()=>alert("Profile Saved!"));
}

// --- People Profiles (Swipe) ---
let demoProfiles = [];
for(let i=1;i<=10;i++){
  demoProfiles.push({
    name:'User'+i,
    age: 20+i,
    gender: i%2===0?'Male':'Female',
    location:'City'+i,
    interest:'Friendship',
    pic:`https://randomuser.me/api/portraits/${i%2===0?'men':'women'}/${i}.jpg`,
    liked:false,
    messages:[]
  });
}

let currentIndex=0;
function showProfile(){
  if(currentIndex>=demoProfiles.length){
    document.getElementById('swipe-container').innerHTML="No more profiles!";
    return;
  }
  const p = demoProfiles[currentIndex];
  document.getElementById('swipe-container').innerHTML=`
    <div class="card">
      <img src="${p.pic}" style="width:120px;height:120px;border-radius:50%;">
      <h3>${p.name}, ${p.age}</h3>
      <p>${p.gender} | ${p.location}</p>
      <p>Interest: ${p.interest}</p>
      <button onclick="likeProfile()">💖 Like</button>
      <button onclick="nextProfile()">❌ Skip</button>
    </div>
  `;
}

function likeProfile(){
  demoProfiles[currentIndex].liked = true;
  addLike(demoProfiles[currentIndex]);
  nextProfile();
}

function nextProfile(){
  currentIndex++;
  showProfile();
}

// --- Likes ---
function addLike(profile){
  const container = document.getElementById('liked-container');
  const div = document.createElement('div');
  div.innerText = profile.name + " 💖";
  container.appendChild(div);
}

// --- Chat ---
let currentChat = null;

function startChat(profile){
  currentChat = profile;
  document.getElementById('chats-tab').style.display='block';
  showTab('chats');
  updateChatBox();
}

function sendMessage(){
  if(!currentChat) return;
  const input = document.getElementById('chat-input');
  const text = input.value;
  if(!text) return;
  currentChat.messages.push({from:'You', text:text});
  input.value='';
  updateChatBox();
}

function updateChatBox(){
  const box = document.getElementById('chat-box');
  box.innerHTML='';
  if(!currentChat) return;
  currentChat.messages.forEach(msg=>{
    box.innerHTML+=`<p><strong>${msg.from}:</strong> ${msg.text}</p>`;
  });
}

// --- Auth Check ---
auth.onAuthStateChanged(user=>{
  if(user){
    currentUser=user;
    loadUserProfile();
    showTab('profile');
    showProfile();
  } else {
    window.location='login.html';
  }
});
