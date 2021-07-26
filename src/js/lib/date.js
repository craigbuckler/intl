// date/time handler
import { resultUpdate } from './result.js';
import { buildOpt } from './util.js';

const table = document.getElementById('datetable');

if (table) window.addEventListener('translate', dateHandler);


function dateHandler(e) {

  const
    datetime = e.detail.date + 'T' + e.detail.time,
    date = new Date(datetime),
    opt = buildOpt(e.detail, ['date', 'time']);

  console.log(date, opt);

  resultUpdate(locale => new Intl.DateTimeFormat(locale, opt).format(date));

}
