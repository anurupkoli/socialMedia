const fs = require('fs').promises;

const deleteImage = async(imagePath)=>{
    try {
        await fs.unlink(imagePath);
    } catch (error) {
        console.log(error);
    }
}

module.exports =  deleteImage;