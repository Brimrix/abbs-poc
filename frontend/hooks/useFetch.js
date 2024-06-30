import { getCookieValue } from "@/utils";
import { message } from "antd";

const useFetch = async (url, options, authorized = true) => {
    const response = await fetch(import.meta.env.VITE_BASE_SERVER + url, {
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookieValue("csrftoken"),
            ...((getCookieValue("accessToken") && authorized) && { "Authorization": `Token ${getCookieValue('accessToken')}` })
        },
        ...options
    })
    const data = await response.json()

    if (response.ok) {
        return { ok: response.ok, data, status: response.status }
    } else {
        if (response.status === 401) {
            message.error("Invalid credentials, token expired or outdated")
            document.cookie = 'test=non';
        }
        message.error("Something is wrong")
    }
}

export { useFetch }
