// find result rows
const result = [];

Array.from(document.getElementById('result').getElementsByTagName('th'))
  .forEach(
    r => result.push({ locale: r.textContent === 'default' ? [] : r.textContent, output: r.nextElementSibling } )
  );

// update rows
export function resultUpdate(updater) {

  result.forEach(r => {
    r.output.textContent = updater(r.locale);
  });

}
