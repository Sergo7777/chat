from django.shortcuts import render
from django.contrib.auth import authenticate, logout
from django.contrib.auth import login as auth_login
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from userstory import settings
from .models import Chat
# Create your views here.
def home(request):
    chat = Chat.objects.all()
    return render(request, 'chat/home.html', {'home': 'active', 'chat': chat})

def login(request):
    next = request.GET.get('next', '/home/')
    print(next)
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        print(user)
        if user is not None:
            if user.is_active:
                auth_login(request, user)
                return HttpResponseRedirect(next)
            else:
                return HttpResponse("Account is not active at the moment.")
        else:
            return HttpResponseRedirect(settings.LOGIN_URL)
    return render(request, "chat/login.html", {'next': next})

def logout(request):
    logout(request)
    return HttpResponseRedirect('/login/')


def post(request):
    if request.method == "POST":
        msg = request.POST.get('msgbox', None)
        chat = Chat(user=request.user, message=msg)

        if msg != '':
            chat.save()
        return JsonResponse({ 'msg': msg, 'user': chat.user.username })
    else:
        return HttpResponse('Request must be POST.')
