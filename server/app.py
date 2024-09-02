from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route('/api/data', methods=['GET'])
@cross_origin(origin='*')
def get_data():
    # Define your data
    data = {
        'fid': '1',
        'issue_type': 'B-Construction debris',
        'category2': 'Waste',
        'category1': 'Physical Barriers',
        'type': 'point'
    }
    # Return JSON response
    return jsonify(data)

@app.route('/')
@cross_origin(origin='*')
def home():
    return 'Basic React-Flask app for deployment testing'

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)