/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
    
    $('input#conviction').on('keyup', function(){
        if ($(this).val().length > 2){
            $('#list-of-convictions').show();
        } else {
            $('#list-of-convictions').hide();
        }
    })

    
  window.GOVUKFrontend.initAll()
})
