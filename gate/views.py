from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from gate.models import Code, Open


def index(request):
    return render(request, 'index.html', {'door_opened': False})


@csrf_exempt
def open(request):
    if request.method != 'POST':
        return HttpResponse('method not allowed', status=405)
    try:
        print(request.POST)
        Code.objects.get(code=request.POST.get("code"))
    except Code.DoesNotExist:
        return HttpResponse('Unauthorized', status=401)
    Open().save()  # Log the date of opening
    return HttpResponse('OK', status=200)
