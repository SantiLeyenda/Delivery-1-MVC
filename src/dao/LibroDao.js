import { db } from '../firebaseConfig.js';
import { collection, getDocs, addDoc, doc, updateDoc } from "firebase/firestore";


// La clase DAO del libro
class LibroDAO {
  // Esta funcion agrega un libro a la base de datos
  static async agregarLibro(libro) {
    try {
      // Aqui agregamos el libro a la base de datos
      const eseLibro = await addDoc(collection(db, "Libros"), {
        titulo: libro.titulo,
        autor: libro.autor,
        genero: libro.genero,
        estado: libro.estado
      });
      return eseLibro.id;
    } catch (error) {
      console.error("Error al agregar el libro: ", error);
      throw error;
    }
  }

  // Esta funcion obtiene los libros de la base de datos
  static async obtenerLibros() {
    try {
      const otroResultado = await getDocs(collection(db, "Libros"));
      return otroResultado.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error al obtener libros: ", error);
      throw error;
    }
  }

  // Esta funcion es para devolver el libro
  static async devolverLibro(id) {
    try {
      const libritos = doc(db, "Libros", id);
      // Esto es para cambia el libro a que este disponible
      await updateDoc(libritos, { estado: "Disponible", usuario: null });
      return true;
    } catch (error) {
      console.error("Error al devolver libro:", error);
      throw error;
    }
  }
}

export default LibroDAO;