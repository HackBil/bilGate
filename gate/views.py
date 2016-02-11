from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from gate.models import Code, Open


def index(request):
    return render(request, 'index.html', locals())


@csrf_exempt
def open(request):
    if request.method == 'POST':
        try:
            print(request.POST)
            Code.objects.get(code=request.POST.get("code"))
        except Code.DoesNotExist:
            return HttpResponse('Unauthorized', status=401)
        Open().save()
        return HttpResponse('OK', status=200)
    else:
        return HttpResponse('method not allowed', status=405)
