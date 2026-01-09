from flask import Flask, request, jsonify, send_from_directory, send_file
from flask_cors import CORS
from datetime import datetime, timedelta
import sqlite3
import hashlib
import os
import json
import random
import requests

# Try to load environment variables from config.env file
try:
    from dotenv import load_dotenv
    load_dotenv('config.env')
except ImportError:
    pass  # dotenv is optional

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

# Database file
DB_FILE = 'ezyheal.db'

# SMS Configuration - Update these with your SMS service credentials
# Option 1: Twilio (Recommended)
TWILIO_ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID', '')
TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN', '')
TWILIO_PHONE_NUMBER = os.getenv('TWILIO_PHONE_NUMBER', '')

# Option 2: Fast2SMS (Indian SMS service - Free tier available)
FAST2SMS_API_KEY = os.getenv('FAST2SMS_API_KEY', '')
FAST2SMS_SENDER_ID = os.getenv('FAST2SMS_SENDER_ID', 'EZYHEAL')

# Option 3: MSG91 (Indian SMS service)
MSG91_AUTH_KEY = os.getenv('MSG91_AUTH_KEY', '')
MSG91_SENDER_ID = os.getenv('MSG91_SENDER_ID', 'EZYHEL')

# Use this to switch between SMS providers: 'twilio', 'fast2sms', 'msg91', or 'console' (for testing)
SMS_PROVIDER = os.getenv('SMS_PROVIDER', 'console')

def init_db():
    """Initialize the database with required tables"""
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    
    # Users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Orders table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            items TEXT NOT NULL,
            total_amount REAL NOT NULL,
            status TEXT DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    
    # OTP table for password reset
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS otps (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            phone TEXT NOT NULL,
            otp TEXT NOT NULL,
            expires_at TIMESTAMP NOT NULL,
            verified INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Labs table for lab branches
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS labs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            address TEXT NOT NULL,
            phone TEXT,
            email TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Medicines catalog table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS medicines (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            img TEXT,
            description TEXT,
            usage TEXT,
            side_effects TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Lab tests catalog table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS lab_tests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            img TEXT,
            description TEXT,
            usage TEXT,
            side_effects TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()
    print("Database initialized successfully!")

def hash_password(password):
    """Hash password using SHA256"""
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(password, password_hash):
    """Verify password against hash"""
    return hash_password(password) == password_hash

def generate_otp():
    """Generate a 6-digit OTP"""
    return str(random.randint(100000, 999999))

def send_sms_twilio(phone, message):
    """Send SMS using Twilio"""
    try:
        try:
            from twilio.rest import Client
        except ImportError:
            return False, "Twilio library not installed. Run: pip install twilio"
        
        if not TWILIO_ACCOUNT_SID or not TWILIO_AUTH_TOKEN:
            return False, "Twilio credentials not configured"
        
        client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        
        # Format phone number (add country code if needed)
        if not phone.startswith('+'):
            phone = '+91' + phone  # Default to India (+91)
        
        message_obj = client.messages.create(
            body=message,
            from_=TWILIO_PHONE_NUMBER,
            to=phone
        )
        return True, message_obj.sid
    except Exception as e:
        return False, str(e)

def send_sms_fast2sms(phone, message):
    """Send SMS using Fast2SMS (Indian service)"""
    try:
        url = "https://www.fast2sms.com/dev/bulkV2"
        headers = {
            'authorization': FAST2SMS_API_KEY,
            'Content-Type': 'application/json'
        }
        payload = {
            "route": "q",
            "message": message,
            "language": "english",
            "numbers": phone
        }
        response = requests.post(url, json=payload, headers=headers)
        result = response.json()
        
        if result.get('return'):
            return True, result.get('request_id', '')
        else:
            return False, result.get('message', 'Failed to send SMS')
    except Exception as e:
        return False, str(e)

def send_sms_msg91(phone, message):
    """Send SMS using MSG91 (Indian service)"""
    try:
        url = f"https://control.msg91.com/api/v5/flow/"
        headers = {
            'authkey': MSG91_AUTH_KEY,
            'Content-Type': 'application/json'
        }
        payload = {
            "template_id": "your_template_id",  # Update with your template ID
            "sender": MSG91_SENDER_ID,
            "short_url": "0",
            "mobiles": phone,
            "message": message
        }
        response = requests.post(url, json=payload, headers=headers)
        result = response.json()
        
        if response.status_code == 200:
            return True, result.get('request_id', '')
        else:
            return False, result.get('message', 'Failed to send SMS')
    except Exception as e:
        return False, str(e)

def send_sms_console(phone, message):
    """Print SMS to console (for testing without actual SMS service)"""
    print(f"\n{'='*50}")
    print(f"SMS TO: {phone}")
    print(f"MESSAGE: {message}")
    print(f"{'='*50}\n")
    return True, "console_sent"

def send_sms(phone, message):
    """Send SMS using configured provider"""
    if SMS_PROVIDER == 'twilio':
        return send_sms_twilio(phone, message)
    elif SMS_PROVIDER == 'fast2sms':
        return send_sms_fast2sms(phone, message)
    elif SMS_PROVIDER == 'msg91':
        return send_sms_msg91(phone, message)
    else:  # console mode for testing
        return send_sms_console(phone, message)

# Frontend Routes - Serve static files

@app.route('/')
def serve_index():
    """Serve the main index.html file"""
    return send_file('index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    """Serve static files (CSS, JS, images, etc.)"""
    return send_from_directory('.', filename)

# API Routes

@app.route('/api/auth/register', methods=['POST'])
def register():
    """Register a new user"""
    try:
        data = request.json
        name = data.get('name')
        email = data.get('email')
        phone = data.get('phone')
        password = data.get('password')
        
        # Validation
        if not all([name, email, phone, password]):
            return jsonify({'error': 'All fields are required'}), 400
        
        if len(password) < 6:
            return jsonify({'error': 'Password must be at least 6 characters'}), 400
        
        # Check if user already exists
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute('SELECT id FROM users WHERE email = ?', (email,))
        if cursor.fetchone():
            conn.close()
            return jsonify({'error': 'Email already registered'}), 400
        
        # Create user
        password_hash = hash_password(password)
        cursor.execute('''
            INSERT INTO users (name, email, phone, password_hash)
            VALUES (?, ?, ?, ?)
        ''', (name, email, phone, password_hash))
        
        user_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        return jsonify({
            'message': 'User registered successfully',
            'user': {
                'id': user_id,
                'name': name,
                'email': email,
                'phone': phone
            }
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    """Login user"""
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400
        
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute('SELECT id, name, email, phone, password_hash FROM users WHERE email = ?', (email,))
        user = cursor.fetchone()
        conn.close()
        
        if not user:
            return jsonify({'error': 'Invalid email or password'}), 401
        
        user_id, name, user_email, phone, password_hash = user
        
        if not verify_password(password, password_hash):
            return jsonify({'error': 'Invalid email or password'}), 401
        
        return jsonify({
            'message': 'Login successful',
            'user': {
                'id': user_id,
                'name': name,
                'email': user_email,
                'phone': phone
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/orders/create', methods=['POST'])
def create_order():
    """Create a new order"""
    try:
        data = request.json
        user_id = data.get('user_id')
        items = data.get('items')
        total_amount = data.get('total_amount')
        
        if not all([user_id, items, total_amount]):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Verify user exists
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute('SELECT id FROM users WHERE id = ?', (user_id,))
        if not cursor.fetchone():
            conn.close()
            return jsonify({'error': 'User not found'}), 404
        
        # Create order
        items_json = json.dumps(items)
        cursor.execute('''
            INSERT INTO orders (user_id, items, total_amount, status)
            VALUES (?, ?, ?, ?)
        ''', (user_id, items_json, total_amount, 'pending'))
        
        order_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        return jsonify({
            'message': 'Order created successfully',
            'order_id': order_id,
            'total_amount': total_amount
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/orders/<int:user_id>', methods=['GET'])
def get_user_orders(user_id):
    """Get all orders for a user"""
    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute('''
            SELECT id, items, total_amount, status, created_at
            FROM orders
            WHERE user_id = ?
            ORDER BY created_at DESC
        ''', (user_id,))
        
        orders = []
        for row in cursor.fetchall():
            orders.append({
                'id': row[0],
                'items': json.loads(row[1]),
                'total_amount': row[2],
                'status': row[3],
                'created_at': row[4]
            })
        
        conn.close()
        return jsonify({'orders': orders}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/orders/all', methods=['GET'])
def get_all_orders():
    """Get all orders (admin view)"""
    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute('''
            SELECT o.id, o.user_id, u.name, u.email, o.items, o.total_amount, o.status, o.created_at
            FROM orders o
            JOIN users u ON o.user_id = u.id
            ORDER BY o.created_at DESC
        ''')
        
        orders = []
        for row in cursor.fetchall():
            orders.append({
                'id': row[0],
                'user_id': row[1],
                'user_name': row[2],
                'user_email': row[3],
                'items': json.loads(row[4]),
                'total_amount': row[5],
                'status': row[6],
                'created_at': row[7]
            })
        
        conn.close()
        return jsonify({'orders': orders}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/orders/<int:order_id>/status', methods=['PUT'])
def update_order_status(order_id):
    """Update order status"""
    try:
        data = request.json
        status = data.get('status')
        
        if not status:
            return jsonify({'error': 'Status is required'}), 400
        
        valid_statuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']
        if status not in valid_statuses:
            return jsonify({'error': f'Invalid status. Must be one of: {", ".join(valid_statuses)}'}), 400
        
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute('''
            UPDATE orders
            SET status = ?
            WHERE id = ?
        ''', (status, order_id))
        
        if cursor.rowcount == 0:
            conn.close()
            return jsonify({'error': 'Order not found'}), 404
        
        conn.commit()
        conn.close()
        
        return jsonify({'message': 'Order status updated successfully'}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """Get user details"""
    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute('SELECT id, name, email, phone, created_at FROM users WHERE id = ?', (user_id,))
        user = cursor.fetchone()
        conn.close()
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'id': user[0],
            'name': user[1],
            'email': user[2],
            'phone': user[3],
            'created_at': user[4]
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/send-otp', methods=['POST'])
def send_otp():
    """Send OTP to phone number for password reset"""
    try:
        data = request.json
        phone = data.get('phone')
        
        if not phone:
            return jsonify({'error': 'Phone number is required'}), 400
        
        # Validate phone number (10 digits)
        if not phone.isdigit() or len(phone) != 10:
            return jsonify({'error': 'Invalid phone number. Must be 10 digits'}), 400
        
        # Generate OTP
        otp = generate_otp()
        expires_at = datetime.now() + timedelta(minutes=5)
        
        # Store OTP in database
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO otps (phone, otp, expires_at)
            VALUES (?, ?, ?)
        ''', (phone, otp, expires_at))
        conn.commit()
        conn.close()
        
        # Send SMS
        message = f"Your EzyHeal OTP for password reset is {otp}. Valid for 5 minutes. Do not share this OTP with anyone."
        success, result = send_sms(phone, message)
        
        if success:
            return jsonify({
                'message': 'OTP sent successfully',
                'phone': phone[:2] + '****' + phone[6:]  # Masked phone
            }), 200
        else:
            # Even if SMS fails, return success for testing (OTP is in database)
            # In production, you might want to return error
            return jsonify({
                'message': 'OTP generated (SMS may not be sent in test mode)',
                'phone': phone[:2] + '****' + phone[6:],
                'otp': otp if SMS_PROVIDER == 'console' else None  # Only return OTP in console mode
            }), 200
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/verify-otp', methods=['POST'])
def verify_otp():
    """Verify OTP for password reset"""
    try:
        data = request.json
        phone = data.get('phone')
        otp = data.get('otp')
        
        if not phone or not otp:
            return jsonify({'error': 'Phone number and OTP are required'}), 400
        
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        
        # Find valid OTP
        cursor.execute('''
            SELECT id, expires_at, verified
            FROM otps
            WHERE phone = ? AND otp = ? AND verified = 0
            ORDER BY created_at DESC
            LIMIT 1
        ''', (phone, otp))
        
        otp_record = cursor.fetchone()
        
        if not otp_record:
            conn.close()
            return jsonify({'error': 'Invalid or expired OTP'}), 400
        
        otp_id, expires_at_str, verified = otp_record
        
        # Check if OTP is expired
        expires_at = datetime.strptime(expires_at_str, '%Y-%m-%d %H:%M:%S.%f')
        if datetime.now() > expires_at:
            conn.close()
            return jsonify({'error': 'OTP has expired'}), 400
        
        # Mark OTP as verified
        cursor.execute('UPDATE otps SET verified = 1 WHERE id = ?', (otp_id,))
        conn.commit()
        conn.close()
        
        return jsonify({
            'message': 'OTP verified successfully',
            'verified': True
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/reset-password', methods=['POST'])
def reset_password():
    """Reset password after OTP verification"""
    try:
        data = request.json
        phone = data.get('phone')
        new_password = data.get('new_password')
        
        if not phone or not new_password:
            return jsonify({'error': 'Phone number and new password are required'}), 400
        
        if len(new_password) < 6:
            return jsonify({'error': 'Password must be at least 6 characters'}), 400
        
        # Check if OTP was verified
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute('''
            SELECT id FROM otps
            WHERE phone = ? AND verified = 1
            ORDER BY created_at DESC
            LIMIT 1
        ''', (phone,))
        
        verified_otp = cursor.fetchone()
        if not verified_otp:
            conn.close()
            return jsonify({'error': 'Please verify OTP first'}), 400
        
        # Find user by phone
        cursor.execute('SELECT id FROM users WHERE phone = ?', (phone,))
        user = cursor.fetchone()
        
        if not user:
            conn.close()
            return jsonify({'error': 'User not found with this phone number'}), 404
        
        # Update password
        password_hash = hash_password(new_password)
        cursor.execute('UPDATE users SET password_hash = ? WHERE phone = ?', (password_hash, phone))
        conn.commit()
        conn.close()
        
        return jsonify({
            'message': 'Password reset successfully'
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/labs', methods=['GET'])
def get_labs():
    """Get all lab branches"""
    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute('SELECT id, name, address, phone, email FROM labs ORDER BY name')
        labs = cursor.fetchall()
        conn.close()
        
        labs_list = [
            {
                'id': lab[0],
                'name': lab[1],
                'address': lab[2],
                'phone': lab[3],
                'email': lab[4]
            }
            for lab in labs
        ]
        
        return jsonify({'labs': labs_list}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/labs', methods=['POST'])
def add_lab():
    """Add a new lab branch"""
    try:
        data = request.json
        name = data.get('name')
        address = data.get('address')
        phone = data.get('phone')
        email = data.get('email')
        
        if not name or not address:
            return jsonify({'error': 'Name and address are required'}), 400
        
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO labs (name, address, phone, email)
            VALUES (?, ?, ?, ?)
        ''', (name, address, phone, email))
        
        lab_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        return jsonify({
            'message': 'Lab branch added successfully',
            'lab': {
                'id': lab_id,
                'name': name,
                'address': address,
                'phone': phone,
                'email': email
            }
        }), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/labs/<int:lab_id>', methods=['GET'])
def get_lab(lab_id):
    """Get specific lab branch details"""
    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute('SELECT id, name, address, phone, email FROM labs WHERE id = ?', (lab_id,))
        lab = cursor.fetchone()
        conn.close()
        
        if not lab:
            return jsonify({'error': 'Lab not found'}), 404
        
        return jsonify({
            'id': lab[0],
            'name': lab[1],
            'address': lab[2],
            'phone': lab[3],
            'email': lab[4]
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/medicines', methods=['GET'])
def list_medicines():
    """List all medicines"""
    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute('SELECT id, name, price, img, description, usage, side_effects FROM medicines ORDER BY name')
        rows = cursor.fetchall()
        conn.close()
        items = [
            {
                'id': r[0], 'name': r[1], 'price': r[2], 'img': r[3],
                'description': r[4], 'usage': r[5], 'sideEffects': r[6]
            }
            for r in rows
        ]
        return jsonify({'medicines': items}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/medicines', methods=['POST'])
def add_medicine():
    """Add a new medicine"""
    try:
        data = request.json or {}
        name = data.get('name')
        price = data.get('price')
        img = data.get('img')
        description = data.get('description')
        usage_text = data.get('usage')
        side_effects = data.get('sideEffects')

        if not name or price is None:
            return jsonify({'error': 'Name and price are required'}), 400

        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO medicines (name, price, img, description, usage, side_effects)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (name, float(price), img, description, usage_text, side_effects))
        new_id = cursor.lastrowid
        conn.commit()
        conn.close()
        return jsonify({'message': 'Medicine added', 'id': new_id}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/medicines/<int:med_id>', methods=['GET'])
def get_medicine(med_id):
    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute('SELECT id, name, price, img, description, usage, side_effects FROM medicines WHERE id = ?', (med_id,))
        r = cursor.fetchone()
        conn.close()
        if not r:
            return jsonify({'error': 'Medicine not found'}), 404
        return jsonify({'id': r[0], 'name': r[1], 'price': r[2], 'img': r[3], 'description': r[4], 'usage': r[5], 'sideEffects': r[6]}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/lab-tests', methods=['GET'])
def list_lab_tests():
    """List all lab tests"""
    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute('SELECT id, name, price, img, description, usage, side_effects FROM lab_tests ORDER BY name')
        rows = cursor.fetchall()
        conn.close()
        items = [
            {
                'id': r[0], 'name': r[1], 'price': r[2], 'img': r[3],
                'description': r[4], 'usage': r[5], 'sideEffects': r[6]
            }
            for r in rows
        ]
        return jsonify({'labTests': items}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/lab-tests', methods=['POST'])
def add_lab_test():
    """Add a new lab test"""
    try:
        data = request.json or {}
        name = data.get('name')
        price = data.get('price')
        img = data.get('img')
        description = data.get('description')
        usage_text = data.get('usage')
        side_effects = data.get('sideEffects')

        if not name or price is None:
            return jsonify({'error': 'Name and price are required'}), 400

        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO lab_tests (name, price, img, description, usage, side_effects)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (name, float(price), img, description, usage_text, side_effects))
        new_id = cursor.lastrowid
        conn.commit()
        conn.close()
        return jsonify({'message': 'Lab test added', 'id': new_id}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/lab-tests/<int:test_id>', methods=['GET'])
def get_lab_test(test_id):
    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute('SELECT id, name, price, img, description, usage, side_effects FROM lab_tests WHERE id = ?', (test_id,))
        r = cursor.fetchone()
        conn.close()
        if not r:
            return jsonify({'error': 'Lab test not found'}), 404
        return jsonify({'id': r[0], 'name': r[1], 'price': r[2], 'img': r[3], 'description': r[4], 'usage': r[5], 'sideEffects': r[6]}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'EzyHeal API is running'}), 200

if __name__ == '__main__':
    # Initialize database on startup
    init_db()
    
    # Run the Flask app
    print("Starting EzyHeal API server...")
    print("API will be available at http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)
