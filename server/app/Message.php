<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    //
    protected $table = 'message';
    protected $fillable = ['name','phone','user_id','message','date', 'time'];
}
