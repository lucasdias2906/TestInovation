import { Response, Request } from 'express'
import validacaoCodigoBarra from '../validators/ValidCodBarra'

class CodigoDeBarraController {

    public consultCDB(req: Request, res: Response) {

        const codBarra = req.params.cb

        const codigo = codBarra.toString()

        console.log(codigo)

        if (codigo.length === 48) {

            validacaoCodigoBarra.convenio(codigo, function (err: any, isValid: any) {

                if (isValid) {
                    return res.status(200).json({
                        barraCode: codigo,
                        amount: "20,00",
                        expirationDate: "18/02/2021"
                    })
                } else {
                    return res.status(400).json({
                        message: "Formato do codígo de barra errado"
                    })
                }
            })
        } else {

            validacaoCodigoBarra.boleto(codigo, function (err: any, isValid: any) {

                console.log("ENTREI BOLETO")
                if (isValid) {
                    return res.status(200).json({
                        barraCode: codigo,
                        amount: "33,45",
                        expirationDate: "16/02/2021"
                    })
                } else {
                    return res.status(400).json({
                        message: "Formato do codígo de barra errado"
                    })
                }
            })
        }
    }
}

const codigoDeBarraController = new CodigoDeBarraController()

export default codigoDeBarraController


