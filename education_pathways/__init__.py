from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)

# ------------------------------------>  db system    username:passwd   host     db-name
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@database/postgres'
# delete in production
app.config['JSON_SORT_KEYS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

from . import models
from . import routes

# NOTE: Uncomment this to re-populate db
#db.drop_all()
#from . import db_init

db.create_all()

if __name__=="__main__":
    app.run(host='0.0.0.0')
