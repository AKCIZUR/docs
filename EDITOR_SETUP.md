# 📝 Editor Setup - Průvodce instalací

Kompletní průvodce nastavením live editoru pro vaši dokumentaci.

## Instalace

```bash
npm install
npm run dev
```

Poté přejdi na: **http://localhost:3000/editor**

## Funkce

### ✨ Hlavní vlastnosti

- **🎨 Rozhraní v češtině** - Plně lokalizované
- **📝 Live editable** - Edituj soubory přímo v prohlížeči
- **💾 Automatické ukládání** - Každých 30 sekund
- **📥 Export** - MD, TXT, DOCX, PDF
- **📁 Správce souborů** - Levý panel pro výběr dokumentů
- **🌓 Dark Mode** - Podpora tmavého tématu

### Klávesové zkratky

| Klávesa | Akce |
|---------|------|
| `Ctrl+S` | Uložit soubor |
| `Ctrl+/` | Komentář |
| `Tab` | Odsazení |
| `Shift+Tab` | Zmenšit odsazení |

## Architektura

```
app/
├── editor/
│   └── page.tsx              # Hlavní editor stránka
├── api/
│   └── editor/
│       ├── files/route.ts    # Načtení seznamu souborů
│       └── save/route.ts     # Uložení souboru
└── components/
    └── EditorPage.tsx        # Komponenta editoru
```

## Integrace s repositářem

### GitHub API integrация (volitelné)

Pro automatické commit do repositáře:

```typescript
// app/api/editor/save/route.ts
import { Octokit } = require('@octokit/rest');

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

// Commit změn
await octokit.repos.createOrUpdateFileContents({
  owner: 'AKCIZUR',
  repo: 'docs',
  path: `docs/${path}`,
  message: `📝 Update: ${path}`,
  content: Buffer.from(content).toString('base64'),
  branch: 'main'
});
```

### Nastav Environment Variables

```bash
# .env.local
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_OWNER=AKCIZUR
GITHUB_REPO=docs
```

## Export formáty

### Markdown (.md)
Nativní export, zachová všechno formátování

### Text (.txt)
Prostý text bez formátování

### Word (.docx)
Vyžaduje: `npm install docx`

```typescript
import { Document, Packer, Paragraph, TextRun } from 'docx';

const doc = new Document({
  sections: [{
    children: [
      new Paragraph({
        text: content,
        children: [new TextRun(content)]
      })
    ]
  }]
});

const buffer = await Packer.toBuffer(doc);
```

### PDF (.pdf)
Vyžaduje: `npm install pdfkit html2pdf`

```typescript
import html2pdf from 'html2pdf.js';

const options = {
  margin: 10,
  filename: 'document.pdf',
  image: { type: 'jpeg', quality: 0.98 },
  html2canvas: { scale: 2 },
  jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
};

html2pdf().set(options).from(content).save();
```

## Statický export

Pro produkční build (GitHub Pages):

```bash
npm run build
```

Generuje statické HTML v adresáři `out/`

## Jak to funguje

1. **Úprava** → Uživatel edituje dokument v editoru
2. **Auto-save** → Každých 30 sekund se obsah uloží
3. **API** → `/api/editor/save` ukládá do `docs/` adresáře
4. **Repository** → Změny se commituují do Git
5. **Static gen** → Next.js generuje statické stránky
6. **Deploy** → GitHub Pages publikuje automaticky

## Řešení problémů

### Problém: "Cannot find module 'react-ace'"

```bash
npm install react-ace ace-builds
```

### Problém: Editovač se nenačítá

Ujisti se, že:
- `app/api/editor/files/route.ts` vrací správná data
- Soubory jsou v adresáři `docs/`
- API endpoint je dostupný

### Problém: Soubory se neukládají

Kontrola:
```bash
# Zkontroluj práva k zápisu
ls -la docs/

# Zkontroluj API response
curl http://localhost:3000/api/editor/save
```

## Následující kroky

1. ✅ Instalace dependencí: `npm install`
2. ✅ Spuštění dev serveru: `npm run dev`
3. ✅ Otevření editoru: http://localhost:3000/editor
4. ✅ Konfigurace GitHub tokenu (volitelné)
5. ✅ Produkční build: `npm run build`

## Dokumentace

- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Ace Editor Docs](https://ace.c9.io/)
- [Tailwind CSS](https://tailwindcss.com)
- [Fumadocs](https://fumadocs.vercel.app/)

---

**Vytvořeno**: 2026-08-05  
**Verze**: 0.0.4  
**Jazyk**: CZ 🇨🇿
