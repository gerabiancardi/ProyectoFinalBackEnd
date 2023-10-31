import { Router } from "express";
import { transporter } from "../config/email.js";
import { EMAIL } from "../config/config.js";

const router = Router();

router.post("/recuperarClave", async (req, res) => {
  try {
    let result = await transporter.sendMail({
      FROM: EMAIL,
      to: req.body.email,
      subject: `sending email with nodemail and Gmail as provider`,
      html: `
        <div>
          <h1>Esto es un email de prueba</h1>
          <a href="${API_URL}/formularioNuevaClave">Recuperar Clave<a/>
        </div>
        `,
    });
    return res.send({ ok: true, message: `email send to ${req.body.email}` });
  } catch (error) {
    console.log(error)}
});

export { router as emailsRouter };
