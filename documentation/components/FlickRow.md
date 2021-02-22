# FlickRow

This component takes a list of `FlickCard`s and displays them in rows. This is also where the `FlixPlayer` is embedded.

## Props

<!-- @vuese:FlickRow:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|flix|-|—|`false`|-|
|title|-|—|`false`|-|

<!-- @vuese:FlickRow:props:end -->


## Events

<!-- @vuese:FlickRow:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|delete|-|-|

<!-- @vuese:FlickRow:events:end -->


## Methods

<!-- @vuese:FlickRow:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|delete_flick|Tells the parent component to delete a spcefic flick, only available in private mode.|-|
|open_modal|Opens the FlixPlayer.|-|
|close_modal|Closes the FlixPlayer.|-|

<!-- @vuese:FlickRow:methods:end -->


## Data

<!-- @vuese:FlickRow:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|resources|`Array`|List of flix.|-|
|filler|`Array`|Filler space for mobile and small screen formatting.|-|
|loading_play|`Boolean`|Will show a loading icon if the data is still being fetched from the server.|false|
|modal_closed|`Boolean`|Whether the FlixPlayer is open or not.|false|
|reviewed|`Boolean`|Whether the user has seen a particular flick; this used to prompt users to submit a rating.|true|
|play_id|`String`|The ID associated with this flixPlayer, in case there are multiple.|-|

<!-- @vuese:FlickRow:data:end -->


