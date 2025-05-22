from flask import Flask, render_template, request, redirect, flash
import smtplib
import os
from dotenv import load_dotenv
from flask import jsonify

load_dotenv()  # load env parameters

app = Flask(__name__)
app.secret_key = 'your-secret-key'  

# get sender email info from .env
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")
TO_EMAIL = os.getenv("TO_EMAIL")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/sendEmail', methods=['POST'])
def send():
    # get visitor's info
    name = request.form['name']
    email = request.form['email']
    message = request.form['message']

    email_text = f"""\
                From: {name} <{email}>
                To: {TO_EMAIL}
                Subject: New Message from Judy's Portfolio Contact Form

                Message:
                {message}
                """

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(EMAIL_USER, EMAIL_PASS)
            server.sendmail(EMAIL_USER , TO_EMAIL, email_text)
        flash("✅ message send successfully! ")
        return jsonify({'message': '✅ Message sent successfully!'}), 200
    except Exception as e:
        flash(f"❌ message send failed: {e}")
        return jsonify({'message': f'❌ Failed to send: {str(e)}'}), 500

    return redirect('/#contact')

if __name__ == '__main__':
    app.run(debug=True)