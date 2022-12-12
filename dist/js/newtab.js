const tags = document.querySelectorAll(".tag")
tags.forEach(tag=>{
    tag.addEventListener("click",()=>{
    const tagContent = tag.innerHTML.split(' ')
    console.log(tag.innerHTML.split(' '))
    window.open("html/" + tagContent[1] + "-tag.html",'_blank')
})
})

for (let i = 0; i < 1 ; i++) {

tags.forEach(tag=>{
console.log( tag.innerHTML.split(' ')[1] +"-tag.html") 
})

}





