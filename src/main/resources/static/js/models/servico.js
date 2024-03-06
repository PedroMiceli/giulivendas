function getServicoListByClientes(el, idsClientes, idsServicos) {
    $.ajax({
        url: '/servicos/getServicoListByClientes?idsClientes=' + idsClientes + '&idsServicos=' + idsServicos,
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
        }
    });
}