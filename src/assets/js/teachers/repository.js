// Se va a encargar de CRUD con los datos en el storage (guardar, actualizar, leer, eliminar)

import { getDatabase, setDatabase } from "./../utils/storage";

const dbName = 'db_teachers';

export function createTeacher(teacher) {
    const arrayTeachers = getDatabase(dbName);
    arrayTeachers.push(teacher);
    setDatabase(dbName, arrayTeachers);
}

export function readTeachers() {
    return getDatabase(dbName);
}

export function findTeacherById(idTeacher) {

    return readTeachers().find(({id}) => id === parseInt(idTeacher));
    
}