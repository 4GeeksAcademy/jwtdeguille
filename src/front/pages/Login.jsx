import { useState } from "react"
import { loginUser } from "../services/APIServices"
import { useNavigate, Link } from "react-router-dom"

export const Login = () => {
    const navigate = useNavigate()
    const [change, setChange] = useState({})
    const [loading, setLoading] = useState(false)

    const handleLogin = (event) => {
        setChange({ ...change, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!change.email || !change.password) {
            alert("Por favor, completa todos los campos")
            return
        }

        setLoading(true)
        try {
            await loginUser(change, navigate)
        } catch (error) {
            console.error("Error en login:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card login-card">
                <div className="card-body p-5">
                    <div className="text-center mb-5">
                        <div className="auth-icon">
                            <i className="fas fa-lock text-white fs-4"></i>
                        </div>
                        <h1 className="auth-title h2 mb-2">Iniciar Sesión</h1>
                        <p className="text-muted">Ingresa a tu cuenta</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="form-label fw-semibold text-dark">
                                Correo Electrónico
                            </label>
                            <input
                                className="form-control form-control-lg"
                                type="email"
                                name="email"
                                placeholder="tucorreo@ejemplo.com"
                                onChange={handleLogin}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="form-label fw-semibold text-dark">
                                Contraseña
                            </label>
                            <input
                                className="form-control form-control-lg"
                                type="password"
                                name="password"
                                placeholder="Tu contraseña"
                                onChange={handleLogin}
                                required
                            />
                        </div>

                        <button
                            className="btn btn-success btn-auth w-100 py-3 fw-semibold"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                    Iniciando sesión...
                                </>
                            ) : (
                                'Iniciar Sesión'
                            )}
                        </button>
                    </form>

                    <div className="text-center mt-4 pt-3 border-top">
                        <p className="text-muted mb-0">
                            ¿No tienes una cuenta?{" "}
                            <Link
                                to="/signup"
                                className="auth-link fw-semibold text-decoration-none"
                            >
                                Regístrate aquí
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}