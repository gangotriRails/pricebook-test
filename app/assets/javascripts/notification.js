/**
 * Javascript functions to show top nitification
 * Error/Success/Info/Warning messages
 * Developed By: Ravi Tamada
 * url: http://androidhive.info
 * © androidhive.info
 *
 * Created On: 10/4/2011
 * version 1.0
 *
 * Usage: call this function with params
 showNotification(params);
 **/

function showNotification(params){
    // options array
    var options = {
        'showAfter': 0, // number of sec to wait after page loads
        'duration': 0, // display duration
        'autoClose' : false, // flag to autoClose notification message
        'type' : 'success', // type of info message error/success/info/warning
        'message': '', // message to dispaly
        'link_notification' : '', // link flag to show extra description
        'description' : '' // link to desciption to display on clicking link message
    };
    // Extending array from params
    jQuery.extend(true, options, params);

    var msgclass = 'succ_bg'; // default success message will shown
    if(options['type'] == 'error'){
        msgclass = 'error_bg'; // over write the message to error message
    } else if(options['type'] == 'information'){
        msgclass = 'info_bg'; // over write the message to information message
    } else if(options['type'] == 'warning'){
        msgclass = 'warn_bg'; // over write the message to warning message
    }

    // Parent Div container
    var container = '<div id="info_message" class="'+msgclass+'"><div class="center_auto"><div class="info_message_text message_area">';
    container += options['message'];
    container += '</div><div class="info_close_btn button_area" onclick="return closeNotification()"></div><div class="clearboth"></div>';
    container += '</div><div class="info_more_descrption"></div></div>';

    jQuerynotification = jQuery(container);

    // Appeding notification to Body
    jQuery('body').append(jQuerynotification);

    var divHeight = jQuery('div#info_message').height();
    // see CSS top to minus of div height
    jQuery('div#info_message').css({
        top : '-'+divHeight+'px'
    });

    // showing notification message, default it will be hidden
    jQuery('div#info_message').show();

    // Slide Down notification message after startAfter seconds
    slideDownNotification(options['showAfter'], options['autoClose'],options['duration']);

    jQuery('.link_notification').on('click', function(){
        jQuery('.info_more_descrption').html(options['description']).slideDown('fast');
    });

}
// function to close notification message
// slideUp the message
function closeNotification(duration){
    var divHeight = jQuery('div#info_message').height();
    setTimeout(function(){
        jQuery('div#info_message').animate({
            top: '-'+divHeight
        });
        // removing the notification from body
        setTimeout(function(){
            jQuery('div#info_message').remove();
        },200);
    }, parseInt(duration * 1000));



}

// sliding down the notification
function slideDownNotification(startAfter, autoClose, duration){
    setTimeout(function(){
        jQuery('div#info_message').animate({
            top: 0
        });
        if(autoClose){
            setTimeout(function(){
                closeNotification(duration);
            }, duration);
        }
    }, parseInt(startAfter * 1000));
}

jQuery(document).ready(function(){
    jQuery("#top-notification").slideDown(1000);
});


