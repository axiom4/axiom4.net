# My personal Security Blog
Hi everyone, with this project I want to share the source code of my personal blog. My application uses Python frameworks Django+Django Rest for the backend/api part, while using NodeJs+Angular for the frontend part. Feel free to send me comments or code patches.

## How deploy?

1. Clone project

```bash
# git clone https://github.com/axiom4/axiom4.net.git
# cd axiom4.net
# export PROJECT_HOME=${PWD}
```

2. Create Python ***venv***

```bash
# python3 -m venv ${PROJECT_HOME}/venv
# source ${PROJECT_HOME}/venv/bin/activate
# cd ${PROJECT_HOME}/axiom4-api
# pip install -r requirements.txt
# cd ${PROJECT_HOME}
```

3. Install node modules

```bash
# cd ${PROJECT_HOME}/axiom4-web
# npm install
# cd ${PROJECT_HOME}
```

## How run backend in development mode?


```bash
# cd ${PROJECT_HOME}/axiom4-api


# ./manage.py makemigrations
No changes detected


# ./manage.py migrate
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, sessions
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  Applying admin.0001_initial... OK
  Applying admin.0002_logentry_remove_auto_add... OK
  Applying admin.0003_logentry_add_action_flag_choices... OK
  Applying contenttypes.0002_remove_content_type_name... OK
  Applying auth.0002_alter_permission_name_max_length... OK
  Applying auth.0003_alter_user_email_max_length... OK
  Applying auth.0004_alter_user_username_opts... OK
  Applying auth.0005_alter_user_last_login_null... OK
  Applying auth.0006_require_contenttypes_0002... OK
  Applying auth.0007_alter_validators_add_error_messages... OK
  Applying auth.0008_alter_user_username_max_length... OK
  Applying auth.0009_alter_user_last_name_max_length... OK
  Applying auth.0010_alter_group_name_max_length... OK
  Applying auth.0011_update_proxy_permissions... OK
  Applying auth.0012_alter_user_first_name_max_length... OK
  Applying sessions.0001_initial... OK


# ./manage.py createsuperuser --username admin
Email address: [your mail]
Password: 
Password (again): 
Superuser created successfully. 

# ./manage.py runserver
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
August 17, 2023 - 08:03:03
Django version 4.2.4, using settings 'axiom4.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.

```

## How run frontend in development mode?


```bash
# cd ${PROJECT_HOME}/axiom4-web

# ng serve
✔ Browser application bundle generation complete.

Initial Chunk Files   | Names         |  Raw Size
vendor.js             | vendor        |   2.33 MB | 
polyfills.js          | polyfills     | 333.18 kB | 
styles.css, styles.js | styles        | 230.92 kB | 
main.js               | main          |  48.11 kB | 
runtime.js            | runtime       |   6.52 kB | 

                      | Initial Total |   2.94 MB

Build at: 2023-08-17T08:04:02.902Z - Hash: 5ece58a9d7f1e6e3 - Time: 4966ms

** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **


✔ Compiled successfully.

```