import mongoose from 'mongoose';

const sessionModel = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth"
    }

});

export const Session=mongoose.model("Session",sessionModel)
