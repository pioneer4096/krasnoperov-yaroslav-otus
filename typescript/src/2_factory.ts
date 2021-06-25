enum Memberships {
    simple = 'простая подписка',
    standard = 'стандартная подписка',
    premium = 'премиум подписка'
}

interface IMember {
    name: string
    cost: number
    type: Memberships
    define(): void
}

interface IFreeze {
    freezeDays: number
    freeze(): void
}

class Membership implements IMember {
    name: string
    cost: number
    type: Memberships

    constructor(name: string, cost: number, type: Memberships) {
        this.name = name
        this.cost = cost
        this.type = type
    }

    define() {
        console.log(`${this.name} (${this.type}): ${this.cost}`)
    }
}

class SimpleMembership extends Membership {
    static PRICE: number = 100
    static TYPE = Memberships.simple

    constructor(name: string) {
        super(name, SimpleMembership.PRICE, SimpleMembership.TYPE)
    }
}

class StandardMembership extends Membership {
    static PRICE: number = 150
    static TYPE = Memberships.standard

    constructor(name: string) {
        super(name, StandardMembership.PRICE, StandardMembership.TYPE)
    }
}

class PremiumMembership extends Membership implements IFreeze {
    static PRICE: number = 250
    static TYPE = Memberships.premium
    freezeDays = 90

    constructor(name: string) {
        super(name, PremiumMembership.PRICE, PremiumMembership.TYPE)
    }

    freeze() {
        console.log(`You can freeze membership for a ${this.freezeDays} days`)
    }

    define() {
        super.define()
        this.freeze()
    }
}


class MemberFactory {
    create(name: string, type?: Memberships): IMember {
        switch (type) {
            case Memberships.standard: return new StandardMembership(name)
            case Memberships.premium: return new PremiumMembership(name)
            case Memberships.simple:
            default: return new SimpleMembership(name)
        }
    }
}

const factory = new MemberFactory()

const members: Array<IMember> = [
    factory.create('Vladilen', Memberships.simple),
    factory.create('Elena', Memberships.premium),
    factory.create('Vasilisa', Memberships.standard),
    factory.create('Ivan', Memberships.premium),
    factory.create('Petr')
]

members.forEach(m => {
    m.define()
})
