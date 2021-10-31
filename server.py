import os
import sys
import logging
from datetime import datetime
from flask import Flask, render_template, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import relation, relationship
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, login_user, LoginManager, login_required, current_user, logout_user


app = Flask(__name__)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")

#####################################################################
uri = os.getenv("DATABASE_URL", "sqlite:///react-flask-blog.db")
if uri and uri.startswith("postgres://"):
    uri = uri.replace("postgres://", "postgresql://", 1)

app.config["SQLALCHEMY_DATABASE_URI"] = uri
#####################################################################
# app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
#     "DATABASE_URL", "sqlite:///react-flask-blog.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)


# CREATE TABLE
class User(UserMixin, db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    posts = relationship("BlogPost", back_populates="author")
    comments = relationship("Comment", back_populates="comment_author")


class BlogPost(db.Model):
    __tablename__ = "blog_posts"
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    author = relationship("User", back_populates="posts")
    title = db.Column(db.String(250), unique=True, nullable=False)
    subtitle = db.Column(db.String(250), unique=True, nullable=False)
    date = db.Column(db.String(250), nullable=False)
    body = db.Column(db.Text, nullable=False)
    img_url = db.Column(db.String(250), nullable=False)
    comments = relationship("Comment", back_populates="parent_post")

    # def to_dict(self):
    #     return {column.name: getattr(self, column.name) for column in self.__table__.columns}


class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey("blog_posts.id"))
    parent_post = relationship("BlogPost", back_populates="comments")
    author_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    comment_author = relation("User", back_populates="comments")
    text = db.Column(db.Text, nullable=False)


db.create_all()


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/create-post")
def create_post_page():
    return render_template("index.html")


@app.route("/post/<int:post_id>")
def get_post_page(post_id):
    return render_template("index.html")


######################## API ROUTES ########################
@app.route("/api/create-user", methods=["GET", "POST"])
def register():
    if (request.method == "POST") and request.is_json:
        request_data = request.get_json()
        username = request_data.get("username")
        email = request_data.get("email")
        password = request_data.get("password")

        if ((username or email or password) is not None) and ((username or email or password) != ""):
            hash_and_salted_password = generate_password_hash(
                password,
                method="pbkdf2:sha256",
                salt_length=8
            )

            new_user = User(
                username=username,
                email=email,
                password=hash_and_salted_password
            )

            db.session.add(new_user)
            db.session.commit()
            login_user(new_user, remember=True)

            return jsonify({"username": username, "email": email, "password": password, "hash": hash_and_salted_password}), 201

        return jsonify({"message": "Bad request"}), 400

    return jsonify({"message": "CREATE NEW USER FORM"})


@app.route("/api/log-in", methods=["GET", "POST"])
def log_in():
    if (request.method == "POST") and request.is_json:
        request_data = request.get_json()
        email = request_data.get("email")
        password = request_data.get("password")

        if (email or password) is not None and ((email or password) != ""):
            user = User.query.filter_by(email=email).first()

            if user is None:
                return jsonify({"message": "The email does not exist, please try again."}), 404
            elif not check_password_hash(user.password, password):
                return jsonify({"message": "The password is incorrect."}), 401
            else:
                login_user(user, remember=True)
                return jsonify({"message": "Login successfull."}), 200

        return jsonify({"message": "Bad request"}), 400

    return jsonify({"message": "LOG IN USER FORM"})


@app.route("/api/log-out")
def log_out():
    logout_user()
    return jsonify({"message": "Successfully logged out"}), 200


@app.route("/api/authenticate")
def authenticate():
    return jsonify({"session_validation": current_user.is_authenticated})


@app.route("/api/create-post", methods=["GET", "POST"])
@login_required
def create_post():
    if request.method == "POST" and request.is_json:
        request_data = request.get_json()
        author = current_user
        title = request_data.get("title")
        subtitle = request_data.get("subtitle")
        date = datetime.now()
        body = request_data.get("body")
        img_url = request_data.get("imgUrl")

        if ((title or subtitle or body or img_url) is not None) and ((title or subtitle or body or img_url) != ""):
            new_post = BlogPost(
                author=author,
                title=title,
                subtitle=subtitle,
                date=date,
                body=body,
                img_url=img_url,
            )

            db.session.add(new_post)
            db.session.commit()

            return jsonify({"author": author.username, "title": title, "subtitle": subtitle, "date": date, "body": body, "img_url": img_url}), 201

        return jsonify({"message": "Bad request!"}), 400

    return jsonify({"message": "CREATE NEW POST FORM"})


@app.route("/api/all-posts")
# @login_required
def get_all_blog_posts():
    all_blog_posts = []

    # for blog_post in BlogPost.query.all():
    #     blog_post_dict = {
    #         "id": blog_post.id,
    #         "date": blog_post.date,
    #         "author": blog_post.author.username,
    #         "title": blog_post.title,
    #         "subtitle": blog_post.subtitle,
    #         "img_url": blog_post.img_url,
    #         "body": "".join([letter for (i, letter) in enumerate(blog_post.body) if i < 500]) + "..."
    #     }

    #     all_blog_posts.append(blog_post_dict)

    return jsonify(all_blog_posts=all_blog_posts), 200


@app.route("/api/post/<int:post_id>")
def get_post(post_id):
    blog_post = BlogPost.query.get(post_id)

    blog_post_dict = {
        "id": blog_post.id,
        "date": blog_post.date,
        "author": blog_post.author.username,
        "title": blog_post.title,
        "subtitle": blog_post.subtitle,
        "img_url": blog_post.img_url,
        "body": blog_post.body,
    }

    return jsonify(blog_post=blog_post_dict), 200


#######################################################
app.logger.addHandler(logging.StreamHandler(sys.stdout))
app.logger.setLevel(logging.ERROR)
#######################################################


if __name__ == "__main__":
    app.run(debug=True)
