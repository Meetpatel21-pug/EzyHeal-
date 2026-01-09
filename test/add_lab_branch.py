#!/usr/bin/env python3
"""
Script to add lab branches to the EzyHeal database
"""

import sqlite3

DB_FILE = 'ezyheal.db'

def add_lab_branch(name, address, phone=None, email=None):
    """Add a new lab branch to the database"""
    try:
        conn = sqlite3.connect(DB_FILE)
        
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO labs (name, address, phone, email)
            VALUES (?, ?, ?, ?)
        ''', (name, address, phone, email))
        
        lab_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        print(f"✓ Lab branch added successfully!")
        print(f"  ID: {lab_id}")
        print(f"  Name: {name}")
        print(f"  Address: {address}")
        if phone:
            print(f"  Phone: {phone}")
        if email:
            print(f"  Email: {email}")
        return lab_id
        
    except Exception as e:
        print(f"✗ Error adding lab branch: {e}")
        return None

def view_all_labs():
    """View all lab branches"""
    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        
        cursor.execute('SELECT id, name, address, phone, email FROM labs ORDER BY name')
        labs = cursor.fetchall()
        conn.close()
        
        if not labs:
            print("No lab branches found.")
            return
        
        print("\n" + "="*80)
        print("LAB BRANCHES IN DATABASE")
        print("="*80)
        
        for lab in labs:
            lab_id, name, address, phone, email = lab
            print(f"\nID: {lab_id}")
            print(f"Name: {name}")
            print(f"Address: {address}")
            if phone:
                print(f"Phone: {phone}")
            if email:
                print(f"Email: {email}")
        
        print("\n" + "="*80)
        
    except Exception as e:
        print(f"Error viewing labs: {e}")

if __name__ == '__main__':
    print("Adding ISKCON Cross Road Branch to EzyHeal Database...\n")
    
    # Add ISKCON Cross Road Branch
    add_lab_branch(
        name="ISKCON Cross Road Branch",
        address="ISKCON Cross Road, Bangalore, Karnataka 560034, India",
        phone="+91-80-4103-1000",
        email="lab@iskcon-bangalore.com"
    )
    
    # View all labs
    view_all_labs()
