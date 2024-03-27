async function checkMsg(){
    const name = document.querySelector('#nameInput').value;
    const email = document.querySelector('#emailInput').value;
    const msg = document.querySelector('#msgInput').value;
    if(name == ""){
        hideLoader();
        alert("Please enter a valid name"); 
        return false;
    };
    if(email == "" || !email.includes("@")){
        hideLoader();
        alert("Please enter a valid email"); 
        return false;
    }
    if(msg == ""){
        hideLoader();
        alert("Please enter a valid message"); 
        return false;
    }
    const data = {name: name, email: email, msg: msg};
    console.log(data);
    return sendMsg(data);
}

async function sendMsg(data){
    const response = await fetch('/api/sendMsg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
    if(result.status == "success"){
        alert("Message sent successfully");
        document.querySelector('#nameInput').value = '';
        document.querySelector('#emailInput').value = '';
        document.querySelector('#msgInput').value = '';
    }
    else{
        alert("Message failed to send");
    }
}