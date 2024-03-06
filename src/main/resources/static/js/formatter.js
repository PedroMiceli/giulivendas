function formatarCEP(val) {
    return val.substr(0, 5) + '-' + val.substr(5);
}

function formatarMoeda(val) {
    return val.replaceAll('.','').replaceAll(',','.');
}

function formatarMoedaBRL(val) {
    return val.replaceAll('.',',');
}
