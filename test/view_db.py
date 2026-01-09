#!/usr/bin/env python3
"""
Simple script to view database contents
Run: python view_db.py
"""

import sqlite3
import json
from datetime import datetime

def view_database():
    try:
        conn = sqlite3.connect('ezyheal.db')
        cursor = conn.cursor()
        
        print("=" * 60)
        print("EZYHEAL DATABASE VIEWER")
        print("=" * 60)
        
        # View Users
        print("\n📋 USERS TABLE")
        print("-" * 60)
        cursor.execute("SELECT id, name, email, phone, created_at FROM users")
        users = cursor.fetchall()
        if users:
            print(f"{'ID':<5} {'Name':<20} {'Email':<30} {'Phone':<12} {'Created'}")
            print("-" * 60)
            for user in users:
                print(f"{user[0]:<5} {user[1]:<20} {user[2]:<30} {user[3]:<12} {user[4]}")
        else:
            print("No users found.")
        
        # View Orders
        print("\n🛒 ORDERS TABLE")
        print("-" * 60)
        cursor.execute("SELECT id, user_id, items, total_amount, status, created_at FROM orders")
        orders = cursor.fetchall()
        if orders:
            print(f"{'ID':<5} {'User ID':<10} {'Total':<10} {'Status':<12} {'Created'}")
            print("-" * 60)
            for order in orders:
                items = json.loads(order[2])
                item_count = len(items)
                print(f"{order[0]:<5} {order[1]:<10} ₹{order[3]:<9} {order[4]:<12} {order[5]}")
                print(f"      Items: {item_count} products")
        else:
            print("No orders found.")
        
        # View OTPs
        print("\n🔐 OTPS TABLE")
        print("-" * 60)
        cursor.execute("SELECT id, phone, otp, expires_at, verified, created_at FROM otps ORDER BY created_at DESC LIMIT 10")
        otps = cursor.fetchall()
        if otps:
            print(f"{'ID':<5} {'Phone':<12} {'OTP':<8} {'Expires':<20} {'Verified':<10} {'Created'}")
            print("-" * 60)
            for otp in otps:
                verified = "Yes" if otp[4] else "No"
                print(f"{otp[0]:<5} {otp[1]:<12} {otp[2]:<8} {otp[3]:<20} {verified:<10} {otp[5]}")
        else:
            print("No OTPs found.")
        
        # Statistics
        print("\n📊 STATISTICS")
        print("-" * 60)
        cursor.execute("SELECT COUNT(*) FROM users")
        user_count = cursor.fetchone()[0]
        cursor.execute("SELECT COUNT(*) FROM orders")
        order_count = cursor.fetchone()[0]
        cursor.execute("SELECT SUM(total_amount) FROM orders")
        total_revenue = cursor.fetchone()[0] or 0
        
        print(f"Total Users: {user_count}")
        print(f"Total Orders: {order_count}")
        print(f"Total Revenue: ₹{total_revenue:.2f}")
        
        conn.close()
        print("\n" + "=" * 60)
        print("Database view complete!")
        print("=" * 60)
        
    except sqlite3.Error as e:
        print(f"Database error: {e}")
    except FileNotFoundError:
        print("Error: ezyheal.db not found!")
        print("Run 'python app.py' first to create the database.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    view_database()
