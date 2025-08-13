# CubaGram
CubaGram is a simple website that simulates Instagram.

# Project Summary
On this website, you can add posts for other users to view and comment on. Additionally, you have the option to follow other users to keep up to date with their posts. It also has a personal profile where you can specify your data.

## Running this project
This is the project API. To get this project up and running you should start by having Python installed on your computer. It's advised you create a virtual environment to store your projects dependencies separately. You can create virtual environment with
````markdown
python -m venv virtual_environment_name(Windows)
virtualenv .(Linux)
````
Open the virtual environment folder and clone or download this repository with
````markdown
git clone https://github.com/cediazz/CubaGram.git
````
Activate the virtual environment and install the project dependencies with
````markdown
pip install -r requirements.txt
````
Create the .env file and place the environment variables you need
````markdown
SECRET_KEY='your secret key'
SITE_URL = 'your site url'
ENGINE='your database engine'
DB_NAME=your database name
DB_USER=your database user
DB_PASSWORD=your database password
DB_HOST=your database host
DB_PORT=your database port
````
Now you can run the project with this command
````markdown
python manage.py runserver
````
