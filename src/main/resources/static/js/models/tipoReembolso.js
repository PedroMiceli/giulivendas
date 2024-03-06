function obterListaTiposReembolsosPorProjeto(el, idProjeto, idTipoReembolsoSelecionado) {
    if (idProjeto == '' || idProjeto == null || idProjeto == undefined) {
        $(el).selectpicker('destroy');
        $(el).empty();
        definirSelectpicker(el);
        $(el).selectpicker("refresh");
        return;
    }
    if (idTipoReembolsoSelecionado == 'null' || idTipoReembolsoSelecionado == null) {
        idTipoReembolsoSelecionado = '';
    }

    $.ajax({
        url: '/tipoReembolso/getListByProjeto?projeto=' + idProjeto + '&idTipoReembolsoSelecionado=' + idTipoReembolsoSelecionado,
        type: 'get',
        success: function (response) {
            if (response.ok) {
                $(el).selectpicker('destroy');
                $(el).empty();
                definirSelectpicker(el);
                $(el).selectpicker("refresh");

                for (var i = 0; i < response.dados.length; i++) {
                    var dados = response.dados[i];
                    $(el).append(`<option value='${dados.value}' ${dados.selected ? 'selected' : ''}>${dados.key}</option>`);
                }

                $(el).selectpicker("refresh");
            } else {
                showNotification(response.message, false);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}