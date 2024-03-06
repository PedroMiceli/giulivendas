function notification() {
    const toastTrigger = document.getElementById('liveToastBtn');
    const toastLiveExample = document.getElementById('liveToast');
    if (toastTrigger) {
        toastTrigger.addEventListener('click', () => {
            const toast = new bootstrap.Toast(toastLiveExample);
            toast.show();
        })
    }
}

function showNotification(message, success) {
    $(".toast-body").empty();

    if (success == undefined) {
        $("#liveToast").removeClass("bg-danger");
        $("#liveToast").removeClass("bg-success");

        $(".toast-body").append("<i class='fa-solid fa-triangle-exclamation me-2'></i>");
        $("#liveToast").addClass("bg-warning");
    }
    else if (success) {
        $("#liveToast").removeClass("bg-danger");
        $("#liveToast").removeClass("bg-warning");

        $(".toast-body").append("<i class='fa-solid fa-circle-check me-2'></i>");
        $("#liveToast").addClass("bg-success");
    }
    else {
        $("#liveToast").removeClass("bg-success");
        $("#liveToast").removeClass("bg-warning");
        
        $(".toast-body").append("<i class='fa-solid fa-circle-exclamation me-2'></i>");
        $("#liveToast").addClass("bg-danger");
    }

    $(".toast-body").append(message);

    $("#liveToastBtn").click();
}
