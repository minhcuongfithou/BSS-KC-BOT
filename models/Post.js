import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ['note', 'solution'],
    default: 'note',
  },
});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
export default Post;
