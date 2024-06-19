from flask import Flask, request, jsonify
from facebook.login import LoginCookie, LoginEmail

app = Flask(__name__)

@app.route('/facebook-api/login')
def facebook_api():
    email = request.args.get('email', None)
    password = request.args.get('password', None)
    cookie = request.args.get('cookie', None)

    if email and password: response_data = LoginEmail(email, password)
    elif cookie and 'c_user' in cookie: response_data = LoginCookie(cookie)
    else: response_data = {'status':'failed'}
    
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True)