export async function extractRequirementDocument(fileName: string, file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();

  if (/\.docx$/i.test(fileName)) {
    const mammoth = await import('mammoth');
    const result = await mammoth.default.extractRawText({arrayBuffer});
    return result.value;
  }

  if (/\.pdf$/i.test(fileName)) {
    const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
    pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/legacy/build/pdf.worker.min.mjs', import.meta.url).toString();
    const loadingTask = pdfjs.getDocument({data: new Uint8Array(arrayBuffer)});
    const document = await loadingTask.promise;
    try {
      const pages: string[] = [];
      for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
        const page = await document.getPage(pageNumber);
        const content = await page.getTextContent();
        pages.push(content.items.map((item) => 'str' in item ? item.str : '').filter(Boolean).join(' '));
      }
      return pages.join('\n\n');
    } finally {
      await loadingTask.destroy();
    }
  }

  return await file.text();
}
