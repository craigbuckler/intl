// lists handler
import { resultUpdate, codeUpdate } from './result.js';

const table = document.getElementById('listtable');
if (table) window.addEventListener('translate', updateHandler);

function updateHandler(e) {

  const
    opt = e.detail,
    list = opt.list.split(',');

  delete opt.list;

  resultUpdate(locale => new Intl.ListFormat(locale, opt).format(list));
  codeUpdate(`new Intl.ListFormat(\n  "[locale]",\n  ${ JSON.stringify(opt) }\n).format( ${ JSON.stringify(list) } );`);

}
