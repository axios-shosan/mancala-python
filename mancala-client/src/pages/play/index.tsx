import classes from "./index.module.css";
import logo from "../../assets/logo.svg";
import Pit from "../../components/Pits";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import Loader from "../..//components/Loader/Loader";

// enum Player {
//   Human = 1,
//   Computer = 2,
// }

const socket = io("http://127.0.0.1:5000");

export default function Play() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [player, setPlayer] = useState(1);
  const [move, setMove] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState();
  const [board, setBoard] = useState({
    A: 4,
    B: 4,
    C: 4,
    D: 4,
    E: 4,
    F: 4,
    G: 4,
    H: 4,
    I: 4,
    J: 4,
    K: 4,
    L: 4,
    M1: 0,
    M2: 0,
  });

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
      socket.emit("start-game");
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("played", (data: any) => {
      console.log("player", data);
      setBoard(data.board);
      setPlayer(data.player);
      setMove(data.playedNode);
    });

    socket.on("over", (data) => {
      setWinner(data.winner);
      setGameOver(true);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  function clicked(value: number, label: string, playerId: number) {
    if (playerId === 1 && player === 1 && value !== 0 && !gameOver)
      socket.emit("move-human", { move: label });
  }

  return !isConnected ? (
    <Loader />
  ) : (
    <div>
      <div className={classes.homeHeader}>
        <img
          src={logo}
          className={classes.logo}
          alt="logo"
          onClick={() => {
            if (player === 2 && !gameOver) socket.emit("move-computer");
          }}
        />
        <p className={classes.headerTitle}>Mancala</p>
      </div>
      <div className={classes.gameContainer}>
        <div className={`${classes.deck} ${classes.computer}`}>
          <p>{board["M2"]}</p>
        </div>
        <div className={classes.pitsContainer}>
          <div className={classes.playerPits}>
            <Pit
              playerId={1}
              value={board.A}
              label="A"
              player={player}
              socket={socket}
              gameOver={gameOver}
              clicked={clicked}
            />
            <Pit
              playerId={1}
              value={board.B}
              label="B"
              player={player}
              socket={socket}
              gameOver={gameOver}
              clicked={clicked}
            />
            <Pit
              playerId={1}
              value={board.C}
              label="C"
              player={player}
              socket={socket}
              gameOver={gameOver}
              clicked={clicked}
            />
            <Pit
              playerId={1}
              value={board.D}
              label="D"
              player={player}
              socket={socket}
              gameOver={gameOver}
              clicked={clicked}
            />
            <Pit
              playerId={1}
              value={board.E}
              label="E"
              player={player}
              socket={socket}
              gameOver={gameOver}
              clicked={clicked}
            />
            <Pit
              playerId={1}
              value={board.F}
              label="F"
              player={player}
              socket={socket}
              gameOver={gameOver}
              clicked={clicked}
            />
          </div>
          <div className={classes.playerPits}>
            <Pit
              playerId={2}
              value={board.G}
              label="G"
              player={player}
              socket={socket}
              gameOver={gameOver}
              clicked={clicked}
            />
            <Pit
              playerId={2}
              value={board.H}
              label="H"
              player={player}
              socket={socket}
              gameOver={gameOver}
              clicked={clicked}
            />
            <Pit
              playerId={2}
              value={board.I}
              label="I"
              player={player}
              socket={socket}
              gameOver={gameOver}
              clicked={clicked}
            />
            <Pit
              playerId={2}
              value={board.J}
              label="J"
              player={player}
              socket={socket}
              gameOver={gameOver}
              clicked={clicked}
            />
            <Pit
              playerId={2}
              value={board.K}
              label="K"
              player={player}
              socket={socket}
              gameOver={gameOver}
              clicked={clicked}
            />
            <Pit
              playerId={2}
              value={board.L}
              label="L"
              player={player}
              socket={socket}
              gameOver={gameOver}
              clicked={clicked}
            />
          </div>
        </div>

        <div className={`${classes.deck} ${classes.human}`}>
          <p>{board["M1"]}</p>
        </div>
      </div>
      <p className={classes.stats} align-text="center">
        Current Player : {player === 1 ? "You" : "Computer"}
      </p>
      <p className={classes.stats}>
        {move ? "computer played pit : " + move : ""}
      </p>
      <p className={classes.stats}>{gameOver ? "Game Over" : ""}</p>

      <p className={classes.stats}>
        {gameOver
          ? `winner is ${
              winner === 1 ? "You " : winner === 2 ? "Computer" : "Draw"
            }`
          : ""}
      </p>
    </div>
  );
}
