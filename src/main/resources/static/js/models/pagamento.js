function obterAvaliacoesHonorario(idPagamentoHonorario) {
    loading('show', undefined);
    $('.avaliacoes_honorarios').load('/pagamentos/honorarios/avaliacoes/getAll?pagamentoHonorario='+idPagamentoHonorario, function(result){
        $('#btn-avaliacoesHonorarioModal').click();
        loading('hide', undefined);
    });
}

function obterAvaliacoesReembolsos(idPagamentoReembolso) {
    loading('show', undefined);
    $('.avaliacoes_reembolsos').load('/pagamentos/reembolsos/avaliacoes/getAll?pagamentoReembolso='+idPagamentoReembolso, function(result){
        $('#btn-avaliacoesReembolsoModal').click();
        loading('hide', undefined);
    });
}