export interface ValidationErrors {
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  confirmPassword?: string;
}


export const validateRegisterForm = (
  formData: {
    email: string;
    password: string;
    first_name: string; // Cambiado para coincidir con `formData`
    last_name: string; // Cambiado para coincidir con `formData`
    phone_number: string; // Cambiado para coincidir con `formData`
    confirmPassword: string;
  },
  context?: "register" | "edit"
): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Validar Nombre
  const first_name = formData.first_name.trim();
  if (!first_name) {
    errors.first_name = "Por favor, ingresa tu nombre.";
  } else if (first_name.length < 2 || first_name.length > 50) {
    errors.first_name = "El nombre debe tener entre 2 y 50 caracteres.";
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(first_name)) {
    errors.first_name = "El nombre solo debe contener letras y espacios.";
  }

  // Validar Apellido
  const last_name = formData.last_name.trim();
  if (!last_name) {
    errors.last_name = "Por favor, ingresa tu apellido.";
  } else if (last_name.length < 2 || last_name.length > 50) {
    errors.last_name = "El apellido debe tener entre 2 y 50 caracteres.";
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(last_name)) {
    errors.last_name = "El apellido solo debe contener letras y espacios.";
  }

  // Validar Email
  const email = formData.email.trim();
  if (!email) {
    errors.email = "Por favor, ingresa tu correo electrónico.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Por favor, ingresa un correo electrónico válido.";
  }

  // Validar Número de Teléfono
  const phone_number = formData.phone_number.trim();
  if (!phone_number) {
    errors.phone_number = "Por favor, ingresa tu número de teléfono.";
  } else if (!/^\+?\d{10,15}$/.test(phone_number)) { // "+" opcional y entre 10-15 dígitos
    errors.phone_number =
      "El número debe incluir entre 10 y 15 dígitos. Ejemplo: +521234567890.";
  }

  // Validar Contraseña (solo en contexto de registro)
  if (context !== "edit") {
    const password = formData.password.trim();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!password) {
      errors.password = "Por favor, ingresa una contraseña.";
    } else if (!passwordRegex.test(password)) {
      errors.password =
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.";
    }

    const confirmPassword = formData.confirmPassword.trim();
    if (!confirmPassword) {
      errors.confirmPassword = "Por favor, confirma tu contraseña.";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Las contraseñas no coinciden.";
    }
  }

  return errors;
};