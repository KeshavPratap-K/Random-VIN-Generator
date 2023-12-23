let toolTip;
let copyButton;
let VINText;
let resetButton;
let randomRadio;
let realRadio;



window.onload=function(){
    toolTip = document.getElementById("copyBtnSpan");
    copyButton = document.getElementById('copyButton');
    VINText = document.getElementById("VINText");
    refreshButton = document.getElementById("refreshButton");
    randomRadio = document.getElementById("randomRadio");
    realRadio = document.getElementById("realRadio");

    copyButton.addEventListener('click', function() {
        copyTextFunction();
    });
    refreshButton.addEventListener('click', function() {
        refreshFunction();
    });

    getInitData();   
}


function copyTextFunction(){

    VINText.select();
    let toolTipValue = toolTip.innerHTML;
    toolTip.innerHTML = "Copied..";
    navigator.clipboard.writeText(VINText.value).then(() => console.log("copied"));
    setTimeout(function(){
    toolTip.innerHTML = toolTipValue;
    }, 2000)
}


function refreshFunction(){
    VINText.value = "";
    fetchText().then(vin => {
        VINText.value = vin;
    });
}

function savePreference(){
    console.log("save pressed");
    setRandomRadioPref();
}

function cancelPreference(){
    console.log("save pressed");
    setRandomRadioPref();
}

function setRandomRadioPref(){

    chrome.storage.local.set({'randomVINRadioPref': randomRadio.checked.toString()});

}


async function getInitData(){
    
    let previousVINLocal = await chrome.storage.local.get(['PreviousVIN']);
    let randomVINRadioPrefLocal = await chrome.storage.local.get(['randomVINRadioPref']);


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
    //console.log(chrome.storage.local.get(['randomButtonPref']));

    if(randomVINRadioPrefLocal.randomVINRadioPref == undefined | randomVINRadioPrefLocal.randomVINRadioPref == '')
    {
        chrome.storage.local.set({'randomVINRadioPref': randomRadio.checked.toString()});
    }
    else
    {
        if(randomVINRadioPrefLocal.randomVINRadioPref === 'true')
            {
                randomRadio.checked = true;
                realRadio.checked = false;
            }
        else
            {
                randomRadio.checked = false
                realRadio.checked = true
            }
    }
}

async function fetchText() {
    let urlSuffix = randomRadio.checked ? '?type=real' : '';
    const options = {method: 'GET', headers: {'Access-Control-Allow-Origin': '*'}};
    let response = await fetch('https://randomvin.com/getvin.php'+urlSuffix, options);
    let data = await response.text();
    chrome.storage.local.set({'PreviousVIN': data});
    return data;
}

