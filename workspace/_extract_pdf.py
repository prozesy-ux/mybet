import sys
from pathlib import Path
pdf_path = Path(r"C:\Users\mpro\Downloads\Telegram Desktop\568Win Seamless Wallet SOP_18.pdf")
out_path = Path(r"C:\Users\mpro\Desktop\1win\workspace\seamless_wallet_sop_extracted.txt")
try:
    from pypdf import PdfReader
except Exception:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pypdf", "-q"])
    from pypdf import PdfReader
reader = PdfReader(str(pdf_path))
parts = []
for i, page in enumerate(reader.pages, start=1):
    text = page.extract_text() or ""
    parts.append(f"\n\n===== PAGE {i} =====\n\n")
    parts.append(text)
out_path.write_text("".join(parts), encoding="utf-8")
print(f"PAGES:{len(reader.pages)}")
print(f"OUT:{out_path}")
