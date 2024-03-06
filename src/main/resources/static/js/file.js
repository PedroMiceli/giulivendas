function obterUsuarioKitDocumento(idUsuario, idReferencia) {
    loading('show', undefined);
    $.ajax({
        url: '/usuarios/kit/documentos/getFile',
        type: 'get',
        data: { idUsuario: idUsuario, idReferencia: idReferencia },
        success: function (response) {
            if (response.ok) {
                renderizarArquivo(response.dados.value);
                $('#btn-renderFile').click();
            } else {
                showNotification(response.message, false);
            }
            loading('hide', undefined);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            showNotification('Erro ao abrir arquivo!', false);
            loading('hide', undefined);
        }
    });
}


function obterDocumento(id, referencia) {
    loading('show', undefined);

    var urlReferencia = null;
    switch (referencia) {
        case 'USUARIO_DOCUMENTO': urlReferencia = '/usuarios/documentos/getFile';
            break;
        case 'AUSENCIA': urlReferencia = '/ausencias/getFile';
            break;
        case 'CLIENTE_DOCUMENTO': urlReferencia = '/clientes/documentos/getFile';
            break;
        case 'REEMBOLSO': urlReferencia = '/reembolsos/getFile';
            break;
        case 'NF': urlReferencia = '/notas/getFile';
            break;
        case 'CONTRATO_DOCUMENTO': urlReferencia = '/contratos/documentos/getFile';
            break;
        case 'NF_FATURAMENTO': urlReferencia = '/faturamentos/getFile';
            break;
        default:
            showNotification('Erro ao obter documento!', false);
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
                renderizarArquivo(response.dados.value);
                $('#btn-renderFile').click();
            }
            else {
                showNotification(response.message, false);
            }
            loading('hide', undefined);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            showNotification('Erro ao abrir arquivo!', false);
            loading('hide', undefined);
        }
    });
}

function renderizarArquivo(fileBase64) {
    const extension = fileBase64.substring(fileBase64.indexOf('/') + 1, fileBase64.indexOf(';'));
    $('.content-file').empty();

    switch (extension) {
        case 'jpg':
        case 'jpeg':
        case 'png':
            $('.content-file').append(`<img src="${fileBase64}" alt="Imagem" class="img-fluid w-75">`);
            break;
        case 'txt':
            const textoDecodificado = atob(fileBase64.split(',')[1]);
            $('.content-file').append(textoDecodificado);
            break;
        case 'pdf': //documetação: https://github.com/mozilla/pdf.js -- https://mozilla.github.io/pdf.js/
            const pdfData = atob(fileBase64.split(',')[1]);

            const baixarBotao = document.createElement('button');
            baixarBotao.classList.add('btn', 'btn-danger', 'w-50');
            baixarBotao.innerHTML = '<i class="fa-regular fa-file-pdf"></i> Baixar PDF';
            baixarBotao.addEventListener('click', () => {
                loading('show', undefined, 'Realizando Download do Arquivo...');
                const byteArray = new Uint8Array(pdfData.length);
                for (let i = 0; i < pdfData.length; i++) {
                    byteArray[i] = pdfData.charCodeAt(i);
                }
                const blob = new Blob([byteArray], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                const linkElement = document.createElement('a');
                linkElement.setAttribute('href', url);
                linkElement.setAttribute('download', 'arquivo.pdf');
                linkElement.click();
                loading('hide', undefined, 'Realizando Download do Arquivo...');
            });
            $('.content-file').append(baixarBotao);

            pdfjsLib.getDocument({ data: pdfData }).promise.then(pdf => {
                pdf.getPage(1).then(page => {
                    const viewport = page.getViewport({ scale: 1.5 });
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };
                    page.render(renderContext).promise.then(() => {
                        $('.content-file').append(canvas);
                    });
                });
            }).catch(error => {
                showNotification('Baixe o PDF para visualiza-lo', undefined);
            });

            break;
        default:
            showNotification('Tipo de arquivo não suportado: ' + extension, false);
    }
}
