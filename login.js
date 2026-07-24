/* ==========================================
   Ramphal Memorial Inter College
   Login JS
   Part 3
========================================== */


/* ===============================
   Select Elements
================================ */

const roles = document.querySelectorAll(".role");

const otpButton = document.querySelector(".otp-btn");

const mobileInput = document.querySelector(
".phone-input input"
);


/* ===============================
   Role Selection
================================ */

let selectedRole = "Student";


roles.forEach(role=>{


    role.addEventListener(
    "click",
    ()=>{


        roles.forEach(item=>{

            item.classList.remove("active");

        });


        role.classList.add("active");


        selectedRole =
        role.innerText;


        console.log(
        "Selected Role:",
        selectedRole
        );


    });


});



/* ===============================
   Mobile Validation
================================ */


function validateMobile(number){


    const pattern =
    /^[0-9]{10}$/;


    return pattern.test(number);


}



/* ===============================
   Send OTP
================================ */


otpButton.addEventListener(
"click",
()=>{


    const mobile =
    mobileInput.value.trim();



    if(mobile===""){


        alert(
        "Please Enter Mobile Number"
        );


        return;


    }



    if(!validateMobile(mobile)){


        alert(
        "Enter Valid 10 Digit Mobile Number"
        );


        return;


    }



    console.log({

        role:selectedRole,

        mobile:mobile

    });



    alert(
    "OTP Sent Successfully"
    );


    /*
       Next Step:
       OTP Verification Screen
    */


});

/* ===============================
   OTP Section Logic
================================ */


const otpSection =
document.getElementById("otpSection");


const verifyBtn =
document.querySelector(".verify-btn");



otpButton.addEventListener(
"click",
()=>{


    const mobile =
    mobileInput.value.trim();


    if(validateMobile(mobile)){


        otpSection.style.display="block";


    }


});



/* OTP Input Auto Move */

const otpInputs =
document.querySelectorAll(
".otp-boxes input"
);


otpInputs.forEach(
(input,index)=>{


input.addEventListener(
"input",
()=>{


    if(input.value.length===1
    &&
    index < otpInputs.length-1){


        otpInputs[index+1].focus();


    }


});


});



/* Verify OTP */

verifyBtn.addEventListener(
"click",
()=>{


let otp="";


otpInputs.forEach(input=>{

    otp += input.value;

});


if(otp.length===6){


    alert(
    "OTP Verified Successfully"
    );


    // Next:
    // Redirect Dashboard


}
else{


    alert(
    "Enter Complete OTP"
    );


}


});