# Publish

Allows the user to publish a custom list as a flick.

## Props

<!-- @vuese:Publish:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|flick_id|-|—|`false`|-|

<!-- @vuese:Publish:props:end -->


## Methods

<!-- @vuese:Publish:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|add_tag|Adds a tag to the flick.|-|
|publish|Called when the user hits the publish button. Will then calculate the duration of the flick.|-|
|calculate_duration|Will iterate over all resources, and add up the duration of each resource. If an item resource does not have a duration, which is the case of a webm which has not be pre-determined, it will load that webm and retrieve the metadata for it.|-|
|validate|Makes sure that the form data is in accordance with the form rules. If all is fine, send to the server and publish.|-|
|check_carrots|Make sure the number of carrots is a natural number.|-|

<!-- @vuese:Publish:methods:end -->


## Data

<!-- @vuese:Publish:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|loading|`Boolean`|Whether the data is still being fetched from the server or not.|true|
|flick_name|`String`|The name the user gives this flick.|My New Flick|
|description|`String`|The description this user gives the flick.|My awesome Flick!|
|valid|`Boolean`|Whether the input fields are valid according to the form rules.|false|
|select|`Array`|The list of all possible tags.|-|
|items|`Array`|The user selected tags.|-|
|orientation|`String`|The user selected orientation.|straight|
|art|`String`|The user selected art style.|real-life|
|nameRules|`Array`|The title naming form rules.|[]|
|descriptionRules|`Array`|The description form rules.|[]|
|price|`Number`|The price the flick will be sold at.|1|
|priceRules|`Array`|The pricing rules of the form.|[]|
|search|`String`|The search string for the tags.|-|
|data|`Array`|The flick data.|-|
|duration|`Number`|The duration of the flick.|0|
|publish_loading|`Boolean`|Is true if the user hit publish and when we are calculating the flick duration.|false|

<!-- @vuese:Publish:data:end -->


