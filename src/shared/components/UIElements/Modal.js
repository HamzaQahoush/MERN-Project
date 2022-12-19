import React from "react";
import Backdrop from "./Backdrop";
import ReactDOM  from "react-dom";
import { CSSTransition } from "react-transition-group";
import './Modal.css'
function ModalOverlay(props) {
  let content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
        <form
          onSubmit={props.onSubmit ? props.onSubmit : (e) => e.preventDefault()}
        >
          <div
            className={`modal__content ${props.contentClass}`}
            style={props.style}
          >
            {props.children}
          </div>

          <footer  className={`modal__footer ${props.footerClass}`}> </footer>
        </form>
      </header>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
}




function Modal(props) {
  return (
    <>
      {props.show && <Backdrop  onClick={props.onCancel} />} 

      <CSSTransition in={props.show} mountOnEnter unmountOnExit timeout={200} classNames="modals" >
        <ModalOverlay {...props}/>
      </CSSTransition>

    </>
  )
}

export default Modal