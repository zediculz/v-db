
import { vanillaDb, vb } from "../lib/main.ts"

const db = vanillaDb({
    db: "ls",
    key: "app-test-data",
    defaultData: [1]
})

db?.update(4, "Holak")
console.log(db?.getById(4))

const d = vb.init({
    db: "session",
    key: "app-test-data",
    defaultData: ["1"]
})

d?.update(1, "Joe")

console.log(d?.get())