$(document).ready(function() {
    functionsDocumentRead();
});

function functionsDocumentRead() {
    notification();
    definirMasks();
    definirSelectpicker();
    $('input').attr('autocomplete', 'off');
}

function definirMasks() {
  $('.money-mask').mask('#.##0,00', { reverse: true });
  $('.date-mask').mask('00/00/0000');
  $('.monthYear-mask').mask('00/0000');
  $('.year-mask').mask('0000');
  $('.datetime-mask').mask('00/00/0000 00:00');
  $('.cpf-mask').mask('000.000.000-00');
  $('.cnpj-mask').mask('00.000.000/0000-00');
  $('.rg-mask').mask('00.000.000-0');
  $('.time-mask').mask('00:00');
  $('.phone-mask').mask('(00) 0000-0000');
  $('.cellphone-mask').mask('(00) 90000-0000');
  $('.number-mask').mask('###0', { reverse: true });
  $('.serie-mask').mask('###0-AA', { reverse: true });
  $('.cep-mask').mask('00000-000');
  $('.percent-mask').mask('##0,00', { reverse: true });
}

function definirSelectpicker(el) {
    if (!el) {
        el = $('select');
    }

    $(el).selectpicker({
        actionsBox: true,
        selectAll: function () {
            this.findLis();
            this.$lis.not('.divider').not('.disabled').not('.selected').not('.hide').find('a').click();
        },
        deselectAll: function () {
            this.findLis();
            this.$lis.not('.divider').not('.disabled').filter('.selected').not('.hide').find('a').click();
        },
        liveSearch: true,
        deselectAllText: 'Remover Todos',
        selectAllText: 'Selecionar Todos',
        noneSelectedText: 'Selecione'
    });
}

function formatDuration(durationString) {
    const regex = /PT(\d+)H(\d+)?M?|PT0S/;
    const match = durationString.match(regex);

    if (!match) {
        return "Formato de duração inválido";
    }

    if (match[0] === "PT0S") {
        return "0 horas 0 minutos";
    }

    const hours = parseInt(match[1]);
    const minutes = match[2] ? parseInt(match[2]) : 0;

    // Formate a duração como uma string legível
    let formattedDuration = `${hours} hora${hours !== 1 ? "s" : ""}`;

    if (minutes > 0) {
        formattedDuration += ` e ${minutes} minuto${minutes !== 1 ? "s" : ""}`;
    }

    return formattedDuration;
}

function reload() {
    document.location.reload();
}

function redirect(url) {
    loading('show', undefined);
    document.location = url;
}

function redirectPartial(el, url){
    loading('show', el);
    $(el).load(url, function(result) {
        functionsDocumentRead();
        loading('hide', el);
    });
}

function definirDataTables(el) {
    if (!el) {
        el = $('.datatable');
    }

    var table = $(el).DataTable({
        "paging": true,
        "ordering": true,
        "searching": true,
        "order": [],
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.13.4/i18n/pt-BR.json"
        },
        dom: 'Bfrtip',
        buttons: [
          {
            extend: 'excel',
            text: '<i class="fa-regular fa-file-excel"></i> Exportar para Excel',
            className: 'btn-success ms-2',
            container: '.tableButtons'
          },
          {
            extend: 'pdf',
            text: '<i class="fa-regular fa-file-pdf"></i> Exportar para PDF',
            className: 'btn-danger ms-2',
            container: '.tableButtons'
          }
        ]
    });

    table.buttons().container().appendTo($('.col-sm-6:eq(0)', table.table().container()));
}

function definirDataTablesNotButtons(el) {
    if (!el) {
        el = $('.datatable');
    }

    var table = $(el).DataTable({
        "paging": true,
        "ordering": true,
        "searching": true,
        "order": [],
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.13.4/i18n/pt-BR.json"
        }
    });

    table.buttons().container().appendTo($('.col-sm-6:eq(0)', table.table().container()));
}

function valueToUpper(el){
    var value = $(el).val();
    $(el).val(value.toUpperCase());
}

function carregarTab(url, classActive) {
    $(".main-tabs li a").removeClass("active");
    $("a." + classActive).addClass("active");

    $('.partial_tabs').load(url, function(result){
        definirDataTables();
        functionsDocumentRead();
        verifyUsuarioLogado($('#idUsuarioLogado').val(), $('#idUsuario').val());
    });
}

function reloadTab() {
    loading('show', undefined);
    $(".main-tabs li a.active").click();
    loading('hide', undefined);
}
