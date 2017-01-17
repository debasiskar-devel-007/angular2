<?php
/**
 * Created by PhpStorm.
 * User: samsuj
 * Date: 17/1/17
 * Time: 12:36 PM
 */

require_once 'src/twitteroauth.php';
if(isset($_GET['twitter_auth_token'])){
  $twitter_auth_token=  $_GET['twitter_auth_token'];
}
if(isset($_GET['twitter_auth_token_secret'])){
  $twitter_auth_token_secret=  $_GET['twitter_auth_token_secret'];
}

$CONSUMER_KEY = "wnOwM1XgpSN7sLL5v77dJTT0M";
$CONSUMER_SECRET = "9E2Nn6zMwNryUqS0UCiYAmhQzL5s1c8AIYu1YzHi0Nh585OHli";
//$OAUTH_TOKEN = $twitter_auth_token;
$OAUTH_TOKEN = '171482089-F5VXDtbe53RfMMUiBUMiV7ksiZTkzMkiSfrWacSo';
//$OAUTH_SECRET = $twitter_auth_token_secret;
$OAUTH_SECRET = '4ZbtmC0wQU383XRmlJQcivGzyCdI3WXas49cy02vGuT6L';
echo $OAUTH_TOKEN.'<br/>';
echo $OAUTH_SECRET;

$connection = new TwitterOAuth($CONSUMER_KEY, $CONSUMER_SECRET, $OAUTH_TOKEN, $OAUTH_SECRET);

$content = $connection->get('account/verify_credentials');
var_dump($content);