import time
from threading import Thread

from gate.models import Open

import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)
GPIO.setup(12, GPIO.OUT)
GPIO.output(12, GPIO.LOW) # Set default as low

class OpenDoor(Thread):
    def run(self):
        GPIO.output(12, GPIO.HIGH)
        time.sleep(10)
        GPIO.output(12, GPIO.LOW)
        GPIO.cleanup()


def open():
    Open().save()  # Log the date of opening

    OpenDoor().start()
