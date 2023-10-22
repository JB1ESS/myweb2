from flask import Flask, render_template

import chart_bp

app = Flask(__name__)
app.register_blueprint(chart_bp.bp)

@app.route('/')
def index():
    return render_template('index.html')