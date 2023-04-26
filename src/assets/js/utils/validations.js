// Utilidad para realizar validaciones con js

export function validateForm(fieldConfigurations) {
    let isValid = true;
    removeErrorMessageElements();
    fieldConfigurations.forEach((fieldConfig) => {
        fieldConfig.validations.forEach((validationConfig) => {
            const currentFieldIsValid = validateField(fieldConfig.input, validationConfig);
            // todos tienen que dar en true 
            isValid = isValid && currentFieldIsValid;
        });
    });
    return isValid;

}

export function validateField(input, validationConfig) {
    const { errorId, errorMessage, validationFunction } = validationConfig;
    const fieldIsValid = validationFunction(input.value);
    // if (fieldIsValid === false)
    if (!fieldIsValid) {
        input.classList.add('is-invalid');
        const errorMessageElement = createErrorMessageElement(errorId, errorMessage);
        input.insertAdjacentElement('afterend', errorMessageElement);
    } else {
        input.classList.add('is-valid');
    }
    return fieldIsValid;
}

/**
 * Crea un elemento de mensaje de error para ser insertado después de que un campo no es válido 
 * @private
 * @param {string} errorId - El id de elemento del mensaje de error
 * @param {string} errorMessage - El mensaje de error que se muestra al usuario
 * @returns {HTMLDivElement} Retorna el elemento que contiene el mensaje de error
 */
function createErrorMessageElement(errorId, errorMessage) {

    const errorMessageElement = document.createElement('div');
    errorMessageElement.classList.add('invalid-feedback', 'text-start');
    errorMessageElement.setAttribute('id', errorId);
    errorMessageElement.textContent = errorMessage;
    return errorMessageElement;

}
/**
 * 
 * 
 * 
 */
export function removeErrorMessageElements() {
    const errorMessageElements = document.querySelectorAll('.invalid-feedback');
    errorMessageElements.forEach((element) => {
        element.remove();
    });

    removeErrorClassNameFields('is-invalid');
}

export function removeErrorClassNameFields(className) {
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach((input) => {
        input.classList.remove(className);
    });   
}
/**
 * Elimina todos los elementos de mensaje de error asociados a un input,
 * y restablece su estado visual (elimina la clase is-invalid que coloca el borde rojo).
 * La función continúa eliminando los elementos mensaje de error que son adyacentes (hermanos) 
 * mientras encuentre la clase invalid-feedback
 * @param {HTMLInputElement} input - El campo para el cual se eliminarán los mensajes de error
 */
export function removeInputErrorMessage(input) {
    let errorMessageElement = input.nextElementSibling;
    while(errorMessageElement && errorMessageElement.classList.contains('invalid-feedback')) {
        errorMessageElement.remove();
        input.classList.remove('is-invalid');
        errorMessageElement = input.nextElementSibling;


    }

}