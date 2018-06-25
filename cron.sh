#!/bin/bash


# script to check that the door doesn't stay opened at night.

# must run as root, as the npm logs are only readable by root

# install with `sudo crontab -e` and adding the line:
# execute from 9PM to 8AM,
# (times are in UTC, not local - will have to change daylight saving times )
# 
#   0 0-6,19-23 * * * /home/pi/bilGate/cron.sh

# Also require ssmtp installed, for example using the instructions from http://iqjar.com/jar/sending-emails-from-the-raspberry-pi/

export LANG=C.UTF-8

LOG="$(cat /root/.pm2/logs/npm-out-0.log)"

LAST_OPEN=$(grep -a -E 'Closing|Opening' /root/.pm2/logs/npm-out-0.log | tail -1)
if [[ "$LAST_OPEN" == Opening* ]]; then
    mail -s 'TEST - BIL Gate ouverte ?' solene@boostinlyon.fr,francois@granade.com <<EOF

La dernière opération sur la porte a été une ouverture: $LAST_OPEN

Peut-être la porte est-elle encore ouverte, donc que cela vaudrait le coup d'aller vérifier ? 

Ce mail va etre envoyé toutes les heures jusqu'à demain 8h du matin; il cessera aussi d'être envoyé si quelqu'un ferme la porte sur http://bilgate.boostinlyon.fr

Donc si vous cessez de le recevoir dans la nuit, c'est une bonne nouvelle :)

Bil Gates

PS : http://bilgate.boostinlyon.fr est uniquement utilisable si vous êtes connecté au wifi de BILotière : pas la peine d’essayer depuis votre lit… si, si, il va falloir envoyer quelqu’un… :)



-------

Complete log file:

$LOG

EOF
fi
