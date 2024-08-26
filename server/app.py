from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route('/api/data')
@cross_origin(origin='*')
def get_data():
    # Define your data
    data = {
        'name': 'Sensing Local',
        'state': 'Bangalore'
    }
    # Return JSON response
    return jsonify(data)

@app.route('/')
@cross_origin(origin='*')
def home():
    return 'Basic React-Flask app for deployment testing'

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)