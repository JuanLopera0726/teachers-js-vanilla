// Encargado de la interacción de js con html
// window todo lo que pasa en la pagina

import alertify from "alertifyjs";

import { formElements, getFormData, resetForm } from "./form";
import { createTeacher, readTeachers }   from './repository';

// Aquí van a estar los listeners de la pag (así como el "listenFormSubmitEvent" que escucha el submit)
export function listeners() {
    window.addEventListener('load', () => {
        listenFormSubmitEvent();
        listTeachers();
        
    });



}

// Lo que hace el "Enviar" del formulario
function listenFormSubmitEvent() {
    formElements.form.addEventListener('submit', (event) => {
        event.preventDefault();
        createTeacher(getFormData());
        resetForm();
        alertify.success('Profesor guardado correctamente');
        listTeachers();
    });
}

function listTeachers() {
    const arrayTeachers = readTeachers();
    const tbody = document.querySelector('#tblTeachers tbody');
    tbody.innerHTML = '';

    if ( arrayTeachers.length > 0 ){


        // Retorna cada objeto y cada posición del objeto (forEach)
        arrayTeachers.forEach( (teacher) => { 

            // destructuración es convertir un objeto en variables != (...)
            const {id, name, description, email, birthDate} = teacher;

            // Creo la fila
            const row = document.createElement('tr');
            row.classList.add('align-middle');

            // Creo las columnas 
            const  colId = document.createElement('td');
            colId.textContent = id;
            colId.classList.add('text-center')

            const  colName = document.createElement('td');
            colName.textContent = name;

            const  colDescription = document.createElement('td');
            colDescription.textContent = description;

            const  colEmail = document.createElement('td');
            colEmail.textContent = email;

            const  colBirthDate = document.createElement('td');
            colBirthDate.textContent = birthDate; 

            const  colButtons = document.createElement('td');
            colButtons.classList.add('text-center');
            
            const editButton = document.createElement('button');
            editButton.classList.add('btn', 'btn-primary', 'btn-edit', 'm-1');
            editButton.dataset.id = id;
            editButton.setAttribute('title', 'Editar');

            const editIcon = document.createElement('em');
            editIcon.classList.add('fa', 'fa-edit');
            editButton.appendChild(editIcon);

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('btn', 'btn-danger', 'btn-delete', 'm-1');
            deleteButton.dataset.id = id;
            deleteButton.setAttribute('title', 'Eliminar');

            const trashIcon = document.createElement('em');
            trashIcon.classList.add('fa-solid', 'fa-trash-can');
            deleteButton.appendChild(trashIcon);

            colButtons.appendChild(editButton);
            colButtons.appendChild(deleteButton);


            // Agrego las columnas a la filas
            row.appendChild(colId);
            row.appendChild(colName);
            row.appendChild(colDescription);
            row.appendChild(colEmail);
            row.appendChild(colBirthDate);
            row.appendChild(colButtons);
            
            // Agrego la fila al tbody
            tbody.appendChild(row);
            

        });

    } else {

        const rowEmpty = document.createElement('tr');
        const colEmpty = document.createElement('td');
        colEmpty.setAttribute('colSpan', '6');
        colEmpty.textContent = "No se encuentran registros disponibles";
        colEmpty.classList.add('text-center');
        rowEmpty.appendChild(colEmpty);

        tbody.appendChild(rowEmpty);

    } 

}
