var itemNum = 0; // 아이템수
var xDataNum = 0; // xData 입력갯수
var yDataNum = [0]; // yData 입력갯수, 이중배열로 사용

// xData 항목입력 추가하기
function addXData(){
    xDataNum += 1;
    document.getElementById("xData_num").value = (xDataNum+1);

    const xDataInput = document.createElement("input");
    document.getElementById('x_data_inputs').appendChild(xDataInput);
    xDataInput.setAttribute("type", 'text');
    xDataInput.setAttribute("class", 'form-control ms-1 mt-1');
    xDataInput.setAttribute("name", 'xdata_input'+xDataNum);
    xDataInput.setAttribute("id", 'xdata_input'+xDataNum);
    xDataInput.setAttribute("style", 'width: 80px;');
    xDataInput.setAttribute("placeholder", xDataNum+1);
    xDataInput.setAttribute("onfocus", 'addXData();return false');

    // xData 마지막 항목입력에서만 항목입력생성 이벤트 발생하도록 전에 있는 항목입력 이벤트 속성 삭제
    document.getElementById('xdata_input'+(xDataNum-1)).setAttribute("onfocus", '');
    // yData 마지막 항목입력을 제외한 다른 항목입력에 데이터를 입력하도록 강제하기
    document.getElementById('xdata_input'+(xDataNum-1)).setAttribute("required", '');
};

// yData 목록입력 추가하기
function addItem(){
    itemNum += 1;
    document.getElementById("item_num").value = (itemNum+1);
    yDataNum.push(0);

    const yDataNumPass = document.createElement("input");
    document.getElementById('y_inputs').appendChild(yDataNumPass);
    yDataNumPass.setAttribute("type", 'number');
    yDataNumPass.setAttribute("name", 'yData_num'+itemNum);
    yDataNumPass.setAttribute("id", 'yData_num'+itemNum);
    yDataNumPass.setAttribute("style", 'display: none;');

    if(itemNum < 5){ // 최대 yData 목록입력 갯수
        // yData 목록번호 표시 및 라벨 입력창 생성
        const labelDiv = document.createElement("div");
        document.getElementById('y_inputs').appendChild(labelDiv);
        labelDiv.setAttribute("class", 'input-group px-3');
        labelDiv.setAttribute("id", 'y_inputs'+itemNum);

        const labelSpan = document.createElement("span");
        labelDiv.appendChild(labelSpan);
        labelSpan.setAttribute("class", 'input-group-text bg-warning text-white bg-opacity-25');
        labelSpan.textContent = 'Y data #' + (itemNum+1);

        const labelInput = document.createElement("input");
        labelDiv.appendChild(labelInput);
        labelInput.setAttribute("type", 'text');
        labelInput.setAttribute("class", 'form-control');
        labelInput.setAttribute("name", 'data_label_input'+itemNum);
        labelInput.setAttribute("id", 'data_label_input'+itemNum);
        labelInput.setAttribute("placeholder", 'data label '+ (itemNum+1));

        // yData 목록입력 창 생성
        const dataDiv = document.createElement("div");
        document.getElementById('y_inputs').appendChild(dataDiv);
        dataDiv.setAttribute("class", 'd-flex flex-wrap px-3 mb-3');
        dataDiv.setAttribute("id", 'y_data_inputs'+itemNum);

        const dataInput = document.createElement("input");
        dataDiv.appendChild(dataInput);
        dataInput.setAttribute("type", 'text');
        dataInput.setAttribute("class", 'form-control ms-1 mt-1');
        dataInput.setAttribute("name", 'ydata'+itemNum+'_input'+yDataNum[itemNum]);
        dataInput.setAttribute("id", 'ydata'+itemNum+'_input'+yDataNum[itemNum]);
        dataInput.setAttribute("style", 'width: 80px;');
        dataInput.setAttribute("placeholder", (yDataNum[itemNum]+1));
        dataInput.setAttribute("onfocus", 'addYData('+itemNum+');return false');
    }
    else{
        // 최대 yData 목록입력 갯수 초과 시
        window.alert("더 이상 추가할 수 없습니다.");
        itemNum -= 1// 아이템 갯수 1 증가시킨 것 원복
        document.getElementById("item_num").value = itemNum;
        yDataNum.pop();// yData 목록 입력갯수 증가시킨 것 원복
    }
};

// yData 목록입력 삭제하기
function delItem(){
    if(itemNum > 0){
        document.getElementById('y_inputs'+itemNum).remove();// 마지막 yData 목록번호 표시 및 라벨 입력창 삭제
        document.getElementById('y_data_inputs'+itemNum).remove();// 마지막 yData 목록입력 창 생성
        itemNum -= 1// 아이템 갯수 1 감소
        yDataNum.pop();// yData 목록 입력갯수 1 감소
    }else{
        window.alert("더 이상 삭제할 수 없습니다.");
    }
};

// yData 항목입력 추가하기
function addYData(item){
    yDataNum[item] += 1;
    document.getElementById("yData_num"+item).value = yDataNum[item];

    // yData 항목입력 창 생성
    const yDataInput = document.createElement("input");
    document.getElementById('y_data_inputs'+item).appendChild(yDataInput);
    yDataInput.setAttribute("type", 'number');
    yDataInput.setAttribute("class", 'form-control ms-1 mt-1');
    yDataInput.setAttribute("name", 'ydata'+item+'_input'+ (yDataNum[item]));
    yDataInput.setAttribute("id", 'ydata'+item+'_input'+ (yDataNum[item]));
    yDataInput.setAttribute("style", 'width: 80px;');
    yDataInput.setAttribute("placeholder", (yDataNum[item]+1));
    yDataInput.setAttribute("onfocus", 'addYData('+item+');return false');
    
    // yData 마지막 항목입력에서만 항목입력생성 이벤트 발생하도록 전에 있는 항목입력 이벤트 속성 삭제
    document.getElementById('ydata'+item+'_input'+(yDataNum[item]-1)).setAttribute("onfocus", '');
    // yData 마지막 항목입력을 제외한 다른 항목입력에 데이터를 입력하도록 강제하기
    document.getElementById('ydata'+item+'_input'+(yDataNum[item]-1)).setAttribute("required", '');
};

// 차트 업데이트 하기
function makeChart(){
    title = document.getElementById("title_input").value;
    xLabel = document.getElementById("xlabel_input").value;
    yLabel = document.getElementById("ylabel_input").value;
    legend = document.getElementById("legend_switch1").checked;
    grid = document.getElementById("grid_switch1").checked;
    bkwt = document.getElementById("bkwt_switch1").checked;
    borderTop = document.getElementById("border_top_switch1").checked;
    borderBottom = document.getElementById("border_bottom_switch1").checked;
    borderLeft = document.getElementById("border_left_switch1").checked;
    borderRight = document.getElementById("border_right_switch1").checked;
    
    for(var k=1; k<5; k++){
        if(document.getElementById("ratio_input" + k).checked){
            chartRatio = k;
        }
        
    };

    totalX = xDataNum;
    totalY = yDataNum;

    var xData = [];
    for(var x=0; x<totalX; x++){
        xData.push(document.getElementById("xdata_input"+x).value);
    };

    var yDataLabel = [];
    var yDataList = [];
    for(var z=0; z<totalY.length; z++){
        var yData = [];
        for(var y=0; y<totalX; y++){ // yData 추출(xData 항목 수와 yData 항목 수 통일하기) yData가 더 많으면 무시하고 적으면 빈 데이터는 0으로 대체한다.
            if(document.getElementById("ydata"+z+"_input"+y) == null || document.getElementById("ydata"+z+"_input"+y).value == ""){
                yData.push(0);
            }else{
                yData.push(Number(document.getElementById("ydata"+z+"_input"+y).value));
            };
        };
        yDataLabel.push(document.getElementById('data_label_input'+z).value); // yData 라벨
        yDataList.push(yData); // yData 이중배열로 만들기
    };

    if(bkwt){
        document.querySelector("body").setAttribute('style', 'background-color:black;')
    }else{
        document.querySelector("body").setAttribute('style', 'background-color:white;')
    }
    
    // flask로 보낼 데이터 만들기
    inputData = {
        'title':title,
        'xlabel':xLabel,
        'ylabel':yLabel,
        'legend':legend,
        'grid':grid,
        'xData':xData,
        'yDataLabel':yDataLabel,
        'yDataList':yDataList,
        'bkwt':bkwt,
        'borderTop':borderTop,
        'borderBottom':borderBottom,
        'borderLeft':borderLeft,
        'borderRight':borderRight,
        'chartRatio':chartRatio
    };
    // console.log(inputData);
 
    // ajax로 웹페이지 새로고침 없이 flask로 데이터 전송
    $.ajax({
        type: 'POST',
        url: ajaxUrl,
        data: JSON.stringify(inputData),
        dataType : 'JSON',
        cache: false,
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function(data){
            // alert('성공! 데이터 값:')
            // 차트 업데이트 하기
            chartImg = document.getElementById("chart_img");
            src = "data:image/png;base64, " + data.result2
            chartImg.setAttribute("src", src);
        },
        error: function(request, status, error){
            alert('Network Error, Try later.')
            // alert(error);
        }
    })
};

function downloadImg(){
    src = document.getElementById('chart_img').getAttribute('src')
    url = src.replace(/^data:image\/[^;]+/, 'data:application/octet-stream')
    window.location.assign(url);
};