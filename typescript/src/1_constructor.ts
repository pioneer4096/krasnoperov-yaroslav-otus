class Server {
    name: string
    ip: string
    port: number
    protocol: string

    constructor(name: string, ip: string, port: number) {
        this.name = name
        this.ip = ip
        this.port = port
        this.protocol = this.getProtocol(port)
    }

    getUrl() {
        return `${this.protocol}://${this.ip}:${this.port}`
    }

    getProtocol(port?: number): string {
        switch (port) {
            case 443:
                return 'https'
            case 21:
                return 'ftp'

            case 80:
            default:
                return 'http'
        }
    }
}

const aws = new Server('AWS German', '82.21.21.32', 80)
console.log(aws.getUrl())

const selectel = new Server('Selectel Poincare', '94.26.226.21', 443)
console.log(selectel.getUrl())