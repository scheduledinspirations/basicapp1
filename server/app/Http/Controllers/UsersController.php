<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Users;
use Auth;
use App\VerifyEmail;
use App\Mail\RegisterConfirmation;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;

class UsersController extends Controller
{
   public function __construct() 
    {
      //  $this->middleware('auth:api');
    }
    public function test(Request $request)
    { 
$now = Carbon::now('Asia/Kolkata');
        $inTenMinutes =  Carbon::now('Asia/Kolkata')->addMinutes(30);
        echo( $now );
       echo( "<br>$inTenMinutes" );

       $this->appointments = \App\Message::where('notificationTime', '>=', $now)
               ->where('notificationTime', '<=', $inTenMinutes)               
               ->get();
print_r($this->appointments);
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
        return response()->json(['status' => 'failed'],401);
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
        'email' => 'required',
        'first_name' => 'required',
        'last_name' => 'required',
        'password' => 'required',
        
         ]);
     
         $request['password'] = Hash::make($request->input('password'));
          $user =Users::create($request->all());
        if($user){
           $verifyUser = VerifyEmail::create([
            'user_id' => $user->id,
            'token' => str_random(40)
        ]);
        $user = Users::where('id', $user->id)->first();
         Mail::to($user->email)->send(new RegisterConfirmation($user));
            return response()->json(['status' => 'success', 'user_id' => "$user->id"]);
        }else{
            return response()->json(['status' => 'fail'],401);
        }

    }
    
    public function verifyUser($token)
    {
        $verifyUser = VerifyEmail::where('token', $token)->first();
        if(isset($verifyUser) ){
            $user = $verifyUser->user;
            if(!$user->verified) {
                $verifyUser->user->email_verified = 1;
                $verifyUser->user->save();
                $msg = "Your e-mail is verified. You can now login.";
            }else{
                $msg = "Your e-mail is already verified. You can now login.";
            }
             return response()->json(['status' => 'success', 'msg' => $msg]);
        }else{
          $msg ="Sorry your email cannot be identified.";
             return response()->json(['status' => 'failed', 'msg' => $msg],401);
          
        }

        
    }
}    
?>