// Encargado de la interacción de js con html
// window todo lo que pasa en la pagina

// Third libraries
import alertify from "alertifyjs";

// Own libraries  (utils)
import { validateForm, validateField, removeInputErrorMessage, removeErrorClassNameFields, removeErrorMessageElements } from './../utils/validations';
import { createEmptyRow, createActionButton, createTableCol } from './../utils/table';


// Module libraries (en este caso modulo de teachers)
import { formElements, fieldConfigurations, getFormData, resetForm } from "./form";
import { createTeacher, readTeachers } from './repository';


// Aquí van a estar los listeners de la pag (así como el "listenFormSubmitEvent" que escucha el submit)
export function listeners() {
    window.addEventListener('load', () => {
        listenFormSubmitEvent();
        listTeachers();
        listenFormFieldsChangeEvent();
        listenFormResetEvent();

    });



}

// Lo que hace el "Enviar" del formulario
function listenFormSubmitEvent() {
    formElements.form.addEventListener('submit', (event) => {
        event.preventDefault();
        alertify.dismissAll();
        if (validateForm(fieldConfigurations)) {
            createTeacher(getFormData());
            resetForm();
            removeErrorClassNameFields('is-valid');
            alertify.success('Profesor guardado correctamente');
            listTeachers();
        } else {
            alertify.error('Verificar los datos del formulario')
        }


    });
}

function listTeachers() {
    const arrayTeachers = readTeachers();
    const tbody = document.querySelector('#tblTeachers tbody');
    tbody.innerHTML = '';

    if (arrayTeachers.length > 0) {


        // Retorna cada objeto y cada posición del objeto (forEach)
        arrayTeachers.forEach((teacher) => {

            // destructuración es convertir un objeto en variables != (...)
            const { id, name, description, email, birthDate } = teacher;

            // Creo la fila
            const row = document.createElement('tr');
            row.classList.add('align-middle');

            // Creo las columnas 
            const colId = createTableCol('td', id);
            colId.classList.add('text-center');
            const colName = createTableCol('td', name);
            const colDescription = createTableCol('td', description);
            const colEmail = createTableCol('td', email);
            const colBirthDate = createTableCol('td', birthDate);
            const colButtons = createTableCol('td');
            colButtons.classList.add('text-center');

            const editButton = createActionButton({
                buttonClass: 'btn-primary',
                buttonClassIdentifier: 'btn-edit',
                title: 'Editar',
                icon: 'fa-edit',
                dataId: id
            });

            const deleteButton = createActionButton({
                buttonClass: 'btn-danger',
                buttonClassIdentifier: 'btn-delete',
                title: 'Eliminar',
                icon: 'fa-trash',
                dataId: id
            });
            colButtons.appendChild(editButton);
            colButtons.appendChild(deleteButton);
            // Agrego las columnas a la filas
            row.append(colId, colName, colDescription, colEmail, colBirthDate, colButtons);
            // Agrego la fila al tbody
            tbody.appendChild(row);
        });

    } else {
        const rowEmpty = createEmptyRow(6, "No se encuentran registros disponibles");
        tbody.appendChild(rowEmpty);
    }
}

function listenFormFieldsChangeEvent() {
    fieldConfigurations.forEach(({ input, validations }) => {
        input.addEventListener('change', () => {
            removeInputErrorMessage(input);
            validations.forEach((validationConfig) => {
                validateField(input, validationConfig);
            });
        })
    });
}

function listenFormResetEvent() {
    formElements.form.addEventListener('reset', () => {
        removeErrorMessageElements();
        removeErrorClassNameFields('is-valid');
        resetForm();
        alertify.dismissAll();
    });

}