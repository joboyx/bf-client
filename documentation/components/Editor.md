# Editor

The flix/list editor. This component allows users to edit individual resources into a longer movie.

## Props

<!-- @vuese:Editor:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|endpoint_auth|-|—|`false`|-|
|endpoint_unauth|-|—|`false`|-|

<!-- @vuese:Editor:props:end -->


## Events

<!-- @vuese:Editor:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|close_modal|-|-|

<!-- @vuese:Editor:events:end -->


## Methods

<!-- @vuese:Editor:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|skipTour|Called when the tutorial is skipped.|-|
|finishSingleTutorial|Called when the tutorial ends by `finishEditorTutorial`.|-|
|finishEditorTutorial|Called when the tutorial ends.|-|
|get_endpoint|Gets the authorisation data to call the api endpoints.|-|
|calculate_duration|Calculates the total duration of the flick.|-|
|calculate_duration_old|Deprecated.|-|
|openModal|Opens the FlixPlayer when the user wants to play the flick from the editor, from a specified resource.|-|
|closeModal|Closes the FlixPlayer.|-|
|get_type|Get the type of the image location of the type of the current resource.|-|
|change_range|Called when the user adjusts the duration of a resource.|-|
|get_minutes|Convert the number of seconds to minutes + seconds.|-|
|duplicate|Called when the user hits the duplicate button, and duplicates the current resource and inserts it below. This automatically saves it in the server.|-|
|remove|Removes a resource from the list, does not automatically save it.|-|
|save|Saves the current list (and flix).|-|
|set_current_resource|Gets the current resource data and sets it in the editor.|-|
|load_metadata|Load metadata related to a video, for duration calculation purposes.|-|
|open_blaze|Deprecated. Used to be the former editor engine.|-|
|close|Deprecated. Closed the former editor engine.|-|

<!-- @vuese:Editor:methods:end -->


## Data

<!-- @vuese:Editor:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|data|`Array`|The original list of resources as part of this list.|-|
|resources|`Array`|The copied list of resources, which can be used for editing.|-|
|default_range|`Array`|The default range length for the duration of images.|[1,60]|
|loading_save|`Boolean`|Whether the flix is currently being saved, in which case it will show a loading icon.|false|
|blaze_editor|`Boolean`|Deprecated. Used to be the flix editor engine.|false|
|current_resource|`Object`|The current selected resource.|-|
|current_range|`Array`|The duration selected by the user. We're using a range for programmtic convenience and because it works with vuetify.|[0,1]|
|total_duration|`String`|The total duration of the flick.|?|
|duration|`Number`|Duration variable used for calculations.|0|
|duration_loading|`Boolean`|Indicates whether the duration of the flick is currently being calculated.|false|
|loading_data|`Boolean`|Indicated that the data is still being fetched from the server.|true|
|tutorialEditorSteps|`Array`|The tutorial dialogue box data.|[]|
|tutorialCallBackEditor|`Object`|Callback functions for when the tutorial ends or is skipped.|-|
|tutorialOptions|`Object`|Additional options for the tutorial.|-|

<!-- @vuese:Editor:data:end -->


