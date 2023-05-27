

export const isObjectEmpty = ( _ : Object) => {
    return Object.keys(_).length === 0 && _.constructor === Object
}