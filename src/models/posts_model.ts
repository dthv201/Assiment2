import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for the Post entity
export interface IPost extends Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId; 
}


const postSchema: Schema<IPost> = new mongoose.Schema({
  title: { type: String, required: true },
  content: String ,
  //Here it will be refrence to a user
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
});


export const postModel = mongoose.model<IPost>('Post', postSchema);
