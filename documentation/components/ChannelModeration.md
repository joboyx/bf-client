# ChannelModeration

This compenent allows people to vote the appropriate types and categories of specific channels/subreddits.

## Methods

<!-- @vuese:ChannelModeration:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|like|Called when the user votes up for a particular item.|-|
|changeSort|Called if the user changes the sort from ascending to descending and vice versa.|-|
|checkbox|Called to toggle the `unvoted` property, which shows either all channels or only the ones the user has not voted on yet.|-|
|setFilteredChannels|Runs at the beginning to list all unvoted channels.|-|

<!-- @vuese:ChannelModeration:methods:end -->


## Data

<!-- @vuese:ChannelModeration:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|headers|`Array`|The table headers.|[]|
|channels|`Array`|Deprecated.|-|
|channels_all|`Array`|A list of all channels.|-|
|channels_filtered|`Array`|The list of channels filtered according to whether the user has already voted on them or not.|-|
|search|`String`|The search string allowing the user to filter certain channels.|-|
|pagination|`Object`|The table pagination parameters.|-|
|snackbar|`Boolean`|The notification bar which can popup on top of the page. If set to true the notification shows for a few seconds and then disappears. See vuetify snackbar for more details.|false|
|orientations|`Array`|List of all orientations.|[straight,gay,lesbian,trans,solo_man,solo_woman,orientation_other]|
|arts|`Array`|List of art styles.|[real_life,comic,three_d,art_other]|
|unvoted|`Boolean`|Whether the table should show all channels or only the ones which the user has not voted on.|true|

<!-- @vuese:ChannelModeration:data:end -->


