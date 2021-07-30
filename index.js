//create a div, give it the class of drawable, make it child to container, do this n x n time
const squaresNbSlider = document.querySelector(".slider");
squaresNbSlider.oninput = function(){
    updateGrid(squaresNbSlider.value);
}
function updateGrid(nbOfSquares){
    const container = document.querySelector(".container");
    const everythingHolder = document.querySelector(".everythingHolder");

    everythingHolder.removeChild(container);

    const newContainer = document.createElement("div");
    newContainer.classList.add("container");
    newContainer.setAttribute("style",`grid-template-columns: repeat(${nbOfSquares},auto);`);

    everythingHolder.insertBefore(
      newContainer,
      document.querySelector(".sliderContainer")
    );
    
    for (let i = 0; i < nbOfSquares * nbOfSquares; ++i) {
      const div = document.createElement("div");
      div.classList.add("drawable");
      newContainer.appendChild(div);
    }
}
updateGrid(squaresNbSlider.value);

