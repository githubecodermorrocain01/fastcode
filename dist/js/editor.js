document.querySelector("iframe").style.width = window.innerWidth / 2 + "px"
document.querySelector("iframe").style.height = window.innerHeight + "px"
document.querySelector(".code").style.width = window.innerWidth / 2 + "px"
document.querySelector(".code").style.height = window.innerHeight  + "px"
    // window.addEventListener("keyup",(e) =>{
    // e.key === "ArrowRight" ||   e.key === "ArrowLeft" ||   e.key === "ArrowDown"  ||   e.key === "ArrowUp"   ? othersound() : samesound()
    // function othersound(){
    //     const othersound = new Audio();
    //     othersound.src = "sounds/Jump14.wav"
    //     othersound.play()   }
    //     function samesound(){
    //     const othersound = new Audio();
    //     othersound.src = "sounds/Jump14.wav"
    //     othersound.play()       
    //     }
    //     })

//  document.addEventListener('DOMContentLoaded', () => {
    
//         document.querySelector('.container').innerHTML += "<div class='draggable' id='elementToDrag'></div>"
    
//         const elementToDrag = document.getElementById('elementToDrag');
        
//         let isDragging = false;
//         let offsetX;

//         elementToDrag.addEventListener('mousedown', (event) => {
//             isDragging = true;
//             offsetX = event.clientX - elementToDrag.getBoundingClientRect().left;
//             elementToDrag.style.cursor = 'grabbing';
          
//         });

//         document.addEventListener('mousemove', (event) => {
//             if (isDragging) {
//                 elementToDrag.style.left = event.clientX - offsetX + 'px';
//                   document.querySelector('.code').style.width = elementToDrag.getBoundingClientRect().left + "px"
//             }
//         });

//         document.addEventListener('mouseup', () => {
//             isDragging = false;
//             elementToDrag.style.cursor = 'grab';
//         });
//     });