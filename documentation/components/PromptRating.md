# PromptRating

This module prompts users a rating for for a flick, after viewing it.

## Events

<!-- @vuese:PromptRating:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|rating|console.log(res)|-|

<!-- @vuese:PromptRating:events:end -->


## Methods

<!-- @vuese:PromptRating:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|open_dialog|Open the dialog box and sets the flick id|-|
|submit|Submit the user rating for the flick.|-|

<!-- @vuese:PromptRating:methods:end -->


## Data

<!-- @vuese:PromptRating:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|dialog|`Boolean`|Whether the rating dialog is active or not shows or not.|false|
|id|`String`|The id of the flick.|-|
|rating|`Number`|The score of the user.|0|

<!-- @vuese:PromptRating:data:end -->


