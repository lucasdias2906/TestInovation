

class ValidacaoCodigoBarra{

    // VALIDA CONVENIO

    public convenio(codigoBarraConvenio: any, callback: any) {
        if (!/^[0-9]{48}$/.test(codigoBarraConvenio)) {
            return callback(new Error("Formatação errada"), null);
        }

        var blocosCodBarra = [];
    
        blocosCodBarra[0] = codigoBarraConvenio.substr(0, 12);
        blocosCodBarra[1] = codigoBarraConvenio.substr(12, 12);
        blocosCodBarra[2] = codigoBarraConvenio.substr(24, 12);
        blocosCodBarra[3] = codigoBarraConvenio.substr(36, 12);

        var isModulo10 = ['6', '7'].indexOf(codigoBarraConvenio[2]) != -1;
        var valido = 0;
    
        blocosCodBarra.forEach((blocosCodigoBarraConvenio, index) => {
            if (isModulo10) {
                this.modulo10(blocosCodigoBarraConvenio, (digitoVerificador: any) => {
                    if (digitoVerificador == blocosCodigoBarraConvenio[blocosCodigoBarraConvenio.length - 1])
                        valido++;
                });
            } else {
                this.modulo11(blocosCodigoBarraConvenio, (digitoVerificador: any) => {
                    if (digitoVerificador == blocosCodigoBarraConvenio[blocosCodigoBarraConvenio.length - 1])
                        valido++;
                });
            }
            
            if (blocosCodBarra.length == index + 1) {
                return callback(null, valido == 4);
            }
        });
    }
    
  // VALIDA BOLETO

    public boleto(codigoBarraBoleto: any, callback: any) {
        if (!/^[0-9]{47}$/.test(codigoBarraBoleto)) {
            return callback(new Error("Formatação errada"), null);
        }

        var codigoBarras = 
            codigoBarraBoleto.substr(0, 4) + 
            codigoBarraBoleto.substr(32, 15) + 
            codigoBarraBoleto.substr(4, 5) + 
            codigoBarraBoleto.substr(10, 10) + 
            codigoBarraBoleto.substr(21, 10);
    
        var blocosCodigoBarra = [];
    
        blocosCodigoBarra[0] = codigoBarraBoleto.substr(0, 10);
        blocosCodigoBarra[1] = codigoBarraBoleto.substr(10, 11);
        blocosCodigoBarra[2] = codigoBarraBoleto.substr(21, 11);
    
        var valido = 0;
        blocosCodigoBarra.forEach((bloco: any, index: any) => {
            this.modulo10(bloco, (digitoVerificador: any) => {
                if (digitoVerificador == bloco[bloco.length - 1])
                    valido++;
            });
            
            if (blocosCodigoBarra.length == index + 1) {
                if (this.modulo11_2(codigoBarras.substr(0, 4) + codigoBarras.substr(5, 39)) != codigoBarras.substr(4, 1)) {
                    return callback(null, false);
                }
    
                return callback(null, valido == 3);
            }
        });
    }
    
    // Calcula o modulo 10

    public  modulo10(bloco: any, callback: any) {
        var tamanhoBloco = bloco.length - 1;
    
        var codigoBarra = bloco.substr(0, tamanhoBloco);
    
        codigoBarra = this.strrev(codigoBarra);
        codigoBarra = codigoBarra.split('');
    
        var somatorio: any = 0;
    
        codigoBarra.forEach(function(value: any, index: any) {
            var soma = value * (index % 2 == 0 ? 2 : 1);

            if (soma > 9) {
                somatorio += soma.toString().split('').reduce(function(sum: any, current: any): any {
                    return parseInt(sum) + parseInt(current);
                });
            } else {
                somatorio += soma;
            }
            
            if (codigoBarra.length == index + 1) {
                
                var dezenaSuperiorSomatorioMenosSomatorio = (Math.ceil(somatorio / 10) * 10) - somatorio;
            
                callback(dezenaSuperiorSomatorioMenosSomatorio);
            }
        });
    }
    
    
    //  * Cacula o módulo 11 do bloco.
     
    public modulo11(bloco: any, callback: any) {
        var tamanhoBloco = bloco.length - 1;
        var dezenaSuperiorSomatorioMenosSomatorio;
    
        var codigo = bloco.substr(0, tamanhoBloco);
    
        codigo = this.strrev(codigo);
        codigo = codigo.split('');
    
        var somatorio = 0;
    
        codigo.forEach(function(value: any, index: any) {
            somatorio += value * (2 + (index >= 8 ? index - 8 : index));
            
            if (codigo.length == index + 1) {
                var restoDivisao = somatorio % 11;
    
                if (restoDivisao == 0 || restoDivisao == 1) {
                    dezenaSuperiorSomatorioMenosSomatorio = 0;
                } else if (restoDivisao == 10) {
                    dezenaSuperiorSomatorioMenosSomatorio = 1;
                } else {
                    dezenaSuperiorSomatorioMenosSomatorio = (Math.ceil(somatorio / 11) * 11) - somatorio;
                }
            
                callback(dezenaSuperiorSomatorioMenosSomatorio);
            }
        });
    }
    
    public modulo11_2(bloco:any) {
        var numero = bloco;
        var soma  = 0;
        var peso  = 2;
        var base  = 9;
        var resto = 0;
        var contador = numero.length - 1;
        for (var i=contador; i >= 0; i--) {
         soma = soma + ( numero.substring(i,i+1) * peso);
         if (peso < base) {
          peso++;
         } else {
          peso = 2;
         }
        }
        var digito = 11 - (soma % 11);
        if (digito >  9) digito = 0;
        if (digito == 0) digito = 1;
        return digito;
    }
    
    public strrev(string: any) {
        return string.split('').reverse().join('');
    }

}

const validacaoCodigoBarra = new ValidacaoCodigoBarra()

export default validacaoCodigoBarra