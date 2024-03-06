$(document).ready(function() {
    obterAlertas();
    setInterval(function() {
        obterAlertas();
    }, 10000);
});

function obterAlertas() {
    $('.partial_alertas').load('/alertas', function(result){});
}

function salvarVisualizacao(idAlerta) {
    $.ajax({
        url: '/alertas/savePreview',
        type: 'POST',
        data: { alerta: idAlerta },
        success: function (response) {},
        error: function (jqXHR, textStatus, errorThrown) {}
    });
}
