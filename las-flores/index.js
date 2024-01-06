
//Script for the changing word in #home

const changningWord = document.getElementById("changingWord")
//Ord som växlas mellan i #home
let words = [
    "\xa0- Colorful -\xa0",
    "\xa0- Exotic -\xa0",
    "\xa0- Fabulous -\xa0",
    "\xa0- Flowerful -\xa0",
    "\xa0- Tropical -\xa0",
    "\xa0- Unique -\xa0"
]
//Funktion för att uppdatera ord i #home
let wordDisplay = function(){
    for(let i = 0; i < words.length; i++){
        //IIFE
        (function (index) {
            setTimeout(() => {
                changningWord.style.opacity = 0
                setTimeout(() =>{
                    changningWord.innerText = words[i % words.length];
                    changningWord.style.opacity = 1
                }, 500)
            }, 4000 * index);
        })(i);
    }
}



//Script for when "Products" is clicked in header

//Get Meny button for "Products"
const toProducts = document.querySelector("header nav #toProducts")
//Get section to scroll to when clicked
const productSection = document.getElementById("product-section")
//Get the button that will be automatically clicked in the product section
const targetProductButton = document.querySelector("#product-section a")

toProducts.addEventListener("click", function(){
    productSection.scrollIntoView()
    /*setTimeout(() => {
        targetProductButton.click()
    }, 1000)*/ //Removed while product page not built
})

//Run when page is loaded
wordDisplay()
setInterval(wordDisplay, 25000)
