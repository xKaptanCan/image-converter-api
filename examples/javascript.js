/**
 * Image Converter API - JavaScript Examples
 * 
 * API: https://rapidapi.com/kaptancan0707/api/image-converter-api3
 * 
 * Install dependencies:
 * npm install axios form-data
 */

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

// API Configuration
const API_HOST = 'image-converter-api3.p.rapidapi.com';
const API_KEY = 'YOUR_RAPIDAPI_KEY'; // Get your key from https://rapidapi.com/kaptancan0707/api/image-converter-api3

const headers = {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': API_HOST
};

/**
 * Convert image to another format
 */
async function convertImage(inputPath, outputPath, targetFormat, quality = 80) {
    const form = new FormData();
    form.append('image', fs.createReadStream(inputPath));
    form.append('format', targetFormat);
    form.append('quality', quality.toString());

    try {
        const response = await axios.post(
            `https://${API_HOST}/api/convert`,
            form,
            { headers: { ...form.getHeaders(), ...headers } }
        );

        if (response.data.success) {
            const buffer = Buffer.from(response.data.image, 'base64');
            fs.writeFileSync(outputPath, buffer);
            console.log(`✅ Converted: ${inputPath} → ${outputPath}`);
            console.log(`   Original: ${response.data.data.original.size} bytes`);
            console.log(`   Converted: ${response.data.data.converted.size} bytes`);
            console.log(`   Compression: ${response.data.data.compression}%`);
            return response.data;
        }
    } catch (error) {
        console.error('❌ Conversion failed:', error.response?.data || error.message);
        throw error;
    }
}

/**
 * Resize image
 */
async function resizeImage(inputPath, outputPath, width, height, fit = 'cover') {
    const form = new FormData();
    form.append('image', fs.createReadStream(inputPath));
    if (width) form.append('width', width.toString());
    if (height) form.append('height', height.toString());
    form.append('fit', fit);

    try {
        const response = await axios.post(
            `https://${API_HOST}/api/resize`,
            form,
            { headers: { ...form.getHeaders(), ...headers } }
        );

        if (response.data.success) {
            const buffer = Buffer.from(response.data.image, 'base64');
            fs.writeFileSync(outputPath, buffer);
            console.log(`✅ Resized: ${inputPath} → ${outputPath}`);
            console.log(`   Original: ${response.data.data.original.width}x${response.data.data.original.height}`);
            console.log(`   Resized: ${response.data.data.resized.width}x${response.data.data.resized.height}`);
            return response.data;
        }
    } catch (error) {
        console.error('❌ Resize failed:', error.response?.data || error.message);
        throw error;
    }
}

/**
 * Crop image
 */
async function cropImage(inputPath, outputPath, left, top, width, height) {
    const form = new FormData();
    form.append('image', fs.createReadStream(inputPath));
    form.append('left', left.toString());
    form.append('top', top.toString());
    form.append('width', width.toString());
    form.append('height', height.toString());

    try {
        const response = await axios.post(
            `https://${API_HOST}/api/crop`,
            form,
            { headers: { ...form.getHeaders(), ...headers } }
        );

        if (response.data.success) {
            const buffer = Buffer.from(response.data.image, 'base64');
            fs.writeFileSync(outputPath, buffer);
            console.log(`✅ Cropped: ${inputPath} → ${outputPath}`);
            return response.data;
        }
    } catch (error) {
        console.error('❌ Crop failed:', error.response?.data || error.message);
        throw error;
    }
}

/**
 * Rotate image
 */
async function rotateImage(inputPath, outputPath, angle) {
    const form = new FormData();
    form.append('image', fs.createReadStream(inputPath));
    form.append('angle', angle.toString());

    try {
        const response = await axios.post(
            `https://${API_HOST}/api/transform/rotate`,
            form,
            { headers: { ...form.getHeaders(), ...headers } }
        );

        if (response.data.success) {
            const buffer = Buffer.from(response.data.image, 'base64');
            fs.writeFileSync(outputPath, buffer);
            console.log(`✅ Rotated: ${inputPath} → ${outputPath} (${angle}°)`);
            return response.data;
        }
    } catch (error) {
        console.error('❌ Rotate failed:', error.response?.data || error.message);
        throw error;
    }
}

/**
 * Flip image
 */
async function flipImage(inputPath, outputPath, direction) {
    const form = new FormData();
    form.append('image', fs.createReadStream(inputPath));
    form.append('direction', direction);

    try {
        const response = await axios.post(
            `https://${API_HOST}/api/transform/flip`,
            form,
            { headers: { ...form.getHeaders(), ...headers } }
        );

        if (response.data.success) {
            const buffer = Buffer.from(response.data.image, 'base64');
            fs.writeFileSync(outputPath, buffer);
            console.log(`✅ Flipped: ${inputPath} → ${outputPath} (${direction})`);
            return response.data;
        }
    } catch (error) {
        console.error('❌ Flip failed:', error.response?.data || error.message);
        throw error;
    }
}

/**
 * Get supported formats
 */
async function getFormats() {
    try {
        const response = await axios.get(
            `https://${API_HOST}/api/formats`,
            { headers }
        );
        console.log('Supported formats:', response.data.data.formats.map(f => f.format));
        return response.data;
    } catch (error) {
        console.error('❌ Failed to get formats:', error.response?.data || error.message);
        throw error;
    }
}

// ============ USAGE EXAMPLES ============

async function main() {
    console.log('🖼️ Image Converter API - JavaScript Examples');
    console.log('📌 Get your API key: https://rapidapi.com/kaptancan0707/api/image-converter-api3\n');

    // Uncomment to test:

    // await convertImage('input.jpg', 'output.webp', 'webp', 80);
    // await resizeImage('input.jpg', 'resized.jpg', 800, 600, 'cover');
    // await cropImage('input.jpg', 'cropped.jpg', 100, 50, 400, 300);
    // await rotateImage('input.jpg', 'rotated.jpg', 90);
    // await flipImage('input.jpg', 'flipped.jpg', 'horizontal');
    // await getFormats();

    console.log('✨ Uncomment the examples above to test!');
}

main().catch(console.error);

module.exports = { convertImage, resizeImage, cropImage, rotateImage, flipImage, getFormats };
