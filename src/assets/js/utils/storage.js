// Encargado de acceder al local storage del navegador

// setItem me permite crear una key en el localStorage
// localStorage.setItem('teachers', 'Hola base de datos estudiantes');

// getItem me permite buscar una llave
// const teachers = localStorage.getItem('teachers');

// removeItem me permite eliminar en el localStorage
// localStorage.removeItem('teachers');

export function getDatabase(dbName) {
    // convertimos un str en un json(objeto)
    const database = JSON.parse(localStorage.getItem(dbName));

    return database === null ? [] : database;
}

export function setDatabase(dbName, jsonData) {
    // convertimos un json en un str
    localStorage.setItem(dbName, JSON.stringify(jsonData));
}


