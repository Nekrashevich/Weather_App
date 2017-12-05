import React from 'react';

export default (props) => {
  return <button className={props.className} type={props.type} onClick={props.onClick}>
    {props.children}
  </button>
};  