from rest_framework import serializers
from .models import *
from django.db.models import Count

class PlayerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Player
        fields = '__all__'

class StaffSerializer(serializers.ModelSerializer):

    class Meta:
        model = Staff
        fields = '__all__'

class TeamScoreSerializer(serializers.ModelSerializer):

    class Meta:
        model = TeamScore
        fields = '__all__'

class TeamSerializer(serializers.ModelSerializer):

    player_set = PlayerSerializer(many=True, read_only=True)
    staff_set = StaffSerializer(many=True, read_only=True)
    teamscore_set = TeamScoreSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = '__all__'

class TeamLikesSerializer(serializers.ModelSerializer):

    like_users_count = serializers.IntegerField(source='like_users.count', read_only=True)

    class Meta:
        model = Team
        fields = ('t_name', 'like_users_count')

class CommentSerializer(serializers.ModelSerializer):

    username = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = '__all__'

    def get_username(self, obj):
        user = obj.user
        return user.username

class TransferSerializer(serializers.ModelSerializer):

    teamname = serializers.SerializerMethodField()
    page_url = serializers.SerializerMethodField()

    class Meta:
        model = Transfer
        fields = '__all__'

    def get_teamname(self, obj):
        team = obj.team
        return team.t_name

    def get_page_url(self, obj):
        team = obj.team
        return team.page_url

class TeamNameSerializer(serializers.ModelSerializer):

    class Meta:
        model = Team
        fields = ('t_name',)

class PlayerDetailSerializer(serializers.ModelSerializer):

    team = TeamNameSerializer()
    comment_set = CommentSerializer(many=True, read_only=True)
    transfer_set = TransferSerializer(many=True, read_only=True)
    most3 = serializers.SerializerMethodField()

    class Meta:
        model = Player
        fields = '__all__'

    def get_most3(self, obj):
        most3 = obj.championvote_set.values('champion').annotate(Count('champion')).order_by('-champion__count')[:3]
        total_cnt = obj.championvote_set.count()
        for champion in most3:
            champion['percentage'] = champion['champion__count'] * 100 // total_cnt
        return most3

class PlayerMost3Serializer(serializers.ModelSerializer):

    most3 = serializers.SerializerMethodField()

    class Meta:
        model = Player
        fields = ('most3',)

    def get_most3(self, obj):
        most3 = obj.championvote_set.values('champion').annotate(Count('champion')).order_by('-champion__count')[:3]
        total_cnt = obj.championvote_set.count()
        for champion in most3:
            champion['percentage'] = champion['champion__count'] * 100 // total_cnt
        return most3