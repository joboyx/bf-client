# ModerationAdmin

The main user moderation page, where users can moderate individual resources.

## Methods

<!-- @vuese:ModerationAdmin:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|Comparator|Helper function to compare two values.|-|
|set_resource|Set the resource data once it has been received from the server.|-|
|get_data|Pull the resource data from the server.|-|
|reset|Reset all the data to how it was before the user made any changes.|-|
|set_tag_data|Iterate over all tags from the moderation data and compare them with the data from the current resource.|-|
|set_art_data|Set the art type data.|-|
|set_orientation_data|Set the orientation type data.|-|
|set_type_data|Set the media type data.|-|
|get_endpoint|Currently returns only `/api/moderate/`.|-|
|get_headers|Get the authorisation headers for the api calls.|-|
|approve_i_tag|Called when a user approves of a suggested inappropriate tag.|-|
|reject_i_tag|Called when a user rejects a suggested inappropriate tag.|-|
|approve_s_tag|Called when a user approves a suggested tag.|-|
|reject_s_tag|Called when a user rejects a suggested tag.|-|
|remove_tag|Remove tags from the list|-|
|confirm_art|Called when the user confirms the art type.|-|
|confirm_orientation|Called when the user confirms the orientation.|-|
|confirm_type|Called when the user confirms the media type.|-|
|remove|Called when a user suggests to delete the resource,.|-|
|save|Called when the user is happy with the changes and saves the resource.|-|
|skip|Called when the user wants to skip this particular resource.|-|
|suggest_tag|Called when the user adds a new tag.|-|
|reaction|Called when the user wants to leave a reaction to resource.|-|

<!-- @vuese:ModerationAdmin:methods:end -->


## Data

<!-- @vuese:ModerationAdmin:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|tags|`Array`|List of all existing tags.|-|
|current_resource|`Null`|The current resource the user is viewing.|-|
|suggest_tag_search|`String`|The string in the tag search box for adding new tags, representing the tag the user is typing at the moment.|-|
|media_type|`Null`|The media type of the current resource [gif, video, webm, pic].|-|
|orientation|`Null`|The orientation of the current resource [straight, gay, lesbian, trans, solo...].|-|
|art|`Null`|The art type of the current resource [real-life, hentai, etc.].|-|
|type|`Null`|Not sure.|-|
|suggested_tags|`Array`|The list of tags suggested to be added by the community.|-|
|msg|`String`|Debug helper.|-|
|moderation_data|`Null`|All the reporting data associated with this resource.|-|
|moderation_backup|`Null`|A backup of the moderation data, in case the user resets it.|-|
|current_resource_backup|`Null`|Back up of the resource for the reset.|-|
|good_tags|`Array`|List of suggested tags which are upvoted by the users.|-|
|tag_input_value|`String`|Deprecated.|-|
|extra_tags|`Array`|Deprecated.|-|
|art_confirmed|`Boolean`|Whether the user has confirmed the Art properties.|false|
|orientation_confirmed|`Boolean`|Whether the user has confirmed the Orientation properties.|false|
|type_confirmed|`Boolean`|Whether the user has confirmed the Media Type properties.|false|

<!-- @vuese:ModerationAdmin:data:end -->


