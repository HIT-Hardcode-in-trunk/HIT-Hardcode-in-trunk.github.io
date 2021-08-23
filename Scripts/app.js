//menu toggle
const burger = document.querySelector(".burger");



function navToggle(e) {
    if (!e.target.classList.contains("active")) {
        e.target.classList.add("active");
        gsap.to(".line1", 0.5, { rotate: "45", y: 4, background: "#5A4980" });
        gsap.to(".line2", 0.5, { rotate: "-45", y: -4, background: "#5A4980" });
        gsap.to("#logo", 1, { color: "white" });
        gsap.to("#logo", 1, { textShadow: "0px 5px 20px #EE82EE" });
        gsap.to(".burger-circle", 1, { boxShadow: "0px 0px 20px 0px violet" });
        gsap.to(".nav-bar", 1.5, { clipPath: "circle(2500px at 100% -10%)" });
        document.body.classList.add("hide");
    } else {
        e.target.classList.remove("active");
        gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "#5A4980" });
        gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "#5A4980" });
        gsap.to("#logo", 1, { color: "white" });
        gsap.to("#logo", 1, { textShadow: "0px 0px 0px #EE82EE" });
        gsap.to(".burger-circle", 1, { boxShadow: "0px 0px 0px 0px black" });
        gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
        document.body.classList.remove("hide");
    }
}


// listener for menu
burger.addEventListener('click', navToggle);



var rule = CSSRulePlugin.getRule("span:after");

// 6 Show Timeline
var tl = gsap.timeline({ defaults: { duration: 1 } })
tl.from(".anim1", { y: -50, stagger: .6, opacity: 0 })
    .to(rule, { duration: 1.8, cssRule: { scaleY: 0 } }, "-=2.2")
    .from("aside", { backgroundPosition: '200px 0px', opacity: 0 }, "-=1.5")
    // .from("svg", { x: 100, opacity: 0 }, "-=.5")
    .from("#women", { y: -50, opacity: 0 }, "-=.5")
    .from("#men", { y: 50, opacity: 0 }, "-=.5");

