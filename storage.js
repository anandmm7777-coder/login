const STORAGE_KEY = "future_ai_chats";


function getChats(){

let data = localStorage.getItem(STORAGE_KEY);

return data ? JSON.parse(data) : [];

}



function saveChats(chats){

localStorage.setItem(
STORAGE_KEY,
JSON.stringify(chats)
);

}



function createChat(){

let chats=getChats();


let chat={

id:Date.now(),

title:"New Chat",

messages:[]

};


chats.unshift(chat);


saveChats(chats);


return chat;

}



function updateChat(chat){

let chats=getChats();


let index=chats.findIndex(
c=>c.id===chat.id
);


if(index!==-1){

chats[index]=chat;

}


saveChats(chats);

}



function deleteAllChats(){

localStorage.removeItem(STORAGE_KEY);

}
