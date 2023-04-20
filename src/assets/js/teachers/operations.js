// Encargado de la interacción de js con html
// window todo lo que pasa en la pagina

import { formElements, getFormData } from "./form";
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
        listTeachers();
    });
}

function listTeachers() {
    const arrayTeachers = readTeachers();
    const tbody = document.querySelector('#tblTeachers tbody');
    tbody.innerHTML = '';


    // Retorna cada objeto y cada posición del objeto (forEach)
    arrayTeachers.forEach( (teacher, index) => { 

        // Creo la fila
        const row = document.createElement('tr');

        // Creo las columnas 
        const  colId = document.createElement('td');
        colId.textContent = index;

        const  colName = document.createElement('td');
        colName.textContent = teacher.name;

        const  colDescription = document.createElement('td');
        colDescription.textContent = teacher.description;

        const  colEmail = document.createElement('td');
        colEmail.textContent = teacher.email;

        const  colBirthDate = document.createElement('td');
        colBirthDate.textContent = teacher.birthDate;

        const  colButtons = document.createElement('td');
        


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
}

