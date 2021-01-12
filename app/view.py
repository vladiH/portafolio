from app import app

from flask import Flask, render_template, url_for, request, redirect
from datetime import date
from app.resource import api

con = api.openConnection()
@app.route('/', methods=['GET'])
def index():
    init = api.readInit(con)
    me = api.readMe(con)
    works = api.readMainWork(con)
    more_work = api.readAditionalWork(con)
    research = api.readResearch(con)
    info = api.readAditionalInfo(con)
    #api.closeConnection(con)
    return render_template('publics/index.html',
    year = date.today().year,
    info = info[0],
    init = init[0],
     me = me[0],
     works = works,
     length1=len(works), #longitud trabajo principal
     more_work = more_work,
     length2=len(more_work), #longitud trabajos secundarios
     researchs=research,
     length_researchs=len(research))