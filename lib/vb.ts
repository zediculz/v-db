import { vbHelp, type VBConfigType } from "./utils"

class VB {
    config: VBConfigType
    constructor(config:VBConfigType) {
        this.config = config
        return this
    }

    set(data:any) {
        const newArr = []
        const old = this.get()
        newArr.push(data)
        const nd = [...newArr, ...old]

        if (vbHelp.isLocal(this.config.db)) {
            VB._localSet(this.config.key, nd)
        } else if (vbHelp.isSession(this.config.db)) {
           VB._sessionSet(this.config.key, nd)
        }
    }

    get() {

        if (vbHelp.isLocal(this.config.db)) {
            return VB._localGet(this.config.key)
        } else if (vbHelp.isSession(this.config.db)) {
            return VB._sessionGet(this.config.key)
        }
    }

    getById(id:number) {
        if (vbHelp.isLocal(this.config.db)) {
            const data = VB._localGet(this.config.key)
            return data[id]
        } else if (vbHelp.isSession(this.config.db)) {
            const data = VB._sessionGet(this.config.key)
            return data[id]
        }
    }

    update(id:number, data:any) {
        
        if (this.getById(id) === undefined) {
            return undefined
        } else {
            const old = this.get()
            old[id] = data
            
            if (vbHelp.isLocal(this.config.db)) {
                VB._localSet(this.config.key, old)
            } else if (vbHelp.isSession(this.config.db)) {
                VB._sessionSet(this.config.key, old)
            }
        }
    }

     remove(id:number) {
        
        if (this.getById(id) === undefined) {
            return undefined
        } else {
            const others = this.get()?.filter((_o:any, i:number) => i !== id)
            
            if (vbHelp.isLocal(this.config.db)) {
                VB._localSet(this.config.key, others)
            } else if (vbHelp.isSession(this.config.db)) {
                VB._sessionSet(this.config.key, others)
            }
        }
    }


    clear() {
        if (vbHelp.isLocal(this.config.db)) {
            localStorage.removeItem(this.config.key)
        } else if (vbHelp.isSession(this.config.db)) {
            sessionStorage.removeItem(this.config.key)
        }
    }

    static _sessionSet(key:string, data:any) {
        sessionStorage.setItem(key, JSON.stringify(data))
    }

    static _localSet(key:string, data:any) {
        localStorage.setItem(key, JSON.stringify(data))
    }

     static _sessionGet(key:string) {
        const data = sessionStorage.getItem(key)
        return JSON.parse(data as string)
    }

    static _localGet(key:string) {
        const data = localStorage.getItem(key)
        return JSON.parse(data as string)
    }
}

export default VB