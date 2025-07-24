import mysql.connector

# Connexion à la base de données MySQL
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="papa",
    database="blog"
)

curseur = conn.cursor()

# Lire les données de la table tgz
curseur.execute("SELECT * FROM tgz")
resultats = curseur.fetchall()

# Affichage des résultats
for ligne in resultats:
    print(ligne)

# Fermeture
curseur.close()
conn.close()
