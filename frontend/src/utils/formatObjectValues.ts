export default function (data:object): object {
let obj:Record<string, any> ={}
Object.entries(data).forEach(([key, value])=> {
 if (typeof(value) === 'string'){
    value = value.trim()
 }
 obj[key] = value
})
return obj
}