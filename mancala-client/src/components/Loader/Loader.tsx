import React from "react";
import Logo from "../../assets/logo.svg";

export default function Loader() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        zIndex: 5000,
      }}
    >
      <img
        alt="KimberLite Page is Loading..."
        src={Logo}
        style={{
          width: "300px",
          height: "auto",
        }}
      />
      <p
        style={{
          marginTop: "2em",
          fontSize: "2em",
          textAlign: "center",
        }}
      >
        Connecting ...
      </p>
    </div>
  );
}
