from pypdf import PdfReader
pdf = r"C:\Users\mpro\Downloads\Telegram Desktop\568Win Seamless Wallet SOP_18.pdf"
r = PdfReader(pdf)
found = []
for i,p in enumerate(r.pages, start=1):
    annots = p.get('/Annots')
    if not annots:
        continue
    for a in annots:
        obj = a.get_object()
        act = obj.get('/A')
        if act and act.get('/URI'):
            found.append((i, str(act.get('/URI'))))
for page,uri in found:
    print(f"PAGE {page}: {uri}")
print('TOTAL', len(found))
