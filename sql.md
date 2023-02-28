
Matched:
    select liked.liked_from, users.username, users.user_icon from liked,users 
    where liked.liked_from in (select liked.liked_to from liked where liked.like_from = 1) 
    and liked_to = 1
    and users.id = liked.liked_from

last message:?
    select chatroom.message 
    from chatroom,users 
    order by users.id 
    order by chatroom.created_at dect

join:
    select liked.liked_from, users.username, users.user_icon, chatroom.message, MAX(chatroom.created_at) 
    from liked, users, chatroom 
    where liked.liked_from in (select liked_to from liked where liked_from = 1) 
    and liked.liked_to = 1
    and users.id = liked.liked_from

    <!-- group by
    having max(chatroom.created_at) -->

liked_from  liked_to
liked_to    session.id  message             created_at
2           1           hi                  1am
2           1           how ru              2am
3           1           nice to meet u
3           1           gd nite
4           1           i love u
1           2           hi                  3am
1           3           me2


new match
    select liked.liked_from, users.username, users.user_icon from liked,users 
    where liked.liked_from in (select liked.liked_to from liked where liked.like_from = 1) 
    and liked_to = 1
    and users.id = liked.liked_from


    select group.*, message.message 
    from group,message 
    where group.matched_user_id1 = req.session.userId 
    or group.matched_user_id2 = req.session.userId 
    order by group.created_at dect