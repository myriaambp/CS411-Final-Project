import sqlite3
  
# filename to form database
file = "Sqlite3.db"
  
try:
  conn = sqlite3.connect(file)
  print("Database Sqlite3.db formed.")
except:
  print("Database Sqlite3.db not formed.")
