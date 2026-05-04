import mongoose from 'mongoose';

const authModel = new mongoose.Schema({
	email: {
		type: String,
		unique: true
	},
    password: {
        type:String,

    },
    isVerified: { type: Boolean, default: false },

  token: { type: String, default: null },
   isLoggedIn: { type: Boolean, default: false },


});

export const Auth=mongoose.model("Auth",authModel)
