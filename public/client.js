const socket = io();
let username;
let playground = document.querySelector(".playground");
do {
  username = prompt("Enter Name");
} while (!username);

let input_box = document.querySelector("#input_box");
input_box.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
    e.target.value = "";
  }
});
function sendMessage(message) {
  let msg = {
    user: username,
    message: message,
  };
  //append to the dom
  appendMessage(msg);
  socket.emit("message", msg);
}

function appendMessage(msg) {
  let div = document.createElement("div");
  div.classList.add("message_cont", "justify-content-end");
  let div2 = document.createElement("div");
  div2.classList.add("right", "p-2");
  const img1 = document.createElement("img");
  const span = document.createElement("small");
   span.classList.add("d-block");

  img1.setAttribute(
    "src",
    "https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png"
  );
  img1.setAttribute("height", "30px");
  img1.setAttribute("width", "30px");

  div2.textContent = msg.message;
  span.textContent=msg.user;
  div2.append(span);

  div.appendChild(div2);
  div.appendChild(img1);
  playground.appendChild(div);

  playground.scrollTop = playground.scrollHeight;
}

function recieverMessageAppend(msg) {
  let div = document.createElement("div");
  div.classList.add("message_cont", "justify-content-start");
  let div2 = document.createElement("div");
  div2.classList.add("left", "p-2");
  const img1 = document.createElement("img");
  const span = document.createElement("small");
  span.classList.add("d-block");
  

  img1.setAttribute(
    "src",
    "https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png"
  );
  img1.setAttribute("height", "30px");
  img1.setAttribute("width", "30px");


  div2.textContent = msg.message;
  span.textContent=msg.user;

  div2.appendChild(span)
  div.appendChild(img1);
  div.appendChild(div2);

  playground.appendChild(div);

  playground.scrollTop = playground.scrollHeight;
}





// recieve Message
socket.on("message", (msg) => {
  recieverMessageAppend(msg);
});
