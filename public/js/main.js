const chatform=document.getElementById('chat-form');
const chatMessages=document.querySelector('.chat-messages');
const userlist=document.getElementById('users');

const user=Qs.parse(location.search,{ignoreQueryPrefix:true});
console.log(user);

const socket=io();

socket.emit("joinroom",user);

function outputMessage(message){
 const div=document.createElement('div');
 div.classList.add('message');
 div.innerHTML=`<p class="meta">${message.username} <span>${message.time}</span></p>
 <p class="text">
    ${message.text}
 </p>`
 document.querySelector('.chat-messages').appendChild(div)
}

socket.on("message",message=>{
    outputMessage(message);
    chatMessages.scrollTop=chatMessages.scrollHeight;
})

socket.on("userjoin",(users)=>{
    userList(users);
})

chatform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg=e.target.elements.msg.value;
    socket.emit("chatmsg",msg);
    e.target.elements.msg.value="";
})

function userList(users){
    userlist.innerHTML=`${users.map(user=>`<li>${user.username}</li>`).join("")}`;
}