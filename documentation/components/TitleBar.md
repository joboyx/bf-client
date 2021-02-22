# TitleBar

The databar at the bottom of the Theatre, allowing people to like, dislike, add to list, view tags, etc.

## Props

<!-- @vuese:TitleBar:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|current_resource|-|—|`false`|-|
|loggedIn|-|—|`false`|-|
|mute|-|—|`false`|-|
|betterfap|-|—|`false`|-|

<!-- @vuese:TitleBar:props:end -->


## Events

<!-- @vuese:TitleBar:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|closeTagger|-|-|
|suggestion_sent|if(this.isLoggedIn()){ console.log("logged in") for(let i of this.tags){ this.$axios.$post('/api/moderate/' + this.current_resource._id + '/suggest/tag/'+i,null,{headers:{Authorization : this.authenticationToken()}}) .then((res)=>{ }) .catch((err)=>{ console.log(err) }) } }|-|
|reaction|-|-|
|toggleAutoPlay|-|-|
|mute|-|-|
|openFlickCreation|-|-|
|closeFlickCreation|-|-|
|setAutoPlayDuration|-|-|
|removeTag|-|-|
|vote_s_tag_up|-|-|
|vote_s_tag_down|-|-|
|openTagger|-|-|
|openReport|-|-|
|missing_report|-|-|

<!-- @vuese:TitleBar:events:end -->


## Methods

<!-- @vuese:TitleBar:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|skipTour|Called when the user wants to skip the tutorial.|-|
|finishSingleTutorial|Called when the user finished a single tutorial.|-|
|finishTheaterTutorial|Called when the user finished a single tutorial.|-|
|log|Used for logging purposes.|-|
|blp|The BunnyLove promotion popup dialog, when the user tries to use a feature for premium members.|-|
|new_flick|Called when the user wants to create a new flick.|-|
|add_to_flick|Called when the user adds this resource to a flick.|-|
|copy_source|Called for copying something to the clipboard.|-|
|set_resource|Called when when a new resource is loaded.|-|
|set_autoplay_toggle|Toggles the autoplay button.|-|
|search_change|Called when the user's search string for adding a new tag changes.|-|
|check_submit|Submits the tags.|-|
|openTagger|Opens the tagging interface.|-|
|closeTagger|Closes the tagging interface.|-|
|toggleTagger|Toggle the tagging options.|-|
|submit|Sends the list of proposed tags to the parent `Theatre`, which handles it further.|-|

<!-- @vuese:TitleBar:methods:end -->


## Data

<!-- @vuese:TitleBar:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|autoPlayDuration|`Number`|The autofap timer between images.|4|
|items|`Array`|The `autoPlayDuration` options.|[1,2,3,4,5,7,10,15,20]|
|autoPlayToggle|`Boolean`|Whether autoplay is true or not.|false|
|taggingOpen|`Boolean`|Whether the tagging box is open or not.|false|
|tags|`Array`|The list of tags by the user.|-|
|tag_options|`Array`|List of all tags used for the dropdown select.|-|
|focused|`Boolean`|Used for auto focus for typing.|false|
|all_tags|`Array`|List of all tags.|-|
|flicks|`Array`|Default flick names and titles. Is not used.|[]|
|snackbar|`Boolean`|Popup dialog at the top of the screen.|false|
|snackbar_add_flick_suc|`Boolean`|Popup dialog at the top of the screen if the user added a new flick.|false|
|snackbar_add_flick_err|`Boolean`|Popup dialog at the top of the screen if adding a new flick failed.|false|
|selected_flick|`String`|The flick the user added the current resource to.|-|
|dialog|`Boolean`|Whether the dialog box for adding a new flick is open.|false|
|flick_title|`String`|The user input title for a new flick.|-|
|user|`Boolean`|The user data.|false|
|tutorialTheatreSteps|`Array`|The tutorial data.|[]|
|tutorialCallBackTheatre|`Object`|Tutorial call back functions.|-|
|tutorialOptions|`Object`|Additional tutorial options.|-|

<!-- @vuese:TitleBar:data:end -->


