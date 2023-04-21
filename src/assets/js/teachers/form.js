// Interacción y configuración del formulario

/**
 *  Este objeto contiene las referencias a los elementos clave del formulario
 */
// Son los elementos del formulario
export const formElements = {
    form: document.getElementById('teacherForm'),
    fields: {
        name: document.getElementById('txtName'),
        description: document.getElementById('txtDescription'),
        email: document.getElementById('txtEmail'),
        birthDate: document.getElementById('txtBirthDate'),
    }
};


// (get) => Es el valor de los elementos del formulario para ./operations
export function getFormData() {

    /**
     * Forma para obtener datos que no voy a enviar al servidor = trabaja solo si no esta "name"
     *const formData = new FormData(formElements.form);
     *return Object.fromEntries(formData.entries());
     */

    const teacher = {
        id: new Date().getTime(), 
        name: formElements.fields.name.value,
        description: formElements.fields.description.value,
        email: formElements.fields.email.value,
        birthDate: formElements.fields.birthDate.value,
    };
    return teacher;
}


export function resetForm() {
    formElements.form.reset();
}
