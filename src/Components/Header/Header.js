import React, { useEffect, useRef } from "react";

import "./Header.css";

function Header(props) {
  const resultRef = useRef();
  const expressionRef = useRef();

  useEffect(() => {
    resultRef.current.scrollIntoView();
  }, [props.history]);

  useEffect(() => {
    expressionRef.current.scrollLeft = expressionRef.current.scrollWidth;
  }, [props.expression]);

  return (
    <div className="header custom-scroll">
      <div className="header_history">
        {props.history &&
          props.history?.map((item, index) => {
            return <p key={item + "" + Math.random() * 50}>{item}</p>;
          })}
      </div>
      <div className="header_expression custom-scroll" ref={expressionRef}>
        <p>{props.expression}</p>
      </div>
      <p className="header_result custom-scroll" ref={resultRef}>
        {props.result}
      </p>
    </div>
  );
}

export default Header;
