const url = import.meta.env.VITE_BASE_URL

export const apiGetCards = async () => {
    const response = await fetch(`${url}/cards`)

    return await response.json()
}

export const apiSetCard = async (data) => {
    const response = await fetch(`${url}/cards/${data.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        throw new Error()
    }
}