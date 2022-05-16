import toastr from 'toastr';
import 'toastr/toastr.scss';

export  class ToastrService {
    message = (message,title,messageType=ToastrMessageType.info,position=ToastrPosition.bottomRight) => {
        toastr[messageType](message,title);

        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": position,
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          }
    }
}       


export const ToastrMessageType =
{
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error',
}

export const ToastrPosition =
{
    topRight: 'toast-top-right',
    topCenter: 'toast-top-center',
    topLeft: 'toast-top-left',
    bottomRight: 'toast-bottom-right',
    bottomCenter: 'toast-bottom-center',
    bottomLeft: 'toast-bottom-left'
}
