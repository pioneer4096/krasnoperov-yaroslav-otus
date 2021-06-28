import {Server, ServerProtocols} from  "../src/1_constructor"

describe('Testing 1_constructor', () => {
    const SERVER_NAME = 'AWS German'
    const SERVER_IP = '82.21.21.32'
    const DEFAULT_PORT = 80

    it('should correctly create name', () => {
        const server = new Server(SERVER_NAME, SERVER_IP, DEFAULT_PORT)
        expect(server.name).toBe(SERVER_NAME)
    })

    it('should correctly create ip', () => {
        const server = new Server(SERVER_NAME, SERVER_IP, DEFAULT_PORT)
        expect(server.ip).toBe(SERVER_IP)
    })

    it('should correctly create port', () => {
        const server = new Server(SERVER_NAME, SERVER_IP, DEFAULT_PORT)
        expect(server.port).toBe(DEFAULT_PORT)
    })

    it('should correctly create protocol on port 80', () => {
        const server = new Server(SERVER_NAME, SERVER_IP, DEFAULT_PORT)
        expect(server.protocol).toBe(ServerProtocols.http)
    })

    it('should correctly create protocol on port 443', () => {
        const server = new Server(SERVER_NAME, SERVER_IP, 443)
        expect(server.protocol).toBe(ServerProtocols.https)
    })

    it('should correctly create protocol on port 21', () => {
        const server = new Server(SERVER_NAME, SERVER_IP, 21)
        expect(server.protocol).toBe(ServerProtocols.ftp)
    })

    it('should correctly create protocol on undefined port', () => {
        const server = new Server(SERVER_NAME, SERVER_IP)
        expect(server.protocol).toBe(ServerProtocols.http)
    })

    it('should correctly return url', () => {
        const server = new Server(SERVER_NAME, SERVER_IP, DEFAULT_PORT)
        expect(server.getUrl()).toBe(`${ServerProtocols.http}://${SERVER_IP}:${DEFAULT_PORT}`)
    })
})