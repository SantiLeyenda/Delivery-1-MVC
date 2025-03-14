import { db } from "../firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
import User from "../models/User.js";

// La clase del controlador del usuario
class UserController {
  static async obtenerUsuarios() {
    try {
      // Aqui obtenemos los usuarios de la base de datso
      const resultadosUsuarios = await getDocs(collection(db, "Usuarios"));
      return resultadosUsuarios.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      return [];
    }
  }

  // Esta funcion agrega un usuario a la base de datos
  static async agregarUsuario(name, matricula) {
    try {
      const nuevoUsuario = new User(name, matricula);
      const UsuarioReferencia = await addDoc(collection(db, "User"), { ...nuevoUsuario });
      return { id: UsuarioReferencia.id, ...nuevoUsuario}
    } catch (error) {
      console.error("No se puedo agregar al usuario");
      return null;
    }
  }
}

export default UserController;
