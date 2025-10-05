
interface VBConfigType {
    db: string
    key: string
    defaultData?: any[]
}

function isLocal(db:string) {
    if (db === "local" || db === "localStorage" || db === "ls") {
       return true
    } else {
        return false
   }
}

function isSession(db:string) {
    if (db === "session" || db === "sessionStorage" || db === "ss") {
       return true
    } else {
        return false
   }
}

export const vbHelp = {
    isLocal, isSession
}


export type {VBConfigType}