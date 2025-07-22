import mysql.connector

# Connexion à la base de données MySQL
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="papa",
    database="blog"
)

curseur = conn.cursor()

# Exécution de la requête JOIN
#curseur.execute("DROP TABLE IF EXISTS csv") #suppression

curseur.execute("""
    SELECT 
        tgz.source, tgz.file,
        csv.save_date, csv.client, csv.number_bande, csv.type_of_eq
    FROM tgz
    JOIN csv ON tgz.source = csv.source
""")

# Récupération et affichage des résultats
resultats = curseur.fetchall()
for ligne in resultats:
    print(ligne)

# Fermeture de la connexion
curseur.close()
conn.close()
