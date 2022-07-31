import jwt from "jsonwebtoken";

const generarJWT = (uid = '') => {
    return new Promise((res) => {

        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY as string, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                res('No se pudo generar el token');
            } else {
                res(token);
            }
        });
    });
}

export default generarJWT;