const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "dzbimhmvz",
    api_key: "886173261928585",
    api_secret: "gaJ0igY6ziADoTJEIIDedz8ZxHI",
});

exports.uploadFile = (bufferImage) => {
    const imageBuffer = Buffer.from(bufferImage);
    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream({ resource_type: "image" }, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    console.log('phot uploaded', result.secure_url)
                    resolve(result.secure_url);
                }
            })
            .end(imageBuffer);
    });
};