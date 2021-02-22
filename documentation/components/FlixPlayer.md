# FlixPlayer

import { Slider, SliderItem } from 'vue-easy-slider' The FlixPlayer. Once a user publishes a list, and turns it into a flick, this component is used to play the list of resources like a movie.

## Props

<!-- @vuese:FlixPlayer:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|player_id|-|—|`false`|-|
|resources|-|—|`false`|-|

<!-- @vuese:FlixPlayer:props:end -->


## Events

<!-- @vuese:FlixPlayer:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|close_modal|-|-|

<!-- @vuese:FlixPlayer:events:end -->


## Methods

<!-- @vuese:FlixPlayer:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|openTitle|Deprecated.|-|
|getWindowHeight|Returns the window height, used for recalculations when the user resizes the screen.|-|
|log|For debugging.|-|
|getWindowHeight|Duplicate,|-|
|sliderChange|Called when the slide/resource changes.|-|
|setWindowElements|Loads the first set of resources, so that when the next resource is supposed to be played, it doesn't have to buffer. This function is called at the beginning.|-|
|setFirstResource|Sets the very first resource in the flick.|-|
|previous|Called when the user wants to view the previous resource.|-|
|next|Called when the flick progresses to the next slide.|-|
|openModal|Called when the FlixPlayer opens.|-|
|closeModal|Called when the FlixPlayer closes.|-|
|resize_window|Used for when the user resizes the screen.|-|
|render|Quick helper function to make sure everything is displayed properly.|-|
|keyboard|Sets the keyboard input; so that the arrow keys and other keyboard shortcuts can be used.|-|
|route|Pushes to a different route|-|
|mod|Returns the mod of `n`,`m`|-|
|toggleMute|Used to toggle the sound on and off; pushes the preference to the server.|-|
|mouseStopped|When the mouse stops moving, remove the menu bar at the bottom of the screen.|-|
|mouseHover|When the mouse hovers, show the menu at the bottom of the screen, so that the user can pause, play, and navigate the flick.|-|

<!-- @vuese:FlixPlayer:methods:end -->


## Data

<!-- @vuese:FlixPlayer:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|loggedIn|`Call`|Whether the user is logged in.|-|
|autoPlayToggle|`Boolean`|Whether the flick should automatically go to the next resource. Is `true` if user hasn't gone to the previous slide.|true|
|displayStyle|`String`|Whether the FlixPlayer is visible or not.|none|
|modalOpen|`Boolean`|Whether the FlixPlayer is opened or not.|false|
|lb_height|`Call`|The height of the window.|-|
|sliderValue|`Number`|The index number of the current resource.|0|
|window_size|`Number`|The number of resources to load in advance.|5|
|timer|`Boolean`|Used for the mouse hover; if the mouse hovers, the bottom menu is displayed.|false|
|controls_menu|`Boolean`|Whether the bottom control menu bar is shown.|false|
|bottomNav|`String`|The current play/pause state of the player.|pause|
|mute|`Boolean`|Whether the audio is muted or not.|false|

<!-- @vuese:FlixPlayer:data:end -->


