from app.resource import setup_environment
import sqlalchemy
import logging 

log = logging.getLogger(__name__) 
con = None

def openConnection():
    engine = setup_environment.get_database()
    con= engine.connect()
    return con

def closeConnection(con):
    con.close()

def readMainWork(con):
    try:
        result = con.execute('select * from works where main=true and state=true;')
        return list(result)
    except:
        log.exception('Unexpected error')

def readAditionalWork(con):
    try:
        result = con.execute('select * from works where main=false and state=true;')
        return list(result)
    except:
        log.exception('Unexpected error')

def readResearch(con):
    try:
        result = con.execute('select * from researchs where state=true;')
        return list(result)
    except:
        log.exception('Unexpected error')

def readInit(con):
    try:
        result = con.execute('select * from info_init where state=true;')
        return list(result)
    except:
        log.exception('Unexpected error')

def readMe(con):
    try:
        result = con.execute('select greeting, content, goal, finish, img, skills from info_me i inner join (select me_id, array_agg(name) as skills from skills group by me_id ) s on i.me_id = s.me_id where i.state=true;');
        return list(result)
    except NameError:
        log.exception('Unexpected error')

def readAditionalInfo(con):
    try:
        result = con.execute('select * from me')
        return list(result)
    except:
        log.exception('Unexpected error')