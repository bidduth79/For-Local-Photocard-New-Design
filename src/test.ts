import html2canvas from 'html2canvas';
html2canvas(document.body, {
  onclone: async (doc) => {
    await doc.fonts.ready;
  }
});
