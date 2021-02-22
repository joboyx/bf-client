# Categories

The categories page as a component, which is embedded in `~/pages/cct.vue`. This page is a little complicated, as there is a lot of shuffling around with the categories and the starring. Best to get in touch with me if anything is unclear.

## Methods

<!-- @vuese:Categories:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|route|Route to a specific category page.|-|
|route_direct|Route to a specific category page.|-|
|get_headers|Get the authorisation headers for the api call.|-|
|blp|Show the bunnylove promo dialog. Is shown if a non premium member tries to star categories.|-|
|get_title|Echo function.|-|
|get_image|Get the category image.|-|
|toggleCategory|Toggle starring a category by the user.|-|
|star_category|Star a specific category.|-|
|unstar_category|Unstar a specific category.|-|

<!-- @vuese:Categories:methods:end -->


## Data

<!-- @vuese:Categories:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|search_string|`String`|Search string input to search for categories.|-|
|star_categories|`Array`|List of starred categories by the user.|-|
|category_list|`Array`|List of all categories.|-|
|category_star|`Array`|Secondary list of categories.|-|
|categories|`Array`|Another list of categories.|-|
|user|`Boolean`|Whether the user preferences have already loaded.|false|

<!-- @vuese:Categories:data:end -->


