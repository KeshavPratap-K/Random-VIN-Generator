//set function to set storage

function setLocalPreviousVIN(previousVINValue){

    chrome.storage.local.set({'PreviousVIN': previousVINValue});

}

function setLocalRandomRadioPref(checkedStatus){

    chrome.storage.local.set({'RandomVINRadioPref': checkedStatus});

}

function setLocalAutoFillPref(autoFillCheckedStatus){

    chrome.storage.local.set({'AutoFillCheckBoxPref': autoFillCheckedStatus});

}

function setLocalEditableAutoFillValue(autoFillValue){

    console.log(autoFillValue)
    chrome.storage.local.set({'EditableAutoFillValue': autoFillValue});

}

//Get function to get storage

async function getLocalPreviousVIN(){

    return await chrome.storage.local.get(['PreviousVIN']);

}

async function getLocalRandomRadioPref(){

    return await chrome.storage.local.get(['RandomVINRadioPref']);

}

async function getLocalAutoFillPref(){

    return await chrome.storage.local.get(['AutoFillCheckBoxPref']);

}

async function getLocalEditableAutoFillValue(){

    return await chrome.storage.local.get(['EditableAutoFillValue']);

}