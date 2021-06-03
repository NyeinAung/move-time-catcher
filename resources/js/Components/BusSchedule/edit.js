import React,{Component} from 'react';
import { Redirect } from 'react-router';

class BusScheduleListEdit extends Component{
    constructor(props){
        super(props);
        let id = '';
        if(props.match.params.id){
            id = props.match.params.id;
        }
        
        this.state = {
            id: id,
            bus_time_hour: "hr",
            bus_time_mins: "mi",

            errors: {},
            fireRedirect: false
        };

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // lifecycle mehtod
    componentDidMount() {
        this.getDetail();
    }

    // get bus schedule detail
    getDetail() {
        axios.get('/bus-schedule/detail/'+this.state.id).then((response) => {
            if(response.data.status === 200){
                if(response.data.data) {
                    this.setState({bus_time_hour: response.data.data.bus_time[0], 
                                bus_time_mins: response.data.data.bus_time[1],
                                data: true});
                } else {
                    this.setState({ Data : false});
                }
            }
        }).catch(function(error) {
        });
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    handleValidation(){
        let errors = {};
        let formIsValid = true;

        //bus time hour
        if(this.state.bus_time_hour == "hr"){
           errors["bus_time_hour"] = "required!";
           formIsValid = false;
        }     
        
        if(this.state.bus_time_mins == "mi") {
            errors["bus_time_mins"] = "required!";
            formIsValid = false;
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    handleSubmit(e) {
        e.preventDefault();

        if(this.handleValidation()){
            const BusScheduleListData = this.state;
            axios.post(`/bus-schedule/update/${this.state.id}`, {
                bus_time_hour: this.state.bus_time_hour,
                bus_time_mins: this.state.bus_time_mins

            }).then((response) => {
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
            return <Redirect to={'/bus-schedule'}/>
        }

        const hours = [];
        const mins = [];
        for (let i=0; i < 24; i++) { hours.push(i<10?"0"+i:i); }
        for (let i=0; i < 60; i++) { mins.push(i<10?"0"+i:i); }

        hours.unshift("hr");
        mins.unshift("mi");

        return(
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Bus Schedule</div>

                        <div className="card-body">
                            <div className="row block-12">
                                <div className="col-lg-12 d-flex">
                                    <form onSubmit={this.handleSubmit} className="col-md-12">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Bus Time <span className="text-danger">*</span></label>
                                            <div className="col-sm-9">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="pr-2 float-left">
                                                            <select className="form-control" name="bus_time_hour" value={this.state.bus_time_hour} onChange={this.onChange}>
                                                                {hours.map(hour => (
                                                                    <option key={hour} value={hour}>
                                                                        {hour}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <span className="text-danger">{this.state.errors["bus_time_hour"]}</span>
                                                        </div>

                                                        <div className="pr-2 float-left">
                                                            <select className="form-control" name="bus_time_mins" value={this.state.bus_time_mins} onChange={this.onChange}>
                                                                {mins.map(min => (
                                                                    <option key={min} value={min}>
                                                                        {min}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <span className="text-danger">{this.state.errors["bus_time_mins"]}</span>
                                                        </div>
                                                        
                                                        <div className="pt-2 float-left">
                                                            <span>(*24 hour Format)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group float-right">
                                            <a href="/bus-schedule" className="btn btn-danger">Cancel</a>
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

export default BusScheduleListEdit;