import React from 'react';
import { Link } from "react-router-dom";

const ToDoList = (props) => {
    return (
        <tr>
            <td>{props.alarm}</td>
            <td>{props.time_to_teeth}</td>
            <td>{props.breakfast_time}</td>
            <td>
                <Link className="btn btn-primary" to={`/todo-lists/${props.id}/edit`}>
                    <span className="ion-ios-create"/> Edit </Link>&nbsp;
                <a href="#" className="btn btn-danger" onClick={props.delete}><span
                            className="ion-ios-remove-circle-outline"/> Delete</a>
            </td>
        </tr>
    );
};

export default ToDoList;