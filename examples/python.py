"""
Image Converter API - Python Examples

API: https://rapidapi.com/kaptancan0707/api/image-converter-api3

Install dependencies:
pip install requests
"""

import requests
import base64

# API Configuration
API_HOST = "image-converter-api3.p.rapidapi.com"
API_KEY = "YOUR_RAPIDAPI_KEY"  # Get your key from https://rapidapi.com/kaptancan0707/api/image-converter-api3

headers = {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": API_HOST
}


def convert_image(input_path: str, output_path: str, target_format: str, quality: int = 80) -> dict:
    """Convert image to another format"""
    url = f"https://{API_HOST}/api/convert"
    
    with open(input_path, 'rb') as f:
        files = {'image': f}
        data = {'format': target_format, 'quality': str(quality)}
        
        response = requests.post(url, files=files, data=data, headers=headers)
        result = response.json()
        
        if result['success']:
            image_data = base64.b64decode(result['image'])
            with open(output_path, 'wb') as out:
                out.write(image_data)
            
            print(f"✅ Converted: {input_path} → {output_path}")
            print(f"   Original: {result['data']['original']['size']} bytes")
            print(f"   Converted: {result['data']['converted']['size']} bytes")
            return result
        else:
            print(f"❌ Error: {result['error']['message']}")
            return result


def resize_image(input_path: str, output_path: str, width: int = None, height: int = None, fit: str = 'cover') -> dict:
    """Resize image to specified dimensions"""
    url = f"https://{API_HOST}/api/resize"
    
    with open(input_path, 'rb') as f:
        files = {'image': f}
        data = {'fit': fit}
        if width:
            data['width'] = str(width)
        if height:
            data['height'] = str(height)
        
        response = requests.post(url, files=files, data=data, headers=headers)
        result = response.json()
        
        if result['success']:
            image_data = base64.b64decode(result['image'])
            with open(output_path, 'wb') as out:
                out.write(image_data)
            
            print(f"✅ Resized: {input_path} → {output_path}")
            return result
        else:
            print(f"❌ Error: {result['error']['message']}")
            return result


def crop_image(input_path: str, output_path: str, left: int, top: int, width: int, height: int) -> dict:
    """Crop a region from image"""
    url = f"https://{API_HOST}/api/crop"
    
    with open(input_path, 'rb') as f:
        files = {'image': f}
        data = {
            'left': str(left),
            'top': str(top),
            'width': str(width),
            'height': str(height)
        }
        
        response = requests.post(url, files=files, data=data, headers=headers)
        result = response.json()
        
        if result['success']:
            image_data = base64.b64decode(result['image'])
            with open(output_path, 'wb') as out:
                out.write(image_data)
            
            print(f"✅ Cropped: {input_path} → {output_path}")
            return result
        else:
            print(f"❌ Error: {result['error']['message']}")
            return result


def rotate_image(input_path: str, output_path: str, angle: int) -> dict:
    """Rotate image by specified angle"""
    url = f"https://{API_HOST}/api/transform/rotate"
    
    with open(input_path, 'rb') as f:
        files = {'image': f}
        data = {'angle': str(angle)}
        
        response = requests.post(url, files=files, data=data, headers=headers)
        result = response.json()
        
        if result['success']:
            image_data = base64.b64decode(result['image'])
            with open(output_path, 'wb') as out:
                out.write(image_data)
            
            print(f"✅ Rotated: {input_path} → {output_path} ({angle}°)")
            return result
        else:
            print(f"❌ Error: {result['error']['message']}")
            return result


def flip_image(input_path: str, output_path: str, direction: str) -> dict:
    """Flip image horizontally or vertically"""
    url = f"https://{API_HOST}/api/transform/flip"
    
    with open(input_path, 'rb') as f:
        files = {'image': f}
        data = {'direction': direction}
        
        response = requests.post(url, files=files, data=data, headers=headers)
        result = response.json()
        
        if result['success']:
            image_data = base64.b64decode(result['image'])
            with open(output_path, 'wb') as out:
                out.write(image_data)
            
            print(f"✅ Flipped: {input_path} → {output_path} ({direction})")
            return result
        else:
            print(f"❌ Error: {result['error']['message']}")
            return result


def get_formats() -> dict:
    """Get list of supported formats"""
    url = f"https://{API_HOST}/api/formats"
    
    response = requests.get(url, headers=headers)
    result = response.json()
    
    if result['success']:
        formats = [f['format'] for f in result['data']['formats']]
        print(f"Supported formats: {', '.join(formats)}")
        return result
    else:
        print(f"❌ Error: {result['error']['message']}")
        return result


# ============ USAGE EXAMPLES ============

if __name__ == "__main__":
    print("🖼️ Image Converter API - Python Examples")
    print("📌 Get your API key: https://rapidapi.com/kaptancan0707/api/image-converter-api3\n")
    
    # Uncomment to test:
    
    # convert_image('input.jpg', 'output.webp', 'webp', 80)
    # resize_image('input.jpg', 'resized.jpg', width=800, height=600)
    # crop_image('input.jpg', 'cropped.jpg', left=100, top=50, width=400, height=300)
    # rotate_image('input.jpg', 'rotated.jpg', 90)
    # flip_image('input.jpg', 'flipped.jpg', 'horizontal')
    # get_formats()
    
    print("✨ Uncomment the examples above to test!")
