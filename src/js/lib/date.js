// date/time handler
import { resultUpdate, codeUpdate } from './result.js';

const table = document.getElementById('datetable');
if (table) window.addEventListener('translate', updateHandler);

function updateHandler(e) {

  const
    opt = e.detail,
    datetime = opt.date + 'T' + opt.time,
    date = new Date(datetime);

  delete opt.date;
  delete opt.time;

  enableField(opt, opt.dateStyle || opt.timeStyle, ['weekday', 'day', 'month', 'year', 'hour', 'minute', 'second', 'fractionalSecondDigits', 'timeZoneName']);

  resultUpdate(locale => new Intl.DateTimeFormat(locale, opt).format(date));
  codeUpdate(`new Intl.DateTimeFormat(\n  "[locale]",\n  ${ JSON.stringify(opt) }\n).format( new Date("${ datetime }") );`);

}


// enable/disable fields
function enableField(opt, condition, list) {

  list.forEach(f => {

    const i = document.getElementById(f);
    if (i) i.disabled = !!condition;
    if (condition) delete opt[f];

  });

}
