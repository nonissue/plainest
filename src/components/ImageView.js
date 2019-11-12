import React from "react";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function ImageView({ src }) {
  let query = useQuery();

  return (
    <div className="image-view">
      <img src={query.get("src")} className="image-view" alt="instagram" />
    </div>
  );
}

export default ImageView;
