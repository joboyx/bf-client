# Tagging

This compenent allows people to add new tags to resources.

## Props

<!-- @vuese:Tagging:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|resource|-|—|`false`|-|
|open|-|—|`false`|-|
|mode|-|—|`false`|-|

<!-- @vuese:Tagging:props:end -->


## Events

<!-- @vuese:Tagging:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|suggestion_sent|Once the suggestion has been sent, the data is sent back to the theatre, so that it knows that keyboard functionality can be reverted.|-|
|close_tag_suggestion|-|-|
|removeTag|-|-|
|vote_up|-|-|
|vote_down|-|-|
|close_tag_suggestion_button|-|-|

<!-- @vuese:Tagging:events:end -->


## Methods

<!-- @vuese:Tagging:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|suggest_tags|Duplicate|-|
|suggest_tags|Sends the list of suggested tags the server.|-|
|submit|Checks whether the input values are valid before sending it to the server.|-|
|tag_mod|Resets the user input string.|-|
|next|Deprecated.|-|

<!-- @vuese:Tagging:methods:end -->


## Data

<!-- @vuese:Tagging:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|tags|`Array`|List of all possible tags pulled from the server.|-|
|tag_input_value|`String`|The tag the user is typing at the moment.|-|
|suggested_tags|`Array`|List of tags suggested by the user.|-|

<!-- @vuese:Tagging:data:end -->


