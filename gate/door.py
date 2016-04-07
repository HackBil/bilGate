import time
from threading import Thread
from gate.models import Open

try:
    import RPi.GPIO as GPIO
except:
    import gate.mock_gpio as GPIO


GPIO.setmode(GPIO.BCM)
GPIO.setup(12, GPIO.OUT)
GPIO.output(12, GPIO.LOW)  # Set default as low


class OpenDoor(Thread):
    def run(self):
        GPIO.output(12, GPIO.HIGH)
        time.sleep(10)
        GPIO.output(12, GPIO.LOW)


def open():
    Open().save()  # Log the date of opening

    OpenDoor().start()
