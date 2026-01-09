#!/usr/bin/env python3
"""
Database management utility
Run: python manage_db.py
"""

import sqlite3
import sys

def reset_database():
    """Reset database - delete all data"""
    try:
        conn = sqlite3.connect('ezyheal.db')
        cursor = conn.cursor()
        
        cursor.execute("DELETE FROM orders")
        cursor.execute("DELETE FROM otps")
        cursor.execute("DELETE FROM users")
        
        conn.commit()
        conn.close()
        print("✅ Database reset successfully!")
        print("All users, orders, and OTPs have been deleted.")
    except Exception as e:
        print(f"❌ Error: {e}")

def backup_database():
    """Create a backup of the database"""
    import shutil
    from datetime import datetime
    
    try:
        backup_name = f"ezyheal_backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.db"
        shutil.copy2('ezyheal.db', backup_name)
        print(f"✅ Database backed up to: {backup_name}")
    except Exception as e:
        print(f"❌ Error: {e}")

def show_menu():
    print("\n" + "=" * 60)
    print("DATABASE MANAGEMENT TOOL")
    print("=" * 60)
    print("1. View database (run view_db.py)")
    print("2. Reset database (delete all data)")
    print("3. Backup database")
    print("4. Exit")
    print("=" * 60)
    
    choice = input("Enter your choice (1-4): ").strip()
    
    if choice == '1':
        print("\nRun: python view_db.py")
    elif choice == '2':
        confirm = input("\n⚠️  WARNING: This will delete ALL data! Continue? (yes/no): ")
        if confirm.lower() == 'yes':
            reset_database()
        else:
            print("Operation cancelled.")
    elif choice == '3':
        backup_database()
    elif choice == '4':
        print("Goodbye!")
        sys.exit(0)
    else:
        print("Invalid choice!")

if __name__ == '__main__':
    try:
        # Check if database exists
        conn = sqlite3.connect('ezyheal.db')
        conn.close()
        
        while True:
            show_menu()
    except FileNotFoundError:
        print("❌ Error: ezyheal.db not found!")
        print("Run 'python app.py' first to create the database.")
    except Exception as e:
        print(f"❌ Error: {e}")
