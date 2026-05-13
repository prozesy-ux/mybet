from pypdf import PdfReader
pdf = PdfReader(r"C:\Users\mpro\Downloads\Telegram Desktop\568Win Seamless Wallet SOP_18.pdf")
for i,p in enumerate(pdf.pages,1):
    imgs = list(p.images)
    print(f"PAGE {i} IMAGES: {len(imgs)}")
