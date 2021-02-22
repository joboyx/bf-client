# ImageCard

import BottomStatRating from '@/components/BottomStatRating' Shows the image thumbnail, as seen on for example on the homepage/recommended. The `ImageCard` is encapsulated by the `ImageRow`.

## Props

<!-- @vuese:ImageCard:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|data|-|—|`false`|-|
|index|-|—|`false`|-|

<!-- @vuese:ImageCard:props:end -->


## Events

<!-- @vuese:ImageCard:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|reaction|Emits reaction to `ImageRow`|-|
|my_emit|-|-|

<!-- @vuese:ImageCard:events:end -->


## Methods

<!-- @vuese:ImageCard:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|reaction|Sends a reaction to the parents `ImageRow`.|-|
|hash|Deprecated. Debugging.|-|
|get_thumbnails|Get the thumbnail.|-|

<!-- @vuese:ImageCard:methods:end -->


