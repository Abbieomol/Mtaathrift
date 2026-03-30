import os

db_path = 'db.sqlite3'
if os.path.exists(db_path):
    os.remove(db_path)
    print('Database deleted')
else:
    print('No database found')