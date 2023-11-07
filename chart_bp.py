from flask import Blueprint, request, render_template, jsonify
from io import BytesIO
from matplotlib.figure import Figure
import urllib.parse
import base64
import platform
import numpy as np

bp = Blueprint('chartImage', __name__, url_prefix='/chartImage')

@bp.route('/')
def main():
    return "chart main"

@bp.route('/line', methods=('GET', 'POST'))
def line():
    # 예시 차트 만들기
    fig = create_line()
    img = BytesIO()  # create the buffer
    fig.savefig(img, format='png')  # save figure to the buffer
    img.seek(0)  # rewind your buffer
    plot_data = urllib.parse.quote(base64.b64encode(img.read()).decode()) # base64 encode & URL-escape
    return render_template('line.html', img_file=plot_data)
# 선 차트 업데이트 ajax
@bp.route('/line_ajax', methods=['POST'])
def line_ajax():
    data = request.get_json() # 자바스크립트로 부터 데이터 받아오기
    # 차트 만들기
    fig = create_line(data['title'], data['xlabel'], data['ylabel'], data['legend'], data['grid'], data['xData'], data['yDataLabel'], data['yDataList'], data['bkwt'], data['borderTop'], data['borderBottom'], data['borderLeft'], data['borderRight'], data['chartRatio'])
    img = BytesIO()  # create the buffer
    fig.savefig(img, format='png')  # save figure to the buffer
    img.seek(0)  # rewind your buffer
    plot_data = urllib.parse.quote(base64.b64encode(img.read()).decode()) # base64 encode & URL-escape
    return jsonify(result = "success", result2 = plot_data)

@bp.route('/bar', methods=('GET', 'POST'))
def bar():
    # 예시 차트 만들기
    fig = create_bar()
    img = BytesIO()  # create the buffer
    fig.savefig(img, format='png')  # save figure to the buffer
    img.seek(0)  # rewind your buffer
    plot_data = urllib.parse.quote(base64.b64encode(img.read()).decode()) # base64 encode & URL-escape
    return render_template('bar.html', img_file=plot_data)
# 바 차트 업데이트 ajax
@bp.route('/bar_ajax', methods=['POST'])
def bar_ajax():
    data = request.get_json() # 자바스크립트로 부터 데이터 받아오기
    # 차트 만들기
    fig = create_bar(data['title'], data['ylabel'], data['grid'], data['xData'], data['yDataList'], data['bkwt'], data['borderTop'], data['borderBottom'], data['borderLeft'], data['borderRight'], data['chartRatio'], data['xWidth'], data['dataColor'], data['isHorizon'])
    img = BytesIO()  # create the buffer
    fig.savefig(img, format='png')  # save figure to the buffer
    img.seek(0)  # rewind your buffer
    plot_data = urllib.parse.quote(base64.b64encode(img.read()).decode()) # base64 encode & URL-escape
    return jsonify(result = "success", result2 = plot_data)

# 그룹바차트
@bp.route('/groupbar', methods=('GET', 'POST'))
def groupbar():
    # 예시 차트 만들기
    fig = create_groupbar()
    img = BytesIO()  # create the buffer
    fig.savefig(img, format='png')  # save figure to the buffer
    img.seek(0)  # rewind your buffer
    plot_data = urllib.parse.quote(base64.b64encode(img.read()).decode()) # base64 encode & URL-escape
    return render_template('groupbar.html', img_file=plot_data)
# 그룹바 차트 업데이트 ajax
@bp.route('/groupbar_ajax', methods=['POST'])
def groupbar_ajax():
    data = request.get_json() # 자바스크립트로 부터 데이터 받아오기
    # 차트 만들기
    fig = create_groupbar(data['title'], data['ylabel'], data['grid'], data['categories'], data['items'], data['datas'], data['bkwt'], data['borderTop'], data['borderBottom'], data['borderLeft'], data['borderRight'], data['chartRatio'], data['isHorizon'])
    img = BytesIO()  # create the buffer
    fig.savefig(img, format='png')  # save figure to the buffer
    img.seek(0)  # rewind your buffer
    plot_data = urllib.parse.quote(base64.b64encode(img.read()).decode()) # base64 encode & URL-escape
    return jsonify(result = "success", result2 = plot_data)




# 선 차트 만들기
def create_line(title='chart title', xlabel='x-axis', ylabel='y-axis', legendSw=True, gridSw=True, xdata=[1,2,3,4], ydatalabel=['data label 1', 'data label 2'], ydata=[[2,4,6,8],[3,6,9,12]], bkwt=False, borderTop=True, borderBottom=True, borderLeft=True, borderRight=True, chartRatio=3):
    bcolor, fcolor = bkwtTrans(bkwt) # 흑백전환
    font = fontSelect() # 글자폰트
    
    # 차트설정
    fig = Figure(figsize=(10,int(chartRatio)*2.5), facecolor=(bcolor), layout="constrained")
    ax = fig.subplots(1, 1) # figure 수량 matrix
    ax.set_facecolor(bcolor) # 차트 내부 face 색상
    ax.tick_params(labelsize=10)
    ax.set_title(title, fontsize=20, family=font, color=fcolor) # 차트 타이틀
    ax.set_xlabel(xlabel, family=font, color=fcolor, fontsize=15) # x축 라벨
    ax.set_ylabel(ylabel, family=font, color=fcolor, fontsize=15) # y축 라벨
    ax.tick_params(labelcolor=fcolor) # 틱 색상

    # 십자축
    # ax.spines[['left', 'bottom']].set_position('center')
    # ax.spines[['top', 'right']].set_visible(False)
    for i in range(len(ydatalabel)): # x-y그래프 및 y데이터라벨 생성
        ax.plot(xdata, ydata[i], '', label=str(ydatalabel[i]))

    # 외곽선
    if borderTop:
        ax.spines.top.set_visible(True)
        ax.spines.top.set_color(fcolor)
    else:
        ax.spines.top.set_visible(False)

    if borderBottom:
        ax.spines.bottom.set_visible(True)
        ax.spines.bottom.set_color(fcolor)
    else:
        ax.spines.bottom.set_visible(False)

    if borderLeft:
        ax.spines.left.set_visible(True)
        ax.spines.left.set_color(fcolor)
    else:
        ax.spines.left.set_visible(False) 

    if borderRight:
        ax.spines.right.set_visible(True)
        ax.spines.right.set_color(fcolor)
    else:
        ax.spines.right.set_visible(False)

    if legendSw: # 범례 On
        ax.legend(prop={'family':font, 'size':10})
    if gridSw: # 그리드 On
        ax.grid()

    return fig

# 바 차트 만들기
def create_bar(title='chart title', ylabel='y-axis', gridSw=False, xdata=['a','b','c','d'], ydata=[2,4,6,8], bkwt=False, borderTop=True, borderBottom=True, borderLeft=True, borderRight=True, chartRatio=3, xWidth=50, dataColor='blue', isHorizon=False):
    bcolor, fcolor = bkwtTrans(bkwt) # 흑백전환
    font = fontSelect() # 글자폰트

    # 차트설정
    fig = Figure(figsize=(10,int(chartRatio)*2.5), facecolor=(bcolor), layout="constrained")
    ax = fig.subplots(1, 1) # figure 수량 matrix
    ax.set_facecolor(bcolor) # 차트 내부 face 색상
    ax.tick_params(labelsize=10)
    ax.set_title(title, fontsize=20, family=font, color=fcolor) # 차트 타이틀
    ax.set_ylabel(ylabel, family=font, color=fcolor, fontsize=15) # y축 라벨
    ax.tick_params(labelcolor=fcolor) # 틱 색상

    if isHorizon: # 종/횡 바 차트 만들기
        rects = ax.barh(xdata, ydata, height=(int(xWidth)/100), edgecolor="white", color='tab:'+dataColor) # color = ['tab:red']
        ax.bar_label(rects, padding=3)
    else:
        rects = ax.bar(xdata, ydata, width=(int(xWidth)/100), edgecolor="white", color='tab:'+dataColor)
        ax.bar_label(rects, padding=3)

    # 외곽선
    if borderTop:
        ax.spines.top.set_visible(True)
        ax.spines.top.set_color(fcolor)
    else:
        ax.spines.top.set_visible(False)

    if borderBottom:
        ax.spines.bottom.set_visible(True)
        ax.spines.bottom.set_color(fcolor)
    else:
        ax.spines.bottom.set_visible(False)
    if borderLeft:
        ax.spines.left.set_visible(True)
        ax.spines.left.set_color(fcolor)
    else:
        ax.spines.left.set_visible(False) 

    if borderRight:
        ax.spines.right.set_visible(True)
        ax.spines.right.set_color(fcolor)
    else:
        ax.spines.right.set_visible(False)

    if gridSw: # 그리드 On
        ax.grid()

    return fig

# 그룹바 차트 만들기
def create_groupbar(title='CHART TITLE', ylabel='y-axis', gridSw=False, categories = ["1Q", "2Q", "3Q", "4Q"], items = ['A', 'B', 'C'], datas = [[30,40,10,20], [35,25,30,40], [20,30,40,50]], bkwt=False, borderTop=True, borderBottom=True, borderLeft=True, borderRight=True, chartRatio=3, isHorizon=False):
    bcolor, fcolor = bkwtTrans(bkwt) # 흑백전환
    font = fontSelect() # 글자폰트

    width = 1 / (1 + len(items)) # the width of the bars
    offset = list(np.arange(len(categories)))
    groupOffsets = []
    xticksOffset = [0 for i in range(len(categories))]

    # item & data 간격 구하기
    for i in range(len(items)):
        tempOffsets = []
        for j in range(len(categories)):
            tempOffsets.append(offset[j] + (width * i))
            xticksOffset[j] += tempOffsets[j]
        # print(tempOffsets)
        groupOffsets.append(tempOffsets)
    # print(groupOffsets)

    # categories 간격 구하기
    for o in range(len(categories)):
        xticksOffset[o] = xticksOffset[o] / len(items)
    # print(xticksOffset)

    # 차트설정
    fig = Figure(figsize=(10,int(chartRatio)*2.5), facecolor=(bcolor), layout="constrained")
    ax = fig.subplots(1, 1) # figure 수량 matrix
    ax.set_facecolor(bcolor) # 차트 내부 face 색상
    ax.set_title(title, fontsize=20, family=font, color=fcolor)
    ax.tick_params(labelcolor=fcolor) # 틱 색상

    # 차트 만들기
    if isHorizon: # 종/횡 바 차트 만들기
        ax.set_xlabel(ylabel, family=font, color=fcolor)
        ax.set_yticks(xticksOffset, categories, family=font)
        for k in range(len(items)):
            rects = ax.barh(groupOffsets[k], datas[k], width, label=items[k])
            ax.bar_label(rects, padding=3, color=fcolor)
    else:
        ax.set_ylabel(ylabel, family=font, color=fcolor)
        ax.set_xticks(xticksOffset, categories, family=font)
        for k in range(len(items)):
            rects = ax.bar(groupOffsets[k], datas[k], width, label=items[k])
            ax.bar_label(rects, padding=3, color=fcolor)

    # 외곽선
    if borderTop:
        ax.spines.top.set_visible(True)
        ax.spines.top.set_color(fcolor)
    else:
        ax.spines.top.set_visible(False)

    if borderBottom:
        ax.spines.bottom.set_visible(True)
        ax.spines.bottom.set_color(fcolor)
    else:
        ax.spines.bottom.set_visible(False)
    if borderLeft:
        ax.spines.left.set_visible(True)
        ax.spines.left.set_color(fcolor)
    else:
        ax.spines.left.set_visible(False) 

    if borderRight:
        ax.spines.right.set_visible(True)
        ax.spines.right.set_color(fcolor)
    else:
        ax.spines.right.set_visible(False)

    if gridSw: # 그리드 On
        ax.grid()
    ax.legend(prop={'family':font, 'size':10})

    return fig

# 차트 흑/백 전환
def bkwtTrans(bkwt):
    if bkwt:
        bcolor = 'black'
        fcolor = 'white'
    else:
        bcolor = 'white'
        fcolor = 'black'

    return bcolor, fcolor

# 기기별 폰트 변경(한글폰트)
def fontSelect():
    if platform.system() == 'Windows': # Window
        font = 'Malgun Gothic'
    elif platform.system() == 'Darwin': # Mac
        font = 'AppleGothic' # AppleGothic monospace cursive serif
    else: #linux
        font = 'NanumGothic' # NanumBarunGothic NanumBrush NanumGothic NanumGothicBold NanumMyeongjo NanumPen NanumBrush

    return font