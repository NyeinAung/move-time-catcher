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

            return success("You can catch the time at 10:00 PM");

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
}