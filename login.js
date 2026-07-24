function handleCredentialResponse(response){

console.log(response);

alert("Google Login Successful!");

console.log(response.credential);

// आगे यहाँ Dashboard पर Redirect कर सकते हो
// window.location.href="dashboard.html";

} 