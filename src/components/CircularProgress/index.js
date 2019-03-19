import React, { Component } from "react";

class CircularProgress extends Component {
  render() {
    return (
      <div className="fa-3x text-center">
        <i
          className="fas fa-circle-notch fa-spin"
          style={{ color: "var(--theme-color2)" }}
        />
      </div>
    );
  }
}

export default CircularProgress;
