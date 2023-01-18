import React from "react";
import classes from "./style.module.css";

enum Player {
  Human = 1,
  Computer = 2,
}

type Props = {
  playerId: Player;
  player: Player;
  value: number;
  label: string;
  socket?: any;
  gameOver: boolean;
  clicked: (value: number, label: string, playerId: number) => any;
};

export default function Pit({
  playerId,
  label,
  value,
  socket,
  player,
  gameOver,
  clicked,
}: Props) {
  return (
    <div
      className={`${classes.pitWrapper} ${
        player !== playerId ? classes.pitDisabled : ""
      }`}
      onClick={() => {
        if (player === playerId) clicked(value, label, playerId);
      }}
    >
      <div
        className={`${classes.pits} ${
          playerId === 1 ? classes.human : classes.computer
        }`}
      >
        {value}
      </div>
      <p
        className={`${classes.label} ${
          playerId === 1 ? classes.humanLabel : classes.computerLabel
        }`}
      >
        {label}
      </p>
    </div>
  );
}
