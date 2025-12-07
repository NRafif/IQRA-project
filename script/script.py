import numpy as np
from PIL import Image

# Load image
img_path = 'perfect-pohon.png'
img = Image.open(img_path)
width, height = img.size

# --- 1. Bagian Bawah (Akar) ---
# Mengambil 30% terbawah agar rumput terlihat jelas
root_height_ratio = 0.30
root_crop = img.crop((0, int(height * (1 - root_height_ratio)), width, height))

# --- 2. Bagian Tengah (Batang) ---
# Mengambil bagian tengah yang paling lurus (40% - 60% dari tinggi gambar)
trunk_top_ratio = 0.40
trunk_bottom_ratio = 0.60
trunk_crop = img.crop((0, int(height * trunk_top_ratio), width, int(height * trunk_bottom_ratio)))

# --- 3. Bagian Atas (Daun + Extra Langit) ---
# Crop bagian daun (0% - 45%)
leaf_crop_height = int(height * 0.45)
leaf_crop = img.crop((0, 0, width, leaf_crop_height))

# Membuat "Langit Tambahan" di atasnya
# Teknik: Mengambil 1 baris pixel teratas, lalu di-stretch ke atas
sky_extension_height = 800  # Menambah tinggi langit 800px
top_pixel_row = leaf_crop.crop((0, 0, width, 1)) # Ambil baris pixel paling atas
extended_sky = top_pixel_row.resize((width, sky_extension_height)) # Stretch ke atas

# Gabungkan Langit Tambahan + Daun
final_top_img = Image.new('RGB', (width, sky_extension_height + leaf_crop_height))
final_top_img.paste(extended_sky, (0, 0))
final_top_img.paste(leaf_crop, (0, sky_extension_height))

# Tampilkan Hasil
# (Dalam prakteknya kamu bisa save gambar-gambar ini)
final_top_img.show()
trunk_crop.show()
root_crop.show()