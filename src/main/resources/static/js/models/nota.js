function obterAvaliacoesNF(idNota) {
    loading('show', undefined);
    $('.avaliacoes_nf').load('/notas/avaliacoes/getAll?nota='+idNota, function(result){
        $('#btn-avaliacoesNFModal').click();
        loading('hide', undefined);
    });
}