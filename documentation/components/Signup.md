# Signup

The sign up dialog box, intended to replace the previous registration page. This way the user does not have to navigate to a different page to sign up. See `Login.vue` for a similar module.

## Methods

<!-- @vuese:Signup:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|login|Takes the user the login dialog instead.|-|
|validate|Makes sure that all of the user input is valid, before sending it to the server.|-|
|submit|Sets the token.|-|
|onCaptchaExpired|When the captcha expires, reset it.|-|

<!-- @vuese:Signup:methods:end -->


## Data

<!-- @vuese:Signup:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|registerDialog|`Boolean`|Whether the register dialog is shown or not.|false|
|username|`String`|The username string of the user.|-|
|password|`String`|The password string of the user.|-|
|show1|`Boolean`|Makes it possible to see the password.|false|
|art|`Array`|The art preferences of the user.|-|
|orientation|`Array`|The orientation preferences of the user.|-|
|errors|`Array`|Will show error messages if the validation fails.|-|
|email|`String`|The e-mail the user wants to sign up with. (E-mail is optional)|-|
|nameRules|`Array`|The rules under which someone is allowed to create a username.|[]|
|passRules|`Array`|The rules under which someone can create a password.|[]|
|emailRules|`Array`|The rules which specify a valid email address.|[]|
|msg|`String`|A return message from the server, for example: logging in, error, username is already taken.|-|
|token|`String`|Captcha token|-|
|code|`String`|Deprecated|-|
|tos|`Boolean`|Whether the user has agrees with the terms of service.|false|

<!-- @vuese:Signup:data:end -->


