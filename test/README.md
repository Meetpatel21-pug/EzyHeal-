# EzyHeal - Smart Pharmacy Application

A full-stack pharmacy e-commerce application with user authentication and order management.

## Features

- **User Authentication**: Registration, Login, and Password Reset
- **Product Catalog**: Browse medicines and lab tests
- **Shopping Cart**: Add items to cart and checkout
- **Order Management**: Create and track orders
- **Responsive Design**: Works on desktop and mobile devices
- **Database Integration**: SQLite database for storing user and order data

## Project Structure

```
fsd/
├── index.html          # Main HTML file
├── style.css          # CSS styles
├── script.js          # Frontend JavaScript with API integration
├── app.py             # Flask backend API
├── requirements.txt   # Python dependencies
├── ezyheal.db        # SQLite database (created automatically)
└── README.md         # This file
```

## Setup Instructions

### Prerequisites

- Python 3.7 or higher
- Web browser (Chrome, Firefox, Safari, Edge)
- SMS Service Account (optional, for production OTP sending)

### Installation

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure SMS Service (Optional):**
   - Copy `config.env.example` to `config.env`
   - Fill in your SMS service credentials
   - Options:
     - **Twilio**: International SMS service (requires paid account)
     - **Fast2SMS**: Indian SMS service (free tier available)
     - **MSG91**: Indian SMS service (free tier available)
     - **Console**: For testing (OTP printed to console, no actual SMS sent)
   
   For testing, you can use `SMS_PROVIDER=console` which will print OTPs to the console.

3. **Run the Flask backend server:**
   ```bash
   python app.py
   ```
   
   The API server will start on `http://localhost:5000`

4. **Open the frontend:**
   - Open `index.html` in your web browser
   - Or use a local server (recommended):
     ```bash
     # Using Python's built-in server
     python -m http.server 8000
     ```
     Then open `http://localhost:8000` in your browser

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/send-otp` - Send OTP to phone for password reset
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/reset-password` - Reset password after OTP verification

### Orders
- `POST /api/orders/create` - Create a new order
- `GET /api/orders/<user_id>` - Get user's orders
- `GET /api/orders/all` - Get all orders (admin)
- `PUT /api/orders/<order_id>/status` - Update order status

### Users
- `GET /api/users/<user_id>` - Get user details

### Health Check
- `GET /api/health` - Check API status

## Database Schema

### Users Table
- `id` (INTEGER, PRIMARY KEY)
- `name` (TEXT)
- `email` (TEXT, UNIQUE)
- `phone` (TEXT)
- `password_hash` (TEXT)
- `created_at` (TIMESTAMP)

### Orders Table
- `id` (INTEGER, PRIMARY KEY)
- `user_id` (INTEGER, FOREIGN KEY)
- `items` (TEXT, JSON)
- `total_amount` (REAL)
- `status` (TEXT)
- `created_at` (TIMESTAMP)

## Usage

1. **Register/Login**: Click "Sign In" to create an account or login
2. **Browse Products**: Navigate through medicines and lab tests
3. **Add to Cart**: Click "Add to Cart" on any product
4. **Checkout**: Click "Proceed to Checkout" in the cart sidebar
5. **View Orders**: Orders are stored in the database and can be retrieved via API

## Configuration

### Change API URL

If your backend is running on a different port or host, update the API base URL in `script.js`:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

## Security Notes

- Passwords are hashed using SHA256 (for production, consider using bcrypt)
- CORS is enabled for development (restrict in production)
- Input validation is performed on both frontend and backend

## Development

### Adding New Products

Edit the `medicineData` or `labTests` arrays in `script.js` to add new products.

### Database Management

The database file `ezyheal.db` is created automatically. To reset:
1. Delete `ezyheal.db`
2. Restart the Flask server

### SMS Configuration

The application supports multiple SMS providers for sending OTP:

1. **Console Mode (Testing)**: 
   - Set `SMS_PROVIDER=console` in `config.env`
   - OTPs will be printed to the server console
   - No actual SMS will be sent

2. **Twilio**:
   - Sign up at https://www.twilio.com
   - Get Account SID, Auth Token, and Phone Number
   - Set in `config.env`

3. **Fast2SMS** (Indian numbers):
   - Sign up at https://www.fast2sms.com
   - Get API key
   - Set in `config.env`

4. **MSG91** (Indian numbers):
   - Sign up at https://msg91.com
   - Get Auth Key
   - Set in `config.env`

## Troubleshooting

- **CORS Errors**: Ensure Flask server is running and CORS is enabled
- **API Connection Failed**: Check if backend is running on port 5000
- **Database Errors**: Delete `ezyheal.db` and restart the server

## License

This project is for educational purposes.

