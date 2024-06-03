import { useState } from "react"

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState(false)
    const getCookieValue = (name) => (
        document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
    )
    const handleFormSubmit = async (event) => {
        event.preventDefault()
        const response = await fetch('http://localhost:8000/login/', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                "X-CSRFToken": getCookieValue('csrftoken')
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        setSuccess(response.ok)
    }
    return <div className="m-5 p-2 card w-25">
        <h2>Header of login</h2>
        <form className="d-flex flex-column gap-4" onSubmit={handleFormSubmit}>
            <input
                value={username}
                onInput={(event) => setUsername(event.target.value)}
                type="text"
                name="username"
                placeholder="Email"
                className="form-control form-control-lg" />

            <input
                value={password}
                onInput={(event) => setPassword(event.target.value)}
                type="password"
                name="password"
                id="password"
                className="form-control form-control-lg"
                placeholder="Password" />
            <button type="submit" className="btn btn-primary p-2">Login</button>
        </form>
        {success && <div className="alert alert-success">Logged in</div>}
        {!success && <div className="alert alert-danger">Failure</div>}
    </div>
}

export default Login
