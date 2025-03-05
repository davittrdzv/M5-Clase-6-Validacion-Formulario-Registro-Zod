// Importamos Zod
const { z } = window.Zod;

// Esquema para validar los datos del formulario
const registerSchema = z.object({
    name: z.string().min(2, 'El nombre es obligatorio.'),
    email: z.string().email('Correo electrónico inválido.'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres.'),
});

document.getElementById("registerForm").addEventListener("submit", (event) => {
  event.preventDefault();
  
  // Capturamos los valores ingresados
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');

  nameError.textContent = '';
  emailError.textContent = '';
  passwordError.textContent = '';

  try {
    registerSchema.parse(formData);
    alert("¡Registro exitoso!");
  } catch (error) {
    error.errors.forEach(e => {
        if (e.path[0] === 'name') {
            nameError.textContent = e.message;
        } else if (e.path[0] === 'email') {
            emailError.textContent = e.message;
        } else if (e.path[0] === 'password') {
            passwordError.textContent = e.message;
        }
    });

  }
});

