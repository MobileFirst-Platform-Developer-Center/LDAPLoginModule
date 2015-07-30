       /**
* Copyright 2015 IBM Corp.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var LDAPRealmChallengeHandler = WL.Client.createChallengeHandler("LDAPRealm");

LDAPRealmChallengeHandler.isCustomResponse = function(response) {
    if (!response || !response.responseText) {
        return false;
    }
    
    var idx = response.responseText.indexOf("j_security_check");
    
    if (idx >= 0){ 
    	return true;
    }
    return false;

};

LDAPRealmChallengeHandler.handleChallenge = function(response){
		$('#AppDiv').hide();
		$('#AuthDiv').show();
		$('#passwordInputField').val('');
};

$('#loginButton').bind('click', function () {
    var reqURL = '/j_security_check';
    var options = {};
    options.parameters = {
    		j_username : $('#usernameInputField').val(),
    		j_password : $('#passwordInputField').val()
    };
    options.headers = {};
    LDAPRealmChallengeHandler.submitLoginForm(reqURL, options, LDAPRealmChallengeHandler.submitLoginFormCallback);
});

$('#cancelButton').bind('click', function () {
	$('#AppDiv').show();
	$('#AuthDiv').hide();
	LDAPRealmChallengeHandler.submitFailure();
});

LDAPRealmChallengeHandler.submitLoginFormCallback = function(response) {
    var isLoginFormResponse = LDAPRealmChallengeHandler.isCustomResponse(response);
    if (isLoginFormResponse){
    	LDAPRealmChallengeHandler.handleChallenge(response);
    } else {
    	$('#AppDiv').show();
    	$('#AuthDiv').hide();
    	LDAPRealmChallengeHandler.submitSuccess();
    }
};