// Clase del usuario

class User {
    constructor(name, matricula){
        this.name = name;
        this.matricula = matricula;
    }

    hacerBusqueda(titulo, autor, genero){
        console.log('Buscando libro: ' + titulo + ' de ' + autor + ' en el genero de ' + genero);
    }
}

export default User;