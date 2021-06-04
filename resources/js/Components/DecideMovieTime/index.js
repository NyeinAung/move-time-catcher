import React,{Component} from 'react';
import { Link } from "react-router-dom";

class DecideMovieTimeIndex extends Component{
    constructor(props){
        super(props);
        this.state = {
            movie_time: "",
            dataLoaded: false,
            error: false,
            Data: false
        };
    };

    componentWillMount() {
        axios.get('/movie-time').then((response) => {
            if(response.data.data.length === 0){
                this.setState({ movie_time: "", dataLoaded: true ,error : false,Data : false});
            }else{
                this.setState({ movie_time: response.data.data, dataLoaded: true , error : false, Data : true});
            }
        }).catch(function(error) {
            console.log(error);
        });
    };

    render(){
        let MovieTimeData=null;
        if(this.state.dataLoaded){
            if(this.state.Data){
                MovieTimeData = <h3>You can catch the time at {this.state.movie_time}</h3>
            }
            else {
                MovieTimeData = <h3>No Movie Time Available!</h3>;
            }

        } else{
            MovieTimeData = <h3>Loading ...</h3>;
        }

        return(
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Movie Time</div>

                        <div className="card-body">
                            <div className="row block-12">
                                <div className="col-lg-12 d-flex">
                                    {MovieTimeData}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default DecideMovieTimeIndex;