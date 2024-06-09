function reveal() {
    var item = document.querySelectorAll(".scroller");
    for (var i = 0; i < item.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = item[i].getBoundingClientRect().top;
        var elementVisible = 0.7*window.innerHeight;
        const boxBio = document.getElementById(`box-item-biodata-${i}`);
        if (elementTop < windowHeight - elementVisible) {
            boxBio.classList.add("active");
            scrollerOff();
        }
        else {
            boxBio.classList.remove("active");
        }
    }
}

function scrollerOff() {
    const cond = document.getElementById('scroll-down-biodata');
    cond.className = "biodata-scroll-box";
}

function isBiodataActive() {
    try {
        const scrollBox = document.getElementById('scroller-biodata');
        scrollBox.addEventListener("scroll", reveal);
    }
    catch {
        
    }
}