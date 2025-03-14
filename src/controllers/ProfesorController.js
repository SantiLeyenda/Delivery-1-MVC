import { db } from "../firebaseConfig";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

// La clase del controlador del profesor
class ProfesorController {
    // Esto ve si ya tiene una laptop asignada
    static async checkLaptop(profesor) {
        try {
            // Aqui obtenemos las laptops de firebase
            const resultadoLaptops = await getDocs(collection(db, "Laptops"));

            for (let docSnap of resultadoLaptops.docs) {
                const data = docSnap.data();
                if (data.profesorAsignado === profesor.nombre) {
                    return { success: true, message: `Tienes la laptop ${data.modelo} asignada.` };
                }
            }

            return { success: false, message: "No tienes una laptop." };
        } catch (error) {
            console.error("Error verificando laptop:", error);
            return { success: false, message: "Error al verificar laptop." };
        }
    }

    // Aqui pedimos una laptop
    static async solicitarLaptop(profesor) {
        try {
            // Aqui vemos si ya tiene una laptop
            const tieneOno = await this.checkLaptop(profesor);
            if (tieneOno.success) {
                return { success: false, message: "Ya tienes una laptop asignada." };
            }

            // Aqui tenemos todas las laptops
            const resultadoLaptops = await getDocs(collection(db, "Laptops"));
            let laptopDisponible = null;
            let laptopId = null;

            // Aqui buscamos una laptop disponible
            resultadoLaptops.forEach((docSnap) => {
                const data = docSnap.data();
                if (data.estado === "Disponible" && !data.profesorAsignado) {
                    laptopDisponible = data;
                    laptopId = docSnap.id;
                }
            });

            // Si no hay laptop entonces damo esto
            if (!laptopDisponible) {
                return { success: false, message: "No hay laptops disponibles." };
            }

            // Aqui actualizamos la laptop a que tenga el nombre del profesor y que este prestada
            const referenciaLaptop = doc(db, "Laptops", laptopId);
            await updateDoc(referenciaLaptop, { 
                estado: "Prestado",
                profesorAsignado: profesor.nombre
            });

            // Aqui pues afirmamos que se asigno la laptop
            return { success: true, message: `Laptop ${laptopDisponible.modelo} asignada a ${profesor.nombre}.` };
        } catch (error) {
            console.error("Error al solicitar laptop:", error);
            return { success: false, message: "Error al solicitar laptop." };
        }
    }
}

export default ProfesorController;

