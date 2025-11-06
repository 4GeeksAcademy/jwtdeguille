import { useState } from "react"
import { newUser } from "../services/APIServices"
import { useNavigate, Link } from "react-router-dom"

export const CreateUser = () => {
    const [change, setChange] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (event) => {
        setChange({ ...change, [event.target.name]: event.target.value })
    }

    const handleCreate = async () => {
        if (!change.email || !change.password) {
            alert("Por favor, completa todos los campos")
            return
        }

        setLoading(true)
        try {
            const data = await newUser(change)
            if (data && data.msg === "Usuario creado exitosamente") {
                alert("🎉 ¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.")
                navigate("/login")
            } else {
                alert(data?.msg || "Error al crear la cuenta")
            }
        } catch (error) {
            console.error("Error creando usuario:", error)
            alert("Error al crear la cuenta. Inténtalo de nuevo.")
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleCreate()
    }

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient-primary">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-5 col-lg-6 col-md-8">
                        <div className="card glass-effect shadow-soft border-0 rounded-4 overflow-hidden">
                            <div className="card-header bg-transparent py-4 px-4 border-0">
                                <div className="text-center">
                                    <div className="bg-white bg-opacity-20 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                        style={{ width: '70px', height: '70px', backdropFilter: 'blur(10px)' }}>
                                        <i className="fas fa-rocket text-white fs-3"></i>
                                    </div>
                                    <h2 className="fw-bold text-white mb-2">Comenzar Ahora</h2>
                                    <p className="text-white-50 mb-0">Crea tu cuenta en segundos</p>
                                </div>
                            </div>

                            <div className="card-body p-4 pt-0">
                                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label text-white fw-medium">
                                            <i className="fas fa-user me-2"></i>Nombre Completo
                                        </label>
                                        <input
                                            className="form-control form-control-lg bg-dark bg-opacity-25 text-white border-0 rounded-3"
                                            type="text"
                                            name="name"
                                            placeholder="Ingresa tu nombre"
                                            onChange={handleChange}
                                            required
                                            style={{ backdropFilter: 'blur(10px)' }}
                                        />
                                        <div className="invalid-feedback text-white-50">
                                            Por favor ingresa tu nombre
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label text-white fw-medium">
                                            <i className="fas fa-envelope me-2"></i>Correo Electrónico
                                        </label>
                                        <input
                                            className="form-control form-control-lg bg-dark bg-opacity-25 text-white border-0 rounded-3"
                                            type="email"
                                            name="email"
                                            placeholder="tu@ejemplo.com"
                                            onChange={handleChange}
                                            required
                                            style={{ backdropFilter: 'blur(10px)' }}
                                        />
                                        <div className="invalid-feedback text-white-50">
                                            Por favor ingresa un correo válido
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="password" className="form-label text-white fw-medium">
                                            <i className="fas fa-lock me-2"></i>Contraseña
                                        </label>
                                        <input
                                            className="form-control form-control-lg bg-dark bg-opacity-25 text-white border-0 rounded-3"
                                            type="password"
                                            name="password"
                                            placeholder="Mínimo 8 caracteres"
                                            onChange={handleChange}
                                            minLength="8"
                                            required
                                            style={{ backdropFilter: 'blur(10px)' }}
                                        />
                                        <div className="form-text text-white-50">
                                            <small>La contraseña debe tener al menos 8 caracteres</small>
                                        </div>
                                    </div>

                                    <div className="form-check mb-4">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="terms"
                                            required
                                        />
                                        <label className="form-check-label text-white-50" htmlFor="terms">
                                            Acepto los <a href="#!" className="text-white text-decoration-underline">términos y condiciones</a>
                                        </label>
                                    </div>

                                    <button
                                        className="btn btn-light btn-lg w-100 fw-semibold py-3 rounded-3 shadow-sm"
                                        type="submit"
                                        disabled={loading}
                                        style={{
                                            fontSize: '1.1rem',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseOver={(e) => {
                                            e.target.style.transform = 'translateY(-2px)';
                                            e.target.style.boxShadow = '0 8px 25px rgba(255,255,255,0.3)';
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.transform = 'translateY(0)';
                                            e.target.style.boxShadow = '0 4px 15px rgba(255,255,255,0.2)';
                                        }}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                Creando cuenta...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-paper-plane me-2"></i>
                                                Crear Cuenta Gratis
                                            </>
                                        )}
                                    </button>
                                </form>

                                <div className="text-center mt-4 pt-3 border-top border-white border-opacity-25">
                                    <p className="text-white-50 mb-3">O regístrate con</p>
                                    <div className="d-flex gap-3 justify-content-center mb-4">
                                        <button className="btn btn-outline-light rounded-circle p-3 d-flex align-items-center justify-content-center"
                                            style={{ width: '50px', height: '50px' }}>
                                            <i className="fab fa-google"></i>
                                        </button>
                                        <button className="btn btn-outline-light rounded-circle p-3 d-flex align-items-center justify-content-center"
                                            style={{ width: '50px', height: '50px' }}>
                                            <i className="fab fa-facebook-f"></i>
                                        </button>
                                        <button className="btn btn-outline-light rounded-circle p-3 d-flex align-items-center justify-content-center"
                                            style={{ width: '50px', height: '50px' }}>
                                            <i className="fab fa-apple"></i>
                                        </button>
                                    </div>

                                    <p className="text-white-50 mb-0">
                                        ¿Ya tienes una cuenta?{" "}
                                        <Link
                                            to="/login"
                                            className="text-white fw-semibold text-decoration-underline"
                                        >
                                            Iniciar Sesión
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}