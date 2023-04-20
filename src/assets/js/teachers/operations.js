// Encargado de la interacción de js con html
// window todo lo que pasa en la pagina

import { formElements, getFormData } from "./form";
import { createTeacher }   from './repository';
// Aquí van a estar los listeners de la pag (así como el "listenFormSubmitEvent" que escucha el submit)
export function listeners() {

    window.addEventListener('load', () => {

        listenFormSubmitEvent();
        


    });



}

// Lo que hace el "Enviar" del formulario
function listenFormSubmitEvent() {
    formElements.form.addEventListener('submit', (event) => {
        event.preventDefault();
        createTeacher(getFormData());
    });
}

