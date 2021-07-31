const DB_FIXTURE = {
    rss: {
        title: 'vue is cool',
        link: 'https://vuejs.org/',
        description: 'The Progressive JavaScript Framework'
    },
    documents: [
        {title: 'vuex', link: 'https://vuex.vuejs.org/'},
        {title: 'nuxt', link: 'https://ssr.vuejs.org'},
    ]
}

const AJAX_FIXTURE = {
    rss: {
        title: 'angular is powerful',
        link: 'https://angular.io/',
        description: 'The modern web developer \'s platform'
    },
    documents: [
        {title: 'rxjs', link: 'https://angular.io/guide/rx-library'},
        {title: 'material', link: 'https://material.angular.io/'},
        {title: 'universal', link: 'https://angular.io/guide/universal'}
    ]
}

const AJAX_FIXTURE_XML = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"
   xmlns:content="http://purl.org/rss/1.0/modules/content/"
   xmlns:wfw="http://wellformedweb.org/CommentAPI/"
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:atom="http://www.w3.org/2005/Atom"
   xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
   xmlns:slash="http://purl.org/rss/1.0/modules/slash/"

   xmlns:georss="http://www.georss.org/georss"
   xmlns:geo="http://www.w3.org/2003/01/geo/wgs84_pos#"
>

    <channel>
        <title>${AJAX_FIXTURE.rss.title}</title>
        <link>${AJAX_FIXTURE.rss.link}</link>
        <description>${AJAX_FIXTURE.rss.description}</description>
        <item>
            <title>${AJAX_FIXTURE.documents[0].title}</title>
            <link>${AJAX_FIXTURE.documents[0].link}</link>
            <pubDate>Fri, 09 Jul 2021 15:35:15 +0000</pubDate>
        </item>
        <item>
            <title>${AJAX_FIXTURE.documents[1].title}</title>
            <link>${AJAX_FIXTURE.documents[1].link}</link>
            <pubDate>Fri, 09 Jul 2021 15:35:15 +0000</pubDate>
        </item>
        <item>
            <title>${AJAX_FIXTURE.documents[2].title}</title>
            <link>${AJAX_FIXTURE.documents[2].link}</link>
            <pubDate>Fri, 09 Jul 2021 15:35:15 +0000</pubDate>
        </item>
    </channel>
</rss>`

module.exports = {
    DB_FIXTURE, AJAX_FIXTURE, AJAX_FIXTURE_XML
}
