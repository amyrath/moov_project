import os
import csv
import mysql.connector

path_dirs = os.path.join(os.path.dirname(__file__), "way")
lignes_categorisees = []

# Lecture des fichiers txt et extraction des .tgz
for file_name in os.listdir(path_dirs):
    if file_name.endswith(".txt"):
        path_file = os.path.join(path_dirs, file_name)

        with open(path_file, 'r', encoding='utf-8') as file:
            for line in file:
                if ".tgz" in line:
                    position = line.find(".tgz") + len(".tgz")
                    chemin = line[:position].strip()
                    separator = chemin.split("/")

                    if len(separator) >= 4:
                        type_cdr = separator[1]
                        date_file = separator[2]
                        name_tgz = separator[3]

                        year = date_file[:4]
                        month = date_file[4:6]

                        extension = name_tgz.split(".")[-1] if "." in name_tgz else "inconnue"

                        lignes_categorisees.append({
                            "source": file_name,
                            "type_cdr": type_cdr,
                            "year": year,
                            "month": month,
                            "file": name_tgz,
                            "extension": extension
                        })

# Affichage console
for line in lignes_categorisees:
    print(f"[{line['source']}] Type : {line['type_cdr']} | Année : {line['year']} | Mois : {line['month']} | Fichier : {line['file']} | Extension : {line['extension']}")

# Export CSV
with open("categorisation3.csv", "w", newline='', encoding='utf-8') as fichier_csv:
    writer = csv.DictWriter(fichier_csv, fieldnames=["source", "type_cdr", "year", "month", "file", "extension"])
    writer.writeheader()
    writer.writerows(lignes_categorisees)

# Connexion à la base MySQL
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="papa",
    database="blog"
)
curseur = conn.cursor()


# Création de la table tgz si elle n'existe pas
curseur.execute("""
CREATE TABLE IF NOT EXISTS tgz (
    id INT AUTO_INCREMENT PRIMARY KEY,
    source TEXT,
    type_cdr TEXT,
    year TEXT,
    month TEXT,
    file TEXT,
    extension TEXT,
    UNIQUE KEY unique_csv(source(255))
)
""")

# Insertion dans la table tgz
for ligne in lignes_categorisees:
    source = ligne["source"]
    type_cdr = ligne["type_cdr"]
    year = ligne["year"]
    month = ligne["month"]
    name_file = ligne["file"]
    extension = ligne["extension"]

    # Vérifie si l'entrée existe déjà
    curseur.execute("""
        SELECT COUNT(*) FROM tgz
        WHERE file = %s AND source = %s
    """, (name_file, source))
    
    exists = curseur.fetchone()[0]

    if not exists:
        curseur.execute("""
            INSERT INTO tgz (source, type_cdr, year, month, file, extension)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (
            source,
            type_cdr,
            year,
            month,
            name_file,
            extension
        ))

# Finalisation
conn.commit()
curseur.close()
conn.close()
print("Données insérées dans la base MySQL avec succès.")
