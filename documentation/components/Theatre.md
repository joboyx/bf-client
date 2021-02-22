# Theatre

import goTo from '@/node_modules/vuetify/lib/components/Vuetify/goTo' import { Slider, SliderItem } from 'vue-easy-slider' The theatre player which views resources in detail and allows users to toggle between them. This is another major and complex component.

## Props

<!-- @vuese:Theatre:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|data|-|—|`false`|-|
|id|-|—|`false`|-|
|betterfap|-|—|`false`|-|

<!-- @vuese:Theatre:props:end -->


## Events

<!-- @vuese:Theatre:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|open_modal|-|-|
|close_modal|-|-|
|signup|-|-|
|`reaction`|this.set_reaction(reaction) This should be within the response ideally|-|
|get_more_data|-|-|
|seen|// contole.log("Seen sent!: " + this.current_index)|-|

<!-- @vuese:Theatre:events:end -->


## Methods

<!-- @vuese:Theatre:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|openTitle|Deprecated.|-|
|log|For debugging.|-|
|getWindowHeight|Returns the window height, used for recalculations when the user resizes the screen.|-|
|scrollDown|Deprecated|-|
|next|Go to next resource.|-|
|previous|Go to previous resource.|-|
|slideChange|Deprecated.|-|
|setWindowElem|Preloads the first x resources to prevent buffering.|-|
|setFirstResource|Loads the very first resource.|-|
|test|Debugging.|-|
|openModal|Opens the Theatre.|-|
|closeModal|Closes the theatre.|-|
|playVideo|Plays a specific video.|-|
|pauseVideo|Pauses a video.|-|
|setAutoPlayDuration|Sets the duration between resources when auto play is toggled.|-|
|resize_window|Used when the user resizes the windo.|-|
|openFlickCreation|Open a dialog box to create a new list for the user.|-|
|closeFlickCreation|Closes the new list creation dialog box.|-|
|openTagSuggestion|Deprecated? Opens the tag suggestion interface and shuts off the keyboard listener, allowing the user to type.|-|
|openTagger|Opens the tag suggestion interface and shuts off the keyboard listener, allowing the user to type.|-|
|closeTagger|Closes the tagger.|-|
|closeTagSuggestion|Closes the tagger.|-|
|closeTagSuggestionButton|Closes the tagging interface.|-|
|tagSuggestionSent|Sends tag suggestions to the server.|-|
|openReport|Open the resporting interface.|-|
|closeReport|Closes the reporting interface.|-|
|closeReportButton|Closes the reporting interface.|-|
|removeTag|Called when the user downvotes/removes a suggested tag.|-|
|vote_tag|Deprecated. Called when the user votes on a suggested tag.|-|
|vote_s_tag|Called when the user votes on a suggested tag.|-|
|checkLoginAd|Deprecated.|-|
|remove_tag|Deprecated.|-|
|suggest_tags|Deprecated.|-|
|send_report|Called when a resport is sent, so that the interface is closed.|-|
|missing_report|Called when the user indicated that this resource is missing.|-|
|set_reaction|To set the like/dislike before emitting, so that it is fast. This function can be safely removed.|-|
|reaction|Sends a reaction of a resource to the server.|-|
|startKeyboardListener|Makes sure that the keyboard shortcuts are enabled.|-|
|closeKeyboardListener|Closes keyboard input|-|
|videoLoader|Deprecated.|-|
|videoPause|Deprecated.|-|
|checkVideoPlay|Deprecated.|-|
|toggleAutoPlay|Toggles the autoplay feature.|-|
|resetAutoPlay|Reset function for autoplay.|-|
|getMoreResources|If the last resource is reached, ask for more data.|-|
|sendSeen|Sends a seen event to the server.|-|
|render|Quick helper function to make sure everything is displayed properly.|-|
|setCurrentResource|Loads the data for the current resource.|-|
|keyboard|Parses keyboard input.|-|
|route|Router helper function.|-|
|mod|Modulo function.|-|
|toggleMute|Used to toggle the sound on and off; pushes the preference to the server.|-|

<!-- @vuese:Theatre:methods:end -->


## Data

<!-- @vuese:Theatre:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|show_list|`Array`|Deprecated?|-|
|current_index|`Number`|The index of the resource being viewed.|0|
|current_resource|`Object`|The current resource data. Duplicate.|-|
|loggedIn|`Call`|Whether the user is logged in or not.|-|
|current_resource|`Member`|The current resource data.|-|
|items|`Array`|Deprecated.|[1,2,3,4,5,7,10,12,15,20]|
|autoPlayDuration|`Number`|The duration between resources in seconds if autoplay is toggled on.|4|
|autoPlayToggle|`Boolean`|Whether autoplay is enabled or not.|false|
|autoPlayMsg|`String`|Debug message. Not used.|off|
|displayStyle|`String`|Display style of the Theatre; if none it means the theatre is not visible.|none|
|modalOpen|`Boolean`|Whether the theatre is open or not.|false|
|test_tags|`Array`|Deprecated.|[one,two]|
|suggested_tags|`Array`|Deprecated.|-|
|suggestion_dialog|`Boolean`|Tagging interface.|false|
|suggestion_snackbar|`Boolean`|Small popup dialog at the top of the screen.|false|
|report_dialog|`Boolean`|Reporting interface.|false|
|report_snackbar|`Boolean`|Small popup dialog at the top of the screen when a report is sent.|false|
|report_items|`Array`|Deprecated.|-|
|lb_height|`Call`|The window height; used for manual resizing.|-|
|tag_input_value|`String`|Deprecated.|-|
|night_mode|`String`|Deprecated.|dark|
|window_old|`Array`|Deprecated.|[a,b,c]|
|window|`Array`|The resources to be preloaded when the theater opens.|[false,false,false,false,false]|
|item_A|`Boolean`|Deprecated.|false|
|item_B|`Boolean`|Deprecated.|false|
|item_C|`Boolean`|Deprecated.|false|
|visible_window|`String`|Deprecated.|-|
|vw_index|`Number`|The index in the `window` of the current resource; i.e., the resource is which is visible to the user. Generally this is the center resource, so that the resources around it can be pre-loaded.|2|
|slide_value|`Number`|The actual index of the current resource which is visible, in the `window`.|2|
|window_size|`Number`|The side of `window`.|5|
|autoFap|`Boolean`|Whether autoplay is enabled or not.|false|
|mute|`Null`|Whether the audio is muted or not.|-|
|sliderValue|`Number`|The model variable used for the v-carousel to display the resources.|2|
|taggerOpen|`Boolean`|Whether the tagging interface is open or not.|false|
|data_end|`Boolean`|Whether the end of the resource list is reached. When true, more data can be fetched.|true|

<!-- @vuese:Theatre:data:end -->


