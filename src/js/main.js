/* ==========================================================================
   PORTFOLIO FINDER & MODAL PREVIEW LOGIC
   ========================================================================== */

let activeIndex = -1;
let activeFiles = [];

/**
 * Mengambil daftar elemen file-card yang sedang terlihat/aktif (tidak tersembunyi oleh filter)
 */
function getVisibleFiles() {
  return Array.from(document.querySelectorAll('.file-card')).filter(el => {
    return window.getComputedStyle(el).display !== 'none';
  });
}

/**
 * Memfilter item berdasarkan kategori sidebar Finder
 */
function filterCategory(category, element) {
  // Update kelas active pada tombol sidebar
  document.querySelectorAll('.sidebar-btn').forEach(btn => btn.classList.remove('active'));
  if (element) {
    element.classList.add('active');
  }

  // Tampilkan atau sembunyikan item folder & file
  const items = document.querySelectorAll('.folder-card, .file-card');
  items.forEach(item => {
    const itemCat = item.getAttribute('data-category');
    if (category === 'all' || itemCat === category) {
      item.style.setProperty('display', 'flex', 'important');
    } else {
      item.style.setProperty('display', 'none', 'important');
    }
  });
}

/**
 * Membuka Modal Preview saat elemen file-card diklik
 */
function openPreviewByElement(element) {
  activeFiles = getVisibleFiles();
  activeIndex = activeFiles.indexOf(element);
  updateModalContent();

  const modal = document.getElementById('finder-modal');
  if (modal) {
    modal.classList.add('active');
  }

  // Re-render ikon Lucide (tombol navigasi panah di dalam modal)
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

/**
 * Memperbarui konten gambar, judul, meta, dan status tombol navigasi pada modal
 */
function updateModalContent() {
  if (activeIndex < 0 || activeIndex >= activeFiles.length) return;

  const currentFile = activeFiles[activeIndex];
  const src = currentFile.getAttribute('data-src');
  const title = currentFile.getAttribute('data-title');
  const meta = currentFile.getAttribute('data-meta');

  const imgEl = document.getElementById('modal-img');
  const titleEl = document.getElementById('modal-title');
  const metaEl = document.getElementById('modal-meta');
  const prevBtn = document.getElementById('modal-prev-btn');
  const nextBtn = document.getElementById('modal-next-btn');

  if (imgEl) imgEl.src = src;
  if (titleEl) titleEl.textContent = title;
  if (metaEl) metaEl.textContent = `${meta} (${activeIndex + 1}/${activeFiles.length})`;

  // Disabled status untuk tombol batas awal/akhir
  if (prevBtn) prevBtn.disabled = (activeIndex === 0);
  if (nextBtn) nextBtn.disabled = (activeIndex === activeFiles.length - 1);
}

/**
 * Navigasi file berikutnya atau sebelumnya (arah: -1 atau 1)
 */
function navigatePreview(direction) {
  const newIndex = activeIndex + direction;
  if (newIndex >= 0 && newIndex < activeFiles.length) {
    activeIndex = newIndex;
    updateModalContent();
  }
}

/**
 * Menutup Modal Preview
 */
function closePreview(event, force = false) {
  if (force || (event && event.target.id === 'finder-modal')) {
    const modal = document.getElementById('finder-modal');
    if (modal) {
      modal.classList.remove('active');
    }
  }
}

/* ==========================================================================
   EVENT LISTENERS (KEYBOARD CONTROL)
   ========================================================================== */

document.addEventListener('keydown', function(event) {
  const modal = document.getElementById('finder-modal');
  if (!modal || !modal.classList.contains('active')) return;

  if (event.key === 'ArrowRight') {
    navigatePreview(1);
  } else if (event.key === 'ArrowLeft') {
    navigatePreview(-1);
  } else if (event.key === 'Escape') {
    closePreview(event, true);
  }
});