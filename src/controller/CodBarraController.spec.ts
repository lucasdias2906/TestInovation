import validarCodBarra from '../validators/ValidCodBarra'

describe('Validação de boleto', function () {

    it("Convenio validando o modulo 10", function (done) {

        const codBarra = "836400000011331201380002812884627116080136181551"
        validarCodBarra.convenio(codBarra, function (err: any, isValid: any) {
            expect(isValid).toEqual(true)
            done()
        })
    })

    it('Convenio validando o modulo 11', function (done) {
        const codBarra = "836400000011331201380002812884627116080136181551"
        validarCodBarra.convenio(codBarra, function (err: any, isValid: any) {
            expect(isValid).toEqual(true)
            done()
        });
    });

    it('Convenio invalido com 1 numero a mais', function (done) {
        const codBarra = "8364000000113312013800028128846271160801361815511"
        validarCodBarra.convenio(codBarra, function (err: any, isValid: any) {
            expect(err).toEqual(new Error("Formatação errada"))
            done();
        });
    });

    it('Convenio invalido passando letra', function (done) {
        const codBarra = "836400000011331201380002812884627116080136181551AA"
        validarCodBarra.convenio(codBarra, function (err: any, isValid: any) {
            expect(err).toEqual(new Error("Formatação errada"))
            done();
        });
    });

    it ('Boleto valido', function(done) {
        const codigoBoleto = "42297115040000195441160020034520268610000054659"
        validarCodBarra.boleto(codigoBoleto, function (err: any, isValid: any) {
            expect(isValid).toEqual(true)
            done()
        });
    });

    it ('Boleto invalido', function(done) {
        const codigoBoleto = "9997115040000195441160020034520268610000054659"
        validarCodBarra.boleto(codigoBoleto, function (err: any, isValid: any) {
            expect(err).toEqual(new Error("Formatação errada"))
            done();
        });
    });

    
    it ('Convenio invalido com 1 numero a mais', function(done) {
        const codigoBoleto = "422971150400001954411600200345202686100000546591"
        validarCodBarra.boleto(codigoBoleto, function (err: any, isValid: any) {
            expect(err).toEqual(new Error("Formatação errada"))
            done();
        });
    });

    
    it ('Boleto invalido passando uma letra', function(done) {
        const codigoBoleto = "42297115040000195441160020034520268610000054659A"
        validarCodBarra.boleto(codigoBoleto, function (err: any, isValid: any) {
            expect(err).toEqual(new Error("Formatação errada"))
            done();
        });
    });
})
