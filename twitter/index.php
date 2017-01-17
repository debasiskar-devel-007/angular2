<?php
/**
 * Created by PhpStorm.
 * User: KTA-PC 21
 * Date: 4/14/15
 * Time: 2:24 PM
 */

$x=require_once ('src/codebird.php');
\Codebird\Codebird::setConsumerKey('wnOwM1XgpSN7sLL5v77dJTT0M', '9E2Nn6zMwNryUqS0UCiYAmhQzL5s1c8AIYu1YzHi0Nh585OHli'); // static, see 'Using multiple Codebird instances'

$cb = \Codebird\Codebird::getInstance();
//var_dump($cb);
//var_dump($x);

session_start();
if(isset($_GET['username'])){
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
}

// assign access token on each page load
$cb->setToken($_SESSION['oauth_token'], $_SESSION['oauth_token_secret']);
 /*echo "89"."<br/>";
 echo $_SESSION['oauth_token']."<br>";
 echo $_SESSION['oauth_token_secret'];*/
//echo $_SESSION['username'];

$reply = $cb->statuses_update('status=Whohoo, I just tweeted!');
$accountdetails  = $cb->account_verifyCredentials();
//$accountdetails  = $cb->followers_list();
//$accountdetails  = $cb->users_show(array(
    //'screen_name'=>'BetoCParedes'));
//var_dump($accountdetails);
//var_dump($accountdetails->screen_name);

//$url = 'http://influxiq.com:8003/updatedealertwitterinfo';
$url='http://influxiq.com:8003/updatedealertwitterinfo?username='.$_SESSION['username'].'&twitter_auth_token='.$_SESSION['oauth_token'].'&twitter_auth_token_secret='.$_SESSION['oauth_token_secret'];
$attachment = array(
    'twitter_auth_token'=>$_SESSION['oauth_token'],
    'twitter_auth_token_secret'=>$_SESSION['oauth_token_secret'],
    'username'=>$_SESSION['username']
);
//print_r($attachment);
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL,$url);
//curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
//curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $attachment);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);  //to suppress the curl output
$result = curl_exec($ch);

curl_close ($ch);
$returnurl='http://'.$_SESSION['username'].'.probidauto.com/#/managesocialaccounts(dealerheader:dealerheader//dealerfooter:dealerfooter)';


//parse_str($result, $get_array);
header('Location: '.$returnurl);

?>
