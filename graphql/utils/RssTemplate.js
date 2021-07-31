class RssTemplate {
    static toTemplate(rss) {
        return `<div>${JSON.stringify(rss)}</div>`
    }
}

module.exports = RssTemplate
