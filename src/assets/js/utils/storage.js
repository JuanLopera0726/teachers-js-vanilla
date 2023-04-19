// Encargado de acceder al local storage del navegador

// setItem me permite crear una key en el localStorage
// localStorage.setItem('teachers', 'Hola base de datos estudiantes');

// setItem me permite buscar una llave
// const teachers = localStorage.getItem('teachers');

// setItem me permite eliminar en el localStorage
// localStorage.removeItem('teachers');

export function getDatabase() {
    return localStorage.getItem('db_teachers');
}

export function setDatabase(teachers) {
    localStorage.setItem('db_teachers', teachers);
}
