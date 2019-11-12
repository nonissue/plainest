import React from "react";
import { Link } from "react-router-dom";

export function Nav() {
  return (
    <div className="nav">
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/about">??</Link>
      </div>
    </div>
  );
}
