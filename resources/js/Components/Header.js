import React,{Component} from 'react';
import { Switch,Route,Link } from "react-router-dom";
import axios from "axios";

import ToDoList from './ToDoList/Index';
import ToDoListCreate from './ToDoList/Create';
import ToDoListEdit from './ToDoList/Edit';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

class Header extends Component{
    constructor(props){
        super(props);

        this.logout = this.logout.bind(this)
    };

    logout(){
        $("#logout").click();
    }

    render(){
        return(
            <div className="HeaderSection">
                <nav className="navbar navbar-expand-lg navbar-dark bg-secondary mb-5">
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                            Movie Time Catcher
                        </Link>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/todo-lists">Time Schedule</Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/bus-schedule">Bus Schedule</Link>
                                </li>
                                <li className="nav-item active">
                                    <a className="nav-link" href="#" onClick={this.logout}>Log Out</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="container">
                    <Switch>
                        {/* ToDo Lists Routes */}
                        <Route exact path="/todo-lists">
                            <ToDoList />
                        </Route>
                        <Route path="/todo-lists/create">
                            <ToDoListCreate />
                        </Route>
                        <Route path="/todo-lists/:id/edit" render={props => <ToDoListEdit id=":id" {...props} />}>
                        </Route>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Header;