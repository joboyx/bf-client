# Reporting

Reporting modal, which is available in the theatre. This component allows people to suggest changes to a current resource. This component has replaced `Reporting_old`. It imitates the `ModerationAdmin` in a way that everything is visible on a single page.

## Props

<!-- @vuese:Reporting:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|resource|-|—|`false`|-|
|open|-|—|`false`|-|
|mode|-|—|`false`|-|

<!-- @vuese:Reporting:props:end -->


## Events

<!-- @vuese:Reporting:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|close_report|Sends a message to the theatre that the keyboard funcationly should be reverted to how the theathre wants it.|-|
|send_report|Sends a message to the theathre that the user is done reporting, and that functionality can be reverted to how the theatre needs it.|-|
|close_report_button|-|-|

<!-- @vuese:Reporting:events:end -->


## Methods

<!-- @vuese:Reporting:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|set_page|Called when the user selects a different tab/page.|-|
|set_tab|Called when the user scrolls the pages using the keyboard.|-|
|key|Used to detect keyboard input.|-|
|next|When the user wants to go to the next page.|-|
|close|Called when the user closes the reporting modal.|-|
|send_report|Send the report to the server.|-|
|open_dialog|Opens the reporting modal.|-|

<!-- @vuese:Reporting:methods:end -->


## Data

<!-- @vuese:Reporting:data:start -->
|Name|Type|Description|Default|
|---|---|---|---|
|open|`Boolean`|Whether the modal is open or not.|false|
|tabs|`Number`|Which tab is currently selected, for the underscore.|0|
|current_page|`String`|The which is currently loaded.|Orientation|
|orientation_suggestion|`String`|What the user suggests the orientation should be.|-|
|art_suggestion|`String`|What the user suggests the art type should be.|-|
|media_suggestion|`String`|What the user suggest the media type should be.|-|
|del|`String`|Whether the user suggests the resource should be deleted.|fine|
|media_types|`Array`|List of all media types.|[img,gif,web_video,video]|
|orientations|`Array`|List of orientations.|[straight,gay,lesbian,trans,solo-man,solo-woman]|
|art_styles|`Array`|List of art styles.|[real-life,comic,three-d]|
|pages|`Array`|All the pages of the reporting modal.|[Orientation,Art,Type,MD]|

<!-- @vuese:Reporting:data:end -->


