# Send message to one client, like New user come, we show him "welcome message" 
socket.emit('message', "Welcome user to our Chat Group");

# Sending to all clients except sender 
socket.broadcast.emit('message', "New user i.e joy joined our chat group."); 

# Sending to all clients in 'game' room(channel) except sender
socket.broadcast.to('game').emit('message', 'sending to all clients in 'game' room(channel) except sender'); 

# Sending to sender client, only if they are in 'game' room(channel)
socket.to('game').emit('message', 'sending to sender client, only if they are in game room'); 

# Sending to individual socketid
socket.broadcast.to(socketid).emit('message', 'sending to individual socketid'); 

# Sending to all clients, include sender
io.emit('message', "sending to all clients, include sender"); 

# Sending to all clients in 'game' room(channel), include sender
io.to('game').emit('message', 'sending to all clients in game room'); 

# sending to all clients in namespace 'myNamespace', include sender
io.of('myNamespace').emit('message', 'sending to all clients in namespace myNamespace');

# for emiting to specific clients
io.sockets.socket('for emiting to specific clients');

# send to all connected clients 
io.sockets.emit('send to all connected clients');