import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for the Post entity
export interface IPost extends Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId; // References the User model
  createdAt: Date;
}


const postSchema: Schema<IPost> = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  //Here it will be refrence to a user
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

// Export the Post model
export const Post = mongoose.model<IPost>('Post', postSchema);
