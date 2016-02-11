BilGate
===========

Install
---------
* `git clone git@github.com:HackBil/bilGate.git` : retrieve the repo
* `cd bilGate`
* `virtualenv -p python3 --no-site-packages .v_env` : create a virtual-env for python code
* `source .v_env/bin/activate` : activate the v_env
* `pip install -r requirements.txt` : install all requirements


Configure
---------

#### env:
```bash
export CODE="the secret code"
```

How to use
----------
## In development
#### Start the server
```bash
pyhton manage.py runserver <ip:port>
```
Connect to your server and let you be guided by our awesome UI

