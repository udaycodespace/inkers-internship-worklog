from flask import Flask, request, jsonify
from flask_cors import CORS
from todo_model import db, Todo

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///todo.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

with app.app_context():
    db.create_all()

@app.route("/todos", methods=["GET"])
def get_todos():
    todos = Todo.query.all()
    return jsonify([t.to_dict() for t in todos])

@app.route("/todos", methods=["POST"])
def add_todo():
    data = request.json
    todo = Todo(text=data["text"], done=False)
    db.session.add(todo)
    db.session.commit()
    return jsonify(todo.to_dict()), 201

@app.route("/todos/<int:id>", methods=["PUT"])
def update_todo(id):
    todo = Todo.query.get_or_404(id)
    data = request.json
    todo.text = data.get("text", todo.text)
    todo.done = data.get("done", todo.done)
    db.session.commit()
    return jsonify(todo.to_dict())

@app.route("/todos/<int:id>", methods=["DELETE"])
def delete_todo(id):
    todo = Todo.query.get_or_404(id)
    db.session.delete(todo)
    db.session.commit()
    return "", 204
@app.route("/")
def home():
    return "Backend is running!"

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
