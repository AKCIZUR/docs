import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';

const DOCS_DIRECTORY = join(process.cwd(), 'docs');

export async function GET() {
  try {
    const files = await readdir(DOCS_DIRECTORY);
    const markdownFiles = files.filter(f => 
      f.endsWith('.md') || f.endsWith('.mdx')
    );

    const filesWithContent = await Promise.all(
      markdownFiles.map(async (name) => {
        const path = join(DOCS_DIRECTORY, name);
        const content = await readFile(path, 'utf-8');
        return {
          name,
          path: name,
          content,
        };
      })
    );

    return NextResponse.json({ 
      files: filesWithContent,
      success: true 
    });
  } catch (error) {
    console.error('Chyba při načítání souborů:', error);
    return NextResponse.json(
      { error: 'Chyba při načítání souborů', files: [] },
      { status: 500 }
    );
  }
}
