<template>
    <div>
        <v-container fluid justify-center>
            <v-layout row justify-center>
                <v-flex xs12 sm10 md8 class="subheading font-weight-light">
                    <h1 class="display-3">Help</h1>

                    <p class="font-italic">This page is outdated, but will be updated shortly to reflect the new changes.</p>

                    <p class="subheading font-weight-light"  align="justify">
                    Below are some general pointers and guidelines.
                    </p>




                    <h2 class="display-1 mb-2">Keyboard shortcuts</h2>
                    <p class="subheading font-weight-light" align="justify">

                    Once you are in theatre mode, you can use the following keyboard shortcuts:
                            <ul>
                                <li><v-icon>arrow_back</v-icon> or <strong>A</strong> - Previous item</li>
                                <li><v-icon>arrow_forward</v-icon> or <strong>D</strong> - Next item</li>
                                <li><v-icon>arrow_upward</v-icon> or <strong>W</strong> - Like</li>
                                <li><v-icon>arrow_downward</v-icon> or <strong>S</strong> - Dislike</li>
                                <li><v-icon>subdirectory_arrow_left</v-icon> or <strong>F</strong> - Favourite</li>

                                <li><strong>E</strong> - Toggle Autofap</li>
                                <li><strong>M</strong> - Report missing item (this item is not available to blocked due to copyright).</li>
                                <li><strong>T</strong> - Open Tag Suggestions. </li>
                                <li><strong>R</strong> - Open Reporting. </li>
                                <li><strong>Esc</strong> key or <strong>Q</strong> - Exit theatre mode</li>
                            </ul>
                            <!-- You can click the autofap button to just sit back and keep going ;) (Click on more to change the speed of transistions) -->

                    </p>

                    <h1 class="display-1 mb-2">Moderation</h1>
                    <h2 class="title mb-2">Tagging</h2>
                    <p class="subheading font-weight-light" align="justify">
                        If a tag is missing from an item, you can add these by clicking the 'Add Tag' button. You can add multiple tags in one go.
                        Once a tag is added to an element, others can upvote and downvote tags. This will give the moderaters an idea of how valuable the tag is before accepting/rejecting.
                    </p>

                    <h2 class="title mb-2">Missing items</h2>
                    <p class="subheading font-weight-light" align="justify">

                    It is possible that some elements are missing or removed due to copyright issues. These can reported missing using the 'M' keyboard shortcut, clicking on the 'Missing' button, or clicking on the 'Report' button and subsequently selecting the 'Missing' option.
                    </p>

                    <h2 class="title mb-2">Reporting</h2>
                    <p align="justify" class="subheading font-weight-light">
                    Apart from missing items, it is possible that there are a few other issues. 
                    <ol>
                        <li>The media type of an item could be wrong. For example, it is classified as an image, whereas it is a video.</li>
                        <li>The art style is wrong. For example, it is classified as 'hentai', but is 'real-life'.</li>
                        <li>The sexual orientation is wrong. For example, it is classified under 'lesbian', but in fact should be 'straight'. </li>
                    </ol>
                    </p>
                    <p>
                        The reporting dialog can be intuitively and quickly manipulated with keyboard shortcuts. Use the <strong>Tab</strong> key to navigate the tabs.
                        Use the numbers to quickly assign the values. The report can be sent with the <strong>F</strong> key, by hitting <strong>Enter</strong>, or by clicking on send.
                        The report dialog can be opened and closed using <strong>R</strong>. Alternatvely, the dialog can be closed using the <strong>Esc</strong> key. 
                    </p>


                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    head () {
        return {
            titleTemplate: `Help - Bunnyfap`,
            meta: [{
                hid: 'description',
                name: 'description',
                content: `Need some help navigating Bunnyfap? Check out this page.`
            }],
        }
    }
}
</script>

<style scoped>

</style>
