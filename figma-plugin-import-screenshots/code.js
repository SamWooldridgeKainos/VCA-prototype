// Main plugin code - runs inside FigJam/Figma
figma.showUI(__html__, { width: 560, height: 420 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'import-images') {
    const images = msg.images; // [{name, dataUrl, width, height}]

    // Layout parameters
    const gap = 24;
    const maxRowWidth = 2000;
    let x = 0, y = 0, rowHeight = 0;

    for (const img of images) {
      try {
        const data = img.dataUrl.split(',')[1];
        const binary = Uint8Array.from(atob(data), c => c.charCodeAt(0));
        const figmaImage = figma.createImage(binary);

        // Scale large images down to a reasonable max width while keeping aspect ratio
        const maxWidth = 1000;
        let width = img.width;
        let height = img.height;
        if (!width || !height) {
          // fallback default
          width = Math.min(800, maxWidth);
          height = Math.round(width * 0.7);
        } else if (width > maxWidth) {
          const scale = maxWidth / width;
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }

        // Create a frame-like rectangle and set image as fill
        const node = figma.createRectangle();
        node.x = x;
        node.y = y;
        node.resize(width, height);
        node.fills = [{ type: 'IMAGE', scaleMode: 'FILL', imageHash: figmaImage.hash }];

        figma.currentPage.appendChild(node);

        // update layout positions
        x += width + gap;
        rowHeight = Math.max(rowHeight, height);
        if (x > maxRowWidth) {
          x = 0;
          y += rowHeight + gap;
          rowHeight = 0;
        }
      } catch (err) {
        // continue on error
        console.error('Failed to import image', err);
      }
    }

    figma.closePlugin(`Imported ${images.length} images`);
  }
};
