let historyArr = new Array();
let historyArryDiv = document.getElementById("historyArryDiv");
var historyElementNodes = "";
function initHistory(){

    //Temp turned off
    if(historyArr.length != 0 && false)
    {
        historyArr.forEach(function(historyElement){
            historyElementNodes += '<label>'+historyElement+'</label>'; 
            });
        historyArryDiv.innerHTML = historyElementNodes;        
    }
}

function addVINHistoryToUI(VIN){
    //historyElementNodes += ; 
    historyArryDiv.innerHTML += '<label class="text-center">'+VIN+'</label>';
    
}
function addVINtoHistory(VIN){
    
    if(historyArr.length>=5){
        console.log("Popping");
        historyArryDiv.removeChild(historyArryDiv.children[0]);
        historyArr.pop();
    }
    historyArr.unshift(VIN)
    addVINHistoryToUI(VIN);
}
