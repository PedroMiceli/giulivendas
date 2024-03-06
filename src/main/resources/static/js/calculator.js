function calcularValorHora(elValorMensal, elValorHora) {
    var valorMensal = parseFloat(formatarMoeda($(elValorMensal).val()));

    if (valorMensal > 0) {
        var valorHora = (valorMensal / 168).toFixed(2);
        $(elValorHora).attr('readonly', 'readonly');
        $(elValorHora).val(formatarMoedaBRL(valorHora));
    } else {
        $(elValorHora).removeAttr('readonly');
        $(elValorHora).val(null);
    }
}