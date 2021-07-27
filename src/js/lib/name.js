// names handler
import { resultUpdate, codeUpdate } from './result.js';

const table = document.getElementById('nametable');
if (table) window.addEventListener('translate', updateHandler);

function updateHandler(e) {

  const
    opt = e.detail,
    value = opt[opt.type];

  delete opt.language;
  delete opt.region;
  delete opt.script;
  delete opt.currency;

  enableField(opt, opt.type !== 'language', ['language']);
  enableField(opt, opt.type !== 'region', ['region']);
  enableField(opt, opt.type !== 'script', ['script']);
  enableField(opt, opt.type !== 'currency', ['currency']);

  resultUpdate(locale => new Intl.DisplayNames(locale, opt).of(value));
  codeUpdate(`new Intl.DisplayNames(\n  "[locale]",\n  ${ JSON.stringify(opt) }\n).of( "${ value }" );`);

}


// enable/disable fields
function enableField(opt, condition, list) {

  list.forEach(f => {

    const i = document.getElementById(f);
    if (i) i.disabled = !!condition;
    if (condition) delete opt[f];

  });

}
