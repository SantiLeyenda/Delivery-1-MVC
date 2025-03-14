// Clase del prestamo
class Prestamo {
    constructor(fechaInicio, fechaFinal, estado) {
        this.fechaInicio = fechaInicio;
        this.fechaFinal = fechaFinal;
        this.estado = estado;
    }

    notificarVencimiento(){

        console.log('Notificando vencimiento de prestamo');
    }


}

export default Prestamo;