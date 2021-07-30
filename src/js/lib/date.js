// date/time handler
import { resultUpdate, codeUpdate } from './result.js';

const table = document.getElementById('datetable');
if (table) window.addEventListener('translate', updateHandler);

function updateHandler(e) {

  const
    opt = e.detail,
    method = opt.method || 'format',
    datetime = opt.date + 'T' + opt.time,
    date = new Date(datetime),
    datetime2 = opt.date2 + 'T' + opt.time2,
    date2 = method === 'formatRange' ? new Date(datetime2) : null;

  delete opt.method;
  delete opt.date;
  delete opt.time;
  delete opt.date2;
  delete opt.time2;

  enableField(opt, method !== 'formatRange', ['date2', 'time2']);
  enableField(opt, opt.dateStyle || opt.timeStyle, ['weekday', 'day', 'month', 'year', 'hour', 'minute', 'second', 'fractionalSecondDigits', 'timeZoneName']);

  resultUpdate(locale => {

    const dt = new Intl.DateTimeFormat(locale, opt);
    return date2 ? dt.formatRange(date, date2) : dt.format(date);

  });
  codeUpdate(`new Intl.DateTimeFormat(\n  "[locale]",\n  ${ JSON.stringify(opt) }\n).${ method }( new Date("${ datetime }")${ date2 ? `, new Date("${ datetime2 }")` : '' } );`);

}


// enable/disable fields
function enableField(opt, condition, list) {

  list.forEach(f => {

    const i = document.getElementById(f);
    if (i) i.disabled = !!condition;
    if (condition) delete opt[f];

  });

}
