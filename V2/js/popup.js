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
    autoFillCheckbox = document.getElementById("autoFillCheckBox");
    editableAutoFillValue = document.getElementById("editableAutoFillId");


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
    console.log("Save pressed");
    setLocalRandomRadioPref(randomRadio.checked.toString());
    setLocalEditableAutoFillValue(editableAutoFillValue.innerHTML);
}

async function cancelPreference(){
    console.log("Cancel pressed");
    let editableTextCancel = await getLocalEditableAutoFillValue();
    let randomRadioCancel = await getLocalRandomRadioPref();
    let autoFillCheckBoxCancel = await getLocalAutoFillPref();
    console.log(autoFillCheckBoxCancel.AutoFillCheckBoxPref);
    setRandomRadioButton(randomRadioCancel.randomVINRadioPref);
    editableAutoFillValue.innerHTML = editableTextCancel.EditableAutoFillValue;
    autoFillCheckbox.checked = autoFillCheckBoxCancel.AutoFillCheckBoxPref === "true";
}

function setRandomRadioButton(randomVINRadioPref){
    if(randomVINRadioPref === 'true')
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



async function getInitData(){
    
    let previousVINLocal = await getLocalPreviousVIN();
    let randomVINRadioPrefLocal = await getLocalRandomRadioPref();


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
        setLocalRandomRadioPref(randomRadio.checked.toString());
    }
    else
    {
        setRandomRadioButton(randomVINRadioPrefLocal.randomVINRadioPref);
    }

    initAutoFill();
}

async function fetchText() {
    let urlSuffix = randomRadio.checked ? '?type=real' : '';
    const options = {method: 'GET', headers: {'Access-Control-Allow-Origin': '*'}};
    let response = await fetch('https://randomvin.com/getvin.php'+urlSuffix, options);
    let data = await response.text();
    //chrome.storage.local.set({'PreviousVIN': data});
    setLocalPreviousVIN(data);
    return data;
}

