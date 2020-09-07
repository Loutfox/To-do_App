import React, { useState } from "react";
import styles from "./main.module.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function Main(props) {
  const [itemName, setItemName] = useState("");

  const myChangeHandler = (e) => {
    setItemName(e.target.value);
  };
  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.title}>To-do App</h3>
        <div className={styles.todolist}>
          <div className={styles.todolistForm}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                props.addItem({ name: itemName });
                setItemName("");
              }}
            >
              <p className={styles.itemError}>{props.itemError}</p>
              <input
                type="text"
                name="itemName"
                onChange={myChangeHandler}
                placeholder="Add a new item"
                value={itemName}
              />
              <button type="submit">Add</button>
            </form>
          </div>
          <div className={styles.todolistItems}>
            <ul>
              <TransitionGroup>
                {props.items.map((item) => (
                  <CSSTransition key={item._id} timeout={500} classNames="item">
                    <li>
                      {item.name}
                      <i
                        className="fa fa-trash"
                        onClick={(e) => props.deleteItem(item._id)}
                        aria-hidden="true"
                      ></i>
                    </li>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
