enum ActionType {
    INCREMENT,
    DECREMENT,
    ADD
}

interface IAction {
    type: ActionType
    payload?: any
}

interface IObserver {
    state: number
    initialState: number

    update(action: IAction): void
}

class Subject {
    observers: Array<IObserver>

    constructor() {
        this.observers = []
    }

    subscribe(observer: IObserver) {
        this.observers.push(observer)
    }

    unsubscribe(observer: IObserver) {
        this.observers = this.observers.filter(obs => obs !== observer)
    }

    fire(action: IAction) {
        this.observers.forEach(observer => {
            observer.update(action)
        })
    }
}

class Observer implements IObserver {
    state: number
    initialState: number

    constructor(state: number = 1) {
        this.state = state
        this.initialState = state
    }

    update(action: IAction) {
        switch (action.type) {
            case ActionType.INCREMENT:
                this.state = ++this.state
                break
            case ActionType.DECREMENT:
                this.state = --this.state
                break
            case ActionType.ADD:
                this.state += action.payload
                break
            default:
                this.state = this.initialState
        }
    }
}

const stream$ = new Subject()

const obs1 = new Observer()
const obs2 = new Observer(42)

stream$.subscribe(obs1)
stream$.subscribe(obs2)

stream$.fire({type: ActionType.INCREMENT})
stream$.fire({type: ActionType.INCREMENT})
stream$.fire({type: ActionType.DECREMENT})
stream$.fire({type: ActionType.ADD, payload: 10})

console.log(obs1.state)
console.log(obs2.state)
