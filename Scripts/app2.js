//menu toggle
const burger = document.querySelector(".burger");



function navToggle(e) {
    if (!e.target.classList.contains("active")) {
        e.target.classList.add("active");
        gsap.to(".line1", 0.5, { rotate: "45", y: 4, background: "#5A4980" });
        gsap.to(".line2", 0.5, { rotate: "-45", y: -4, background: "#5A4980" });
        gsap.to(".burger-circle", 1, { boxShadow: "0px 0px 20px 0px violet" });
        gsap.to(".right-chevron", 1, { boxShadow: "0px 0px 20px 0px violet" });
        gsap.to(".nav-bar-mobile", 1.5, { clipPath: "circle(2500px at 100% -10%)" });
        document.body.classList.add("hide");
    } else {
        e.target.classList.remove("active");
        gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "#5A4980" });
        gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "#5A4980" });
        gsap.to(".burger-circle", 1, { boxShadow: "0px 0px 0px 0px black" });
        gsap.to(".right-chevron", 1, { boxShadow: "0px 0px 0px 0px black" });
        gsap.to(".right-chevron", 1, { boxShadow: "0px 0px 0px 0px black" });
        gsap.to(".nav-bar-mobile", 1, { clipPath: "circle(50px at 100% -10%)" });
        document.body.classList.remove("hide");
    }
}


// listener for menu
burger.addEventListener('click', navToggle);