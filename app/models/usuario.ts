import { prop, getModelForClass } from "@typegoose/typegoose";

class usuarios {

    @prop({ type: Number, required: true })
    cedula: number;

    @prop({ required: true, trim: true, minlength: 4 })
    nombre: string;

    @prop({ required: true, minlength: 4 })
    contrasena: string;

    @prop({ required: true })
    rol: string;

    @prop({ required: true })
    monto: number
}

const modeloUsuario = getModelForClass(usuarios);

export default modeloUsuario;