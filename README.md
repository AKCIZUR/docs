# 📚 DocsFuma - Live Editor s GitHub Pages Deploy

Kompletní řešení pro správu dokumentace s live editorem přímo v prohlížeči a automatickým nasazením na GitHub Pages.

## ✨ Hlavní funkce

### 🎨 Live Editor v češtině
- **Ace Editor** - Profesionální editor s syntax highlighting
- **Markdown & Text režim** - Přepínač mezi módy
- **Auto-save** - Automatické ukládání každých 30 sekund
- **Keyboard shortcuts** - Ctrl+S pro uložení, Ctrl+/ pro komentář

### 📥 Správa souborů
- **File Browser** - Levý panel se seznamem .md a .mdx souborů
- **One-click selection** - Rychlý výběr dokumentů
- **Directory monitoring** - Automatické detekování nových souborů

### 📤 Export v 4 formátech
- **Markdown (.md)** - Bez ztráty formátování
- **Text (.txt)** - Čistý text
- **Word (.docx)** - Kompatibilní s MS Office
- **PDF (.pdf)** - Tisknutelný formát

### 🚀 Automatický Deploy
- **GitHub Actions** - Automatické build a deploy
- **Static Export** - Next.js static generation
- **GitHub Pages** - Bezplatné hostování
- **CI/CD Pipeline** - Push → Build → Deploy

## 🔧 Instalace

```bash
# 1. Klonuj repository
git clone https://github.com/AKCIZUR/docs.git
cd docs

# 2. Instaluj dependencies
npm install

# 3. Spusť dev server
npm run dev

# 4. Otevři editor
# http://localhost:3000/editor
```

## 📖 Použití

### Editor
```bash
npm run dev
# Jdi na: http://localhost:3000/editor
```

### Dokumentace
```bash
npm run dev
# Jdi na: http://localhost:3000
```

### Production Build
```bash
npm run build
npm run start
# Static soubory jsou v `out/` adresáři
```

## 🏗️ Architektura

```
docs/
├── app/
│   ├── editor/
│   │   └── page.tsx                 # Hlavní stránka editoru
│   ├── api/
│   │   └── editor/
│   │       ├── files/route.ts       # API pro výpis souborů
│   │       └── save/route.ts        # API pro uložení
│   ├── components/
│   │   └── EditorPage.tsx           # Komponenta editoru s exportem
│   └── layout.tsx
├── docs/
│   ├── *.md                          # Tvoje dokumentace
│   └── *.mdx                         # MDX soubory
├── .github/
│   └── workflows/
│       └── build-deploy.yml         # GitHub Actions workflow
├── package.json                      # Dependencies
├── next.config.js                    # Next.js config
└── EDITOR_SETUP.md                  # Dokumentace editoru
```

## 🔌 API Endpoints

### GET `/api/editor/files`
Načte seznam všech .md a .mdx souborů s obsahem.

```typescript
// Response
{
  "files": [
    {
      "name": "README.md",
      "path": "README.md",
      "content": "# Content..."
    }
  ]
}
```

### POST `/api/editor/save`
Uloží změny souboru.

```typescript
// Request
{
  "path": "README.md",
  "content": "# Updated content...",
  "commitMessage": "Optional commit message"
}

// Response
{
  "success": true,
  "message": "✓ Soubor úspěšně uložen",
  "file": {
    "path": "README.md",
    "savedAt": "2026-08-05T22:42:00.000Z"
  }
}
```

## 🚀 GitHub Pages Setup

### Automaticky (GitHub Actions)
Workflow `.github/workflows/build-deploy.yml` automaticky:
1. Nainstaluje dependencies
2. Vytvoří static export (`npm run build`)
3. Nasadí na GitHub Pages

Jednoduše `git push` a hotovo! 🎉

### Manuálně
```bash
# 1. Build
npm run build

# 2. Push `out/` adresář na `gh-pages` větev
git subtree push --prefix out origin gh-pages

# 3. V GitHub:
# Settings → Pages → Source → gh-pages
```

## 📝 Konfigurace

### Environment Variables
Vytvoř `.env.local` pro development:

```bash
# .env.local
NEXT_PUBLIC_BASE_PATH=/docs  # Pro subdomény
```

### Next.js Config
`next.config.js` je již nakonfigurován pro:
- Static export (`output: 'export'`)
- Image optimization vypnuto
- Asset prefix pro subdomény

## 🎯 Workflow - Jak to funguje

```
1. Otevřeš editor
   ↓
2. Edituješ dokument
   ↓
3. Auto-save uloží soubor
   ↓
4. Změny jsou v repositáři
   ↓
5. GitHub Actions spustí build
   ↓
6. Static export se vytvoří
   ↓
7. GitHub Pages se updatuje
   ↓
8. Web je live! 🚀
```

## 💾 Auto-Save Chování

- **Interval**: 30 sekund
- **Trigger**: Jakákoliv změna v editoru
- **Status**: "Neuložené změny" → "Vše je uloženo"
- **Ruční uložení**: Klikni "Uložit" nebo Ctrl+S

## 🎨 Klávesové zkratky

| Zkratka | Akce |
|---------|------|
| `Ctrl+S` | Uložit soubor |
| `Ctrl+/` | Komentář |
| `Tab` | Odsazení |
| `Shift+Tab` | Zmenšit odsazení |
| `Ctrl+Z` | Vrátit zpět |
| `Ctrl+Y` | Znovu |

## 🛠️ Troubleshooting

### ❌ "Cannot find module 'react-ace'"
```bash
npm install --save-dev react-ace ace-builds
```

### ❌ Build selhává
```bash
# Smaž node_modules a cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

### ❌ Soubory se neukládají
- Zkontroluj, že API endpoint je dostupný
- Skontroluj `docs/` adresář - musí existovat
- Podívej se do browser console na chyby

### ❌ GitHub Pages se neaktualizuje
1. Zkontroluj Settings → Pages
2. Source musí být GitHub Actions
3. Pushn změny do `main` větve
4. Čekej 2-3 minuty na build

## 📚 Související dokumenty

- [EDITOR_SETUP.md](./EDITOR_SETUP.md) - Detailní setup guide
- [Next.js Docs](https://nextjs.org/)
- [Fumadocs](https://fumadocs.vercel.app/)
- [Ace Editor](https://ace.c9.io/)

## 📦 Dependencies

- **React 18.2** - UI Framework
- **Next.js 16.2** - Framework
- **Ace Editor** - Code editor
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Fumadocs** - Documentation

## 🔐 Bezpečnost

- ✅ Soubory se validují (`.md`, `.mdx` jen)
- ✅ Path traversal je blokován
- ✅ Bez přístupu mimo `docs/` adresář
- ✅ API chyby nejsou exponovány

## 📊 Verze

- **Verze**: 0.0.4
- **Node**: 18.x
- **Next.js**: 16.2.6
- **React**: 18.2.0

## 🎓 Příklady

### Přidej nový dokument
```bash
# Vytvoř soubor v docs/
echo "# Nový dokument" > docs/novy.md

# Commit a push
git add docs/novy.md
git commit -m "Add new documentation"
git push
```

### Export dokumentu
1. Otevři editor
2. Vyber dokument
3. Klikni na tlačítko exportu (MD, TXT, DOCX, PDF)
4. Soubor se stáhne

### Kustomizace
Úprava stylů v `app/components/EditorPage.tsx`:
```typescript
// Změň barvu lišty
className="bg-blue-600" // → "bg-purple-600"
```

## 🤝 Příspěvky

Chyby nebo nápady? Vytvoř issue nebo PR!

## 📄 Licence

MIT - Svobodně používej a modifikuj

---

**Vytvořeno**: 2026-08-05  
**Jazyk**: 🇨🇿 Čeština  
**Status**: ✅ Aktivní vývoj
