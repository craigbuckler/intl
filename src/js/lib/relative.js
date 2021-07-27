// relative date/time handler
import { resultUpdate, codeUpdate } from './result.js';

const table = document.getElementById('relativetable');
if (table) window.addEventListener('translate', updateHandler);

function updateHandler(e) {

  const
    opt = e.detail,
    number = opt.number,
    unit = opt.unit;

  delete opt.number;
  delete opt.unit;

  resultUpdate(locale => new Intl.RelativeTimeFormat(locale, opt).format(number, unit));
  codeUpdate(`new Intl.RelativeTimeFormat(\n  "[locale]",\n  ${ JSON.stringify(opt) }\n).format( ${ number }, "${ unit }" );`);

}
