Template.home.events({
    'click .facebook.button': function() {
        Meteor.loginWithFacebook({
            requestPermissions: []
        }, function (err) {
            if(err) {
                //error handling
                //alert('error')
            } else {
                //show an alert
                console.log('logged in');
            }
        });
    },
    'click .logout': function() {
        Meteor.logout(function (err) {
            if(err) {
                //error handling
                console.error('logout error');
            } else {
                //show an alert
                console.log('logged out!');
            }
        });
    }
});