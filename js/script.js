$(function () {

    $(document).ready(function () {
        $('#authModal').modal('show');
    });

    $('#authenticate').on('click', function () {
        loginViaSaml();
        $('#authModal').modal('hide');
    });

    const loginViaSaml = function () {
        console.info("Login via SAML.");
        const redirectUri = `https%3A%2F%2Fvladimir-malko.github.io%2Fadfs-sso-ui`;
        const clientId = location.search.split('clientId=')[1]
        const domainSsoName = location.search.split('domainSsoName=')[1]
        location.href = `https://${domainSsoName}.auth.us-east-1.amazoncognito.com/login?client_id=${clientId}&response_type=token&scope=email+openid&redirect_uri=${redirectUri}`;
    }
});
