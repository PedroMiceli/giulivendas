const urlBrasilAPI = 'https://brasilapi.com.br/api/';

function buscarCEP(elCEP, elLogradouro, elBairro, elMunicipio, elUF) {
    const cep = $(elCEP).val().replace(/\D/g, '');
    const url = urlBrasilAPI + 'cep/v1/' + cep;

    $.getJSON(url, data => {
        $(elLogradouro).val(data.street);
        $(elBairro).val(data.neighborhood);
        $(elMunicipio).val(data.city);
        $(elUF).val(data.state);
    }).fail(() => erro());

    function erro() {
        $(elLogradouro).val(null);
        $(elBairro).val(null);
        $(elMunicipio).val(null);
        $(elUF).val(null);

        if (cep != '' && cep != null && cep != undefined) {
            showNotification('Erro ao buscar CEP', false);
        }
    }
}

function buscarCNPJ(elCNPJ, elRazaoSocial, elNomeFantasia, elCEP, elSimplesNacional) {
    const cnpj = $(elCNPJ).val().replace(/\D/g, '');
    const url = urlBrasilAPI + 'cnpj/v1/' + cnpj;

    $.getJSON(url, data => {
        $(elRazaoSocial).val(data.razao_social);
        $(elNomeFantasia).val(data.nome_fantasia);
        $(elCEP).val(formatarCEP(data.cep)).blur();
        $(elSimplesNacional).attr('checked', data.opcao_pelo_simples);

        definirReadonly();
    }).fail(() => erro());

    function erro() {
        limparValores();
        definirReadonly();

        if (cnpj != '' && cnpj != null && cnpj != undefined) {
            showNotification('Erro ao buscar CNPJ', false);
        }
    }

    function limparValores() {
        $(elRazaoSocial).val(null);
        $(elNomeFantasia).val(null);
        $(elCEP).val(null).blur();
    }

    function definirReadonly() {
        $(elRazaoSocial).val() == '' ? $(elRazaoSocial).removeAttr('readonly') : $(elRazaoSocial).attr('readonly', 'readonly');
        $(elNomeFantasia).val() == '' ? $(elNomeFantasia).removeAttr('readonly') : $(elNomeFantasia).attr('readonly', 'readonly');
    }
}
