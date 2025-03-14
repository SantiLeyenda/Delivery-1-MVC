import LibroDAO from '../dao/LibroDao.js';


// Esta clase se encarga de manejar la logica de los libros
// La usamos junto con el Dao para poder interactuar con la base de datos
class LibroController {
  static async agregarLibro(libro) {
    try {
      // aqui interactuamos con el Dao para agregar el libro
      const id = await LibroDAO.agregarLibro(libro);
      console.log("Se agregó el libro con el ID: ", id);
    } catch (error) {
      console.error("Error al agregar el libro: ", error);
    }
  }

  static async obtenerLibros() {
    try {
      // Aqui interactuamos con el Dao para obtener los libros
      return await LibroDAO.obtenerLibros();
    } catch (error) {
      console.error("Error al obtener libros: ", error);
      return [];
    }
  }

  // Esta funcion es para devolver el libro

  static async devolverLibro(id) {
    try {
      // aqui interactuamos con el Dao para devolver el libro
      await LibroDAO.devolverLibro(id);
      console.log("Libro devuelto.");
    } catch (error) {
      console.error("Error al devolver libro:", error);
    }
  }
}

export default LibroController;
