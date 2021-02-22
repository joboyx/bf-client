# BottomStat

When users hover over a resource thumbnail, the title of the resource appears on the bottom of the thumbnail. It is called `BottomStat` because initially we were experimenting with showing other statistics here, and allowing users to upvote and downvote resources. Finally we decided to just keep the title here.

## Props

<!-- @vuese:BottomStat:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|data|-|—|`false`|-|

<!-- @vuese:BottomStat:props:end -->


## Events

<!-- @vuese:BottomStat:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|reaction|-|-|

<!-- @vuese:BottomStat:events:end -->


## Methods

<!-- @vuese:BottomStat:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|reaction|Deprecated. If used, needs to be updated.|-|
|truncate|Truncates the title so that the bottom bar doesn't take up the whole thumbnail.|-|

<!-- @vuese:BottomStat:methods:end -->


## Data

<!-- @vuese:BottomStat:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|headers|`Object`|The authorisation headers for the api call.|-|
|loggedIn|`Call`|Whether the user is logged in or not (retrieved from the vuex).|-|

<!-- @vuese:BottomStat:data:end -->


