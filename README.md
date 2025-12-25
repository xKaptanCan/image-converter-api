# 🖼️ Image Converter API

Fast and reliable image format conversion API. Convert between JPEG, PNG, WebP, GIF, TIFF, BMP, AVIF, and HEIF formats.

[![RapidAPI](https://img.shields.io/badge/RapidAPI-Subscribe-blue?style=for-the-badge&logo=rapidapi)](https://rapidapi.com/kaptancan0707/api/image-converter-api3)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

## 🔗 API Link

**Get your API Key here:** [Image Converter API on RapidAPI](https://rapidapi.com/kaptancan0707/api/image-converter-api3)

## ✨ Features

- **8 Format Support** - JPEG, PNG, WebP, GIF, TIFF, BMP, AVIF, HEIF
- **Format Conversion** - Convert any image to any supported format
- **Resize** - Scale images with multiple fit modes
- **Crop** - Extract specific regions from images
- **Rotate** - Rotate images 90°, 180°, or 270°
- **Flip** - Mirror images horizontally or vertically
- **Quality Control** - Adjust output quality (1-100)
- **Fast Processing** - Powered by Sharp (libvips)

## 🚀 Quick Start

### 1. Get API Key
1. Visit [Image Converter API on RapidAPI](https://rapidapi.com/kaptancan0707/api/image-converter-api3)
2. Subscribe to a plan
3. Copy your API Key

### 2. Install SDK

```bash
# JavaScript/Node.js
npm install axios form-data

# Python
pip install requests
```

## 📖 API Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/convert` | POST | Convert image format |
| `/api/resize` | POST | Resize image |
| `/api/crop` | POST | Crop image region |
| `/api/transform/rotate` | POST | Rotate image |
| `/api/transform/flip` | POST | Flip image |
| `/api/formats` | GET | List supported formats |

### Convert Image

```
POST /api/convert
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| image | file | ✅ | Image file to convert |
| format | string | ✅ | Target format (jpeg, png, webp, gif, tiff, bmp, avif, heif) |
| quality | integer | ❌ | Quality 1-100 (default: 80) |

### Resize Image

```
POST /api/resize
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| image | file | ✅ | Image file to resize |
| width | integer | ❌ | Target width in pixels |
| height | integer | ❌ | Target height in pixels |
| fit | string | ❌ | cover, contain, fill, inside, outside |

### Crop Image

```
POST /api/crop
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| image | file | ✅ | Image file to crop |
| left | integer | ✅ | Left offset in pixels |
| top | integer | ✅ | Top offset in pixels |
| width | integer | ✅ | Crop width in pixels |
| height | integer | ✅ | Crop height in pixels |

### Rotate Image

```
POST /api/transform/rotate
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| image | file | ✅ | Image file to rotate |
| angle | integer | ✅ | Rotation angle: 90, 180, or 270 |

### Flip Image

```
POST /api/transform/flip
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| image | file | ✅ | Image file to flip |
| direction | string | ✅ | horizontal or vertical |

## 💻 Code Examples

### JavaScript (Node.js)

```javascript
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const form = new FormData();
form.append('image', fs.createReadStream('input.jpg'));
form.append('format', 'webp');
form.append('quality', '80');

axios.post('https://image-converter-api3.p.rapidapi.com/api/convert', form, {
    headers: {
        ...form.getHeaders(),
        'X-RapidAPI-Key': 'YOUR_API_KEY',
        'X-RapidAPI-Host': 'image-converter-api3.p.rapidapi.com'
    }
})
.then(response => {
    const buffer = Buffer.from(response.data.image, 'base64');
    fs.writeFileSync('output.webp', buffer);
    console.log('✅ Conversion successful!');
})
.catch(error => console.error(error));
```

### Python

```python
import requests
import base64

url = "https://image-converter-api3.p.rapidapi.com/api/convert"

files = {'image': open('input.jpg', 'rb')}
data = {'format': 'webp', 'quality': '80'}

headers = {
    "X-RapidAPI-Key": "YOUR_API_KEY",
    "X-RapidAPI-Host": "image-converter-api3.p.rapidapi.com"
}

response = requests.post(url, files=files, data=data, headers=headers)
result = response.json()

if result['success']:
    image_data = base64.b64decode(result['image'])
    with open('output.webp', 'wb') as f:
        f.write(image_data)
    print('✅ Conversion successful!')
```

### cURL

```bash
curl -X POST "https://image-converter-api3.p.rapidapi.com/api/convert" \
  -H "X-RapidAPI-Key: YOUR_API_KEY" \
  -H "X-RapidAPI-Host: image-converter-api3.p.rapidapi.com" \
  -F "image=@input.jpg" \
  -F "format=webp" \
  -F "quality=80"
```

## 📊 Response Format

### Success Response
```json
{
    "success": true,
    "data": {
        "original": {
            "format": "jpeg",
            "width": 1920,
            "height": 1080,
            "size": 524288
        },
        "converted": {
            "format": "webp",
            "width": 1920,
            "height": 1080,
            "size": 102400
        },
        "compression": 80
    },
    "image": "base64_encoded_image_data..."
}
```

### Error Response
```json
{
    "success": false,
    "error": {
        "code": "INVALID_FORMAT",
        "message": "Unsupported format: xyz"
    }
}
```

## 📋 Supported Formats

| Format | Input | Output | Features |
|--------|-------|--------|----------|
| JPEG | ✅ | ✅ | Lossy compression, small size |
| PNG | ✅ | ✅ | Lossless, transparency support |
| WebP | ✅ | ✅ | Modern format, best compression |
| GIF | ✅ | ✅ | Animation support |
| TIFF | ✅ | ✅ | High quality, print-ready |
| BMP | ✅ | ✅ | Uncompressed, Windows format |
| AVIF | ✅ | ✅ | Next-gen, excellent compression |
| HEIF | ✅ | ✅ | Apple format, high quality |

## 💰 Pricing

| Plan | Price | Requests | Rate Limit |
|------|-------|----------|------------|
| Free | $0/mo | 200/month | 5 req/min |
| Basic | $2.99/mo | 2,000/day | 5 req/sec |
| Pro | $4.99/mo | 10,000/day | 10 req/sec |
| Ultra | $9.99/mo | 25,000/day | 20 req/sec |

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🔗 Links

- 🚀 **API:** [RapidAPI](https://rapidapi.com/kaptancan0707/api/image-converter-api3)
- 🌐 **Website:** [GrabTune](https://grabtune.tech)

---

Made with ❤️ by [GrabTune](https://grabtune.tech)
