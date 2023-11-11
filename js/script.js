$(function () {

    $(document).ready(function () {
        const tokenId = getCookie("tokenId") || location?.hash?.split("&")[0]?.split("=")[1];
        if (tokenId) {
            authUser(tokenId);
        } else {
            $('#authModal').modal('show');
        }
    });

    const authUser = function (token) {
        fetch(`http://localhost:8080/api/v1/auth?token=` + token, {
            method: 'GET'
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log('response: ', data);
            $(".products").show();
            $('#userName').text('Hi ' + data.email);
        }).catch(function (err) {
            console.warn('Something went wrong.', err);
        });
    };

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    $('#authenticate').on('click', function () {
        loginViaSaml();
        $('#authModal').modal('hide');
    });

    const loginViaSaml = function () {
        console.info("Login via SAML.");
        const redirectUri = `http%3A%2F%2Flocalhost:3001`;
        const clientId = '1kbsdsj8hv312n25e7n20753d8';
        const domainSsoName = 'sso-mega';
        location.href = `https://${domainSsoName}.auth.us-east-2.amazoncognito.com/login?client_id=${clientId}&response_type=token&scope=email+openid&redirect_uri=${redirectUri}`;
    }
});
