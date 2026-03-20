import passport from 'passport';
import fp from 'lodash/fp.js';
const {cloneDeep} = fp;
import argon2 from 'argon2';
import {Strategy as LocalStrategy} from 'passport-local';
import {Admins} from '../../database/index.js';

passport.use('admin', new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  async (username, password, done) => {
    try {
      const user = await Admins.getByEmail(username);
      console.log('Authenticating user:', username, user ? 'found' : 'not found');
      if (!user) {
        return done(null, false, {message: 'Incorrect username or password'});
      }
      const isMatch = await argon2.verify(user.password, password);
      if (!isMatch) {
        return done(null, false, {message: 'Incorrect username or password'});
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, cloneDeep(user));
});

passport.deserializeUser(async (user, done) => {
  done(null, user);
});