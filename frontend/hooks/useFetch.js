import { getCookieValue } from "@/utils";

const useFetch = async (url, options) => {
    const response = await fetch(import.meta.env.VITE_BASE_SERVER + url, {
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookieValue("csrftoken"),
            ...(getCookieValue("accessToken") && { "Authorization": `Token ${getCookieValue('accessToken')}` })
        },
        ...options
    })
    const data = await response.json()

    if (response.ok) {
        return { ok: response.ok, data, status: response.status }
    } else {
        alert("Failed to fetch")
    }
}

export { useFetch }
