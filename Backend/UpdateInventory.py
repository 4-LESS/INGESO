import sqlite3
import csv

# Ruta de la base de datos y el archivo CSV
db_path = "./database.db"  # Asegúrate de que sea la base de datos correcta
csv_file_path = "inventario.csv"  # Cambia la ruta si el archivo está en otro lugar

# Conectar a la base de datos SQLite
connection = sqlite3.connect(db_path)
cursor = connection.cursor()

# Crear la tabla si no existe
cursor.execute("""
CREATE TABLE IF NOT EXISTS inventory (
    id INTEGER PRIMARY KEY,       -- Código único del producto
    name TEXT NOT NULL,           -- Nombre del producto
    line TEXT,                    -- Línea del producto
    group_name TEXT,              -- Grupo del producto
    stock INTEGER NOT NULL,       -- Cantidad en inventario
    price REAL NOT NULL           -- Precio del producto
)
""")
print("Tabla 'inventory' verificada o creada.")

# Leer los datos del archivo CSV
try:
    with open(csv_file_path, newline='', encoding="windows-1252") as csvfile:
        reader = csv.DictReader(csvfile, delimiter=";")  # Usa el delimitador correcto (;)
        for row in reader:
            # Validar y extraer datos relevantes del archivo
            try:
                id = int(row["CODIGO"]) if row["CODIGO"].strip() else None
                if id is None:
                    print(f"Producto omitido: CODIGO vacío en la fila: {row}")
                    continue  # Omitir filas sin un código válido

                name = row["DETALLE"].strip() if row["DETALLE"] else "Sin Nombre"
                line = row["LINEA"].strip() if row["LINEA"] else "Sin Línea"
                group_name = row["GRUPO"].strip() if row["GRUPO"] else "Sin Grupo"  # Manejar valores vacíos
                stock = int(row["STOCK"]) if row["STOCK"].strip() else 0  # Asignar 0 si está vacío
                price = float(row["PRECIO"].replace(",", ".")) if row["PRECIO"].strip() else 0.0  # Asignar 0.0 si está vacío

                # Insertar o actualizar en la base de datos
                cursor.execute("""
                INSERT INTO inventory (id, name, line, group_name, stock, price)
                VALUES (?, ?, ?, ?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET
                    name=excluded.name,
                    line=excluded.line,
                    group_name=excluded.group_name,
                    stock=excluded.stock,
                    price=excluded.price
                """, (id, name, line, group_name, stock, price))
            except Exception as e:
                print(f"Error procesando la fila: {row} - Error: {e}")
except Exception as e:
    print(f"Error al procesar el archivo CSV: {e}")

# Confirmar los cambios y cerrar la conexión
connection.commit()
connection.close()

print("Base de datos actualizada con éxito.")
