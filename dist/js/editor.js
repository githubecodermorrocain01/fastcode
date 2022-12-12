document.querySelector("iframe").style.width = window.innerWidth / 2 + "px"
document.querySelector("iframe").style.height = window.innerHeight + "px"
document.querySelector(".code").style.width = window.innerWidth / 2 + "px"
document.querySelector(".code").style.height = window.innerHeight  + "px"

// ? arrowleft parameters
const arrowleft = document.createElement("div")
arrowleft.setAttribute("class","arrowleft")
arrowleft.style.position="absolute"
arrowleft.style.left="0"
arrowleft.style.top= (document.querySelector(".code").clientHeight/2 - arrowleft.clientHeight) + "px";
arrowleft.style.backgroundColor="#00b0f0"
arrowleft.style.width="20px"
arrowleft.style.height="20px"
arrowleft.style.display="none"
arrowleft.style.zIndex="5"
arrowleft.style.clipPath = "polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)";
document.body.append(arrowleft)


function codeWidth(){
arrowleft.classList.add("showhide")
arrowleft.addEventListener("click",()=>{
    document.querySelector("#preview").style.minWidth = 0 + "px";
    document.querySelector(".code").style.minWidth = window.innerWidth + "px";
})
}
window.addEventListener("mousemove", (e)=>{
arrowleft.style.display === "none" & e.clientX === 0 ? codeWidth() : arrowleft.classList.remove("showhide") 
})

// ? arrowright parameters
const arrowright = document.createElement("div")
arrowright.setAttribute("class","arrowright")
arrowright.style.position="absolute"
arrowright.style.right="0"
arrowright.style.top= (document.querySelector(".code").clientHeight/2 - arrowright.clientHeight) + "px";
arrowright.style.backgroundColor="#00b0f0"
arrowright.style.width="20px"
arrowright.style.height="20px"
arrowright.style.display="none"
arrowright.style.zIndex="5"
arrowright.style.clipPath = "polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%)";
document.body.append(arrowright)

function codeHeight(){
arrowright.classList.add("showhide")
arrowright.addEventListener("click",()=>{
    document.querySelector(".code").style.minWidth = 0 + "px";
    document.querySelector("#preview").style.minWidth = (window.innerWidth - 2) + "px";
})
}
window.addEventListener("mousemove", (e)=>{
arrowright.style.display === "none" & e.clientX > document.querySelector("body").clientWidth + document.body.clientLeft ? codeHeight() : arrowright.classList.remove("showhide") 
})

// ? bottom parameters
const centered = document.createElement("div")
centered.setAttribute("class","centered")
centered.style.position="absolute"
centered.style.bottom=0;
centered.style.left = window.innerWidth/2 + "px";  
centered.style.backgroundColor="#00b0f0"
centered.style.width="20px"
centered.style.height="20px"
centered.style.display = "none"
centered.style.zIndex="5"
centered.style.clipPath = "polygon(50% 0%, 0% 40%, 20% 40%, 20% 100%, 80% 100%, 80% 40%, 100% 40%)";
document.body.append(centered)

function centerElemnet(){
centered.classList.add("showhide")
centered.addEventListener("click",()=>{
    document.querySelector(".code").style.minWidth = document.body.style.width/2 - centered.clientLeft + "px";
    document.querySelector("#preview").style.minWidth = document.body.style.width/2 - centered.clientLeft + "px";
})
}
window.addEventListener("mousemove", (e)=>{
centered.style.display === "none" & e.clientX >= document.body.clientWidth/2 ? centerElemnet() : centered.classList.remove("showhide")  
})
