#!/bin/bash
echo "running app now"
python3 manage.py runserver
flask run
cd frontend
npm run build
npm start