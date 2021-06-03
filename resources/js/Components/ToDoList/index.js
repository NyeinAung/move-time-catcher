import React,{Component} from 'react';
import { Link } from "react-router-dom";
import ToDoList from './List';

class ToDoListIndex extends Component{
    constructor(props){
        super(props);
        this.state = {
            todolists: [],
            dataLoaded: false,
            error: false,
            Data: false
        };
    };

    componentDidMount() {
        axios.get('/todo-lists').then((response) => {
            if(response.data.data.length === 0){
                this.setState({ todolists: [], dataLoaded: true ,error : false,Data : false});
            }else{
                this.setState({ todolists: response.data.data, dataLoaded: true , error : false, Data : true});
            }
        }).catch(function(error) {
            console.log(error);
        });
    };

    deleteToDoListHandler(key,id){
        axios.post('/todo-lists/delete/'+id).then((response) => {
          if(response.data.status === 200){
              const todolists = this.state.todolists;
              todolists.splice(key, 1);
              if(todolists.length === 0){
                  this.setState({ todolists: [], dataLoaded: true ,error : false,Data : false});
              }else{
                  this.setState({ todolists: todolists, dataLoaded: true ,error : false,Data : true});
              }
          }
        }).catch(function(error) {
            console.log(error);
        });
    }

    render(){
        let ToDoListData=null;
        if(this.state.dataLoaded){
            if(this.state.Data){
                ToDoListData = this.state.todolists.map((todolist,key) =>
                    <ToDoList
                        key={key}
                        delete={() => this.deleteToDoListHandler(key,todolist.id)}
                        number={key+1}
                        alarm={todolist.alarm}
                        time_to_teeth={todolist.time_to_teeth}
                        breakfast_time={todolist.breakfast_time}
                        date={todolist.created_at}
                        id={todolist.id}
                    />
                );
            }
            else{
                ToDoListData = <tr><td colSpan="4">No Results!</td></tr>;
            }
        }else{
            ToDoListData = <tr><td colSpan="4">Loading ...</td></tr>;
        }

        let addList;
        if(this.state.todolists.length==0) {
            addList = <Link className="btn btn-secondary" to={`/todo-lists/create`}>
                    <span className="ion-ios-add-circle"/> Add Time Schedule</Link>
        }

        return(
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="row d-flex pt-2 pb-2">
                        <div className="col-xl-12 py-12 px-md-12">
                            <h3 className="pb-3">Time Schedule Lists</h3>
                            {addList}
                        </div>
                    </div>
                    <div className="row d-flex">
                        <div className="col-xl-12 py-12 px-md-12">
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Alarm</th>
                                            <th>Time to Teeth</th>
                                            <th>Breakfast Time</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ToDoListData}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default ToDoListIndex;