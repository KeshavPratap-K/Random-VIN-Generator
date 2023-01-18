


let toolTip;
let copyButton;
let VINText;
let resetButton;
let randomRealButton;
let randomLabel;
let realLabel;
let realButtonChecked = false;



window.onload=function(){
    toolTip = document.getElementById("myTooltip");
    copyButton = document.getElementById('copyButton');
    VINText = document.getElementById("VINText");
    resetButton = document.getElementById("resetButton");
    randomRealButton = document.getElementById("randomRealButton");
    randomLabel = document.getElementById("randomLabel");
    realLabel = document.getElementById("realLabel");

    let toolTipValue = toolTip.innerHTML;


    randomRealButton.addEventListener('change', (event) => {
        if (event.target.checked) {
            realButtonChecked = true;
            realLabel.classList.add("labelBold");
            realLabel.classList.remove("labelDimmer");
            randomLabel.classList.add("labelDimmer");
            randomLabel.classList.remove("labelBold");

        }
        else {
            realButtonChecked = true;
            realLabel.classList.add("labelDimmer");
            realLabel.classList.remove("labelBold");
            randomLabel.classList.add("labelBold");
            randomLabel.classList.remove("labelDimmer");
        }
    });

    copyButton.addEventListener('click', function() {
        copyTextFunction();
    });
    resetButton.addEventListener('click', function() {
        resetFunction();
    });
    copyButton.addEventListener('mouseout', function() {
        toolTip.innerHTML = toolTipValue;
    });
    fetchText().then(vin => {
        VINText.value = vin;
    });
}

function copyTextFunction(){
    VINText.select();
    toolTip.innerHTML = "Copied: " + VINText.value;
    navigator.clipboard.writeText(VINText.value).then(() => console.log("copied"));
}


function resetFunction(){
    fetchText().then(vin => {
        VINText.value = vin;
    });
}

async function fetchText() {
    let urlSuffix = realButtonChecked ? '?type=real' : '';
    const options = {method: 'GET', headers: {'Access-Control-Allow-Origin': '*'}};
    let response = await fetch('https://randomvin.com/getvin.php'+urlSuffix, options);
    let data = await response.text();
    console.log(data);
    return data;
}

