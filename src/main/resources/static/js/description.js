function obterDescricao(id, referencia) {
    loading('show', undefined);

    var urlReferencia = null;
    switch (referencia) {
        case 'FERIAS': urlReferencia = '/usuarios/ferias/getDescription';
            break;
        case 'REEMBOLSO': urlReferencia = '/reembolsos/getDescription';
            break;
        case 'AUSENCIA': urlReferencia = '/ausencias/getDescription';
            break;
        case 'FERIAS_ANTECIPADAS': urlReferencia = '/usuarios/ferias/antecipadas/getDescription';
            break;
        default:
            showNotification('Erro ao obter descrição!', false);
            loading('hide', undefined);
    }

    if (urlReferencia == '' || urlReferencia == null || urlReferencia == undefined) {
        return;
    }

    $.ajax({
        url: urlReferencia,
        type: 'get',
        data: { id: id },
        success: function (response) {
            if (response.ok) {
                visualizarDescricao(response.dados.value);
            }
            else {
                showNotification(response.message, false);
            }
            loading('hide', undefined);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            showNotification('Erro ao obter descrição!', false);
            loading('hide', undefined);
        }
    });
}

function visualizarDescricao(texto) {
    $('.content-text').empty();
    $('.content-text').text(texto);
    $('#btn-description').click();
}
