const useFetch = async (url, options) => {
    const response = await fetch(import.meta.env.VITE_BASE_SERVER + url, options)
    const data = await response.json()

    if (response.ok) {
        return data
    } else {
        alert("Failed to fetch")
    }
}

export { useFetch }
