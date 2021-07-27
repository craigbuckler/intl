// plural handler
import { resultUpdate, codeUpdate } from './result.js';

const table = document.getElementById('pluraltable');
if (table) window.addEventListener('translate', updateHandler);

function updateHandler(e) {

  const
    opt = e.detail,
    number = parseFloat(opt.number) || 0;

  delete opt.number;

  resultUpdate(locale => new Intl.PluralRules(locale, opt).select(number));
  codeUpdate(`new Intl.PluralRules(\n  "[locale]",\n  ${ JSON.stringify(opt) }\n).select( ${ number } );`);

}
