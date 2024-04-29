import passport from "passport";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import { GraphQLLocalStrategy } from "graphql-passport";

export const configurePassport = async () => {
  passport.serializeUser((user, done) => {
    console.log("Serializing user", user, done);
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log("Deserializing id", id, done);
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  passport.use(
    new GraphQLLocalStrategy(async (username, password, done) => {
      try {
        console.log("GraphQLLocalStrategy💿", username, password);

        const user = await User.findOne({ username });
        if (!user) {
          throw new Error("Invalid username or password");
        }
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
          throw new Error("Invalid username or password");
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
};
//Passport session allows Passport to serialize and deserialize user instances into and from the session.
//When a user is authenticated, Passport stores their user ID in the session. On subsequent requests, Passport retrieves the user ID from the session and fetches the user data from the database.
