from flask import Flask, render_template, request, redirect, url_for, session
from datetime import datetime

app = Flask(__name__)
# 🔐 CHANGE this to a long random string in production
app.secret_key = "abcd1234"

# 🔏 Simple gate so only Suhail sees the page
PASSCODE = "ILOVEYOU"  

@app.route("/", methods=["GET"])
def home():
    authed = session.get("authed", False)
    return render_template("index.html", authed=authed, year=datetime.now().year)

@app.route("/login", methods=["POST"])
def login():
    code = (request.form.get("code") or "").strip().lower()
    if code == PASSCODE.lower():
        session["authed"] = True
        return redirect(url_for("home"))
    return redirect(url_for("home", bad="1"))

@app.route("/logout")
def logout():
    session.pop("authed", None)
    return redirect(url_for("home"))

if __name__ == "__main__":
    # Run Flask
    app.run(host="0.0.0.0", port=5000, debug=True)
