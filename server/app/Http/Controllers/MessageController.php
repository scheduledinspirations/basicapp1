<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Message;
use Auth;
use Carbon\Carbon;

class MessageController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {    
        $message = Auth::user()->message()->get();
        return response()->json(['status' => 'success','result' => $message]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
        'name' => 'required',
        'phone' => 'required',
        'message' => 'required',
        'date' => 'required',
        'time' => 'required',

          ]);
        $data=$request->all();
        
        $data['notificationTime'] =Carbon::parse($request->input('date'))->createFromTimeString($request->input('time'))->toDateTimeString();
        
        if(Auth::user()->message()->Create($data)){
            return response()->json(['status' => 'success']);
        }else{
            return response()->json(['status' => 'fail']);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $message = Message::where('id', $id)->get();
        return response()->json($message);
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $message = Message::where('id', $id)->get();
        return view('todo.edittodo',['todos' => $message]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
        'phone' => 'filled', 
        'name' => 'filled',
        'message' => 'filled',
        'date' => 'filled',
        'time' => 'filled'
         ]);
        $message = Message::find($id);
          $data=$request->all();
        
        $data['notificationTime'] =Carbon::parse($request->input('date'))->createFromTimeString($request->input('time'))->toDateTimeString();
        if($message->fill($data)->save()){
           return response()->json(['status' => 'success']);
        }
        return response()->json(['status' => 'failed']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if(Message::destroy($id)){
             return response()->json(['status' => 'success']);
        }
    }
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function archive(Request $request)
    {    
        $message = Auth::user()->message()->get();
        return response()->json(['status' => 'success','result' => $message]);
    }

}
