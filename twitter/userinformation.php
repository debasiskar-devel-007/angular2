<?php
/**
 * Created by PhpStorm.
 * User: KTA-PC 21
 * Date: 4/14/15
 * Time: 2:24 PM
 */
header('Content-Type: text/html; charset=utf-8');
// header('Access-Control-Allow-Origin: http://*.torqkd.com');  //I have also tried the * wildcard and get the same response
header('Access-Control-Allow-Origin: *');  //I have also tried the * wildcard and get the same response
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');


$x=require_once ('src/codebird.php');
\Codebird\Codebird::setConsumerKey('wnOwM1XgpSN7sLL5v77dJTT0M', '9E2Nn6zMwNryUqS0UCiYAmhQzL5s1c8AIYu1YzHi0Nh585OHli'); // static, see 'Using multiple Codebird instances'

$cb = \Codebird\Codebird::getInstance();
//var_dump($cb);
//var_dump($x);

//session_start();
/*if(isset($_GET['username'])){
    $_SESSION['username']=$_GET['username'];
}

if (! isset($_SESSION['oauth_token'])) {
    // get the request token
    $reply = $cb->oauth_requestToken(array(
        'oauth_callback' => 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']
    ));

    // store the token
    $cb->setToken($reply->oauth_token, $reply->oauth_token_secret);
    $_SESSION['oauth_token'] = $reply->oauth_token;
    $_SESSION['oauth_token_secret'] = $reply->oauth_token_secret;
    $_SESSION['oauth_verify'] = true;

    // redirect to auth website
    $auth_url = $cb->oauth_authorize();
    header('Location: ' . $auth_url);
    die();

} elseif (isset($_GET['oauth_verifier']) && isset($_SESSION['oauth_verify'])) {
    // verify the token
    $cb->setToken($_SESSION['oauth_token'], $_SESSION['oauth_token_secret']);
    unset($_SESSION['oauth_verify']);

    // get the access token
    $reply = $cb->oauth_accessToken(array(
        'oauth_verifier' => $_GET['oauth_verifier']
    ));

    // store the token (which is different from the request token!)
    $_SESSION['oauth_token'] = $reply->oauth_token;
    $_SESSION['oauth_token_secret'] = $reply->oauth_token_secret;
   // echo $username;
    //echo $_SESSION['username'];
    // send to same URL, without oauth GET parameters
    header('Location: ' . basename(__FILE__));
    die();
}*/

if(isset($_GET['twitter_auth_token'])){
    $twitter_auth_token=  $_GET['twitter_auth_token'];
}
if(isset($_GET['twitter_auth_token_secret'])){
    $twitter_auth_token_secret=  $_GET['twitter_auth_token_secret'];
}

// assign access token on each page load
$cb->setToken($twitter_auth_token, $twitter_auth_token_secret);
//$cb->setToken($_SESSION['oauth_token'], $_SESSION['oauth_token_secret']);

 $_SESSION['oauth_token']."<br>";
 $_SESSION['oauth_token_secret'];
//echo $_SESSION['username'];

//$reply = $cb->statuses_update('status=Whohoo, I just tweeted!');
$accountdetails  = $cb->account_verifyCredentials();
$accountdetails  = $cb->users_show(array('screen_name'=>$accountdetails->screen_name));
//$accountdetails  = $cb->followers_list();
//$accountdetails  = $cb->users_show(array(
    //'screen_name'=>'BetoCParedes'));
//var_dump($accountdetails);
//var_dump($accountdetails->screen_name);

//$url = 'http://influxiq.com:8003/updatedealertwitterinfo';
//var_dump($accountdetails);
//echo "<br>";
//echo "<br>";
//echo "<br>";
 $val=array('screen_name'=>$accountdetails->screen_name,'profile_image_url_https'=>str_replace('_normal','',$accountdetails->profile_image_url_https),'description'=>$accountdetails->description,'location'=>$accountdetails->location);
echo json_encode($val);
/*var_dump($accountdetails->screen_name);
var_dump($accountdetails->profile_image_url_https);
var_dump($accountdetails->description);
var_dump($accountdetails->location);*/

?>
