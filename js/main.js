let elModalWrapper = document.querySelector(".modal-wrapper")
let elClose = document.querySelector(".close-icon")
let elHamburger = document.querySelector(".hamburger-icon")

function handleMenuIconOpen(){
    elModalWrapper.classList.add("show")
    elClose.classList.add("close-show")
    elHamburger.classList.add("hide")
}
function handleMenuIconClose(){
    elModalWrapper.classList.remove("show")
    elClose.classList.remove("close-show")
    elHamburger.classList.remove("hide")
}