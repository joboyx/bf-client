# Tags

This component shows all the available tags, and allows users to star and block specific tags.

## Methods

<!-- @vuese:Tags:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|star|Called when the user wants to star a tag (requires premium membership).|-|
|blp|Shows the bunny love promotion if a non-premium member tries to star or ban tags.|-|
|ban|Bans a specific tag and sends this to the server (requires premium).|-|

<!-- @vuese:Tags:methods:end -->


## Data

<!-- @vuese:Tags:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|headers|`Array`|Table hearders.|[]|
|tags|`Array`|List of all tags.|-|
|search|`String`|Search string of the user.|-|
|pagination|`Object`|Table pagination parameters.|-|
|tagRules|`Array`|Not used.|[]|
|descRules|`Array`|Not used.|[]|
|suggestedTag|`String`|Not used.|-|
|suggestedDesc|`String`|Not used.|-|
|snackbar|`Boolean`|Not used.|false|
|user|`Boolean`|Determines if the user/tag data is loaded.|false|

<!-- @vuese:Tags:data:end -->


