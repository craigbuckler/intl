// compare handler
import { resultUpdate, codeUpdate } from './result.js';

const table = document.getElementById('comparetable');
if (table) window.addEventListener('translate', updateHandler);

function updateHandler(e) {

  const
    opt = e.detail,
    value1 = opt.value1,
    value2 = opt.value2;

  delete opt.value1;
  delete opt.value1;

  resultUpdate(locale => {

    const
      comp = new Intl.Collator(locale, opt).compare(value1, value2),
      match = comp === 0 ? '==' : comp < 0 ? '<' : '>';

    return `${ comp } : "${ value1 }" ${ match } "${ value2 }"`;

  });
  codeUpdate(`new Intl.Collator(\n  "[locale]",\n  ${ JSON.stringify(opt) }\n).compare( "${ value1 }", "${ value2 }" );`);

}
