# FlickCard

Card showing information related to a flick. This is how users view the flix in, for example, the flix store; but this is also how private flix are shown, in which case some buttons are ommitted (such as the buy button).

## Props

<!-- @vuese:FlickCard:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|data|-|—|`false`|-|
|page|-|—|`false`|-|
|number|-|—|`false`|-|

<!-- @vuese:FlickCard:props:end -->


## Events

<!-- @vuese:FlickCard:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|delete|Send the flick id to the parent component.|-|
|open_modal|Tells the parent to open the FlixPlayer.|-|

<!-- @vuese:FlickCard:events:end -->


## Methods

<!-- @vuese:FlickCard:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|getTime|Gets the duration of the flick.|-|
|delete_flick|Deletes a flick.|-|
|to_public|Reroute the user to the flick homepage, depending on where the current page.|-|
|buy|Called when the user wants to buy the current flick.|-|
|play|Called when the user has bought and wants to play the flick. Opens the FlixPlayer.|-|
|isSmallish|Makes adjustments if the client window is small.|-|

<!-- @vuese:FlickCard:methods:end -->


## Data

<!-- @vuese:FlickCard:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|bf_thumbnail|`String`|Default thumbnail if the image is not available.|https://i.imgur.com/09pgBA3.jpg|
|delete_dialog|`Boolean`|If users want to delete a list, it asks for confirmation first. This variable determines whether this dialoge box shows or not.|false|
|filler|`Array`|Filler space for formatting.|-|
|isSmall|`Boolean`|Whether the user screen is small or not (for mobile formatting purposes).|false|

<!-- @vuese:FlickCard:data:end -->


