$(function(){
    // Animating Box
    $('.content-box').click(function(){
        $('.content-box').animate({
            width: '500px',
            height: '350px'
        }, 1000)
        $('.content-after').slideDown().animate({opacity: 1}, 3000);
        $('.content-before').css({
            'background-color': '#2193b0',
            'color': 'white'
        })
    });
    
    // Showing Password
    let viewPass = false;
    $('#hide-pass').click(function(){
        if(viewPass === false){
            $('#password-input').attr('type', 'text');
            $('#hide-pass').removeClass('fa-eye');
            $('#hide-pass').addClass('fa-eye-slash');
            viewPass = true;
        } else {
            $('#password-input').attr('type', 'password');
            $('#hide-pass').removeClass('fa-eye-slash');
            $('#hide-pass').addClass('fa-eye');
            viewPass = false;
        }
    });

    // Validating Form
    $('.btn-submit').click((e) => {
        e.preventDefault();
        let errors = [];
        let email = $('#email-input');
        let pwd = $('#password-input');
        if(email.val() === ''){
            email.parent().addClass('error');
            errors.push('* email is required');
        } else {
            email.parent().removeClass('error');
        }
        if(pwd.val() === ''){
            pwd.parent().addClass('error');
            errors.push('* password is required');
        } else {
            pwd.parent().removeClass('error');
        }

        $('.error-message').hide();
        if(errors.length > 0){
            for(const err of errors){
                let msg = $('<p></p>').text(err).css({
                    'font-size': '15px',
                    'color': 'red',
                    'margin': 0
                }).addClass('error-message');

                if(err.includes('email')){
                    $('.input-box:first').after(msg);
                } else if(err.includes('password')){
                    $('.input-box:last').after(msg);
                }
            }
            errors = []; //to clean error array
        }
    })
})