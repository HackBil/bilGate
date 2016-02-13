BilGate
===========

Install
---------
* `git clone git@github.com:HackBil/bilGate.git` : retrieve the repo
* `cd bilGate`
* `virtualenv -p python3 --no-site-packages .v_env` : create a virtual-env for python code
* `source .v_env/bin/activate` : activate the v_env
* `pip install -r requirements.txt` : install all requirements
* `python manage.py migrate` : Create the database
* `python manage.py createsuperuser` : Create admin user who can edit db on /admin.


How to use
----------
## In development
#### Start the server
```bash
python manage.py runserver <ip:port>
```
* ` Then go on /admin and create 1 ou more codes (5 char only)`

Documentation
-------------
##POST /open
####body
```json
{
  "code": "A1234"
}
```

#### Returns
*200 OK* If door is opened

*401 Unauthorized* If code is wrong

