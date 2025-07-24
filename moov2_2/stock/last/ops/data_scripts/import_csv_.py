import csv
import mysql.connector

# Connexion à la base MySQL
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="papa",
    database="blog"
)
curseur = conn.cursor()

# Création de la table si elle n'existe pas déjà
curseur.execute("""
CREATE TABLE IF NOT EXISTS csv (
    id INT AUTO_INCREMENT PRIMARY KEY,
    source VARCHAR(255),
    save_date VARCHAR(50),
    client VARCHAR(255),
    number_bande VARCHAR(255),
    type_of_eq VARCHAR(255),
    UNIQUE(client, number_bande)
)
""")

# Lecture et insertion du fichier CSV
with open('/home/amyrath1/moov2/stock/last/project/data_scripts/test_d/take.csv', newline='', encoding='utf-8') as csvfile:
    lecteur = csv.DictReader(csvfile)
    for ligne in lecteur:
        source = ligne["source"]
        save_date = ligne["save_date"]
        client = ligne["client"]
        number_bande = ligne["number_bande"]
        type_of_eq = ligne["type_of_eq"]

        # Insertion dans MySQL
        curseur.execute("""
            INSERT INTO csv (source, save_date, client, number_bande, type_of_eq)
            VALUES (%s, %s, %s, %s, %s)
        """, (source, save_date, client, number_bande, type_of_eq))

conn.commit()
conn.close()

print("Import CSV terminé avec succès dans MySQL.")
