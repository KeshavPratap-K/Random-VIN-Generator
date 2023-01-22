


let toolTip;
let copyButton;
let VINText;
let resetButton;
let randomRealButton;
let randomLabel;
let realLabel;
let realButtonChecked = false;
//let darkModeSwitch;



window.onload=function(){

    toolTip = document.getElementById("myTooltip");
    copyButton = document.getElementById('copyButton');
    VINText = document.getElementById("VINText");
    resetButton = document.getElementById("resetButton");
    randomRealButton = document.getElementById("randomRealButton");
    randomLabel = document.getElementById("randomLabel");
    realLabel = document.getElementById("realLabel");
    //darkModeSwitch = document.getElementById("DarkModeSwitch");

    let toolTipValue = toolTip.innerHTML;


    randomRealButton.addEventListener('change', (event) => {

        console.log(randomRealButton.checked.toString());
        setRandomButtonPref();
        
        if (event.target.checked) {
            realButtonChecked = true;

        }
        else {
            realButtonChecked = false;
        }
    });

    /*darkModeSwitch.addEventListener('change',  (event) => {
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

    });*/

    copyButton.addEventListener('click', function() {
        copyTextFunction();
    });
    resetButton.addEventListener('click', function() {
        resetFunction();
    });
    copyButton.addEventListener('mouseout', function() {
        toolTip.textContent = toolTipValue;
    });

    getInitData();
    
}

function copyTextFunction(){

    VINText.select();
    toolTip.textContent = "Copied: " + VINText.value;
    navigator.clipboard.writeText(VINText.value).then(() => console.log("copied"));
}


function resetFunction(){
    VINText.value = "";
    fetchText().then(vin => {
        VINText.value = vin;
    });
}

function setRandomButtonPref(){

    browser.storage.local.set({'randomButtonPref': randomRealButton.checked.toString()});

}


async function getInitData(){

    
    let previousVINLocal = await browser.storage.local.get('PreviousVIN');
    let randomButtonPrefLocal = await browser.storage.local.get('randomButtonPref');

    if(previousVINLocal.PreviousVIN == undefined || previousVINLocal.PreviousVIN == '')
    {
        fetchText().then(vin => {
        VINText.value = vin;
        });
    }
    else
    {
        VINText.value = previousVINLocal.PreviousVIN;
    }

    //console.log(result.PreviousVIN != "");
    //console.log(browser.storage.local.get('randomButtonPref'));

    if(randomButtonPrefLocal.randomButtonPref == undefined | randomButtonPrefLocal.randomButtonPref == '')
    {
        browser.storage.local.set({'randomButtonPref': randomRealButton.checked.toString()});
    }
    else
    {
        randomRealButton.checked = randomButtonPrefLocal.randomButtonPref === 'true';
    }
}

async function fetchText() {
    let urlSuffix = realButtonChecked ? '?type=real' : '';
    const options = {method: 'GET', headers: {'Access-Control-Allow-Origin': '*'}};
    let response = await fetch('https://randomvin.com/getvin.php'+urlSuffix, options);
    let data = await response.text();
    browser.storage.local.set({'PreviousVIN': data});
    return data;
}

function onError(error) {
  console.log(error);
}