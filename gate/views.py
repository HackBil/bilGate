# -*- coding: utf-8 -*-

from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
import twilio.twiml
import time

from gate.models import Code, Contact
import gate.door as door


def index(request):
    return render(request, 'index.html', {'domain': request.get_host()})


@csrf_exempt
def open(request):
    if request.method != 'POST':
        return HttpResponse('method not allowed', status=405)
    if request.META.get('CONTENT_TYPE') == 'application/json':
        json_data = json.loads(request.body.decode('utf-8'))
        try:
            code = json_data['code']
        except KeyError:
            return HttpResponse('Missing key "code"', status=400)
    else:
        code = request.POST.get("code")
    try:
        Code.objects.get(code=code)
    except Code.DoesNotExist:
        return HttpResponse('Unauthorized', status=401)
    door.open()
    return HttpResponse('OK', status=200)

@csrf_exempt
def twilioResponse(request):
    resp = twilio.twiml.Response()
    resp.say("Bienvenue chez BoostInLyon !", language="fr-FR", voice="alice")

    hour = time.localtime().tm_hour
    day_of_week = time.localtime().tm_wday
    if hour > 8 and hour < 19 and day_of_week < 5:
        resp.play(digits="www#")
        resp.say("Vous pouvez maintenant entrer, veuillez sonnez à l'interphone sur la première porte à gauche, la porte sera ouverte automatiquement. Les locaux sont ensuite au premier étage, vous n'avez qu'a pousser la porte.", language="fr-FR", voice="alice")
    else:
        resp.say("Nous vous connectons à une personne qui peut venir vous ouvrir", language="fr-FR", voice="alice")
        dial = resp.dial()
        for contact in Contact.objects.order_by('-priority')[:5]:
            dial.number(contact.phone, timeout=15)

    return HttpResponse(str(resp), status=200)
