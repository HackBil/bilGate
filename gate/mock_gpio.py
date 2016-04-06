
def setmode(mode):
    print("setmode: %s" % mode)


def setup(pin, in_or_out):
    print("setup: %s, %s" % (pin, in_or_out))


def output(pin, state):
    print("setup: %s, %s" % (pin, state))


def cleanup():
    print("cleanup")


BCM = "BCM"
BOARD = "BOARD"
OUT = "OUT"
IN = "IN"
LOW = "LOW"
HIGH = "HIGH"
