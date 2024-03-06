function loading(apresentacao, el, text) {
    if (el === undefined) {
        $.LoadingOverlay(apresentacao, { text: text ? text : "Aguarde..." });
    } else {
        $(el).LoadingOverlay(apresentacao, { text: text ? text : "Aguarde..." });
    }
}