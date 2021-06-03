import React,{Component} from 'react';
import { Switch,Route,Link } from "react-router-dom";
import axios from "axios";

import ToDoList from './ToDoList/Index';
import ToDoListCreate from './ToDoList/Create';
import ToDoListEdit from './ToDoList/Edit';

import BusScheduleList from './BusSchedule/Index';
import BusScheduleCreate from './BusSchedule/Create';
import BusScheduleEdit from './BusSchedule/Edit';

import DecideMovieTime from './DecideMovieTime/Index';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            movie_time : false
        }

        this.logout = this.logout.bind(this)
    };

    componentDidMount() {
        this.checkMovieTime();
    }

    checkMovieTime() {
        axios.get('/movie-time/check').then((response) => {
            if(response.data.status === 200){
                this.setState({movie_time: true});
            }
        }).catch(function(error) {
            console.log(error);
        });
    }

    logout(){
        $("#logout").click();
    }

    render(){
        let movie_time_menu = "";
        if(this.state.movie_time) {
            movie_time_menu = <li className="nav-item active">
                                    <Link className="nav-link" to="/movie-time">Decide Movie Time</Link>
                                </li>;
        } else {
            movie_time_menu = <li className="nav-item">
                                    <a className="nav-link">Decide Movie Time</a>
                                </li>;
        }

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
                                {movie_time_menu}
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

                        {/* Bus Schedule Routes */}
                        <Route exact path="/bus-schedule">
                            <BusScheduleList />
                        </Route>
                        <Route path="/bus-schedule/create">
                            <BusScheduleCreate />
                        </Route>
                        <Route path="/bus-schedule/:id/edit" render={props => <BusScheduleEdit id=":id" {...props} />}>
                        </Route>

                        <Route path="/movie-time">
                            <DecideMovieTime />
                        </Route>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Header;