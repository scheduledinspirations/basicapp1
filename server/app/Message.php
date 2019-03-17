<?php

namespace App;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    //
    protected $table = 'message';
    protected $fillable = ['name','phone','user_id','message','date', 'time','notificationTime'];

    public function scopeMessageDue($query)
    {
        $now = Carbon::now('Asia/Kolkata');
        $inTenMinutes = Carbon::now('Asia/Kolkata')->addMinutes(10);
       //error_log($now);
        return $query->where('notificationTime', '>=', $now)->where('notificationTime', '<=', $inTenMinutes);
    }
}
