# Quick Start Guide - EzyHeal Pharmacy App

## Step-by-Step Instructions

### Step 1: Install Python Dependencies

Open terminal/command prompt in the project folder and run:

```bash
pip install -r requirements.txt
```

**Note**: If you get permission errors, use:
- Windows: `pip install --user -r requirements.txt`
- Mac/Linux: `pip3 install -r requirements.txt` or `python3 -m pip install -r requirements.txt`

### Step 2: Configure SMS (Optional - for testing, skip this)

For testing without SMS, create a file named `config.env` with:
```
SMS_PROVIDER=console
```

This will print OTPs to the console instead of sending SMS.

**Skip this step if you just want to test the app without OTP functionality.**

### Step 3: Start the Backend Server

**Option A: Using the batch file (Windows)**
```bash
start_server.bat
```

**Option B: Using the shell script (Mac/Linux)**
```bash
chmod +x start_server.sh
./start_server.sh
```

**Option C: Direct Python command**
```bash
python app.py
```

You should see:
```
Database initialized successfully!
Starting EzyHeal API server...
API will be available at http://localhost:5000
 * Running on http://0.0.0.0:5000
```

**Keep this terminal window open!**

### Step 4: Open the Frontend

**Option A: Direct file open**
- Double-click `index.html` to open in your default browser

**Option B: Using Python HTTP Server (Recommended)**
1. Open a **new terminal/command prompt** window
2. Navigate to the project folder
3. Run:
   ```bash
   python -m http.server 8000
   ```
4. Open browser and go to: `http://localhost:8000`

### Step 5: Test the Application

1. **Register a new user:**
   - Click "Sign In"
   - Go to "Register" tab
   - Fill in details and register

2. **Browse products:**
   - View medicines on home page
   - Click on any product to see details
   - Add items to cart

3. **Test OTP (if configured):**
   - Click "Forgot Password?"
   - Enter phone number
   - If using console mode, check the server terminal for OTP
   - If using SMS service, check your phone

## Troubleshooting

### Port 5000 already in use
If you see "Address already in use" error:
- Close other applications using port 5000
- Or change port in `app.py` (line 317): `app.run(debug=True, host='0.0.0.0', port=5001)`
- Update `API_BASE_URL` in `script.js` to match

### Module not found errors
```bash
pip install Flask flask-cors requests python-dotenv
```

### CORS errors in browser
- Make sure backend server is running
- Check that API_BASE_URL in `script.js` matches your backend URL

### Database errors
- Delete `ezyheal.db` file
- Restart the server (it will create a new database)

## Quick Commands Reference

```bash
# Install dependencies
pip install -r requirements.txt

# Start backend (Windows)
start_server.bat

# Start backend (Mac/Linux)
python app.py

# Start frontend server (optional)
python -m http.server 8000
```

## What's Running?

- **Backend API**: `http://localhost:5000`
- **Frontend**: `http://localhost:8000` (if using HTTP server) or file:// path

## Next Steps

- Read `README.md` for detailed documentation
- Read `SMS_SETUP.md` to configure SMS for production
- Check `config.env.example` for SMS configuration options
