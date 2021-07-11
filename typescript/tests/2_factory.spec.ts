import {MemberFactory, Memberships, PremiumMembership, SimpleMembership, StandardMembership} from '../src/2_factory'

describe('Testing 2_factory', () => {
    let factory: MemberFactory
    const name = 'Pouancare'

    beforeEach(() => {
        factory = new MemberFactory()
    });

    it('on type standard should create StandardMembership instance', () => {
        const instance = factory.create(name, Memberships.standard)
        expect(instance instanceof StandardMembership).toBeTruthy()
    })

    it('on type standard should set name correctly', () => {
        const instance = factory.create(name, Memberships.standard)
        expect(instance.name).toBe(name)
    })

    it('on type premium should create PremiumMembership instance', () => {
        const instance = factory.create(name, Memberships.premium)
        expect(instance instanceof PremiumMembership).toBeTruthy()
    })

    it('on type premium should set name correctly', () => {
        const instance = factory.create(name, Memberships.premium)
        expect(instance.name).toBe(name)
    })

    it('on type simple should create SimpleMembership instance', () => {
        const instance = factory.create(name, Memberships.simple)
        expect(instance instanceof SimpleMembership).toBeTruthy()
    })

    it('on type simple should set name correctly', () => {
        const instance = factory.create(name, Memberships.simple)
        expect(instance.name).toBe(name)
    })

    it('on empty type should create SimpleMembership instance', () => {
        const instance = factory.create(name)
        expect(instance instanceof SimpleMembership).toBeTruthy()
    })

    it('on empty type should set name correctly', () => {
        const instance = factory.create(name)
        expect(instance.name).toBe(name)
    })
})