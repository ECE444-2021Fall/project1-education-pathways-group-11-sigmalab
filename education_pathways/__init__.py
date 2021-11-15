from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_msearch import Search

app = Flask(__name__)

# ------------------------------------>  db system    username:passwd   host     db-name
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@database/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['MSEARCH_INDEX_NAME'] = 'msearch'
app.config['MSEARCH_BACKEND'] = 'whoosh'
app.config['MSEARCH_PRIMARY_KEY'] = 'id'
app.config['MSEARCH_ENABLE'] = True
app.config['WHOOSH_BASE'] = 'whoosh_index'
app.config['WHOOSH_ENABLE'] = True


db = SQLAlchemy(app)


from . import routes
from . import models


# NOTE: Uncomment this to re-populate db
# db.drop_all()
# from . import db_init


db.create_all()


if __name__=="__main__":
    app.run(host='0.0.0.0')
