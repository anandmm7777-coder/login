let isGenerating = false;
let controller = null;
let currentChat=null;


const chatArea=document.getElementById("chatArea");

const input=document.getElementById("userInput");



window.onload=function(){

loadChats();


let chats=getChats();


if(chats.length){

openChat(chats[0]);

}

else{

currentChat=createChat();

}


};





function sendMessage(){
if(isGenerating){

if(controller){

controller.abort();

}

removeTyping();

isGenerating = false;

setSendButton(false);

return;

}

let text=input.value.trim();


if(!text)return;



if(!currentChat){

currentChat=createChat();

}



addMessage(
"user",
text
);



input.value="";



showTyping();
isGenerating = true;

setSendButton(true);

controller = new AbortController();
const selectedModel =
document.getElementById("modelSelect").value;

// Image Generator Mode


if(selectedModel==="Image"){

removeTyping();

const imageUrl =
"https://image.pollinations.ai/prompt/" +
encodeURIComponent(text) +
"?width=768&height=768&model=flux";

addMessage(
"ai",
`
<div class="image-card">

<div class="loading">
Generating Image...
</div>

<img
class="ai-image"
src="${imageUrl}"
style="display:none;"
onload="
this.style.display='block';
this.previousElementSibling.style.display='none';
"
onerror="
this.previousElementSibling.innerHTML='❌ Image generation failed';
"
>

<div class="image-actions">

<button
class="download-btn"
onclick="window.open('${imageUrl}','_blank')">

Open Full Image

</button>

</div>

</div>
`
);

return;

}
  

  
// Normal AI Chat
askAI(text).then(reply=>{

removeTyping();

const div = document.createElement("div");

div.className="message ai";

div.innerHTML=`
<div class="ai-message">
<div class="typing-text"></div>
<div class="msg-time">
${new Date().toLocaleTimeString([],{
hour:"2-digit",
minute:"2-digit"
})}
</div>
</div>
`;

chatArea.appendChild(div);

const textBox = div.querySelector(".typing-text");

typeMessage(textBox, reply);

});
  
  


}







function addMessage(role,text){



let msg={

role:role,

text:text,

time:new Date().toLocaleTimeString([],{

hour:"2-digit",
minute:"2-digit"

})

};



currentChat.messages.push(msg);


if(currentChat.title==="New Chat"){

currentChat.title=text.substring(0,25);

}



updateChat(currentChat);


renderMessage(msg);


loadChats();


}







function renderMessage(msg){


let div=document.createElement("div");


div.className="message "+msg.role;



div.innerHTML=`

<div class="${msg.role}-message">


${msg.text}


<div class="msg-time">
${msg.time}
</div>

${msg.role==="ai" ? `
<div class="message-actions">

<button class="msg-btn" onclick="copyMessage(this)" title="Copy">

<svg viewBox="0 0 24 24">
<path d="M8 8h11v13H8z"/>
<path d="M5 16H4V4h12v1"/>
</svg>

</button>

<button class="msg-btn" onclick="shareMessage(this)" title="Share">

<svg viewBox="0 0 24 24">
<path d="M18 8a3 3 0 1 0-2.8-4H15a3 3 0 0 0 .2 1L8.9 9a3 3 0 0 0-1.8-.6 3 3 0 1 0 1.8 5.4l6.3 3.9A3 3 0 1 0 16 16a3 3 0 0 0-.2 1l-6.3-3.9"/>
</svg>

</button>

<button class="msg-btn" onclick="likeMessage(this)" title="Like">

<svg viewBox="0 0 24 24" class="action-icon">
<path d="M14 9V5a3 3 0 0 0-3-3l-2 7v13h9a3 3 0 0 0 3-3l1-7a3 3 0 0 0-3-3h-5Z"/>
<path d="M7 22H3V10h4"/>
</svg>

</button>

<button class="msg-btn" onclick="dislikeMessage(this)" title="Dislike">

<svg viewBox="0 0 24 24" class="action-icon">
<path d="M10 15v4a3 3 0 0 0 3 3l2-7V2H6a3 3 0 0 0-3 3l-1 7a3 3 0 0 0 3 3h5Z"/>
<path d="M17 2h4v12h-4"/>
</svg>
</button>

</div>
` : ""}


</div>

`;



chatArea.appendChild(div);


chatArea.scrollTop=chatArea.scrollHeight;


}







function openChat(chat){


currentChat=chat;


chatArea.innerHTML="";


chat.messages.forEach(m=>{

renderMessage(m);

});


}







function loadChats(){


let list=document.getElementById("historyList");


if(!list)return;


list.innerHTML="";



let chats=getChats();



chats.forEach(chat=>{


let div=document.createElement("div");


div.className="history-item";


div.innerText=chat.title;



div.onclick=()=>{

openChat(chat);

};



list.appendChild(div);



});



}








function showTyping(){


let div=document.createElement("div");


div.id="typing";


div.className="message ai";


div.innerHTML=`

<div class="ai-message">

<div class="typing">

<span></span>
<span></span>
<span></span>

</div>

</div>

`;



chatArea.appendChild(div);

chatArea.scrollTop=chatArea.scrollHeight;


}






function removeTyping(){


let t=document.getElementById("typing");


if(t)t.remove();


}

const voiceBtn = document.getElementById("voiceBtn");

if (voiceBtn && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {

const SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = "hi-IN";
recognition.continuous = false;
recognition.interimResults = true;

voiceBtn.addEventListener("click", () => {

recognition.start();

voiceBtn.classList.add("recording");

});

recognition.onresult = (event) => {

let text = "";

for (let i = event.resultIndex; i < event.results.length; i++) {

text += event.results[i][0].transcript;

}

input.value = text;

};

recognition.onend = () => {

voiceBtn.classList.remove("recording");

};

recognition.onerror = () => {

voiceBtn.classList.remove("recording");

alert("Voice recognition failed.");

};

} else {

if (voiceBtn) {

voiceBtn.style.display = "none";

}

}





async function typeMessage(element, text){

element.innerHTML="";

let i=0;

while(i<text.length){

element.innerHTML+=text.charAt(i);

i++;

chatArea.scrollTop=chatArea.scrollHeight;

await new Promise(r=>setTimeout(r,12));

}

}



function copyMessage(btn){

const text =
btn.closest(".ai-message")
.childNodes[0].textContent.trim();

navigator.clipboard.writeText(text);

btn.innerHTML = `
<svg viewBox="0 0 24 24" class="action-icon">
<rect x="9" y="9" width="11" height="11" rx="2"/>
<path d="M5 15V5a2 2 0 0 1 2-2h10"/>
</svg>
`;

setTimeout(()=>{
btn.innerHTML = `
<svg viewBox="0 0 24 24" class="action-icon">
<rect x="9" y="9" width="11" height="11" rx="2"/>
<path d="M5 15V5a2 2 0 0 1 2-2h10"/>
</svg>
`;
},1500);

}




async function shareMessage(btn){

const text =
btn.closest(".ai-message")
.childNodes[0].textContent.trim();

if(navigator.share){

await navigator.share({

text:text

});

}else{

navigator.clipboard.writeText(text);

alert("Copied");

}

}

function likeMessage(btn){

btn.style.color="#22c55e";

}

function dislikeMessage(btn){

btn.style.color="#ef4444";

}
function setSendButton(loading){

const btn = document.querySelector(".send-btn");

if(loading){

btn.innerHTML = `
<svg viewBox="0 0 24 24" width="22" height="22">
<rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor"/>
</svg>
`;

}else{

btn.innerHTML = `
<svg viewBox="0 0 24 24" width="22" height="22">
<path d="M22 2 11 13"/>
<path d="M22 2 15 22 11 13 2 9Z"
fill="none"
stroke="currentColor"
stroke-width="2"/>
</svg>
`;

}

}
