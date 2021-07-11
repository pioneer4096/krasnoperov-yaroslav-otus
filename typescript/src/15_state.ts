enum Color {
    red,
    yellow,
    green
}

enum Action {
    STOP = 'СТОП',
    PREPARE = 'ГОТОВЬСЯ',
    GO = 'ЕДЬ'
}

interface ILight {
    light: Color
    action: Action

    sign(): Action
}

class Light implements ILight {
    light: Color
    action: Action

    constructor(light: Color, action: Action) {
        this.light = light
        this.action = action
    }

    sign(): Action {
        return this.action
    }
}

class RedLight extends Light {
    constructor() {
        super(Color.red, Action.STOP)
    }
}

class YellowLight extends Light {
    constructor() {
        super(Color.yellow, Action.PREPARE)
    }
}

class GreenLight extends Light {
    constructor() {
        super(Color.green, Action.GO)
    }
}

class TrafficLight {
    states: Array<ILight>
    current: ILight

    constructor() {
        this.states = [
            new RedLight(),
            new YellowLight(),
            new GreenLight()
        ]
        this.current = this.states[0]
    }

    change() {
        const total = this.states.length
        let index = this.states.findIndex(light => light === this.current)

        if (index + 1 < total) {
            this.current = this.states[index + 1]
        } else {
            this.current = this.states[0]
        }
    }

    sign() {
        return this.current.sign()
    }
}

const traffic = new TrafficLight()
console.log(traffic.sign())
traffic.change()

console.log(traffic.sign())
traffic.change()

console.log(traffic.sign())
traffic.change()

console.log(traffic.sign())
traffic.change()

console.log(traffic.sign())
traffic.change()

console.log(traffic.sign())
traffic.change()
