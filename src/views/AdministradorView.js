
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

// La vista del administrador
const AdministradorView = () => {
    const [books, setBooks] = useState([]);

    
    // Aqui agarramos los libros
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const resultadoLibros = await getDocs(collection(db, "Libros"));
                const listaLibros = resultadoLibros.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setBooks(listaLibros);
            } catch (error) {
                console.error("Error agarrando los libros:", error);
            }
        };

        fetchBooks();
    }, []);
// Aqui mostramos los libros
    return (
        <div>
            <h2>Administrador - Libros Disponibles</h2>
            <h3>Lista de Libros</h3>
            <ul>
                
                {books.length > 0 ? (
                    books.map(book => (
                        <li key={book.id}>
                            {book.titulo} - {book.autor} ({book.genero}) [{book.estado}]
                        </li>
                    ))
                ) : (
                    <p>No hay libros disponibles.</p>
                )}
            </ul>
        </div>
    );
};

export default AdministradorView;
