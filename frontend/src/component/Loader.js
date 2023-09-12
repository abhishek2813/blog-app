import React from "react";

function Loader() {
  return (
    <div>
      <div className="d-flex justify-content-center">
        <div
          className="spinner-border"
          role="status"
          style={{ width: "5rem", height: "5rem" }}
        ></div>
      </div>
    </div>
  );
}

export default Loader;
