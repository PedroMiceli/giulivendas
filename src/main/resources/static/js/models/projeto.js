function obterListaProjetosPorClienteAndUsuarioLogado(el, idCliente, idProjeto) {
    if (idCliente == '' || idCliente == null || idCliente == undefined) {
        $(el).selectpicker('destroy');
        $(el).empty();
        definirSelectpicker(el);
        $(el).selectpicker("refresh");
        return;
    }
    if (idProjeto == 'null' || idProjeto == null) {
        idProjeto = '';
    }

    $.ajax({
        url: '/projetos/getListByClienteAndUsuarioLogado?cliente=' + idCliente+ '&projeto=' + idProjeto,
        type: 'get',
        success: function (response) {
            if (response.ok) {
                $(el).selectpicker('destroy');
                $(el).empty();
                definirSelectpicker(el);
                $(el).selectpicker("refresh");

                for (var i = 0; i < response.dados.length; i++) {
                    var dados = response.dados[i];
                    $(el).append(`<option value='${dados?.value}' ${dados.selected ? 'selected' : ''}>${dados?.key}</option>`);
                }

                $(el).selectpicker("refresh");
                $(el).change()

            } else {
                showNotification(response.message, false);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            showNotification('Erro ao obter projetos!', false);
        }
    });
}

function obterListaProjetosPorCliente(el, idCliente) {
    if (idCliente == '' || idCliente == null || idCliente == undefined) {
            $(el).selectpicker('destroy');
            $(el).empty();
            definirSelectpicker(el);
            $(el).selectpicker("refresh");
            return;
        }

        $.ajax({
            url: '/projetos/getListByCliente?cliente=' + idCliente,
            type: 'get',
            success: function (response) {
                if (response.ok) {
                    $(el).selectpicker('destroy');
                    $(el).empty();
                    definirSelectpicker(el);
                    $(el).selectpicker("refresh");

                    for (var i = 0; i < response.dados.length; i++) {
                        var dados = response.dados[i];
                        $(el).append(`<option value='${dados?.value}'>${dados?.key}</option>`);
                    }

                    $(el).selectpicker("refresh");
                    $(el).change()

                } else {
                    showNotification(response.message, false);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                showNotification('Erro ao obter projetos!', false);
            }
        });
}
