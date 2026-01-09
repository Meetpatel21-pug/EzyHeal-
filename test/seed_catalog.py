#!/usr/bin/env python3
import sqlite3

DB_FILE = 'ezyheal.db'

medicines = [
    { 'name': 'Crocin Advance 500mg', 'price': 40, 'img': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop', 'description': 'Fast-acting pain reliever and fever reducer. Contains Paracetamol 500mg.', 'usage': 'Take 1-2 tablets every 4-6 hours as needed. Do not exceed 8 tablets in 24 hours.', 'sideEffects': 'Rare side effects include nausea, allergic reactions.' },
    { 'name': 'Dolo 650 Tablet', 'price': 30, 'img': 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&h=400&fit=crop', 'description': 'Effective for mild to moderate pain and fever. Contains Paracetamol 650mg.', 'usage': 'Take 1 tablet every 4-6 hours. Maximum 4 tablets per day.', 'sideEffects': 'Generally well tolerated. May cause liver damage if overdosed.' },
    { 'name': 'Vicks Vaporub 50g', 'price': 155, 'img': 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop', 'description': 'Topical cough suppressant and nasal decongestant.', 'usage': 'Apply to chest, throat, and back.', 'sideEffects': 'May cause skin irritation. External use only.' },
    { 'name': 'Limcee Vitamin C', 'price': 105, 'img': 'https://images.unsplash.com/photo-1556227702-d1e4e7b5c232?w=400&h=400&fit=crop', 'description': 'Chewable Vitamin C supplement. Boosts immunity and promotes healthy skin.', 'usage': 'Chew 1-2 tablets daily.', 'sideEffects': 'High doses may cause stomach upset.' },
    { 'name': 'Volini Pain Spray', 'price': 195, 'img': 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop', 'description': 'Fast-acting pain relief spray for muscle and joint pain.', 'usage': 'Spray on affected area 3-4 times daily.', 'sideEffects': 'May cause mild skin irritation.' }
]

lab_tests = [
    { 'name': 'Full Body Checkup', 'price': 1999, 'img': 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=400&fit=crop', 'description': 'Comprehensive health screening including 70+ parameters.', 'usage': 'Fasting for 10-12 hours required.', 'sideEffects': 'Includes blood, urine tests.' },
    { 'name': 'Diabetes Screening', 'price': 499, 'img': 'https://images.unsplash.com/photo-1593491034932-844ab981ed7c?w=400&h=400&fit=crop', 'description': 'Complete diabetes profile including HbA1c and glucose levels.', 'usage': 'Fasting for 8-10 hours.', 'sideEffects': 'Includes fasting and post-prandial sugar.' },
    { 'name': 'Thyroid Profile', 'price': 550, 'img': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop', 'description': 'T3, T4, TSH.', 'usage': 'No fasting required.', 'sideEffects': 'Helps diagnose thyroid disorders.' }
]


def seed_table(table, items, cols):
    conn = sqlite3.connect(DB_FILE)
    cur = conn.cursor()
    placeholders = ','.join(['?'] * len(cols))
    sql = f"INSERT INTO {table} ({','.join(cols)}) VALUES ({placeholders})"
    for item in items:
        cur.execute(sql, [item.get('name'), float(item.get('price', 0)), item.get('img'), item.get('description'), item.get('usage'), item.get('sideEffects')])
    conn.commit()
    conn.close()

if __name__ == '__main__':
    print('Seeding medicines and lab tests...')
    seed_table('medicines', medicines, ['name','price','img','description','usage','side_effects'])
    seed_table('lab_tests', lab_tests, ['name','price','img','description','usage','side_effects'])
    print('Done.')
