function openModalGenerateDocument(idReferencia, tabelaReferencia) {
    loading('show', undefined);
    $('.partial_generate_document').load('/kit/documentos/getOptionsForGenerateDocument?idReferencia='+idReferencia+'&tabelaReferencia='+tabelaReferencia, function(result) {
        functionsDocumentRead();
        $('#btn-generateDocument').click();
        loading('hide', undefined);
    });
}

function gerarDocumento(idUsuario, idKitDocumento, idReferencia, tabelaReferencia) {
    if (idKitDocumento == null || idKitDocumento == undefined || idKitDocumento == '') {
        showNotification('Selecione um Documento!', false);
        return;
    }

    loading('show', undefined, 'Gerando Documento...');

    $.ajax({
        url: '/usuarios/kit/documentos/generateDocument',
        type: 'POST',
        data: {
            usuario: idUsuario,
            idKitDocumento: idKitDocumento,
            idReferencia: idReferencia,
            tabelaReferencia: tabelaReferencia
        },
        success: function (response) {
            if (response.ok) {
                reloadTab();
            }
            showNotification(response.message, response.ok);
            loading('hide', undefined, 'Gerando Documento...');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            showNotification('Erro ao gerar documento!', false);
            loading('hide', undefined, 'Gerando Documento...');
        }
    });
}

function verifyUsuarioLogado(idUsuarioLogado, idUsuarioDetalhes) {
    if (idUsuarioLogado != idUsuarioDetalhes) {
        $('.div-btn-new').remove(); // div que fica o botão para adicionar um novo objeto
    }
}
