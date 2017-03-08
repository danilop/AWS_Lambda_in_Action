// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:51d8f08c-a0d8-4607-9895-f2849ecec37a',
});
var lambda = new AWS.Lambda();

function changePassword() {

  var result = document.getElementById('result');
  var email = document.getElementById('email');
  var oldPassword = document.getElementById('old-password');
  var newPassword = document.getElementById('new-password');
  var verifyNewPassword = document.getElementById('verify-new-password');

  result.innerHTML = 'Change Password...';

  if (email.value == null || email.value == '') {
    result.innerHTML = 'Please specify your email address.';
  } else if (oldPassword.value == null || oldPassword.value == '') {
    result.innerHTML = 'Please specify your current password.';
  } else if (newPassword.value == null || newPassword.value == '') {
    result.innerHTML = 'Please specify a new password.';
  } else if (newPassword.value != verifyNewPassword.value) {
      result.innerHTML = 'The new passwords are <b>different</b>, please check.';
  } else

               var input = {
                  email: email.value,
                  oldPassword: oldPassword.value,
                  newPassword: newPassword.value
                };


                                  lambda.invoke({
                                    FunctionName: 'sampleAuthChangePassword',
                                    Payload: JSON.stringify(input)
                                  }, function(err, data) {
                                    if (err) console.log(err, err.stack);
                                    else {
                                      var output = JSON.parse(data.Payload);
                                      if (!output.changed) {
                                        result.innerHTML = 'Password <b>not</b> changed.';
                                      } else {
                                        result.innerHTML = 'Password changed.';
                                                        }
                                                }
                                        });


}

var form = document.getElementById('change-password-form');
form.addEventListener('submit', function(evt) {
  evt.preventDefault();
  changePassword();
});
