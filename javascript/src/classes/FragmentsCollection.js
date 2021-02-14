import {EdgesProvider} from './EdgeProvider'
import {Fragment} from './Fragment'
import {findMaxFragment} from '../utils/maxFragmentUtil'

export class FragmentsCollection {
    constructor() {
        this.fragments = []
    }

    load(edges) {
        const provider = new EdgesProvider(edges)
        this.fragments = []

        while(provider.hasUnusedEdges()) {
            const fragment = new Fragment()

            provider.toStart()
            let edge = null
            while(edge = provider.getEdge()) {
                if(fragment.accept(edge)) {
                    /**
                     После добавления новой связи во фрагмент, надо перебрать все неиспользованные связи заново,
                     так как могла появиться дополнительная точка соприкосновения во фрагменте,
                     к которой может быть можно добавить уже пропущенную связь
                     **/
                    provider
                        .setUsedMark(edge.id)
                        .toStart()
                }
            }
            // после того как перебрали все связи, фрагмент считаем завершенным
            this.fragments.push(fragment.export())
        }
    }

    getMaxFragment() {
        return findMaxFragment(this.fragments)
    }

}