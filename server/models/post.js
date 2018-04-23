import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
  description: { type: 'String', required: true },
  duration: { type: 'String', required: true },
  time: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
});

export default mongoose.model('Post', postSchema);
