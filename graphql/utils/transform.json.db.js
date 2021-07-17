function transformToDBFormat(json = {}) {
    const channel = json?.rss?.channel ? json.rss.channel : null
    if(!channel) {
        throw new Error('')
    }

    const rss = {
        title: channel.title || null,
        text: channel.text || null,
        description: channel.description || null
    }

    const items = channel.item ? channel.item : []
    const documents = items.map(i => {
        return {
            title: i.title || null,
            link: i.link || null,
            original: JSON.stringify(i)
        }
    })

    return {
        rss,
        documents
    }
}

module.exports = transformToDBFormat
