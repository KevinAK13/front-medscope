export interface ValidationErrorsLogin {
  [key: string]: string | undefined;
  emailOrPhone?: string;
  password?: string;
}

export const validateLoginForm = (
  formData: {
    emailOrPhone: string;
    password: string;
  },
  loginMethod: "email" | "phone"
): ValidationErrorsLogin => {
  const errors: ValidationErrorsLogin = {};

  // Normalizar entradas
  const normalize = (input: string) => input.trim();

  // Validar email o teléfono
  formData.emailOrPhone = normalize(formData.emailOrPhone);
  if (!formData.emailOrPhone) {
    errors.emailOrPhone = `Por favor, ingresa ${
      loginMethod === "email" ? "un correo electrónico" : "un número de teléfono"
    }.`;
  } else if (loginMethod === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailOrPhone)) {
    errors.emailOrPhone = "Por favor, ingresa un correo electrónico válido.";
  } else if (
    loginMethod === "phone" &&
    !/^\+?\d{10,15}$/.test(formData.emailOrPhone)
  ) {
    errors.emailOrPhone =
      "Por favor, ingresa un número de teléfono válido (Ejemplo: +521234567890).";
  }

  // Validar contraseña
  formData.password = normalize(formData.password);
  if (!formData.password) {
    errors.password = "Por favor, ingresa tu contraseña.";
  }

  return errors;
};