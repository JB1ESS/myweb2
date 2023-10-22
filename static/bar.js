var xDataNum = 0; // xData 입력갯수
var yDataNum = 0; // yData 입력갯수, 이중배열로 사용

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
    xDataInput.setAttribute("onfocus", 'addXData();return false');

    // xData 마지막 항목입력에서만 항목입력생성 이벤트 발생하도록 전에 있는 항목입력 이벤트 속성 삭제
    document.getElementById('xdata_input'+(xDataNum-1)).setAttribute("onfocus", '');
    // yData 마지막 항목입력을 제외한 다른 항목입력에 데이터를 입력하도록 강제하기
    document.getElementById('xdata_input'+(xDataNum-1)).setAttribute("required", '');
};

// yData 항목입력 추가하기
function addYData(){
    yDataNum += 1;
    document.getElementById("yData_num0").value = yDataNum;

    // yData 항목입력 창 생성
    const yDataInput = document.createElement("input");
    document.getElementById('y_data_inputs0').appendChild(yDataInput);
    yDataInput.setAttribute("type", 'number');
    yDataInput.setAttribute("class", 'form-control ms-1');
    yDataInput.setAttribute("name", 'ydata0_input'+ yDataNum);
    yDataInput.setAttribute("id", 'ydata0_input'+ yDataNum);
    yDataInput.setAttribute("style", 'width: 80px;');
    yDataInput.setAttribute("onfocus", 'addYData();return false');
    
    // yData 마지막 항목입력에서만 항목입력생성 이벤트 발생하도록 전에 있는 항목입력 이벤트 속성 삭제
    document.getElementById('ydata0_input'+(yDataNum-1)).setAttribute("onfocus", '');
    // yData 마지막 항목입력을 제외한 다른 항목입력에 데이터를 입력하도록 강제하기
    document.getElementById('ydata0_input'+(yDataNum-1)).setAttribute("required", '');
};

// 차트 업데이트 하기
function makeChart(){
    title = document.getElementById("title_input").value;
    yLabel = document.getElementById("ylabel_input").value;
    grid = document.getElementById("grid_switch1").checked;
    borderTop = document.getElementById("border_top_switch1").checked;
    borderBottom = document.getElementById("border_bottom_switch1").checked;
    borderLeft = document.getElementById("border_left_switch1").checked;
    borderRight = document.getElementById("border_right_switch1").checked;
    bkwt = document.getElementById("bkwt_switch1").checked;
    xWidth = document.getElementById("xdata_width").value;
    isHorizon = document.getElementById("horizon_switch2").checked;
    
    colorList = ['red', 'orange', 'green', 'blue', 'purple', 'grey'];
    for(var j=0; j<6; j++){
        if(document.getElementById("d_color" + j).checked){
            dataColor = colorList[j];
        };
    }
    
    for(var k=1; k<5; k++){
        if(document.getElementById("ratio_input" + k).checked){
            chartRatio = k;
        } 
    };

    var xData = [];
    for(var x=0; x<xDataNum; x++){
        xData.push(document.getElementById("xdata_input"+x).value);
    };

    var yDataList = [];
        for(var y=0; y<xDataNum; y++){ // yData 추출(xData 항목 수와 yData 항목 수 통일하기) yData가 더 많으면 무시하고 적으면 빈 데이터는 0으로 대체한다.
            if(document.getElementById("ydata0_input"+y) == null || document.getElementById("ydata0_input"+y).value == ""){
                yDataList.push(0);
            }else{
                yDataList.push(Number(document.getElementById("ydata0_input"+y).value));
            };
        };

    if(bkwt){
        document.querySelector("body").setAttribute('style', 'background-color:black;')
    }else{
        document.querySelector("body").setAttribute('style', 'background-color:white;')
    }

    // flask로 보낼 데이터 만들기
    inputData = {
        'title':title,
        'ylabel':yLabel,
        'grid':grid,
        'xData':xData,
        'yDataList':yDataList,
        // 'fontColor':fontColor,
        // 'backColor':backColor,
        'bkwt':bkwt,
        'borderTop':borderTop,
        'borderBottom':borderBottom,
        'borderLeft':borderLeft,
        'borderRight':borderRight,
        'chartRatio':chartRatio,
        'xWidth':xWidth,
        'dataColor':dataColor,
        'isHorizon':isHorizon
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
            alert('Network Error, 나중에 다시 시도하세요')
            // alert(error);
        }
    })
};

function downloadImg(){
    src = document.getElementById('chart_img').getAttribute('src')
    url = src.replace(/^data:image\/[^;]+/, 'data:application/octet-stream')
    window.location.assign(url);
};