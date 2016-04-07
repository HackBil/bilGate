from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json

from gate.models import Code
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
