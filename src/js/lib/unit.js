// unit handler
import { resultUpdate, codeUpdate } from './result.js';

const table = document.getElementById('unittable');
if (table) window.addEventListener('translate', updateHandler);

function updateHandler(e) {

  const
    opt = e.detail,
    number = parseFloat(opt.number) || 0;

  delete opt.number;

  if (opt.minimumFractionDigits && opt.maximumFractionDigits && parseFloat(opt.minimumFractionDigits) >= parseFloat(opt.maximumFractionDigits)) delete opt.maximumFractionDigits;
  if (opt.minimumSignificantDigits && opt.maximumSignificantDigits && parseFloat(opt.minimumSignificantDigits) >= parseFloat(opt.maximumSignificantDigits)) delete opt.maximumSignificantDigits;

  enableField(opt, opt.notation !== 'compact', ['compactDisplay']);
  enableField(opt, opt.style !== 'currency', ['currency','currencySign','currencyDisplay']);
  enableField(opt, opt.style !== 'unit', ['unit','unitDisplay']);

  resultUpdate(locale => new Intl.NumberFormat(locale, opt).format(number));
  codeUpdate(`new Intl.NumberFormat(\n  "[locale]",\n  ${ JSON.stringify(opt) }\n).format( ${ number } );`);

}


// enable/disable fields
function enableField(opt, condition, list) {

  list.forEach(f => {

    const i = document.getElementById(f);
    if (i) i.disabled = !!condition;
    if (condition) delete opt[f];

  });

}
