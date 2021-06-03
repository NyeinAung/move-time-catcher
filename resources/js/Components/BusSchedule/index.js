import React,{Component} from 'react';
import { Link } from "react-router-dom";
import BusScheduleList from './List';

class BusScheduleListIndex extends Component{
    constructor(props){
        super(props);
        this.state = {
            bus_schedule_list: [],
            dataLoaded: false,
            error: false,
            Data: false
        };
    };

    componentDidMount() {
        axios.get('/bus-schedule').then((response) => {
            if(response.data.data.length === 0){
                this.setState({ bus_schedule_list: [], dataLoaded: true ,error : false,Data : false});
            }else{
                this.setState({ bus_schedule_list: response.data.data, dataLoaded: true , error : false, Data : true});
            }
        }).catch(function(error) {
            console.log(error);
        });
    };

    deleteBusScheduleHandler(key,id){
        axios.post('/bus-schedule/delete/'+id).then((response) => {
          if(response.data.status === 200){
              const bus_schedule_list = this.state.bus_schedule_list;
              bus_schedule_list.splice(key, 1);
              if(bus_schedule_list.length === 0){
                  this.setState({ bus_schedule_list: [], dataLoaded: true ,error : false,Data : false});
              }else{
                  this.setState({ bus_schedule_list: bus_schedule_list, dataLoaded: true ,error : false,Data : true});
              }
          }
        }).catch(function(error) {
            console.log(error);
        });
    }

    render(){
        let BusScheduleListData=null;
        if(this.state.dataLoaded){
            if(this.state.Data){
                BusScheduleListData = this.state.bus_schedule_list.map((bus_schedule,key) =>
                    <BusScheduleList
                        key={key}
                        delete={() => this.deleteBusScheduleHandler(key,bus_schedule.id)}
                        number={key+1}
                        bus_time={bus_schedule.bus_time}
                        date={bus_schedule.created_at}
                        id={bus_schedule.id}
                    />
                );
            }
            else{
                BusScheduleListData = <tr><td colSpan="4">No Results!</td></tr>;
            }
        }else{
            BusScheduleListData = <tr><td colSpan="4">Loading ...</td></tr>;
        }

        let addList;
        if(this.state.bus_schedule_list.length==0) {
            addList = <Link className="btn btn-secondary" to={`/bus-schedule/create`}>
                    <span className="ion-ios-add-circle"/> Add Bus Schedule</Link>
        }

        return(
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="row d-flex pt-2 pb-2">
                        <div className="col-xl-12 py-12 px-md-12">
                            <h3 className="pb-3">Bus Schedule</h3>
                            {addList}
                        </div>
                    </div>
                    <div className="row d-flex">
                        <div className="col-xl-12 py-12 px-md-12">
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Bus Time</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {BusScheduleListData}
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

export default BusScheduleListIndex;