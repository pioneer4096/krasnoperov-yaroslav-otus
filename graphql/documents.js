const documents = [
    {
        id: 1,
        date: 1622562533,
        title: 'Диалоги о рыбалке',
        description: 'Интересные истории о рыбалке, на рыбалке, около рыбалки',
        category: 'рыбалка'
    },
    {
        id: 2,
        date: 1622648933,
        title: 'Спортивные рекорды',
        description: 'Рекордсмены, чемпионы, ',
        category: 'спорт'
    },
    {
        id: 3,
        date: 1623080933,
        title: 'Финансы с Уолл-Стрит',
        description: 'Последние финансовые отчеты с Уолл-Стрит',
        category: 'финансы'
    },
    {
        id: 4,
        date: 1612712933,
        title: 'Микеланджело творит',
        description: 'Сложно ли сделать скульптуру высотой с дом, или написать картину под водой в акваланге?',
        category: 'искусство'
    },
]

const formatDocs = () => {

    const rows = documents.map(el => `
        <tr>
            <td>${el.id}</td>
            <td>${el.date}</td>
            <td>
                <span style="font-weight: bold; font-size: 1.2rem;">${el.title}</span> 
                <span>( ${el.description} )</span>
             </td>
             <td>${el.category}</td>
        </tr>`).join('')

    return `
    <div>
        <table style="width: 100vw; height: 100vh;">
        <tr>
            <th>ID</th><th>Дата</th><th>Документ</th><th>Категория</th>
        </tr>
            ${rows}
        </table>
    </div>`
}

module.exports = formatDocs