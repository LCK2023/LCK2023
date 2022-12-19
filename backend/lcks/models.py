from django.db import models
from django.conf import settings

# Create your models here.
class Team(models.Model):
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='like_teams')
    t_name = models.CharField(max_length=20)
    page_url = models.TextField()

class Player(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    nickname = models.CharField(max_length=20)
    realname = models.CharField(max_length=20)
    birth = models.DateField()
    debut_date = models.DateField()
    position = models.CharField(max_length=20)

class Staff(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    job = models.IntegerField() # 0: 감독, 1: 코치

class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class ChampionVote(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    champion = models.CharField(max_length=100)

class TeamScore(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    score = models.IntegerField()
    year = models.IntegerField()

class Transfer(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    year = models.IntegerField()