from .models import *
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.contrib.auth import get_user_model
from .serializers import *
from rest_framework.permissions import IsAuthenticated

# Create your views here.
@api_view(['GET'])
def team(request, teamname):
    team = Team.objects.get(t_name=teamname)
    serializer = TeamSerializer(team)
    return Response(serializer.data)


@api_view(['GET'])
def team_likes(request):
    teams = Team.objects.all()
    serializer = TeamLikesSerializer(teams, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def team_like(request, teamname):
    team = Team.objects.get(t_name=teamname)
    if team.like_users.filter(username=request.user).exists():
        team.like_users.remove(request.user)
    else:
        team.like_users.add(request.user)
    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
def player(request, nickname):
    player = Player.objects.get(nickname=nickname)
    serializer = PlayerDetailSerializer(player)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def vote(request, nickname):
    # 어떤 유저가 어떤 챔피언을 어떤 플레이어한테 투표했는지
    # 1. 어떤 유저: request.user
    # 2. 어떤 플레이어: nickname
    # 3. 어떤 챔피언: request.data
    player = Player.objects.get(nickname=nickname)
    champions = request.data['info']
    for champion in champions:
        championvote = ChampionVote()
        # championvote.user = request.user
        user = get_user_model().objects.get(pk=1)
        championvote.user = user
        championvote.player = player
        championvote.champion = champion
        championvote.save()
    serializer = PlayerMost3Serializer(player)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def comment(request, nickname):
    # 어떤 유저가 어떤 플레이어에 어떤 댓글을 남겼는지
    player = Player.objects.get(nickname=nickname)
    if request.method == 'GET':
        comments = player.comment_set.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        comment = Comment()
        comment.content = request.data['content']
        comment.user = request.user
        comment.player = player
        comment.save()
        comments = player.comment_set.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def comment_edit(request, comment_id):
    # 어떤 댓글이 수정/삭제 됐는지
    comment = Comment.objects.get(id=comment_id)
    if request.user.id == comment.user.id:
        if request.method == 'PUT':
            comment.content = request.data['content']
            comment.save()
            return Response(status=status.HTTP_200_OK)
        elif request.method == 'DELETE':
            comment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_401_UNAUTHORIZED)
    

# def tmp(request):
#     user = get_user_model().objects.get(pk=1)
#     player = Player.objects.get(nickname='deft')
#     content = 'asdfasdf'
#     comment = Comment()
#     comment.user = user
#     comment.player = player
#     comment.content = content
#     comment.save()
