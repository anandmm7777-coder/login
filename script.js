/*=========================================
  PREMIUM SPLASH SCREEN
  P3-A1
=========================================*/

const progressFill = document.querySelector(".progress-fill");
const percentage = document.getElementById("percentage");
const loadingText = document.getElementById("loadingText");

let progress = 0;

/* Loading Messages */

const messages = [

"लोड हो रहा है...",

"डेटा तैयार किया जा रहा है...",

"इंटरफ़ेस प्रारंभ हो रहा है...",

"संसाधन लोड हो रहे हैं...",

"लगभग तैयार है..."

];

/* Change Message */

function updateMessage(value){

if(value < 20){

loadingText.textContent = messages[0];

}

else if(value < 40){

loadingText.textContent = messages[1];

}

else if(value < 60){

loadingText.textContent = messages[2];

}

else if(value < 85){

loadingText.textContent = messages[3];

}

else{

loadingText.textContent = messages[4];

}

}

/* Progress Animation */

const loading = setInterval(()=>{

progress += 1;

progressFill.style.width = progress + "%";

percentage.textContent = progress + "%";

updateMessage(progress);

/* Small Random Effect */

progressFill.style.filter =
`brightness(${1 + Math.random()*0.4})`;

if(progress >= 100){

    clearInterval(loading);

    loadingComplete();

    finishSplash();
}

/* आगे का Fade Out और Redirect
   P3-B में होगा */


},35);

/* =========================================
   P3-A2
   Premium Loading Effects
========================================= */

// Progress Bar Shine Animation
const shineEffect = setInterval(() => {

    progressFill.style.boxShadow =
        `0 0 ${10 + Math.random() * 20}px #00e5ff`;

}, 120);

// Logo Animation
const logo = document.querySelector(".inner-ring");

setInterval(() => {

    logo.animate([
        {
            transform: "translateY(0px) scale(1)"
        },
        {
            transform: "translateY(-5px) scale(1.03)"
        },
        {
            transform: "translateY(0px) scale(1)"
        }

    ], {

        duration: 2000,

        easing: "ease-in-out"

    });

}, 2000);

// Card Glow
const card = document.querySelector(".glass-card");

setInterval(() => {

    card.style.boxShadow =
        `0 0 ${20 + Math.random() * 20}px rgba(0,255,255,.25)`;

}, 500);

// Progress Complete
function loadingComplete() {

    clearInterval(shineEffect);

    loadingText.innerHTML = "लोडिंग पूर्ण";

    percentage.innerHTML = "100%";

}

/*=========================================
  P3-B
  Fade Out + Redirect + Premium Finish
=========================================*/

function finishSplash() {

    const splash = document.getElementById("splash");

    loadingText.innerHTML = "स्वागत है";

    percentage.innerHTML = "100%";

    setTimeout(() => {

        splash.classList.add("fade-out");

        setTimeout(() => {

            /* Redirect */

            window.location.href = "login.html";

            /* अगर Home Page पर भेजना हो तो:
               window.location.href="home.html";
            */

        },800);

    },700);

}

/* P3-A में loadingComplete() के बाद यही Function Call करना */

setTimeout(() => {

    if(progress >= 100){

        finishSplash();

    }

},200);

/* Ripple Effect */

document.addEventListener("click",function(e){

    const ripple=document.createElement("span");

    ripple.style.position="fixed";
    ripple.style.width="12px";
    ripple.style.height="12px";
    ripple.style.left=e.clientX+"px";
    ripple.style.top=e.clientY+"px";
    ripple.style.borderRadius="50%";
    ripple.style.background="rgba(255,255,255,.45)";
    ripple.style.pointerEvents="none";
    ripple.style.transform="translate(-50%,-50%)";

    ripple.animate([

        {
            transform:"translate(-50%,-50%) scale(1)",
            opacity:1
        },

        {
            transform:"translate(-50%,-50%) scale(18)",
            opacity:0
        }

    ],{

        duration:700,
        easing:"ease-out"

    });

    document.body.appendChild(ripple);

    setTimeout(()=>{

        ripple.remove();

    },700);

});

/* Disable Right Click (Optional) */

document.addEventListener("contextmenu",function(e){

    e.preventDefault();

});

/* Disable Drag */

document.addEventListener("dragstart",function(e){

    e.preventDefault();

});

/* Final Console Message */

console.log(
"%c Premium Splash Screen Loaded Successfully",
"color:#00e5ff;font-size:18px;font-weight:bold;"
);