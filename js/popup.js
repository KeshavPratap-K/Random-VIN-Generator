


let toolTip;
let copyButton;
let VINText;
let resetButton;
let randomRealButton;
let randomLabel;
let realLabel;
let realButtonChecked = false;
let darkModeSwitch;



window.onload=function(){
    toolTip = document.getElementById("myTooltip");
    copyButton = document.getElementById('copyButton');
    VINText = document.getElementById("VINText");
    resetButton = document.getElementById("resetButton");
    randomRealButton = document.getElementById("randomRealButton");
    randomLabel = document.getElementById("randomLabel");
    realLabel = document.getElementById("realLabel");
    darkModeSwitch = document.getElementById("DarkModeSwitch");

    let toolTipValue = toolTip.innerHTML;


    randomRealButton.addEventListener('change', (event) => {
        if (event.target.checked) {
            realButtonChecked = true;

        }
        else {
            realButtonChecked = false;
        }
    });

    darkModeSwitch.addEventListener('change',  (event) => {
        if (event.target.checked) {

            document.body.style.color = 'white';
            document.body.style.background = '#292a2d';
            document.getElementById("VINSwitchToggle").style.backgroundColor = '#555555';

        }

        else {

            document.body.style.color = 'black';
            document.body.style.background = 'white';
            document.getElementById("VINSwitchToggle").style.backgroundColor = '#fff';

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

