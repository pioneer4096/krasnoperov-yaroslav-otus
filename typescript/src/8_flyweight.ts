enum Models {
    bmw,
    audi
}

interface ICar {
    model: Models
    price: number
}

class Car implements ICar {
    model: Models
    price: number

    constructor(model: Models, price: number) {
        this.model = model
        this.price = price
    }
}

class CarFactory {
    cars: Array<ICar>

    constructor() {
        this.cars = []
    }

    create(model: Models, price: number): ICar {
        const candidate = this.getCar(model)
        if (candidate) {
            return candidate
        }

        const newCar = new Car(model, price)
        this.cars.push(newCar)
        return newCar
    }

    getCar(model: Models): ICar | undefined {
        return this.cars.find(car => car.model === model)
    }
}

const factoryInstance = new CarFactory()

const bmwX6 = factoryInstance.create(Models.bmw, 10000)
const audi = factoryInstance.create(Models.audi, 12000)
const bmwX3 = factoryInstance.create(Models.bmw, 8000)

console.log('hellllooo world...')
