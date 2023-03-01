
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
    order by group.created_at desc


select liked.liked_from, users.user_icon, users.username, message.message 
from liked,users,message,group 
where liked.liked_from in (select liked.liked_to from liked where liked.like_from = 1) 
and liked_to = 1
and users.id = liked.liked_from
and users.id = message.user_id
order by message.created_at
order by group.created_at

subq = select group.id from group 
        where matched_user_id1 =  res.session.userId 
        orwhere matched_user_id2 = res.session.userId

select message, max('created_at','decs') from message wherein subq 


select group.id,users.username,users.user_icon,message.message from message,users,group where users.id = message.user_id and group.id = message.group_id and group.matched_user_id1 = 89 or group.matched_user_id2 = 89

select max(created_at), group_id,message from (select group_id,user_message.created_at,message from (select username,user_icon,message,message.created_at,group_id from message inner join users on users.id = message.user_id) as user_message inner join "group" on group_id= "group".id) as result group by group_id,message;



select "group".id, max(message.created_at) from "group",message group by "group".id

select user_message.id, message.message, user_message.max from (select "group".id, max(message.created_at) from "group",message group by "group".id) as user_message, message

select message.message from message where message.created_at in (select max(message.created_at) from "group",message group by "group".id)

select user_message.id, message.message, user_message.max from message inner join (select "group".id, max(message.created_at) from "group",message group by "group".id) as user_message on message.group_id = user_message.id

last message time:
select group_id, max(created_at) from (select group_id,user_message.created_at from (select username,user_icon,message,message.created_at,group_id from message inner join users on users.id = message.user_id) as user_message inner join "group" on group_id= "group".id) as result group by group_id

select group_id, max(created_at) from (select group_id, user_message.created_at from (select group_id, message.created_at from message) as user_message inner join "group" on group_id= "group".id) as result group by group_id

select group_id, message.created_at from message, "group" where group_id= "group".id

select group_id, max(created_at) from (select group_id, message.created_at from message, "group" where group_id= "group".id) as result group by group_id

last message time:
select group_id, max(message.created_at) from message, "group" where group_id= "group".id group by group_id

select user_message.group_id, users.user_icon, users.username, message.message, user_message.max from (select group_id, max(message.created_at) from message, "group" where group_id= "group".id group by group_id) as user_message, message, users where user_message.group_id = message.group_id and user_message.max = message.created_at and users.id = message.user_id order by user_message.max desc

select user_message.group_id, users.user_icon, users.username, message.message, user_message.max from (select group_id, max(message.created_at) from message, "group" where group_id = "group".id and "group".matched_user_id1 = 89 or "group".matched_user_id2 = 89 group by group_id) as user_message, message, users where user_message.group_id = message.group_id and user_message.max = message.created_at and users.id = message.user_id order by user_message.max desc



////////
chatroom:
select group.id, users.user_icon, users.username, message.message 