"""LCK2023 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from lcks import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('dj_rest_auth.urls')),
    path('accounts/signup/', include('dj_rest_auth.registration.urls')),
    path('team/<str:teamname>/', views.team),
    path('teamlikes/', views.team_likes),
    path('teamlikes/<teamname>/', views.team_like),
    path('player/<nickname>/', views.player),
    path('player/<nickname>/most3/', views.vote),
    path('player/<nickname>/comment/', views.comment),
    path('player/comment/<comment_id>/', views.comment_edit),
    # path('tmp/', views.tmp)
]
