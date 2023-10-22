from flask import Blueprint, render_template

bp = Blueprint('chartImage', __name__, url_prefix='/chartImage')

@bp.route('/')
def main():
    return "chart main"

@bp.route('/line', methods=('GET', 'POST'))
def line():
    return "line chart"

@bp.route('/bar', methods=('GET', 'POST'))
def bar():
    return "bar chart"

@bp.route('/groupbar', methods=('GET', 'POST'))
def groupbar():
    return "groupbar chart"