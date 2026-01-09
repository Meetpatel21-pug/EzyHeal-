# SMS OTP Setup Guide

This guide will help you configure SMS sending for OTP verification in the EzyHeal application.

## Quick Start (Testing Mode)

For testing without actual SMS service:

1. Create `config.env` file:
   ```
   SMS_PROVIDER=console
   ```

2. Run the server - OTPs will be printed to console

## Production Setup

### Option 1: Twilio (International)

1. Sign up at https://www.twilio.com
2. Get your credentials from Twilio Console:
   - Account SID
   - Auth Token
   - Phone Number (with country code)

3. Create `config.env`:
   ```
   SMS_PROVIDER=twilio
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE_NUMBER=+1234567890
   ```

### Option 2: Fast2SMS (India - Free Tier Available)

1. Sign up at https://www.fast2sms.com
2. Get API Key from dashboard
3. Create `config.env`:
   ```
   SMS_PROVIDER=fast2sms
   FAST2SMS_API_KEY=your_api_key
   FAST2SMS_SENDER_ID=EZYHEAL
   ```

**Note**: Fast2SMS supports Indian phone numbers only.

### Option 3: MSG91 (India - Free Tier Available)

1. Sign up at https://msg91.com
2. Get Auth Key from dashboard
3. Create `config.env`:
   ```
   SMS_PROVIDER=msg91
   MSG91_AUTH_KEY=your_auth_key
   MSG91_SENDER_ID=EZYHEL
   ```

**Note**: MSG91 supports Indian phone numbers only.

## Testing

1. Start the server: `python app.py`
2. Open the application in browser
3. Click "Forgot Password"
4. Enter a 10-digit phone number
5. Check:
   - **Console mode**: Check server terminal for OTP
   - **SMS mode**: Check your phone for SMS

## Troubleshooting

### OTP not received
- Check SMS provider credentials
- Verify phone number format (10 digits for India)
- Check SMS provider dashboard for delivery status
- Try console mode first to verify OTP generation works

### Import errors
- Install missing packages: `pip install -r requirements.txt`
- For Twilio: `pip install twilio`
- For dotenv: `pip install python-dotenv`

### SMS provider errors
- Verify API keys are correct
- Check account balance (for paid services)
- Ensure phone number format is correct
- Check provider's rate limits

## Security Notes

- Never commit `config.env` to version control
- Keep API keys secure
- Use environment variables in production
- Rotate API keys regularly
