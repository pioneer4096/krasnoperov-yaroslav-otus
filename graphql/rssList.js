const rssList = [
    {
        id: 1,
        name: 'Диалоги о животных'
    },
    {
        id: 2,
        name: 'Спортивные новости'
    },
    {
        id: 3,
        name: 'История исскуств'
    },
]

const formatRssList = () => {
    const list = rssList.map(el => `<li>${el.id}) ${el.name}</li>`).join('')
    return `<div><ul>${list}</ul></div>`
}

module.exports = formatRssList