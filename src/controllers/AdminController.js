import { db } from "../firebaseConfig";
import { collection, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";

class AdminController {
  // Esta funcion agrega un libro a la base de datos
  static async agregarLibro(libro) {
    try {
      await addDoc(collection(db, "Libros"), libro);
      console.log("Libro agregado con éxito.");
    } catch (error) {
      console.error("Error al agregar libro:", error);
    }
  }

  // Esta funcion elimina un libro de la base de datos
  static async eliminarLibro(id) {
    try {
      const referenciaLibro = doc(db, "Libros", id);
      await deleteDoc(referenciaLibro);
      console.log("Libro eliminado.");
    } catch (error) {
      console.error("Error al eliminar libro:", error);
    }
  }

  // Esta funcion actualiza un libro en la base de datos
  static async actualizarLibro(id, newData) {
    try {
      const referenciaLibro = doc(db, "Libros", id);
      await updateDoc(referenciaLibro, newData);
      console.log("Libro actualizado.");
    } catch (error) {
      console.error("Error al actualizar libro:", error);
    }
  }
}

export default AdminController;
