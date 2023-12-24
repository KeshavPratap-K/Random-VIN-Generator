let editableAutoFillDefault = "#TestId";
let AutoFillPrimaryBtn = document.getElementById("AutoFillPrimaryBtn");

AutoFillPrimaryBtn.addEventListener('click', function() {
    autoFillBtnClick();
});


async function initAutoFill(){
    let editableAutoFillIdLocal = await getLocalEditableAutoFillValue();
    let autoFillIdLocal = await getLocalAutoFillPref();


    //init value for Autofill checkbox
    
    if(autoFillIdLocal.AutoFillCheckBoxPref == undefined | autoFillIdLocal.AutoFillCheckBoxPref == '')
    {
        setLocalAutoFillPref("true");
        autoFillCheckbox.checked = true;
    }
    else
    {
        autoFillCheckbox.checked = autoFillIdLocal.AutoFillCheckBoxPref === "true";
    }

    //init value for AutoFill ID value

    if(editableAutoFillIdLocal.EditableAutoFillValue == undefined | editableAutoFillIdLocal.EditableAutoFillValue == '')
    {
        setLocalEditableAutoFillValue(editableAutoFillDefault);
    }
    else
    {
        editableAutoFillValue.innerHTML = editableAutoFillIdLocal.EditableAutoFillValue;
    }
    

}


function autoFillBtnClick(){
    console.log(VINText);
    chrome.tabs.query({active: true}, function(tabs){
        chrome.scripting.executeScript({
            target : {tabId : tabs[0].id},
            func : processAutoFill,
            args : [VINText.value, editableAutoFillValue.innerHTML]
        })
      })
}

function processAutoFill(VINText, editableAutoFillValue){
    let formVINInput = document.getElementById(editableAutoFillValue);
    formVINInput.value = VINText;
}