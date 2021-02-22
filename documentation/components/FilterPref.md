# FilterPref

This `FilterPref` component is only used in `moderation/ModerationAdmin.vue`. This the page where users can moderate resources. This components provides users the functionality to set preferences for the type of resources they see (media type, orientation, etc.). This same module is also available on all media pages (for example the recommended and top); however in these places this filter is already included in the component.

## Events

<!-- @vuese:FilterPref:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|get_new_resource|Signals to the `ModerationAdmin` that a new resource can be fetched.|-|

<!-- @vuese:FilterPref:events:end -->


## Methods

<!-- @vuese:FilterPref:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|set_refresh_true|Set the `show_refresh` variable to true, so that the refresh icon starts blinking, indicating that the user has made changes to the preference and that a new resource should be pulled according to the new preferences.|-|
|get_headers|Get the authorization headers from the vuex store for the http request (through axios).|-|
|save_preferences|Push the new preferences to the server, so that they are stored in the user account. Once this is completed, the `this.$emit('get_new_resource')` event is fired. This signals to the `ModerationAdmin` that a new resource can be fetched.|-|
|get_new_resource|Once the refresh button is hit, this function is called. Despite its name, it only turns off the blinking refresh icon.|-|
|get_body|Format the body of the preferences, so that it can be sent to the server.|-|

<!-- @vuese:FilterPref:methods:end -->


## Data

<!-- @vuese:FilterPref:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|filter_show|`Boolean`|If this is true, the filter preferences will be expanded and visible to the user.|false|
|show_refresh|`Boolean`|If this is true, then the refresh icon will start blinking. This is set to true once the user makes changes to their preferences.|false|
|art_styles|`Array`|List of art styles, and their icon locations.|[]|
|orientation_styles|`Array`|List of orientations, and their icon locations.|[]|
|media_types|`Array`|List of media types, and their icon locations.|[]|

<!-- @vuese:FilterPref:data:end -->


