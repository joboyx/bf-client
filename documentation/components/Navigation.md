# Navigation

This components is the top (or side on mobile) navigation bar. It is very convenient to use because it is present on every page. Over time this component has accumulated a lot of functionality, making it slightly unorganised. This navbar contains the following functions: <br> <br> `Navbar button` <br> Logically, it contains all the buttons seen on the screen, such as home, my library etc. <br> <br> `Search feature` <br> The search bar makes use of the `multiselect` component and vuejs plugin. The link to this is https://vue-multiselect.js.org/. The search items are pulled from the API. See backend documenation for this. <br> <br> `Rewards and notifcations` <br> Upon loading the user (see methods), we have the daily streak. We match this with the `/modules/rewards` component to determine the prior and next rewards. We then show this under the carrot icon. The notifcations are also loaded from the user data and displayed as a list. <br> <br> `Tutorials` <br> Since the navbar is present on all pages, it made sense to store the tutorial steps here. The tutorials are made using the `v-tour` plugin. <br> <br> `A note on the vue bus` <br> We make use of the vue bus to communicate between certain components on the website. See the `create` method for the listeners.

## Events

<!-- @vuese:Navigation:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|nightmode|Deprecated|-|

<!-- @vuese:Navigation:events:end -->


## Methods

<!-- @vuese:Navigation:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|skipTour|Iterates over all the tours and calls their respective 'finished' api endpoints.|-|
|finishSingleTutorial|This function is called when the user finishes a specific tutorial so that it is stored in the vuex store user data. Useful when the user does not login.|-|
|finishLanding|Is called when the landing page tutorial is finished.|-|
|finishFlix|Is called when the flix tutorial is finished.|-|
|finishModeration|Is called when the landing moderation tutorial is finished.|-|
|finishModerationRest|Is called when the landing moderation rest tutorial is finished.|-|
|truncate|Is used the truncate the username, so that long usernames do not use of the entirety of the top bar.|-|
|log|Used for testing and debugging.|-|
|test|Used for testing and debugging as well.|-|
|homepage|Used to push to the homepage.|-|
|logout|Logs out the user.|-|
|redirect|Can be used to nagivate to a different page.|-|
|setSlider|Deprecated.|-|
|search|Called when the user makes a search request. We first determine whether a category was selected, a tag was selected, a channel was selected, or whether the user made a free request. We then redirect accordingly.|-|
|update_search_query|Whenever the user types something in the search bar, we update the values accordingly.|-|
|toggle_nightmode|Deprecated.|-|
|dismiss_notification|Clear a single specific notifications.|-|
|dismiss_all_notifications|Clear all notifications.|-|
|get_reward_logo|Depending on the type of reward for the day, get the appropriate icon.|-|
|refresh_carrots|Sometimes the user spends the carrots on a specific page, in which case we want to update here on the navbar the total amount of carrots. We use the vue bus for this. See `created()`.|-|
|update_carrots|Set the number of carrots.|The new number of carrots.|
|emit_user|Uses the view bus to emit to all components the user data.|-|
|login|Used to show login box.|-|
|signup|Used to show the sign up box.|-|
|load_user|After the user data pulled from the users, we use this function parse it.|-|

<!-- @vuese:Navigation:methods:end -->


## Data

<!-- @vuese:Navigation:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|reward_notification|`Boolean`|Whether the user has a notification in the form of a daily streak reward waiting.|false|
|username|`String`|The username of the user.|-|
|night_mode|`Boolean`|Deprecated. This used to determine whether the background was dark or white. Now its all dark.|true|
|admin|`Boolean`|Whether the user is an admin.|false|
|slider|`Boolean`|Deprecated.|false|
|model|`Null`|Deprecated.|-|
|select|`String`|Deprecated.|-|
|side_nav_theme|`String`|Deprecated.|grey darken-4|
|search_string|`String`|The text in the search bar.|-|
|search_items|`Array`|The default items in the search bar.|-|
|color_theme|`String`|Deprecated.|grey darken-4|
|autoselectMenu|`Object`|Deprecated.|-|
|topnav|`Object`|The buttons and items in the top navigation bar.|-|
|sidenav|`Object`|The items and buttons in the side navigation - used on mobile devices.|-|
|drawer|`Null`|Whether the side bar is open or not.|-|
|notifications|`Array`|Array of notification objects.|-|
|notification_menu|`Boolean`|Whether the notification menu is open or not.|false|
|rewards|`Member`|List of rewards|-|
|streak|`Number`|The daily streak value|1|
|carrots|`String`|Number of carrots the user has|-|
|user|`Object`|The user data object. (Username, carrots, preferences, etc.)|-|
|tutorialLandingSteps|`Array`|The data for the landing page tutorial.|[]|
|tutorialLandingMobile|`Array`|The data for the mobile landing page tutorial.|[]|
|tutorialTheatreSteps|`Array`|The data for the theatre tutorial.|[]|
|tutorialNavbarSteps|`Array`|The data for the navigation bar tutorial.|[]|
|tutorialFlixSteps|`Array`|The data for the flix store tutorial.|[]|
|tutorialModerationSteps|`Array`|The data for the moderation page tutorial.|[]|
|tutorialModerationRestSteps|`Array`|The continued data for the moderation page tutorial?|[]|
|tutorialCallbackLanding|`Object`|Call back functions for the skip and finished buttons for the landing page tutorial.|-|
|tutorialCallbackFlix|`Object`|Call back functions for the skip and finished buttons for the flix tutorial.|-|
|tutorialCallbackModeration|`Object`|Call back functions for the skip and finished buttons for the moderation page tutorial.|-|
|tutorialCallbackModerationRest|`Object`|Call back functions for the skip and finished buttons for the continued moderation tutorial?|-|
|tutorialOptions|`Object`|Parameters for the tutorial.|-|

<!-- @vuese:Navigation:data:end -->


