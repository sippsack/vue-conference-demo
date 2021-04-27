app.component('event-details', {
    template:
        /*html*/
        `<div class="product-display"><b>{{ speakerText }}:</b><br/>{{ event.abstractText }}</div>`,
    props: {
        event: {
            type: Object,
            required: true
        }
    },
    computed: {
        speakerText() {
            return this.event.speakers.map(s => s.name).join(", ")
        }
    }
})
