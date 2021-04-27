const app = Vue.createApp({
    data() {
        return {
            name: 'JavaLand',
            description: 'Die Java Konferenz im Phantasialand',
            url: 'https://www.javaland.eu/',
            logo: './assets/images/logo_javaland.png',
            date: Date.parse('2021-05-15'),
            comment: '',
            restApi: 'https://programm.javaland.eu/2021/rest/conferences/javaland2021/',
            allEvents: [],
            allSpeakers: {},
            filterOnlyStarred: false
        }
    },
    mounted() {
        fetch(this.restApi)
          .then(response => response.json())
          .then(json => {
              json.speakers.forEach(speaker => {
                  this.allSpeakers[speaker.id] = speaker
              });
            this.allEvents = json.events
            this.allEvents.forEach(event => {
                event.speakers = []
                event.speakerIds.forEach(speakerId => {
                    event.speakers.push(this.allSpeakers[speakerId])
                });
                event.favorite = false
                event.showDetails = false
            });
          })
    },
    computed: {
        startDate() {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(this.date).toLocaleDateString('de-DE', options)
        },
        events() {
            return !this.filterOnlyStarred ? this.allEvents : this.allEvents.filter(e => e.favorite)
        },
        numberOfStarred() {
            return this.events.filter(e => e.favorite).length
        }
    },
    methods: {
        toggleStar: function (index) {
            this.events[index].favorite = !this.events[index].favorite
        },
        toggleDetails(index) {
            this.events[index].showDetails = !this.events[index].showDetails
        }
    }
})