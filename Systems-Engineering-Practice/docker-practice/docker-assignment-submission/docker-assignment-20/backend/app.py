from flask import Flask, jsonify
import psycopg2
import os

app = Flask(__name__)

def get_db():
    return psycopg2.connect(
        host=os.environ["DB_HOST"],
        database=os.environ["DB_NAME"],
        user=os.environ["DB_USER"],
        password=os.environ["DB_PASSWORD"]
    )

@app.route("/health")
def health():
    return "OK", 200

@app.route("/api")
def api():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT message FROM demo;")
    msg = cur.fetchone()[0]
    cur.close()
    conn.close()
    return jsonify(message=msg)

app.run(host="0.0.0.0", port=5000)
