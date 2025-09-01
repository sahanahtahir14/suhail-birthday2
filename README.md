# Happy Birthday, Suhail 🎂

A tiny, cute Flask website just for Suhail. Includes:
- Private passcode gate (default: `suhail` — change in `app.py`)
- Confetti, balloon animations, heart click particles
- Typewriter love note + wish meter + mini gallery
- Optional music (drop an MP3 at `static/audio/birthday_song.mp3`)

## Run locally
```bash
cd happy-birthday-suhail
python -m venv .venv && source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install flask
python app.py
# visit http://localhost:5000
```

## Customize
- Change the passcode in `app.py` (PASSCODE) and `app.secret_key`.
- Replace `static/img/cover.svg` with your photos (also update the gallery images).
- Edit the love note text inside `templates/index.html`.
- Add your song as `static/audio/birthday_song.mp3`.
