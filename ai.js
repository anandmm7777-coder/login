const API_KEY = "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";


async function askAI(message){


const model =
document.getElementById("modelSelect").value;



let modelID;



if(model==="GPT-4o Mini"){

modelID="openai/gpt-4o-mini";

}

else if(model==="Claude"){

modelID="anthropic/claude-3.5-sonnet";

}

else if(model==="Gemini"){

modelID="google/gemini-2.0-flash-exp";

}

else{

modelID="meta-llama/llama-3.1-8b-instruct";

}




try{


let response=await fetch(

"https://openrouter.ai/api/v1/chat/completions",

{

method:"POST",

headers:{


"Authorization":
"Bearer "+API_KEY,


"Content-Type":
"application/json",


"HTTP-Referer":
window.location.href,


"X-Title":
"Future AI Assistant Pro"


},


body:JSON.stringify({

model:modelID,


messages:[

{

role:"system",

content:

"You are Future AI Assistant Pro. Give professional, clear and helpful answers."

},


{

role:"user",

content:message

}

]


})


}

);




let data=await response.json();



if(data.choices){


return data.choices[0]
.message
.content;


}


else{


return "AI Error: "+JSON.stringify(data);


}



}

catch(error){


return "Connection Error";


}


}
