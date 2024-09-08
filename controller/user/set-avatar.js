const { CustomAPIError } = require("../../errors/custom-error");
const asyncWrapper = require("../../middleware/async");
const User = require('../../models/User');
const bucket = require('../../firebase/firebase');

const setAvatar = asyncWrapper(async (req, res, next) => {
    const { id } = req.user;
    // console.log("files", req.files)
    const avatar = req.file;

    if (!avatar) {
        return next(new CustomAPIError("No File uploaded", 400));
    }

    const user = await User.findById(id);

    if (!user) {
        return next(new CustomAPIError("User not found", 404));
    }

    const blob = bucket.file(avatar.originalname); // corrected to 'file' method
    const blobStream = blob.createWriteStream({
        metadata: {
            contentType: avatar.mimetype
        }
    });

    blobStream.on('error', err => next(err));
    blobStream.on('finish', async () => {
        // Make the file public
        await blob.makePublic();

        // Get the public URL
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

        // Update the user's avatar URL in the database
        user.avatar = publicUrl;
        await user.save();

        res.status(200).json({ success: true, avatar: publicUrl, message: "Avatar Uploaded SuccessFully" });
    });

    blobStream.end(avatar.buffer); // make sure to end the stream with file data
});

module.exports = setAvatar;
