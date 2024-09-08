const Post = require("../../models/Post");
const User = require("../../models/User");
const asyncWrapper = require("../../middleware/async");
const bucket = require('../../firebase/firebase');
const path = require('path'); // To handle file extensions

const addPost = asyncWrapper(async (req, res) => {
    const { username, id } = req.user;
    const { caption = "", title = "", postType = "" } = req.body;
    const files = req.files;
    let attachments = [];

    if (files) {
        const uploadPromises = files.map(async (file) => {
            let fileName = file.originalname;
            let blob = bucket.file(fileName);
            let fileExists = await blob.exists();

            // If the file exists, rename it by appending a timestamp
            if (fileExists[0]) {
                const ext = path.extname(fileName);
                const nameWithoutExt = path.basename(fileName, ext);
                fileName = `${nameWithoutExt}-${Date.now()}${ext}`;
                blob = bucket.file(fileName);
            }

            const blobStream = blob.createWriteStream({
                metadata: {
                    contentType: file.mimetype
                }
            });

            return new Promise((resolve, reject) => {
                blobStream.on('error', (err) => reject(err));
                blobStream.on('finish', () => {
                    // Make the file publicly accessible
                    blob.makePublic().then(() => {
                        resolve(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
                    });
                });
                blobStream.end(file.buffer);
            });
        });

        attachments = await Promise.all(uploadPromises);
    }

    let post = new Post({
        title: title,
        author: id,
        username: username,
        caption: caption,
        likes: [],
        isBlocked: false,
        postType: postType,
        attachments: attachments
    });

    const result = await post.save();
    const postId = result._id;

    await User.findByIdAndUpdate(id, { $addToSet: { posts: postId } });

    res.status(200).json({ success: true, message: "Post Published Successfully", id: postId });
});

module.exports = addPost;
