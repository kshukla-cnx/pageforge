import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * PageForge product grid.
 * Each row from the template is one product: [image cell, text cell].
 * Turns rows into an accessible list of cards with optimized images.
 */
export default function decorate(block) {
  const list = document.createElement('ul');

  [...block.children].forEach((row) => {
    const item = document.createElement('li');
    item.className = 'product-grid-card';
    while (row.firstElementChild) item.append(row.firstElementChild);

    [...item.children].forEach((cell) => {
      cell.className = cell.querySelector('picture') ? 'product-grid-image' : 'product-grid-body';
    });

    item.querySelectorAll('picture > img').forEach((img) => {
      const optimized = createOptimizedPicture(img.src, img.alt, false, [{ width: '400' }]);
      img.closest('picture').replaceWith(optimized);
    });

    list.append(item);
  });

  block.replaceChildren(list);
}
