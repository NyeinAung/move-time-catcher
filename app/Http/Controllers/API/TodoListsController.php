<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TodoLists;

class TodoListsController extends Controller
{
    public function index() {
        try{
            $data = TodoLists::all();
            return success($data);

        } catch (\Exception $e){
            return fail($e->getMessage());
        }
    }

    public function detail($id) {
        try{
            $data = TodoLists::find($id);
            $data->alarm = explode(":", $data->alarm);
            $data->time_to_teeth = explode(":", $data->time_to_teeth);
            $data->breakfast_time = explode(":", $data->breakfast_time);

            return success($data);

        } catch (\Exception $e){
            return fail($e->getMessage());
        }
    }

    public function store(Request $request) {
        try{
            if(TodoLists::count() > 0) {
                return fail("Already Exists!");
            }

            $data = [
                'alarm' => $request->alarm_hour.":".$request->alarm_mins,
                'time_to_teeth' => $request->time_to_teeth_hour.":".$request->time_to_teeth_mins,
                'breakfast_time' => $request->breakfast_time_hour.":".$request->breakfast_time_mins,
            ];

            $data = TodoLists::create($data);
            return success(true);

        } catch (\Exception $e){
            return fail($e->getMessage());
        }
    }

    public function update($id, Request $request) {
        try{
            $data = TodoLists::find($id);
            $data->alarm = $request->alarm_hour.":".$request->alarm_mins;
            $data->time_to_teeth = $request->time_to_teeth_hour.":".$request->time_to_teeth_mins;
            $data->breakfast_time = $request->breakfast_time_hour.":".$request->breakfast_time_mins;
            $data->save();

            return success(true);

        } catch (\Exception $e){
            return fail($e->getMessage());
        }
    }

    public function delete($id) {
        try{
            $data = TodoLists::find($id)->delete();
            return success(true);

        } catch (\Exception $e){
            return fail($e->getMessage());
        }
    }
}