//create a div, give it the class of drawable, make it child to container, do this n x n time
const squaresNbSlider = document.querySelector(".slider");
squaresNbSlider.oninput = function () {
    const padDimensionTxt = document.querySelector("#padDimensionTxt");
    padDimensionTxt.innerText = `Pad dimension : ${squaresNbSlider.value} x ${squaresNbSlider.value}`;
    updateGrid(squaresNbSlider.value);
}

const clearButton = document.querySelector("#clearButton");
clearButton.onclick = function () {
    updateGrid(squaresNbSlider.value);
}

const colorPicker = document.querySelector("#colorPicker");
colorPicker.addEventListener("input", function(){
    currentPenColor = this.value;
});

function updateGrid(nbOfSquares) {
    const container = document.querySelector(".container");
    const everythingHolder = document.querySelector(".everythingHolder");

    everythingHolder.removeChild(container);

    const newContainer = document.createElement("div");
    newContainer.classList.add("container");
    newContainer.setAttribute("style", `grid-template-columns: repeat(${nbOfSquares},auto);`);
    newContainer.addEventListener("mouseover",
        function (event) {
            event.stopPropagation();
            if (event.target.className == "drawable") {
                let colorValue = getPencilColor();
                event.target.style.background = colorValue;
            }
        }
    );

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
let currentPenColor = "red";
function getPencilColor() {
    return currentPenColor;
}
updateGrid(squaresNbSlider.value);

