<?php
/**
 * Created by PhpStorm.
 * User: matheus
 * Date: 17/03/18
 * Time: 23:40
 */

use JonathanTorres\MediumSdk\Medium;

$credentials = [
    'client-id' => 'd8a9b622b20a',
    'client-secret' => '8c88994f31f170ec2388613bc59ffc45cfbac98f',
    'redirect-url' => 'http://elementarybr.org/callback/medium',
    'state' => 'elementaryBR',
    'scopes' => 'basicProfile,publishPost,listPublications',
];

$medium = new Medium($credentials);

echo $medium->getAuthenticationUrl();