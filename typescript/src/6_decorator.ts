enum Providers {
    aws = 'aws',
    azure = 'azure'
}

interface IServer {
    ip: string
    port: number
    url(): string
}

class AbstractServer implements IServer {
  ip: string
  port: number
  url() {
      return ''
  }
}

class ConcreteServer extends AbstractServer {
  ip: string
  port: number

  constructor(ip: string, port: number) {
    super()
    this.ip = ip
    this.port = port
  }

  url(): string {
    return `https://${this.ip}:${this.port}`
  }
}

class ServerDecorator extends AbstractServer {
  server: IServer

  constructor(server: IServer) {
    super()
    this.server = server
  }

  url(): string {
    return this.server.url()
  }
}

class AwsServer extends ServerDecorator {
  type = Providers.aws

  constructor(server: IServer) {
    super(server)
  }

  url(): string {
      return this.server.url() + '/aws'
  }

  sayHi(): string {
      return `server ${this.type} say Hello!!!`
  }
}

class AzureServer extends ServerDecorator {
  type = Providers.azure
  isAzure = true

  constructor(server: IServer) {
      super(server)
      server.port = server.port + 777
  }
}

const s1 = new AwsServer(new ConcreteServer('12.34.56.78', 8080))
console.log(s1.sayHi())
console.log(s1.url())

const s2 = new AzureServer(new ConcreteServer('98.87.76.12', 1000))
console.log(s2.isAzure)
console.log(s2.url())
