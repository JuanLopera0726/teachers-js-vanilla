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

export function updateTeacher(teacherUpdated) {

    const database = readTeachers().map((teacher) =>
        (teacher.id === teacherUpdated.id) ? { ...teacher, ...teacherUpdated } : teacher
    );
    setDatabase(dbName, database);
}

export function deleteTeacher(idTeacher) {
    const database = readTeachers();
    // se desetructura porque no se necesita todo el objeto
    const teacherIndex = database.findIndex(({id}) => id === idTeacher);
    if (teacherIndex != -1) {
        database.splice(teacherIndex, 1);
        setDatabase(dbName, database);
    }
}

export function findTeacherById(idTeacher) {
    return readTeachers().find(({ id }) => id === idTeacher);
}