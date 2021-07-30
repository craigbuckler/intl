// find result rows
const
  table = document.getElementById('result'),
  code = document.getElementById('code'),
  result = [];

Array.from(table.getElementsByTagName('th'))
  .forEach(
    r => result.push({ locale: r.textContent === 'local' ? [] : r.textContent, output: r.nextElementSibling } )
  );

// row click event handler
table.addEventListener('click', rowClick);


// update rows
export function resultUpdate(updater) {

  result.forEach(r => {

    let res = 'error';
    try {
      res = updater(r.locale);
    }
    catch (e) { console.log(e); }

    r.output.textContent = res;

  });

}

// new code block
let scriptOrig, locale, currentTr;
export function codeUpdate(script) {

  scriptOrig = script;
  codeLocale();

}

// row click
function rowClick(e) {

  const tr = e && e.target && e.target.closest('tr');
  if (!tr || tr === currentTr) return;

  // set active row
  if (currentTr) currentTr.classList.remove('active');
  currentTr = tr;
  tr.classList.add('active');

  // update code
  locale = tr.querySelector('th').textContent;
  codeLocale();

}

// update code block
function codeLocale() {

  let scr = scriptOrig;

  if (locale) {
    scr = scr.replace('"[locale]"', locale === 'local' ? '[]' : `"${ locale }"`);
  }

  code.textContent = scr;

}
