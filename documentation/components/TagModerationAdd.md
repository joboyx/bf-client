# TagModerationAdd

This component allows people to suggest new tags and vote on suggested tags.

## Methods

<!-- @vuese:TagModerationAdd:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|validate|Called before submitting the form, to make sure the tag name and description follow the rules.|-|
|addTag|Called when the user wants to add a tag.|-|
|resetValidation|Resets the form validation.|-|
|like|Called when the user likes a suggested tag.|-|
|dislike|Called when a user disliked a suggested tag.|-|
|unlike|Called when the user liked a suggested tag, but now removes that like.|-|
|undislike|Called when the user disliked a suggested tag, but now removes that dislike.|-|
|setFilteredTags|Go over all suggested tags to see if the user voted on them or not, in order to filter them.|-|
|checkbox|If selected, only show filtered tags.|-|

<!-- @vuese:TagModerationAdd:methods:end -->


## Data

<!-- @vuese:TagModerationAdd:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|headers|`Array`|The table headers.|[]|
|tags|`Array`|List of all suggested tags.|-|
|search|`String`|The user search query string.|-|
|pagination|`Object`|Pagination details for the table.|-|
|tagRules|`Array`|Tag rules to determine which tags are acceptable.|[]|
|descRules|`Array`|Description requirements to determine which descriptions are valid.|[]|
|suggestedTag|`String`|The suggested tag by the user.|-|
|suggestedDesc|`String`|The suggested description by the user.|-|
|snackbar|`Boolean`|The pop notification at the top of the page when the user submits something.|false|
|tags_all|`Array`|List of all tags?|-|
|tags_filtered|`Array`|Filtered tags based on whether the user voted on them.|-|
|unvoted|`Boolean`|Whether the user wants to view all tags or just the unvoted ones.|true|
|search_items|`Array`|List of searchable tags.|-|

<!-- @vuese:TagModerationAdd:data:end -->


