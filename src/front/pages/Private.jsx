import { useEffect, useState } from "react"
import { protectedRoute } from "../services/APIServices";
import { useNavigate } from "react-router-dom";
export const PrivateArea = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const authenticated = await protectedRoute()
                if (!authenticated) {
                    alert("🔒 Acceso denegado. Debes iniciar sesión para acceder a esta área.")
                    navigate("/login")
                    return
                }
                setIsAuthenticated(true)
            } catch (error) {
                console.error("Error verificando autenticación:", error)
                navigate("/login")
            }
        }
        checkAuthentication()
    }, [navigate])

    const handleLogout = () => {
        sessionStorage.removeItem("token")
        alert("👋 Sesión cerrada correctamente")
        navigate("/login")
    }

    if (isAuthenticated === null) {
        return (
            <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
                <div className="text-center">
                    <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                    <h3 className="text-primary fw-semibold">Verificando acceso...</h3>
                    <p className="text-muted">Estamos confirmando tus credenciales</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-vh-100 bg-gradient-dark py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xxl-10">
                        
                        <div className="dashboard-header mb-5">
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <h1 className="display-6 fw-bold text-white mb-2">
                                        <i className="fas fa-shield-alt me-3"></i>
                                        Panel de Control
                                    </h1>
                                    <p className="text-white-60 lead">
                                        Gestión centralizada de tu cuenta segura
                                    </p>
                                </div>
                                <div className="col-md-4 text-md-end">
                                    <button
                                        className="btn btn-outline-light btn-lg px-4 rounded-pill fw-semibold"
                                        onClick={handleLogout}
                                    >
                                        <i className="fas fa-sign-out-alt me-2"></i>
                                        Cerrar Sesión
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="row g-4">
                            
                            <div className="col-lg-3">
                                <div className="card glass-card border-0 rounded-4 shadow-soft h-100">
                                    <div className="card-body p-4">
                                        <div className="text-center mb-4">
                                            <div className="avatar-lg bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                                                <i className="fas fa-user text-primary fs-2"></i>
                                            </div>
                                            <h6 className="fw-bold text-dark mb-1">Usuario Autenticado</h6>
                                            <small className="text-muted">Rol: Administrador</small>
                                        </div>

                                        <nav className="nav flex-column gap-2">
                                            <a className="nav-link active rounded-3 p-3" href="#!">
                                                <i className="fas fa-tachometer-alt me-2"></i>
                                                Dashboard
                                            </a>
                                            <a className="nav-link rounded-3 p-3" href="#!">
                                                <i className="fas fa-cog me-2"></i>
                                                Configuración
                                            </a>
                                            <a className="nav-link rounded-3 p-3" href="#!">
                                                <i className="fas fa-lock me-2"></i>
                                                Seguridad
                                            </a>
                                            <a className="nav-link rounded-3 p-3" href="#!">
                                                <i className="fas fa-chart-bar me-2"></i>
                                                Reportes
                                            </a>
                                        </nav>
                                    </div>
                                </div>
                            </div>

                            
                            <div className="col-lg-9">
                                
                                <div className="card border-0 rounded-4 shadow-soft mb-4 bg-success bg-opacity-10">
                                    <div className="card-body p-4">
                                        <div className="row align-items-center">
                                            <div className="col-md-8">
                                                <h4 className="fw-bold text-success mb-2">
                                                    <i className="fas fa-check-circle me-2"></i>
                                                    Autenticación Exitosa
                                                </h4>
                                                <p className="text-success mb-0">
                                                    Tu identidad ha sido verificada correctamente por nuestro sistema seguro.
                                                </p>
                                            </div>
                                            <div className="col-md-4 text-md-end">
                                                <span className="badge bg-success fs-6 px-3 py-2">
                                                    <i className="fas fa-shield-check me-1"></i>
                                                    Verificado
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="row g-4 mb-4">
                                    <div className="col-md-4">
                                        <div className="card border-0 rounded-4 shadow-soft h-100 hover-lift">
                                            <div className="card-body p-4 text-center">
                                                <div className="icon-container bg-primary bg-opacity-10 rounded-3 mb-3">
                                                    <i className="fas fa-user-clock text-primary fs-2"></i>
                                                </div>
                                                <h5 className="fw-bold text-dark">Sesión Activa</h5>
                                                <p className="text-muted small mb-3">
                                                    Tiempo conectado: 2h 15m
                                                </p>
                                                <div className="progress" style={{ height: '6px' }}>
                                                    <div className="progress-bar bg-primary" style={{ width: '75%' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="card border-0 rounded-4 shadow-soft h-100 hover-lift">
                                            <div className="card-body p-4 text-center">
                                                <div className="icon-container bg-warning bg-opacity-10 rounded-3 mb-3">
                                                    <i className="fas fa-clock text-warning fs-2"></i>
                                                </div>
                                                <h5 className="fw-bold text-dark">Token Válido</h5>
                                                <p className="text-muted small mb-3">
                                                    Expira en: 21h 45m
                                                </p>
                                                <div className="progress" style={{ height: '6px' }}>
                                                    <div className="progress-bar bg-warning" style={{ width: '90%' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="card border-0 rounded-4 shadow-soft h-100 hover-lift">
                                            <div className="card-body p-4 text-center">
                                                <div className="icon-container bg-info bg-opacity-10 rounded-3 mb-3">
                                                    <i className="fas fa-shield-alt text-info fs-2"></i>
                                                </div>
                                                <h5 className="fw-bold text-dark">Seguridad</h5>
                                                <p className="text-muted small mb-3">
                                                    Nivel de protección: Alto
                                                </p>
                                                <div className="progress" style={{ height: '6px' }}>
                                                    <div className="progress-bar bg-info" style={{ width: '95%' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="card border-0 rounded-4 shadow-soft mb-4">
                                    <div className="card-header bg-transparent py-3">
                                        <h5 className="fw-bold text-dark mb-0">
                                            <i className="fas fa-key me-2"></i>
                                            Información del Token JWT
                                        </h5>
                                    </div>
                                    <div className="card-body p-4">
                                        <div className="row g-4">
                                            <div className="col-md-6">
                                                <div className="bg-dark rounded-3 p-3">
                                                    <h6 className="text-info fw-semibold mb-2">
                                                        <i className="fas fa-fingerprint me-2"></i>
                                                        Hash del Token:
                                                    </h6>
                                                    <code className="text-light small d-block">
                                                        {sessionStorage.getItem("token")?.substring(0, 60)}...
                                                    </code>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="bg-light rounded-3 p-3">
                                                    <h6 className="text-dark fw-semibold mb-2">
                                                        <i className="fas fa-info-circle me-2"></i>
                                                        Metadatos:
                                                    </h6>
                                                    <div className="small text-muted">
                                                        <div>Algoritmo: HS256</div>
                                                        <div>Tipo: JWT</div>
                                                        <div>Emisión: Hoy, 14:30</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="card border-0 rounded-4 shadow-soft">
                                    <div className="card-header bg-transparent py-3">
                                        <h5 className="fw-bold text-dark mb-0">
                                            <i className="fas fa-bolt me-2"></i>
                                            Acciones Rápidas
                                        </h5>
                                    </div>
                                    <div className="card-body p-4">
                                        <div className="row g-3">
                                            <div className="col-sm-6 col-lg-3">
                                                <button className="btn btn-outline-primary w-100 p-3 rounded-3 d-flex flex-column align-items-center">
                                                    <i className="fas fa-user-edit fs-4 mb-2"></i>
                                                    <span>Perfil</span>
                                                </button>
                                            </div>
                                            <div className="col-sm-6 col-lg-3">
                                                <button className="btn btn-outline-success w-100 p-3 rounded-3 d-flex flex-column align-items-center">
                                                    <i className="fas fa-cog fs-4 mb-2"></i>
                                                    <span>Ajustes</span>
                                                </button>
                                            </div>
                                            <div className="col-sm-6 col-lg-3">
                                                <button className="btn btn-outline-warning w-100 p-3 rounded-3 d-flex flex-column align-items-center">
                                                    <i className="fas fa-history fs-4 mb-2"></i>
                                                    <span>Actividad</span>
                                                </button>
                                            </div>
                                            <div className="col-sm-6 col-lg-3">
                                                <button className="btn btn-outline-info w-100 p-3 rounded-3 d-flex flex-column align-items-center">
                                                    <i className="fas fa-download fs-4 mb-2"></i>
                                                    <span>Backup</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}