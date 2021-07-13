const rss = {
    title: 'Yahoo News - Latest News & Headlines',
    link: 'https://www.yahoo.com/news',
    description: 'The latest news and headlines from Yahoo! News. Get breaking news stories and in-depth coverage with videos and photos.'
}

const documents = [
    {
        "title": "Tropical Storm Elsa is the latest evidence climate change is happening now",
        "link": "https://news.yahoo.com/tropical-storm-elsa-is-the-latest-evidence-climate-change-is-happening-now-171321256.html",
        "pubDate": "2021-07-01T17:13:21Z",
        "source": {
            "url": "https://news.yahoo.com/",
            "$t": "Yahoo News"
        },
        "guid": {
            "isPermaLink": "false",
            "$t": "tropical-storm-elsa-is-the-latest-evidence-climate-change-is-happening-now-171321256.html"
        },
        "media:content": {
            "height": "86",
            "url": "https://s.yimg.com/os/creatr-uploaded-images/2021-07/7bf44480-da8a-11eb-bc3d-1174bdfaf5eb",
            "width": "130"
        },
        "media:credit": {
            "role": "publishing company"
        }
    },
    {
        "title": "NYPD hunting for man involved in apparent broad daylight sexual assault of woman: Video",
        "link": "https://news.yahoo.com/nypd-hunting-man-involved-apparent-133600133.html",
        "pubDate": "2021-07-02T13:36:00Z",
        "source": {
            "url": "https://www.washingtonexaminer.com/",
            "$t": "Washington Examiner"
        },
        "guid": {
            "isPermaLink": "false",
            "$t": "nypd-hunting-man-involved-apparent-133600133.html"
        },
        "media:content": {
            "height": "86",
            "url": "https://s.yimg.com/uu/api/res/1.2/TTgN7IjW.DGwwymqlEOoQA--~B/aD05NDA7dz0xNTQwO2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/washington_examiner_articles_265/934ccd6361cb040cc0a7f9ca2087b5b8",
            "width": "130"
        },
        "media:credit": {
            "role": "publishing company"
        }
    }
]


module.exports = {
    rss,
    documents
}
