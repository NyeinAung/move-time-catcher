import React,{Component} from 'react';
import { Redirect } from 'react-router';

class ToDoListCreate extends Component{
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            alarm_hour: "hr",
            alarm_mins: "mi",

            time_to_teeth_hour: "hr",
            time_to_teeth_mins: "mi",

            breakfast_time_hour: "hr",
            breakfast_time_mins: "mi",

            errors: {},
            fireRedirect: false
        };
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    handleValidation(){
        let errors = {};
        let formIsValid = true;

        //alarm hour
        if(this.state.alarm_hour == "hr"){
           errors["alarm_hour"] = "required!";
           formIsValid = false;
        }     
        
        if(this.state.alarm_mins == "mi") {
            errors["alarm_mins"] = "required!";
            formIsValid = false;
        }

        //time to teeth hour
        if(this.state.time_to_teeth_hour == "hr"){
            errors["time_to_teeth_hour"] = "required!";
            formIsValid = false;
        }     

        if(this.state.time_to_teeth_mins == "mi") {
            errors["time_to_teeth_mins"] = "required!";
            formIsValid = false;
        }

        //breakfast time hour
        if(this.state.breakfast_time_hour == "hr"){
            errors["breakfast_time_hour"] = "required!";
            formIsValid = false;
        }     
        
        if(this.state.breakfast_time_mins == "mi") {
            errors["breakfast_time_mins"] = "required!";
            formIsValid = false;
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    handleSubmit(e) {
        e.preventDefault();

        if(this.handleValidation()){
            const ToDoListData = this.state;
            axios.post('/todo-lists/store', ToDoListData).then((response) => {
                if(response.data.status === 200){
                    this.setState({ fireRedirect: true });
                }else{
                    // console.log(response);
                }
            }).catch(function (error) {
                // console.log(error);
            });
        }
    }

    render(){
        if(this.state.fireRedirect) {
            return <Redirect to={'/todo-lists'}/>
        }

        const hours = [];
        const mins = [];
        for (let i=0; i < 24; i++) { hours.push(i<10?"0"+i:i); }
        for (let i=0; i < 60; i++) { mins.push(i<10?"0"+i:i); }

        hours.unshift("hr");
        mins.unshift("mi");

        return(
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <div className="card-header">Save Time Schedule</div>

                        <div className="card-body">
                            <div className="row block-12">
                                <div className="col-lg-12 d-flex">
                                    <form onSubmit={this.handleSubmit} className="col-md-12">
                                        <div className="form-group row">
                                            <label className="col-sm-5 col-form-label">Set Alarm Time <span className="text-danger">*</span></label>
                                            <div className="col-sm-7">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="pr-3 float-left">
                                                            <select className="form-control" name="alarm_hour" onChange={this.onChange}>
                                                                {hours.map(hour => (
                                                                    <option key={hour} value={hour}>
                                                                        {hour}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <span className="text-danger">{this.state.errors["alarm_hour"]}</span>
                                                        </div>

                                                        <div className="pr-3 float-left">
                                                            <select className="form-control" name="alarm_mins" onChange={this.onChange}>
                                                                {mins.map(min => (
                                                                    <option key={min} value={min}>
                                                                        {min}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <span className="text-danger">{this.state.errors["alarm_mins"]}</span>
                                                        </div>
                                                        
                                                        <div className="pt-2 float-left">
                                                            <span>(*24 hour Format)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-sm-5 col-form-label">Time taken to brush teeth and take a bath <span className="text-danger">*</span></label>
                                            <div className="col-sm-7">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="pr-3 float-left">
                                                            <select className="form-control" name="time_to_teeth_hour" onChange={this.onChange}>
                                                                {hours.map(hour => (
                                                                    <option key={hour} value={hour}>
                                                                        {hour}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <span className="text-danger">{this.state.errors["time_to_teeth_hour"]}</span>
                                                        </div>

                                                        <div className="pr-3 float-left">
                                                            <select className="form-control" name="time_to_teeth_mins" onChange={this.onChange}>
                                                                {mins.map(min => (
                                                                    <option key={min} value={min}>
                                                                        {min}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <span className="text-danger">{this.state.errors["time_to_teeth_mins"]}</span>
                                                        </div>
                                                        
                                                        <div className="float-left">
                                                            <span>(*24 hour Format)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="form-group row">
                                            <label className="col-sm-5 col-form-label">Time taken for breakfast <span className="text-danger">*</span></label>
                                            <div className="col-sm-7">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="pr-3 float-left">
                                                            <select className="form-control" name="breakfast_time_hour" onChange={this.onChange}>
                                                                {hours.map(hour => (
                                                                    <option key={hour} value={hour}>
                                                                        {hour}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <span className="text-danger">{this.state.errors["breakfast_time_hour"]}</span>
                                                        </div>

                                                        <div className="pr-3 float-left">
                                                            <select className="form-control" name="breakfast_time_mins" onChange={this.onChange}>
                                                                {mins.map(min => (
                                                                    <option key={min} value={min}>
                                                                        {min}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <span className="text-danger">{this.state.errors["breakfast_time_mins"]}</span>
                                                        </div>
                                                        
                                                        <div className="float-left">
                                                            <span>(*24 hour Format)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group float-right">
                                            <a href="/todo-lists" className="btn btn-danger">Cancel</a>
                                            <button type="submit" className="btn btn-primary ml-2">Save</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ToDoListCreate;