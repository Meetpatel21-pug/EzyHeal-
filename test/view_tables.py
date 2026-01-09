#!/usr/bin/env python3
"""
Script to view database table structures
Run: python view_tables.py
"""

import sqlite3

def view_tables():
    try:
        conn = sqlite3.connect('ezyheal.db')
        cursor = conn.cursor()
        
        print("=" * 80)
        print("DATABASE TABLE STRUCTURES")
        print("=" * 80)
        
        # Get all tables
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
        tables = cursor.fetchall()
        
        if not tables:
            print("No tables found in database.")
            return
        
        for table in tables:
            table_name = table[0]
            print(f"\n{'='*80}")
            print(f"TABLE: {table_name}")
            print('='*80)
            
            # Get table structure
            cursor.execute(f"PRAGMA table_info({table_name})")
            columns = cursor.fetchall()
            
            print(f"\n{'Column Name':<25} {'Type':<20} {'Nullable':<10} {'Default':<15} {'PK'}")
            print('-'*80)
            
            for col in columns:
                col_id, col_name, col_type, not_null, default_val, pk = col
                nullable = "No" if not_null else "Yes"
                default_str = str(default_val) if default_val else "None"
                pk_str = "Yes" if pk else "No"
                
                print(f"{col_name:<25} {col_type:<20} {nullable:<10} {default_str:<15} {pk_str}")
            
            # Get row count
            cursor.execute(f"SELECT COUNT(*) FROM {table_name}")
            row_count = cursor.fetchone()[0]
            print(f"\nTotal Rows: {row_count}")
        
        conn.close()
        print("\n" + "=" * 80)
        print("Table structure view complete!")
        print("=" * 80)
        
    except sqlite3.Error as e:
        print(f"Database error: {e}")
    except FileNotFoundError:
        print("Error: ezyheal.db not found!")
        print("Run 'python app.py' first to create the database.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    view_tables()

