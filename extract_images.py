import fitz  # PyMuPDF
import os
import sys

PDFS = [
    r"c:\Users\santh\Downloads\client.pdf",
    r"c:\Users\santh\Downloads\client 1.pdf",
]
OUT_DIR = r"c:\Users\santh\OneDrive\Documents\antigravity\Admission\frontend\src\assets\images"
os.makedirs(OUT_DIR, exist_ok=True)

gallery_idx = 1
MIN_DIM = 150  # skip tiny images (icons, logos)

for pdf_path in PDFS:
    if not os.path.exists(pdf_path):
        print(f"NOT FOUND: {pdf_path}")
        continue
    doc = fitz.open(pdf_path)
    print(f"\n=== {pdf_path} ({len(doc)} pages) ===")
    for page_num in range(len(doc)):
        page = doc[page_num]
        images = page.get_images(full=True)
        print(f"  Page {page_num+1}: {len(images)} embedded images")
        for img_index, img in enumerate(images):
            xref = img[0]
            base_image = doc.extract_image(xref)
            img_bytes = base_image["image"]
            ext = base_image["ext"]
            width = base_image["width"]
            height = base_image["height"]
            # Skip tiny images (icons, backgrounds)
            if width < MIN_DIM or height < MIN_DIM:
                print(f"    Skip {width}x{height} (too small)")
                continue
            out_name = f"gallery_{gallery_idx}.{ext}"
            out_path = os.path.join(OUT_DIR, out_name)
            with open(out_path, "wb") as f:
                f.write(img_bytes)
            print(f"    Saved gallery_{gallery_idx}: {width}x{height} -> {out_path}")
            gallery_idx += 1

print(f"\nDone! Extracted {gallery_idx-1} images total.")
