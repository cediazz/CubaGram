

function getExtension(fileRoute) {
    // Verifica si la ruta contiene un punto (.)
    const index = fileRoute.lastIndexOf('.');
    if (index === -1 || index === fileRoute.length - 1) {
        // No hay extensión o el punto está al final de la cadena
        return false
    }
    // Extract extension
    return fileRoute.slice(index + 1);
}
export default getExtension