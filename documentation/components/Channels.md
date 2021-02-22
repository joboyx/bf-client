# Channels

The component shows all the available channels/subreddits. Users have the option to block specific channels as well - however, this requires a premium membership.

## Methods

<!-- @vuese:Channels:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|star|Not used.|-|
|blp|Shows the bunny love promotion if a non-premium member tries to ban channels.|-|
|ban|Bans a specific channel and sends this to the server.|-|

<!-- @vuese:Channels:methods:end -->


## Data

<!-- @vuese:Channels:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|headers|`Array`|The table headers.|[]|
|channels|`Array`|List of all channels.|-|
|search|`String`|Search string of the user for specific channels.|-|
|pagination|`Object`|Table pagination parameters.|-|
|channelRules|`Array`|Not used.|[]|
|descRules|`Array`|Not used.|[]|
|suggestedchannel|`String`|Not used|-|
|suggestedDesc|`String`|Not used.|-|
|snackbar|`Boolean`|Not used.|false|
|user|`Boolean`|Checks if the user data/channel data is loaded.|false|

<!-- @vuese:Channels:data:end -->


