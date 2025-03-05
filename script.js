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

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  
  // Capturamos los valores ingresados
  const formData = {
    name: name.value,
    email: email.value,
    password: password.value,
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
    name.value = '';
    email.value = '';
    password.value = '';
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

