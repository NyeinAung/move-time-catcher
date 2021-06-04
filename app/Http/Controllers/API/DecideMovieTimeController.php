<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TodoLists;
use App\Models\BusSchedule;

class DecideMovieTimeController extends Controller
{
    public function index() {
        try{
            $checkdata = $this->checkMovieTime();
            if($this->checkMovieTime()["status"] != 200) {
                return fail([]);
            }
            
            // calculate catchable movie time based on saved data.
            $bus_schedule = BusSchedule::first(); 

            $dateTime = date_create_from_format('H:i', $bus_schedule->bus_time);
            date_add($dateTime, date_interval_create_from_date_string('45 minutes'));
            $timetaken = date_format($dateTime, 'H:i');
            
            $movie_times = array("10:00", "12:30", "15:30", "18:30");
            $show_time = "";
            $time_match = false;
            foreach($movie_times as $key => $value) {
                if($timetaken <= $value) {
                    $show_time = date('h:i a', strtotime($value));
                    break;
                }
            }

            return success($show_time);

        } catch (\Exception $e){
            return fail($e->getMessage());
        }
    }

    public function checkMovieTime() {
        try{
            if(BusSchedule::count() > 0 && TodoLists::count() > 0) {
                return [
                    'status' => 200
                ];
            }

            return [
                'status' => 401
            ];

        } catch (\Exception $e){
            return fail($e->getMessage());
        }
    }

    function TimeToSec($time) {
        $sec = 0;
        foreach (array_reverse(explode(':', $time)) as $k => $v) $sec += pow(60, $k) * $v;
        return $sec;
    }
}