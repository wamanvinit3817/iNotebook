import React from "react";

const Alert = (props) => {
  const message = props.message;
  const color = props.color;
  return (
    <div className="container" style={{marginTop:"1rem"}}>
      <div className={`alert alert-${color} alert-dismissible fade show`} role="alert" style={{width:"25rem",marginLeft:"24rem"}}>
        <strong>{message}</strong> 
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
};

export default Alert;
