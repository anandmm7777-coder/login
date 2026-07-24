/* ======================================================
   Ramphal Memorial Inter College
   splash.js
   Part 3A-1
====================================================== */

"use strict";

/* ==========================================
   DOM Elements
========================================== */

const splash = document.getElementById("splash");

const mainWebsite = document.getElementById("mainWebsite");

const progressBar = document.getElementById("progressBar");

const percent = document.getElementById("percent");

/* ==========================================
   Loading Variables
========================================== */

let loading = 0;

const maxLoading = 100;

let loadingFinished = false;

/* ==========================================
   Utility Function
========================================== */

function updateLoader(value){

    progressBar.style.width = value + "%";

    percent.textContent = value + "%";

}

/* ==========================================
   Initialize
========================================== */

document.addEventListener("DOMContentLoaded",()=>{

    updateLoader(0);

});

/* ======================================================
   splash.js
   Part 3A-2
   Loading Animation
====================================================== */

/* ==========================================
   Loading Animation
========================================== */

function startLoading(){

    const timer = setInterval(() => {

        if(loading >= maxLoading){

            clearInterval(timer);

            loadingFinished = true;

            finishSplash();

            return;

        }

        /* Random Speed */

        loading += Math.floor(Math.random() * 4) + 1;

        if(loading > maxLoading){

            loading = maxLoading;

        }

        updateLoader(loading);

    }, 60);

}

/* ==========================================
   Start Loading
========================================== */

window.addEventListener("load", () => {

    startLoading();

});

/* ======================================================
   splash.js
   Part 3A-3
   Finish Splash & Show Website
====================================================== */

/* ==========================================
   Finish Splash
========================================== */

// function finishSplash(){

//     if(!loadingFinished) return;

//     /* Small Delay */

//     setTimeout(() => {

//         /* Hide Splash */

//         splash.classList.add("hide");

//         /* Show Website */

//         setTimeout(() => {

//             splash.style.display = "none";

//             mainWebsite.style.display = "block";

//             mainWebsite.classList.add("show");

//         },800);

//     },500);

// }

function finishSplash(){

    if(!loadingFinished) return;


    setTimeout(()=>{


        // Splash Hide Animation

        splash.classList.add("hide");


        setTimeout(()=>{


            // Direct Login Page

            window.location.href = "login.html";


        },800);


    },500);

}

/* ==========================================
   Safety Check
========================================== */

window.addEventListener("error",(e)=>{

    console.error("Splash Error :",e.message);

});

/* ==========================================
   Console Message
========================================== */

console.log(
"%c Ramphal Memorial Inter College ",
"background:#0D47A1;color:#fff;padding:8px 12px;border-radius:6px;font-size:14px;font-weight:bold;"
);

console.log("Splash Screen Loaded Successfully");

/* ======================================================
   splash.js
   Part 3A-4
   Device & Connection Check
====================================================== */


/* ==========================================
   Device Detection
========================================== */

function detectDevice(){

    const width = window.innerWidth;

    let device = "Desktop";

    if(width <= 768){

        device = "Mobile";

    }
    else if(width <= 1024){

        device = "Tablet";

    }

    console.log("Device:", device);

    return device;

}


/* ==========================================
   Internet Check
========================================== */

function checkInternet(){

    if(navigator.onLine){

        console.log("Internet Connected");

        return true;

    }
    else{

        console.log("Offline Mode");

        return false;

    }

}


/* ==========================================
   System Check
========================================== */

function systemCheck(){

    const device = detectDevice();

    const internet = checkInternet();


    return {

        device:device,

        internet:internet,

        time:new Date()

    };

}


/* Run System Check */

const systemStatus = systemCheck();

console.log(systemStatus);

/* ======================================================
   splash.js
   Part 3A-5
   Session Check Preparation
====================================================== */


/* ==========================================
   Session Manager
========================================== */

const SessionManager = {


    /* Save User Session */

    saveSession(user){

        localStorage.setItem(
            "schoolUser",
            JSON.stringify(user)
        );

    },


    /* Get User Session */

    getSession(){

        const user =
        localStorage.getItem("schoolUser");


        if(user){

            return JSON.parse(user);

        }

        return null;

    },


    /* Remove Session */

    logout(){

        localStorage.removeItem("schoolUser");

    }


};


/* ==========================================
   Check Existing User
========================================== */

function checkSession(){

    const user =
    SessionManager.getSession();


    if(user){

        console.log(
            "Existing User Found:",
            user.role
        );

        return true;

    }
    else{

        console.log(
            "No Active Session"
        );

        return false;

    }

}


/* ==========================================
   Initialize Session Check
========================================== */

window.addEventListener(
"load",
()=>{

    const active =
    checkSession();


    if(active){

        console.log(
        "Preparing Dashboard..."
        );

    }
    else{

        console.log(
        "Opening Login..."
        );

    }

});

/* ======================================================
   splash.js
   Part 3A-6
   Final Splash Security Preparation
====================================================== */


/* ==========================================
   Generate Device Token
========================================== */

function generateDeviceToken(){

    let token =
    localStorage.getItem("deviceToken");


    if(!token){

        token =
        "RMIC-" +
        Date.now() +
        "-" +
        Math.random()
        .toString(36)
        .substring(2);


        localStorage.setItem(
            "deviceToken",
            token
        );

    }


    return token;

}


/* ==========================================
   Device Session Check
========================================== */

function deviceSessionCheck(){

    const token =
    generateDeviceToken();


    console.log(
        "Device Token:",
        token
    );


    return token;

}


/* ==========================================
   Redirect Manager
========================================== */

function redirectManager(){

    const user =
    SessionManager.getSession();


    if(user){

        console.log(
        "Redirecting to Dashboard"
        );

        // Future:
        // window.location.href="dashboard.html"

    }
    else{

        console.log(
        "Redirecting to Login"
        );

        // Future:
        // window.location.href="login.html"

    }

}


/* ==========================================
   Final Splash Ready
========================================== */

window.addEventListener(
"load",
()=>{


    deviceSessionCheck();


    setTimeout(()=>{


        console.log(
        "Splash System Ready"
        );


        // redirectManager();


    },1000);


});