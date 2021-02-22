# Media

One of the major components. Shows a grid of resources, automatically fetches data from the server, and allows users to set filtering preferences.

## Props

<!-- @vuese:Media:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|title|-|—|`false`|-|
|data_endpoint|-|—|`false`|-|
|data_endpoint_auth|-|—|`false`|-|
|description|-|—|`false`|-|
|search|-|—|`false`|-|
|tagline|-|—|`false`|-|
|cats|-|—|`false`|-|
|tags_imported|-|—|`false`|-|
|betterfap|-|—|`false`|-|
|no_first_card|-|—|`false`|-|
|data|-|—|`false`|-|
|index|-|—|`false`|-|

<!-- @vuese:Media:props:end -->


## Events

<!-- @vuese:Media:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|getting_more_data|console.log("Getting more data")|-|
|data_end|End of data stream|-|

<!-- @vuese:Media:events:end -->


## Methods

<!-- @vuese:Media:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|scrollToTop|Scroll to the top of the page.|-|
|get_pref|Get the user preferences and format them for the front-end.|-|
|reset|Flush the data.|-|
|set_refresh_true|Sets the refresh icon to true, so that the user can fetch new data.|-|
|pushcat|Push a new category to the user's list of categories to send to the server, so that data for this category is fetched.|-|
|log|Logging function for degugging.|-|
|show_filter_method|Returns whether the filter option should be visible or not.|-|
|toggleSeenFilter|Toggle the seen icon.|-|
|toggleShuffle|Toggle the shuffle button.|-|
|get_data|Get data from the server for the first time, when the page loads.|-|
|get_more_data|Get more data from the server, as soon as the bottom of the page is hit.|-|
|save_preferences|Saves the user preferences.|-|
|addStarCategory|Add a category to the preferences from the starred list of categories.|-|
|addStarTag|Add a tag to the preferences from the starred list of tags.|-|
|get_endpoint|Get the api enpoint.|-|
|get_body|Get the api endpont body data; namely, the preferences, and paging data.|-|
|get_headers|Get api endpoint authorisation headers.|-|
|get_outstanding|Gets list of resources already sent by the server, which the user has not yet seen.|-|
|seen|Called if the sees a resource.|-|
|like|Called if the user likes a resource.|-|
|dislike|Called if the user dislikes a resource.|-|
|favourite|Called if the user favourites a resource.|-|
|search|Called when the user searches for something in the preferences.|-|
|addFilterItem|Called when the user adds an item from the dropdown menu in the filter preferences.|-|
|removeDups|Removes any duplicate categories the user tries to add.|-|
|removeFilterItem|Removes an item from the user selected items from the dropdown menu in the filter preferences.|-|
|remove_category|Removes a category from the user selected items from the dropdown menu in the filter preferences.|-|
|openTheatre|Opens the theatre.|-|

<!-- @vuese:Media:methods:end -->


## Data

<!-- @vuese:Media:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|name|`Member`|The description of the current page.|-|
|show_filter|`Boolean`|Deprecated.|false|
|filter_show|`Boolean`|Whether the filter bar and additional preferences are visible.|false|
|hide_filter_for|`Array`|List of pages for which filter options are not available.|[Recommended,Explore]|
|resources|`Object`|List of resources sent by the server.|-|
|media_type|`Array`|Deprecated. The media types available.|[img,gif,web_video]|
|orientation|`Array`|The user orientations.|-|
|art|`Array`|The user art preferences.|-|
|seen_resources|`Array`|List of resource ids which the user has already seen, so that we can grey it.|-|
|page|`Number`|Sent to the server to keep track of which resources are already sent.|0|
|loading|`Boolean`|Whether the data is still being loaded.|true|
|endpoint_unauth|`Member`|The endpoint to fetch the data from. Used when the user wasn't logged in. Now there is no difference.|-|
|endpoint_auth|`Member`|The endpoint to fetch the data from.|-|
|searching|`Boolean`|Whether the user has submitted a search query.|false|
|search_string|`String`|The search string by the user.|-|
|category_search|`String`|Deprecated.|-|
|subtitle|`Member`|The tagline related to the page, shows on the first thumbnail.|-|
|categories|`Logical`|List of categories selected by the user to be sent to the server.|-|
|buffer|`Null`|Deprecated.|-|
|loading_data|`Boolean`|Whether the data is still loading.|false|
|loading_message|`String`|Deprecated.|-|
|getting_data|`Boolean`|Whether data is being fetched from the server at the moment.|false|
|data_lock|`Number`|The data lock is used to coordinate fetching data from the server. If this is not 0, then no data will be fetched.|0|
|all_ids|`Array`|List of all resource ids|-|
|outstanding_server|`Array`|Deprecated.|-|
|outstanding|`Array`|Data from the server that we are echoing to make sure we receive the corrent resources.|-|
|seen_ids|`Array`|List of resource ids seen by the user.|-|
|refresh|`Boolean`|Used for automatic refreshing. Currently the user has to manually refresh to avoid taxing the server.|true|
|show_refresh|`Boolean`|If true, then add a blinking icon to the refresh button to fetch new data. Is true when the user changes preferences.|false|
|night_mode|`Boolean`|Deprecated.|true|
|seen_filter|`Null`|Whether the user wants to view already seen resources or not.|-|
|star_categories|`Array`|List of starred categories.|-|
|star_tags|`Array`|List of starred tags.|-|
|shuffle|`Boolean`|Whether the user wants to shuffle the order of the resources. Is used in the library.|false|
|category_items|`Array`|List of categories.|-|
|searchTag|`Logical`|List of tags selected by the user to be sent to the server.|-|
|searchCat|`Logical`|List of searchable categories.|-|
|user|`Boolean`|The user data.|false|
|from_home_page|`Boolean`|Whether the user has been redirected from the login page. (Old)|false|
|art_styles|`Array`|List of art styles and their icons (for the preferences).|[]|
|orientation_styles|`Array`|List of orientations and their icons (for the preferences).|[]|
|media_types|`Array`|List of media types and their icons (for the preferences).|[]|

<!-- @vuese:Media:data:end -->


