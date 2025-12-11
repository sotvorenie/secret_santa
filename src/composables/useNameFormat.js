export const formatName = (name) => {
    if (name.slice(-1) === 'а') {
        return `${name.slice(0, -1)}е`
    }

    return `${name}у` || ''
}