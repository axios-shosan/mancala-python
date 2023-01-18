from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from game import *
from Variables import *
import time

# 1 ==> Human
# 2 ==> Computer

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

board = MancalaBoard()
game = Game(board, -1)

#Player starts
next_player = 1

@socketio.on("start-game")
def start():
    global next_player, game, board
    board = MancalaBoard()
    game = Game(board, -1)
    next_player = 1

@socketio.on('move-human')
def handle_message(data):
    global next_player, game, board

    next_player, game = Play.humanTurn(game, next_player, data['move'] )
    

    if(game.gameOver()):
        winner= game.findWinner()
        emit("over", {"winner" : winner})
    
    print({"board" : game.state.board, "player": next_player})
    emit("played", {"board" : game.state.board, "player": next_player})


@socketio.on('move-computer')
def handle_message():
    global next_player, game, board


    next_player, game, playedNode = Play.computerTurn(game, next_player)


    if(game.gameOver()):
        winner= game.findWinner()

        emit("over", {"winner" : winner})
    
    print({"board" : game.state.board, "player": next_player})
    emit("played", {"board" : game.state.board, "player": next_player, "playedNode": playedNode})

@socketio.on('move-computer-computer')
def handle_message():
    print("recieved")
    global next_player, game, board

    while(not game.gameOver()):
        next_player, game, playedNode = Play.computerTurn(game, next_player)


        if(game.gameOver()):
            winner= game.findWinner()
            emit("over", {"winner" : winner})
        else:
            emit("played", {"board" : game.state.board, "player": next_player, "playedNode": playedNode})
            time.sleep(0.3)
    
    print({"board" : game.state.board, "player": next_player})


if __name__ == '__main__':
    socketio.run(app)


 

