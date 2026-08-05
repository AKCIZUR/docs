import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { NextRequest, NextResponse } from 'next/server';

const DOCS_DIRECTORY = join(process.cwd(), 'docs');

interface SaveRequest {
  path: string;
  content: string;
  commitMessage?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: SaveRequest = await request.json();
    const { path, content, commitMessage } = body;

    if (!path || content === undefined) {
      return NextResponse.json(
        { error: 'Chybí path nebo content' },
        { status: 400 }
      );
    }

    // Zajistit bezpečnost - jen .md a .mdx v docs adresáři
    if (!path.match(/^[\w\-./]+\.(md|mdx)$/)) {
      return NextResponse.json(
        { error: 'Neplatný název souboru' },
        { status: 400 }
      );
    }

    const filePath = join(DOCS_DIRECTORY, path);

    // Zajistit, aby cestu nebyla mimo DOCS_DIRECTORY
    if (!filePath.startsWith(DOCS_DIRECTORY)) {
      return NextResponse.json(
        { error: 'Přístup odepřen' },
        { status: 403 }
      );
    }

    // Vytvořit adresář, pokud neexistuje
    await mkdir(DOCS_DIRECTORY, { recursive: true });

    // Zapsat soubor
    await writeFile(filePath, content, 'utf-8');

    // Pokud máš Git integration, můžeš zde přidat commit
    // await commitToRepository(path, content, commitMessage);

    return NextResponse.json({
      success: true,
      message: '✓ Soubor úspěšně uložen',
      file: {
        path,
        savedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Chyba při ukládání souboru:', error);
    return NextResponse.json(
      { error: 'Chyba při ukládání souboru', details: String(error) },
      { status: 500 }
    );
  }
}
