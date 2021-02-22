# Login

This login module serves to replace the old login and register page. The login dialog box is activated when the user clicks on login; this way they don't have to navigate to a separate page to login.

## Methods

<!-- @vuese:Login:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|signup|Called when the user hits the sign up button; the user is then taken to the signup dialog box.|-|
|signin|Called when the user hits the signup button. Validation is called first, to ensure the form boxes are in line with the rules.|-|
|forgot_password|Called when the user submits the email to reset the password.|-|

<!-- @vuese:Login:methods:end -->


## Data

<!-- @vuese:Login:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|loginDialog|`Boolean`|Whether the dialog box should be shown or not.|false|
|show1|`Boolean`|Makes it possible to see the password.|false|
|username|`String`|The username string of the user.|-|
|password|`String`|The password string of the user.|-|
|msg|`String`|A return message from the server, for example: logging in, error, username is already taken.|-|
|nameRules|`Array`|The rules under which someone is allowed to create a username.|[]|
|passRules|`Array`|The rules under which someone can create a password.|[]|
|passwordReset|`Boolean`|The dialog box for the password reset. When true, the reset dialog box shows.|false|
|forgot_password_msg|`String`|The return message from the server for a password reset.|-|
|emailRules|`Array`|The rules under which someone can create an email.|[]|
|forgot_password_email|`String`|The input email from the user for the password reset.|-|

<!-- @vuese:Login:data:end -->


