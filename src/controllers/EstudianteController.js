import { db } from "../firebaseConfig";
import { collection, getDocs, doc, updateDoc, addDoc, Timestamp } from "firebase/firestore";

class EstudianteController {
    // Esta funcion solicita un libro de la biblioteca
    static async solicitarLibro(estudiante, bookId, tituloLibro) {
        try {
            
            
            const prestamo = {
                idUsuario: estudiante.id,
                nombreUsuario: estudiante.nombre,
                idLibro: bookId,
                tituloLibro: tituloLibro,
                fechaInicio: Timestamp.now(),
                fechaFinal: Timestamp.fromDate(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)), 
                estado: "Prestado"
            };

            
            
            await addDoc(collection(db, "Prestamos"), prestamo);

            
            // Aqui actualizamos a que esta prestado el libro
            const libroReferencia = doc(db, "Libros", bookId);
            await updateDoc(libroReferencia, {
                estado: "Prestado",
                usuario: estudiante.nombre
            });

            return { success: true, message: `Libro prestado a ${estudiante.nombre}.` };
        } catch (error) {
            return { success: false, message: "Error al solicitar libro." };
        }
    }
    // Esta funcion devuelve un libro a la biblioteca
    static async devolverLibro(bookId) {
        try {
           
            const libroReferencia = doc(db, "Libros", bookId);
            await updateDoc(libroReferencia, { estado: "Disponible", usuario: null });

         
            const prestamosAgarrar = await getDocs(collection(db, "Prestamos"));
            prestamosAgarrar.forEach(async (docSnap) => {
                if (docSnap.data().idLibro === bookId && docSnap.data().estado === "Prestado") {
                    const prestamoRef = doc(db, "Prestamos", docSnap.id);
                    await updateDoc(prestamoRef, { estado: "Devuelto" });
                }
            });

            return { success: true, message: "Libro devuelto con éxito." };
        } catch (error) {
            return { success: false, message: "Error al devolver libro." };
        }
    }
}

export default EstudianteController;
