export const formatName = (name: string | undefined) => {
    if (!name) return ''
    if (name.slice(-1) === 'а') {
        return `${name.slice(0, -1)}е`
    }

    return `${name}у` || ''
}