import RPi.GPIO as GPIO
import time
from gate.model import Open

GPIO.setmode(GPIO.BCM)
GPIO.setup(12, GPIO.OUT)


def open():
	Open().save()  # Log the date of opening

	GPIO.output(12, GPIO.HIGH)
	time.sleep(10)
	GPIO.output(12, GPIO.LOW)
