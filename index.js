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
colorPicker.addEventListener("input", function () {
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
                const clickMode = document.querySelector("#clickMode");
                if (clickMode.checked) {
                    if (leftMouseButtonOnlyDown) {
                        let colorValue = getPencilColor(event.target.style.background);
                        event.target.style.background = colorValue;
                    }
                }
                else {
                    let colorValue = getPencilColor(event.target.style.background);
                    event.target.style.background = colorValue;
                }
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
let currentPenColor = "#80321E";
function getPencilColor(currentCellColor) {
    const pentype = document.querySelector("#penType");
    const accumulation = document.querySelector("#accumulation");
    let newAccumulatedColor = "";
    if (currentCellColor.length > 3 && accumulation.checked) //if the color accumulation button is checked, then we gradually increase the color of the current cell.
    {
        let currentRGBArray = currentCellColor.split("(")[1].split(")")[0].split(",");
        let accumulation = 0.05;
        let r = parseInt(currentRGBArray[0], 10);
        r = Math.floor(Math.min(r * (1 + accumulation) + parseInt(currentPenColor.substring(1, 3), 16) * accumulation, 255));
        let g = parseInt(currentRGBArray[1], 10);
        g = Math.floor(Math.min(g * (1 + accumulation) + parseInt(currentPenColor.substring(3, 5), 16) * accumulation, 255));
        let b = parseInt(currentRGBArray[2], 10);
        b = Math.floor(Math.min(b * (1 + accumulation) + parseInt(currentPenColor.substring(5, 7), 16) * accumulation, 255));
        newAccumulatedColor = `rgb(${r}, ${g}, ${b})`;
        console.log(newAccumulatedColor);
    }

    if (pentype.value == "normal") {
        return newAccumulatedColor || currentPenColor;
    }
    else if (pentype.value == "rainbow") {
        return `#${rdmValue()}`;
    }
}
function rdmValue() {
    return Math.floor(Math.random() * 16777215).toString(16);
}
let leftMouseButtonOnlyDown = false;

function setLeftButtonState(e) {
  leftMouseButtonOnlyDown =
    e.buttons === undefined ? e.which === 1 : e.buttons === 1;
}

document.body.onmousedown = setLeftButtonState;
document.body.onmousemove = setLeftButtonState;
document.body.onmouseup = setLeftButtonState;

updateGrid(squaresNbSlider.value);

