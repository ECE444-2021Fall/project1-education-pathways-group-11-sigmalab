from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# ------------------------------------>  db system    username:passwd   host     db-name
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@database/postgres'

db = SQLAlchemy(app)

from . import routes
from . import models

# NOTE: Uncomment this to re-populate db
# db.drop_all()
# from . import db_init

db.create_all()

if __name__=="__main__":
    app.run(host='0.0.0.0')
