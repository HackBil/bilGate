import time
from threading import Thread

from gate.models import Open

# import RPi.GPIO as GPIO
# GPIO.setmode(GPIO.BCM)
# GPIO.setup(12, GPIO.OUT)


class OpenDoor(Thread):
    def __init__(self):
        Thread.__init__(self)

    def run(self):
        # GPIO.output(12, GPIO.HIGH)
        time.sleep(10)
        # GPIO.output(12, GPIO.LOW)


def open():
    Open().save()  # Log the date of opening
    OpenDoor.start()
