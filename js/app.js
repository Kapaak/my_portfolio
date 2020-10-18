(function runApp(){
    cursor();
    burger();
    intersectionObserverArrow()
    hoverStudyItems();
    sectionHideUnhide();
    client();
})();

function cursor(){
    const cursor = document.querySelector(".cursor");

    document.addEventListener("mousemove",(e)=>{
        cursor.setAttribute("style","top: "+e.pageY+"px; left: "+ e.pageX +"px")
    });
  
}

function burger(){
    const body = document.querySelector("body");
    const menu = document.querySelector(".menu");
    const menuItems = document.querySelector(".menu-items");
    const hamburgerLines = document.querySelectorAll(".hamburger-line");

    menu.addEventListener("click",(e)=>{
        if(e.target.classList.contains("hamburger") || e.target.classList.contains("hamburger-line") && menuItems.classList.contains("menu-active")){
            active();
            burgerAnimation([12,45],[-20,-180],[-10,-45]);

            if(!menuItems.classList.contains("menu-active")){
                menuItems.classList.remove("menu-active");
                burgerAnimation([0,0],[0,0],[0,0]);
            }
        }
        else if(e.target.tagName === ("P") || ("DIV") &&  menuItems.classList.contains("menu-active")){
            active();
            burgerAnimation([0,0],[0,0],[0,0]);
        }
    });

    function active(){
        menuItems.classList.toggle("menu-active");
        body.classList.toggle("overflow-hidden");
    }

    function burgerAnimation([firstOffset,firstRotation],[secondOffset,SecondRotation],[thirdOffset,thirdRotation]){
        const array = [...arguments];
        hamburgerLines.forEach((line,index) =>{
            line.style = `transform: translate(0px, ${array[index][0]}px) rotate(${array[index][1]}deg)`;
        })
        // hamburgerLines[0].style = "transform: translate(0px, 12px) rotate(45deg)";
        // hamburgerLines[1].style = "transform: translate(0px,-20px) rotate(-180deg)";
        // hamburgerLines[2].style = "transform: translate(0px, -10px) rotate(-45deg)";
    }

}

function intersectionObserverArrow(){
    const observer = new IntersectionObserver (entries =>{
        //document.querySelector(".bar").classList.toggle("bar--bg",entries[0].intersectionRatio < 0.9);
        if(entries[0].intersectionRatio < 0.9)
        console.log("pepe");
        },{
            root:null,
            threshold:0.9
        });
        observer.observe(document.querySelector(".hero"));
    
}

function hoverStudyItems(){
    const item = document.querySelectorAll(".study .item");
    const itemT = document.querySelectorAll(".main-img");
    const modalImg = document.querySelectorAll(".sec-img");

    let i = 1;
    //displaying array of images
    setInterval(function(){ 
            itemT[0].src = "images/others/education/kniha"+i+".svg";
            modalImg[0].src = "images/others/education/kniha"+i+".svg";
            itemT[1].src = "images/others/programs/pc"+i+".svg"; 
            modalImg[1].src = "images/others/programs/pc"+i+".svg"; 
            itemT[2].src = "images/others/work/taska"+i+".svg";
            modalImg[2].src = "images/others/work/taska"+i+".svg";
            itemT[3].src = "images/others/languages/jazyk"+i+".svg";
            modalImg[3].src = "images/others/languages/jazyk"+i+".svg";
            if(i<4)i++;
            else i = 1;

        
    }, 500);

    //adding display block / removing display block to study items in order to have nice animation
    item.forEach(element =>{
        const itemText = element.querySelector("h3");        

        element.addEventListener("mouseover",()=>{
            itemText.classList.toggle("active");
        })
        element.addEventListener("mouseout",(e)=>{
            
            itemText.classList.toggle("active");
        })
    })  
    
    //display modal on click
    item.forEach(item => item.addEventListener("click",(e)=>{
        const activeItem = item.querySelector(".modal");
        //brings modal to the top of the clicked element 
        activeItem.style.top = `${item.offsetTop}px`;
        activeItem.classList.toggle("active");

 
        if(e.target.classList.contains("close") || e.target.tagName == "P"){
            activeItem.classList.remove("active");
        }
        }))

}

function correctHeight(){
    changeHeight();
    window.addEventListener("resize",changeHeight());
    //correction so that every item has same height as its width
    function changeHeight(){
        document.querySelectorAll(".portfolio-examples .item").forEach(el =>{
            el.style.height =  el.offsetWidth +"px";
        })
    }
}

function sectionHideUnhide(){
    const clickEl = document.querySelectorAll(".clickable-headline");

    clickEl.forEach(el => el.addEventListener("click",(e)=>{
        //detect click on clickable headline and then 
        const item = e.target.parentNode.querySelector(".portfolio-examples");
        const items = Array.from(e.target.parentNode.querySelectorAll(".item"));
        let delay = 0;
        //animation on each element
        items.forEach(element =>{
            element.style.animation = `appear .5s ease-in-out ${delay}s forwards`;
            delay += .4;
        })
        console.log(items);
        //toggle active on item's sibling
        item.classList.toggle("portfolio-item-active");
        correctHeight();
    }))
}




function client(){
    const width = window.innerWidth;
    const height = window.innerHeight;

    //correction to top mobile phones, where 100vh is too much
    if( height > width && width > 800 && height > 900){
        document.querySelector(".hero").style.minHeight = "50vh";
    }
}

