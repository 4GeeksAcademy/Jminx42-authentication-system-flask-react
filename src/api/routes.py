"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

@api.route("/signup", methods=["POST"])
def create_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if not email or not password:
        return jsonify({"msg": "missing email or password"}), 300
    
    user_already_exist = User.query.filter_by(email = email).first()
    if  user_already_exist:
        return jsonify({"msg": "email already in use"}), 401
    user = User(email = email, password = password, is_active = True)
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "Successfully added user"}), 200


@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email = email, password = password).first()
    if not user:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token)

@api.route("/hello", methods=["GET"])
@jwt_required()
def get_hello():
    
    id = get_jwt_identity()
    user = User.query.get(id)
    dictionary = {
        "message": "hello world " + user.email
    }
 
    return jsonify(dictionary)
