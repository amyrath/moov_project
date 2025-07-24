import sqlite3
import mysql.connector

# Connexion à la base MySQL
mysql_conn = mysql.connector.connect(
    host="localhost",
    user="ton_utilisateur",
    password="ton_mot_de_passe",
    database="monprojet"
)
mysql_cursor = mysql_conn.cursor()

### MIGRATION 1 : SQLite (données .txt) vers MySQL

sqlite1 = sqlite3.connect('data_txt.sqlite')
cursor1 = sqlite1.cursor()
cursor1.execute("SELECT * FROM tgz")
rows1 = cursor1.fetchall()

for row in rows1:
    mysql_cursor.execute("""
        INSERT INTO tgz (id, source, type_cdr, year, month, file, extension)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """, row)

sqlite1.close()


### MIGRATION 2 : SQLite (données .csv) vers MySQL

sqlite2 = sqlite3.connect('data_csv.sqlite')
cursor2 = sqlite2.cursor()
cursor2.execute("SELECT * FROM csvdata")  # adapte le nom si besoin
rows2 = cursor2.fetchall()

for row in rows2:
    mysql_cursor.execute("""
        INSERT INTO csvdata (id, colonne1, colonne2, ...)
        VALUES (%s, %s, %s, ...)
    """, row)

sqlite2.close()


# Commit des changements
mysql_conn.commit()
mysql_conn.close()

print("Migration terminée avec succès.")












##################################"

import sqlite3
import mysql.connector

# Connexion à la base de données SQLite (fichier existant)
sqlite_conn = sqlite3.connect('chemin/vers/ta_base.sqlite')
sqlite_cursor = sqlite_conn.cursor()

# Connexion à MySQL
mysql_conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='monpass123',
    database='nest_db'
)
mysql_cursor = mysql_conn.cursor()

# Création de la table tgz dans MySQL (si elle n'existe pas déjà)
mysql_cursor.execute("""
CREATE TABLE IF NOT EXISTS tgz (
    id INT AUTO_INCREMENT PRIMARY KEY,
    source VARCHAR(255),
    type_cdr VARCHAR(255),
    year VARCHAR(10),
    month VARCHAR(10),
    file VARCHAR(255),
    extension VARCHAR(50)
)
""")

# Récupération de toutes les lignes de la table SQLite
sqlite_cursor.execute("SELECT source, type_cdr, year, month, file, extension FROM tgz")
rows = sqlite_cursor.fetchall()

# Insertion des données dans MySQL
for row in rows:
    mysql_cursor.execute("""
        INSERT INTO tgz (source, type_cdr, year, month, file, extension)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, row)

# Validation des modifications
mysql_conn.commit()

# Fermeture des connexions
sqlite_conn.close()
mysql_conn.close()

print(f"{len(rows)} lignes migrées avec succès vers MySQL.")


#python migrate_sqlite_to_mysql.py
