<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Users;
use Auth;

class UsersController extends Controller
{
   public function __construct() 
    {
      //  $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function authenticate(Request $request)
    { 
      
        $this->validate($request, [
        'email' => 'required',
        'password' => 'required'
         ]);
       
       $user = Users::where('email', $request->input('email'))->first();
       if($user){

       
      if(Hash::check($request->input('password'), $user->password)){
           $apikey = base64_encode(str_random(40));
           Users::where('email', $request->input('email'))->update(['api_key' => "$apikey"]);;
           return response()->json(['status' => 'success','api_key' => $apikey]);
       }else{
           return response()->json(['status' => 'fail'],401);
       }
     }else{
      return response()->json(['status' => 'fail'],401);
     }
    }
    public function details(Request $request)
    { 
      $user = $request->user()->toArray();
      if(empty($user['id'])){
        return response()->json(['status' => 'fail'],401);
      }
      
      return response()->json(['status' => 'success','user' => $user]);

       
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
        //'phone' => 'filled', 
        'first_name' => 'filled',
        'last_name' => 'filled',
        'email' => 'filled',
        ]);
        $rec = Users::find($id);
        if($rec->fill($request->all())->save()){
           return response()->json(['status' => 'success']);
        }
        return response()->json(['status' => 'failed']);
    }
}    
?>