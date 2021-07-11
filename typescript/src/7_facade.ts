enum ComplaintType {
  service,
  product
}

interface ICompliant {
    id: number
    customer: string
    details: string
}


class Complaints {
  complaints: Array<ICompliant>

  constructor() {
    this.complaints = []
  }

  reply(complaint: ICompliant) {
    throw new Error('method "reply" is not implemented...')
  }

  add(complaint: ICompliant) {
    this.complaints.push(complaint)
    return this.reply(complaint)
  }
}

class ProductComplaints extends Complaints {
  reply({id, customer, details}: ICompliant) {
    return `Product: ${id}: ${customer} (${details})`
  }
}

class ServiceComplaints extends Complaints {
  reply({id, customer, details}: ICompliant) {
    return `Service: ${id}: ${customer} (${details})`
  }
}

class ComplaintRegistry {
  register(customer: string, type: ComplaintType, details: string) {
    const id = Date.now()

    const complaint = (type === ComplaintType.service)
        ? new ServiceComplaints()
        : new ProductComplaints()

    return complaint.add({id, customer, details})
  }
}

const registry = new ComplaintRegistry()

console.log(registry.register('Vladilen', ComplaintType.service, 'недоступен'))
console.log(registry.register('Elena', ComplaintType.product, 'вылазит ошибка'))

