# CS411-Final-Project-Team-1

Team Members:
- Shahaf Dan
- Shunsuke Ishida
- Glenn Ee
- Bing Zeng
- Bradley Shulman
- Myriam Bengoechea


Please see docs folder for Assignments

**Project Overview**

From a high-level view, this repository contains the documentation for a project based around analyzing sentiment of movies from two sources: Twitter and IMDB. It is still a work in progress, as many features could be added to enhance the user experience. More details on the project's creation, features, and relevant information are present below.

**SETUP**

Install prereqs:

```
pip3 install -r backend/requirements.txt
cd frontend
npm install
```

Create a `.env` file in the `backend` folder with the following information (IMDB and IBM Watson Natural Language keys are available for free from their respective sites with signup):

```
imdb_apikey = 'YOURKEYHERE'
ibm_apiurl = 'YOURURLHERE'
ibm_apikey = 'YOURKEYHERE'
```

Run:

```
cd backend
flask run
cd ../frontend
npm start
```

A note: the Google login is currently configured to only work with BU emails (i.e. app is only allowing authorisation from within the organisation)

ONCE THE PROJECT IS COMPLETE WE SHOULD
* OUTLINE FEATURES
* STEPS TAKEN TO CREATION
* APIS/DATABASES USED
* ANY OTHER PERTINENT INFORMATION TO EXPLAINING THE PROJECT
