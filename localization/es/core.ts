const AUTH = {
	login_title: "Inicio de sesión",
	login_subtitle: "Entra tu información de inicio",
	login_errorMessageTitle: "Error al validar",
	login_email_label: "Correo electronico",
	login_email_placeholder: "Digita tu correo electronico",
	login_email_error: "Introduce tu correo electronico por favor",
	login_password_label: "Contraseña",
	login_password_placeholder: "Digita tu contraseña",
	login_password_error: "Introduce tu contraseña por favor",
	login_button: "Iniciar sesión",
	login_register: "Registrarme",
	login_forgetpassword: "Olvide mi contraseña",
	login_invalid_email: "El correo electronico introducido es invalido",
	login_invalid_credential: "Las credenciales introducidas son invalidas",
};

const CORE = {
	changeLanguage: "Cambiar idioma"
};

export default {
	...CORE,
	...AUTH
};