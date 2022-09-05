export function validationPassword (senha) {
    var validation = "Senha inválida";
    var letrasMaiusculas = /[A-Z]/;
    var letrasMinusculas = /[a-z]/;
    var numeros = /[0-9]/;
    var caracteresEspeciais = /[!|@|#|$|%|^|&|*|(|)|-|_]/;
    if (senha.length < 8) {
      validation = "A senha deve ter pelo menos 8 caracteres";
      return validation;
    }
    var auxMaiuscula = 0;
    var auxMinuscula = 0;
    var auxNumero = 0;
    var auxEspecial = 0;
    for (var i = 0; i < senha.length; i++) {
      if (letrasMaiusculas.test(senha[i])) auxMaiuscula++;
      else if (letrasMinusculas.test(senha[i])) auxMinuscula++;
      else if (numeros.test(senha[i])) auxNumero++;
      else if (caracteresEspeciais.test(senha[i])) auxEspecial++;
    }
    if (auxMaiuscula > 0) {
      if (auxMinuscula > 0) {
        if (auxNumero > 0) {
          if (auxEspecial) {
            validation = "true";
          }
        }
      }
    }

    return validation;
  }