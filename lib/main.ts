import type { VBConfigType } from "./utils.ts"
import { vbHelp } from "./utils.ts"
import VB from "./db.ts"

class VBEngine {
    private config: VBConfigType | null
    constructor() {
        this.config = {
            db: "local",
            key: "app-data-v1",
            defaultData: []
        }
    }

    #startLocal(config: VBConfigType) {

        if (config && config.db && config.key && config.defaultData) { 
            const exist = localStorage.getItem(config.key)
            const data = config?.defaultData === undefined ? this.config?.defaultData : config.defaultData

            if (exist === null) {
                localStorage.setItem(config.key, JSON.stringify(data))
                return true
            } 

            return true
        } else {
            return false
        }
        
    }

    #startSession(config:VBConfigType) {
         if (config && config.db && config.key && config.defaultData) { 
             const exist = sessionStorage.getItem(config.key)
             const data = config?.defaultData === undefined ? this.config?.defaultData : config.defaultData

             if (exist === null) {
                
                sessionStorage.setItem(config.key, JSON.stringify(data))
                return true
             } 
             
             return true
         } else {
             return false
        }
        
        
    }

    init(config: VBConfigType) {
        if (vbHelp.isLocal(config.db) && this.#startLocal(config)) {
            return new VB(config)
        } else if (vbHelp.isSession(config.db) && this.#startSession(config)) {
            return new VB(config)
        }
    }
}


//ENTRY POINT
function vanillaDb(config:VBConfigType) {
    const dbInit = new VBEngine()
    return dbInit.init(config)
}

//create new db anytime
const vb  = new VBEngine()

export { vanillaDb, vb }