// Encargado de orquestar todas las funciones de los demás archivos
import { listeners } from "./operations";

// Apenas se inicie la app agrega los listeners creados en ./operations
export function initializeApp() {
    listeners();
}