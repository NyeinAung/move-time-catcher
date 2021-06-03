import React from 'react';
import { Link } from "react-router-dom";

const BusScheduleList = (props) => {
    return (
        <tr>
            <td>{props.bus_time}</td>
            <td>
                <Link className="btn btn-primary" to={`/bus-schedule/${props.id}/edit`}>
                    <span className="ion-ios-create"/> Edit </Link>&nbsp;
                <a href="#" className="btn btn-danger" onClick={props.delete}><span
                            className="ion-ios-remove-circle-outline"/> Delete</a>
            </td>
        </tr>
    );
};

export default BusScheduleList;