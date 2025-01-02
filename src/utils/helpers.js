// src/utils/helpers.js

export const getProductImage = async (id) => {
    const awsImageUrl = `https://imagenes-productos-farmahorro.s3.us-east-2.amazonaws.com/${id}.webp`;

    return awsImageUrl
};


