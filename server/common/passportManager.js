/**
 * Created by Dean on 08/12/2014.
 */
var FacebookStrategy = require('passport-facebook').Strategy;
var Users = require('../features/users/users.model');

function PassportManager(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        Users.findByEmail(id).then(function(user) {
            done(null, user);
        }, function(error) {
            done(error);
        });
    });

    passport.use(new FacebookStrategy({
            clientID: '1382830152012842', // FACEBOOK_APP_ID
            clientSecret: '5b1abfe74b7fa0cd10f2d4a2bb726622', // FACEBOOK_APP_SECRET
            passReqToCallback: true,
            profileFields: ['emails', 'photos', 'name']
        }, function(req, token, refreshToken, profile, done) {
            // find the user in the database based on their email
            Users.findByEmail(profile.emails[0].value).then(function(user) {
                if (user) {
                    done(null, user);
                } else {
                    var newUser = {
                        _id: profile.emails[0].value,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        picture: profile.photos[0].value
                    };

                    return Users.addNewUser(newUser);
                }
            }).then(function(newUser) {
                if (newUser) {
                    done(null, newUser);
                }
            }).catch(function(error) {
                done(error);
            });
        }
    ));
}

module.exports = PassportManager;
