import { Testimonial } from '../models/Testimonial.js';


const guardarTestimonial = async (req, res) => {

    // Valodar...

    const { nombre, correo, mensaje } = req.body;
    
    const errores = [];

    if (nombre.trim() === '') {
        errores.push({mensaje : 'El nombre esta vacio'});
    }
    if (correo.trim() === '') {
        errores.push({mensaje : 'El Correo esta vacio'});
    }
    if (mensaje.trim() === '') {
        errores.push({mensaje : 'El Mensaje esta vacio'});
    }

    if (errores.length > 0) {

        // Consultar Testimoniales Existentes
        const testimoniales = await Testimonial.findAll();

        // Mostrar la vista con errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        });
    } else {
        // Almancenarlo en la base de datos
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });
            res.redirect('/testimoniales')
        } catch (error) {
            console.log(error)
        }

    }
    
}

export {
    guardarTestimonial
}