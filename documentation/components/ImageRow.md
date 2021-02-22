# ImageRow

import SignUpAd from '@/components/SignUpAd' Takes a list of `ImageCards` and displays them neatly in a row. Also contains a `Theatre`, to open a specific resource and view it in more detail.

## Props

<!-- @vuese:ImageRow:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|data|-|—|`false`|-|
|id|-|—|`false`|-|
|description|-|—|`false`|-|
|tagline|-|—|`false`|-|
|betterfap|-|—|`false`|-|
|no_first_card|-|—|`false`|-|

<!-- @vuese:ImageRow:props:end -->


## Events

<!-- @vuese:ImageRow:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|seen|-|-|
|like|-|-|
|dislike|-|-|
|favourite|-|-|
|get_more_data|-|-|

<!-- @vuese:ImageRow:events:end -->


## Methods

<!-- @vuese:ImageRow:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|lightbox|Opens the `Theatre`. (Used to be called lightbox).|-|
|signUp|Deprecated.|-|
|seen|Called if the user views a specific resource.|-|
|like|Called if the user likes a resource.|-|
|dislike|Called if the user dislikes a resource.|-|
|favourite|Called if the user favourites a resource.|-|
|reaction|Propagates a reaction of a specific resource.|-|
|get_more_data|Called if the user reaches the end of a page or the final resource and needs more data to be fetched from the server.|-|
|open_modal|Open the Theatre.|-|
|close_modal|Closes the Theatre.|-|
|bunnyfap|Called when the user hits the first tile and triggers autoplay. This is what we first called bunnyfap.|-|

<!-- @vuese:ImageRow:methods:end -->


## Data

<!-- @vuese:ImageRow:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|msg|`String`|Debug message.|msg|
|slideshow_data|`Member`|The list of `ImageCards`|-|
|showSignUpAd|`Boolean`|Deprecated.|false|
|taglines|`Array`|Deprecated.|[]|
|modal_closed|`Boolean`|Whether the Theatre is open or not.|false|

<!-- @vuese:ImageRow:data:end -->


