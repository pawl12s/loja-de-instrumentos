import { randomUUID } from "crypto"

export class DatabaseMemory {
    #instrumentosmentos = new Map()

    list(search) {
        return Array.from(this.#instrumentosmentos.entries()).map((instrumentosmentosArray) => {
            const id = instrumentosmentosArray[0]
            const data = instrumentosmentosArray[1]

            return {
                id,
                ...data
            }

        })
            .filter(instrumentos => {
                if (search) {
                    return instrumentos.instrumentos.includes(search)
                }
                return true
            })
    }
    create(instrumentos) {
        const instrumentosId = randomUUID()
        this.#instrumentosmentos.set(instrumentosId, instrumentos)
    }
    update(id, instrumentos) {
        this.#instrumentosmentos.set(id, instrumentos)
    }
    delete(id, instrumentos) {
        this.#instrumentosmentos.delete(id, instrumentos)
    }
}