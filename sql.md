
Matched:
    select liked.liked_from, users.username, users.user_icon from liked,users 
    where liked_from in (select liked_to from liked where like_from = req.session.userId) 
    and liked_to = req.session.userId 
    and users.id = liked.liked_from

last message:?
    select chatroom.message 
    from chatroom,users 
    order by users.id 
    order by chatroom.created_at dect

join:
    select liked.liked_from, users.username, users.user_icon, chatroom.message 
    from liked, users, chatroom 
    where liked_from in (select liked_to from liked where liked_from = req.session.userId) 
    and liked_to = req.session.userId 
    and users.id = liked.liked_from

    having max(created_at)

liked_from  liked_to
liked_to    session.id  message             created_at
2           1           hi                  1am
2           1           how ru              2am
3           1           nice to meet u
3           1           gd nite
4           1           i love u
1           2           hi                  3am
1           3           me2
