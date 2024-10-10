from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import os
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from sqlalchemy import text 
# Load environment variables from dbconnection_local.env
load_dotenv('dbconnection_local.env')

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

# Configure the PostgreSQL database connection using environment variables
app.config['SQLALCHEMY_DATABASE_URI'] = (
    f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@"
    f"{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Initialize the SQLAlchemy extension
db = SQLAlchemy(app)

@app.route('/')
@cross_origin(origin='*')
def index():
    try:
        # Using a connection object to execute raw SQL
        with db.engine.connect() as connection:
            result = connection.execute(text('SELECT 1'))
            return "Database connected successfully!" if result.fetchone() else "Connection failed!"
    except Exception as e:
        return f"Error connecting to the database: {e}"

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5100)