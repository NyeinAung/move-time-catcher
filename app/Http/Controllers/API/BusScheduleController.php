<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BusSchedule;

class BusScheduleController extends Controller
{
    public function index() {
        try{
            $data = BusSchedule::all();
            return success($data);

        } catch (\Exception $e){
            return fail($e->getMessage());
        }
    }

    public function detail($id) {
        try{
            $data = BusSchedule::find($id);
            $data->bus_time = explode(":", $data->bus_time);

            return success($data);

        } catch (\Exception $e){
            return fail($e->getMessage());
        }
    }

    public function store(Request $request) {
        try{
            if(BusSchedule::count() > 0) {
                return fail("Already Exists!");
            }

            $data = [
                'bus_time' => $request->bus_time_hour.":".$request->bus_time_mins
            ];

            $data = BusSchedule::create($data);
            return success(true);

        } catch (\Exception $e){
            return fail($e->getMessage());
        }
    }

    public function update($id, Request $request) {
        try{
            $data = BusSchedule::find($id);
            $data->bus_time = $request->bus_time_hour.":".$request->bus_time_mins;
            $data->save();

            return success(true);

        } catch (\Exception $e){
            return fail($e->getMessage());
        }
    }

    public function delete($id) {
        try{
            $data = BusSchedule::find($id)->delete();
            return success(true);

        } catch (\Exception $e){
            return fail($e->getMessage());
        }
    }
}