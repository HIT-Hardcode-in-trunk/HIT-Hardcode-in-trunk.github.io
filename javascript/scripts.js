
//script to make the mobile menu work
//variables to store ui elements
const menubutton = document.getElementById("dropdownbutton");
const mobileicon = document.getElementById("mobileicon");
const navbarbuttons = document.getElementById("navbar-linkarea-mobile");
const navbar = document.getElementById("navbar");
const navbarlinksmobile = document.getElementById("navbar-linkarea_link_mobile");

mobileicon.style.display = "none";


//event listener to check if the button has been pressed
menubutton.addEventListener("click", function () {
    //clear the navbar
    
    mobileicon.style.display = "none";
    menubutton.style.display = "none";
    navbarbuttons.style.height = "80vh";
    navbar.style.height = "80vh";
    navbarlinksmobile.style.display = "flex"

})