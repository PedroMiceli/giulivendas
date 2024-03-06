function getClienteList(el) {
    $.ajax({
        url: '/clientes/clienteList',
        type: 'get',
        data: {},
        success: function (response) {
            if (response.ok) {
                $(el).selectpicker('destroy');
                $(el).empty();
                definirSelectpicker(el);
                $(el).selectpicker("refresh");

                for (var i = 0; i < response.dados.length; i++) {
                    var dados = response.dados[i];
                    $(el).append(`<option value='${dados.value}'>${dados.key}</option>`);
                }

                $(el).selectpicker("refresh");
            } else {
                showNotification(response.message, false);
            }
        }
    });
}

function getClienteListByUsuario(el, idUsuario) {
    if (idUsuario == '' || idUsuario == null || idUsuario == undefined) {
        $(el).selectpicker('destroy');
        $(el).empty();
        definirSelectpicker(el);
        $(el).selectpicker("refresh");
        return;
    }

    $.ajax({
        url: '/clientes/clienteListByUsuario',
        type: 'get',
        data: { usuario: idUsuario },
        success: function (response) {
            if (response.ok) {
                $(el).selectpicker('destroy');
                $(el).empty();
                definirSelectpicker(el);
                $(el).selectpicker("refresh");

                for (var i = 0; i < response.dados.length; i++) {
                    var dados = response.dados[i];
                    $(el).append(`<option value='${dados.value}'>${dados.key}</option>`);
                }

                $(el).selectpicker("refresh");
            } else {
                showNotification(response.message, false);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            showNotification('Erro ao obter os Cliente!', false);
        }
    });
}