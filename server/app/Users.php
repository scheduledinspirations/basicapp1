<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Auth\Authenticatable as AuthenticableTrait;

class Users extends Model implements Authenticatable
{
    //
    use AuthenticableTrait;
    protected $fillable = ['first_name','last_name','email','password','userimage','phone'];

    protected $hidden = [
    'password','api_key'
    ];

    /*
    * Get Todo of User
    *
    */
    public function message()
    {
        return $this->hasMany('App\Message','user_id');
    }
}
