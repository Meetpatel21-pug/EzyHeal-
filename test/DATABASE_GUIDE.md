# Database Connection Guide

## How the Database is Linked

The database is **automatically linked** when you start the server. Here's how it works:

### Current Setup (SQLite - Default)

1. **Database File**: `ezyheal.db` (SQLite database file)
2. **Location**: Same folder as `app.py`
3. **Connection**: Automatic - created on first run

### How It Works

```python
# In app.py (line 22)
DB_FILE = 'ezyheal.db'  # Database file name

# Database is initialized automatically when server starts
def init_db():
    conn = sqlite3.connect(DB_FILE)  # Connects to database
    # Creates tables if they don't exist
```

**The database is created automatically** when you run:
```bash
python app.py
```

You'll see: `Database initialized successfully!`

## Viewing the Database

### Option 1: Using DB Browser for SQLite (Recommended)

1. **Download**: https://sqlitebrowser.org/
2. **Install** the application
3. **Open** `ezyheal.db` file in DB Browser
4. **View** tables: users, orders, otps

### Option 2: Using Python Script

Create a file `view_db.py`:

```python
import sqlite3

conn = sqlite3.connect('ezyheal.db')
cursor = conn.cursor()

# View all users
print("=== USERS ===")
cursor.execute("SELECT * FROM users")
for row in cursor.fetchall():
    print(row)

# View all orders
print("\n=== ORDERS ===")
cursor.execute("SELECT * FROM orders")
for row in cursor.fetchall():
    print(row)

# View all OTPs
print("\n=== OTPS ===")
cursor.execute("SELECT * FROM otps")
for row in cursor.fetchall():
    print(row)

conn.close()
```

Run: `python view_db.py`

### Option 3: Using Command Line (SQLite3)

```bash
# Windows/Mac/Linux
sqlite3 ezyheal.db

# Then run SQL commands:
.tables                    # List all tables
SELECT * FROM users;       # View users
SELECT * FROM orders;      # View orders
.quit                      # Exit
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### Orders Table
```sql
CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    items TEXT NOT NULL,  -- JSON string
    total_amount REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
)
```

### OTPs Table
```sql
CREATE TABLE otps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phone TEXT NOT NULL,
    otp TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    verified INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

## Changing Database Location

To use a different database file, edit `app.py`:

```python
# Change line 22
DB_FILE = 'path/to/your/database.db'
```

Or use environment variable:

```python
DB_FILE = os.getenv('DATABASE_PATH', 'ezyheal.db')
```

Then in `config.env`:
```
DATABASE_PATH=my_custom_database.db
```

## Using a Different Database (PostgreSQL/MySQL)

### For PostgreSQL:

1. **Install**: `pip install psycopg2-binary`

2. **Update app.py**:
```python
import psycopg2
from psycopg2.extras import RealDictCursor

# Database configuration
DB_CONFIG = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'database': os.getenv('DB_NAME', 'ezyheal'),
    'user': os.getenv('DB_USER', 'postgres'),
    'password': os.getenv('DB_PASSWORD', ''),
    'port': os.getenv('DB_PORT', '5432')
}

def get_db_connection():
    return psycopg2.connect(**DB_CONFIG)

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    # Create tables...
    conn.commit()
    conn.close()
```

3. **Update all database calls** to use `get_db_connection()` instead of `sqlite3.connect()`

### For MySQL:

1. **Install**: `pip install mysql-connector-python`

2. **Update app.py**:
```python
import mysql.connector

DB_CONFIG = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'database': os.getenv('DB_NAME', 'ezyheal'),
    'user': os.getenv('DB_USER', 'root'),
    'password': os.getenv('DB_PASSWORD', ''),
    'port': os.getenv('DB_PORT', '3306')
}

def get_db_connection():
    return mysql.connector.connect(**DB_CONFIG)
```

## Database Management Commands

### Reset Database (Delete all data)
```bash
# Delete the database file
rm ezyheal.db  # Mac/Linux
del ezyheal.db  # Windows

# Restart server - new database will be created
python app.py
```

### Backup Database
```bash
# Copy the database file
cp ezyheal.db ezyheal_backup.db  # Mac/Linux
copy ezyheal.db ezyheal_backup.db  # Windows
```

### Check Database Size
```bash
ls -lh ezyheal.db  # Mac/Linux
dir ezyheal.db     # Windows
```

## Common Database Operations

### View All Users
```python
conn = sqlite3.connect('ezyheal.db')
cursor = conn.cursor()
cursor.execute("SELECT id, name, email, phone FROM users")
users = cursor.fetchall()
for user in users:
    print(user)
conn.close()
```

### View All Orders
```python
conn = sqlite3.connect('ezyheal.db')
cursor = conn.cursor()
cursor.execute("SELECT * FROM orders")
orders = cursor.fetchall()
for order in orders:
    print(order)
conn.close()
```

### Delete All Data
```python
conn = sqlite3.connect('ezyheal.db')
cursor = conn.cursor()
cursor.execute("DELETE FROM orders")
cursor.execute("DELETE FROM users")
cursor.execute("DELETE FROM otps")
conn.commit()
conn.close()
```

## Troubleshooting

### Database locked error
- Close all connections to the database
- Restart the server
- Make sure no other program is using the database

### Database not found
- Check if `ezyheal.db` exists in the project folder
- Run the server once to create it automatically

### Permission errors
- Check file permissions on the database file
- Make sure the folder is writable

## Summary

✅ **Database is automatically linked** - No configuration needed
✅ **Created on first run** - Just start the server
✅ **SQLite by default** - File-based, no server needed
✅ **View with DB Browser** - Easy GUI tool
✅ **Access via Python** - Use sqlite3 module

The database connection is **automatic** - just run `python app.py` and it will work!
