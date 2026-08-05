const newChatBtn = document.getElementById("newChatBtn");

const menuBtn = document.getElementById("menuBtn");

const sidebar = document.querySelector(".sidebar");

const overlay = document.getElementById("overlay");

newChatBtn.onclick = function () {

    currentChat = createChat();

    chatArea.innerHTML = "";

    loadChats();

    // Mobile पर New Chat के बाद Sidebar बंद
    sidebar.classList.remove("active");
    overlay.classList.remove("show");

};

if (menuBtn) {

    menuBtn.onclick = function () {

        sidebar.classList.add("active");
        overlay.classList.add("show");

    };

}

if (overlay) {

    overlay.onclick = function () {

        sidebar.classList.remove("active");
        overlay.classList.remove("show");

    };

}
