import {Providers, ConcreteServer, AwsServer, AzureServer} from  "../src/6_decorator"

describe('Testing 6_decorator', () => {
    let server: ConcreteServer
    const SERVER_PORT: number = 8080
    const SERVER_IP: string = '12.34.56.78'

    beforeEach(() => {
        server = new ConcreteServer(SERVER_IP, SERVER_PORT)
    });

    it('concrete server should set ip address correctly', () => {
        expect(server.ip).toBe(SERVER_IP)
    })

    it('concrete server should set port correctly', () => {
        expect(server.port).toBe(SERVER_PORT)
    })

    it('concrete server should return url string correctly', () => {
        expect(server.url()).toBe(`https://${SERVER_IP}:${SERVER_PORT}`)
    })

    it('aws server should sayHi correctly', () => {
        const aws = new AwsServer(server)
        expect(aws.sayHi()).toBe(`server ${Providers.aws} say Hello!!!`)
    })

    it('aws server should return correct url path', () => {
        const aws = new AwsServer(server)
        expect(aws.url()).toBe(server.url() + '/aws')
    })

    it('azure server should have property isAzure', () => {
        const azure = new AzureServer(server)
        expect(azure.isAzure).toBeTruthy()
    })

    it('azure server should return correct url path with port +777', () => {
        const azure = new AzureServer(server)
        expect(azure.url()).toBe(`https://${SERVER_IP}:${SERVER_PORT + 777}`)
    })
})