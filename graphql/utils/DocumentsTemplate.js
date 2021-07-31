class DocumentsTemplate {
    static toTemplate(docs) {
        return `<div>${JSON.stringify(docs)}</div>`
    }
}

module.exports = DocumentsTemplate
