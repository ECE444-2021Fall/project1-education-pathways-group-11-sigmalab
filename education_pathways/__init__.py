from flask import Flask
from flask_msearch import Search
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

app = Flask(__name__)
# ------------------------------------>  db system    username:passwd   host     db-name
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['MSEARCH_INDEX_NAME'] = 'msearch'
app.config['MSEARCH_BACKEND'] = 'whoosh'
app.config['MSEARCH_PRIMARY_KEY'] = 'id'
app.config['MSEARCH_ENABLE'] = True
app.config['WHOOSH_BASE'] = 'whoosh_index'
app.config['WHOOSH_ENABLE'] = True

CORS(app, resources={r"/*": {"origins":"*"}})

engine = create_engine('postgres://qtfxkypsermkdl:ad2ae78e2c7c07cba2077659acc4c0cbb9fdc706e96c3c2ba6a702fdeecf59e0@ec2-54-160-7-200.compute-1.amazonaws.com:5432/d4vh5vfta21lbc'
)
db = scoped_session(sessionmaker(bind=engine))

@app.after_request
def apply_headers(re):
    re.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return re

#db = SQLAlchemy(app)
ma = Marshmallow(app)

from . import models
from . import routes

# NOTE: Uncomment this to re-populate db
#db.drop_all()
from . import db_init


db.create_all()


if __name__=="__main__":
    app.run(host='0.0.0.0')
