enum Operation {
  add,
  sub
}

class OldCalc {
  operations(t1: number, t2: number, operation: Operation): number {
    switch (operation) {
      case Operation.add: return t1 + t2
      case Operation.sub: return t1 - t2
      default: return NaN
    }
  }
}

class NewCalc {
  add(t1: number, t2: number): number {
    return t1 + t2
  }

  sub(t1: number, t2: number): number {
    return t1 - t2
  }
}

class CalcAdapter {
  calc: NewCalc

  constructor() {
    this.calc = new NewCalc()
  }

  operations(t1: number, t2: number, operation: Operation): number {
    switch (operation) {
      case Operation.add: return this.calc.add(t1, t2)
      case Operation.sub: return this.calc.sub(t1, t2)
      default: return NaN
    }
  }
}

const oldCalc = new OldCalc()
console.log(oldCalc.operations(10, 5, Operation.add))

const newCalc = new NewCalc()
console.log(newCalc.add(10, 5))

const adapter = new CalcAdapter()
console.log(adapter.operations(25, 10, Operation.sub))


