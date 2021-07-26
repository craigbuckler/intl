// form history API
const translate = document.getElementById('translate');

// history events
window.addEventListener('popstate', e => { if (e.state) { parseHistory(e.state.qs); raiseEvent(); } });
parseHistory(location.search);
translateHandler();

// form events
translate.addEventListener('submit', translateHandler);
translate.addEventListener('change', translateHandler);
translate.addEventListener('input', translateHandler);


// form change handler
function translateHandler(e) {

  if (e && e.type === 'submit') e.preventDefault();

  const
    data = new FormData(translate),
    qs = '?' + (new URLSearchParams(data)).toString();

  // search not changed?
  if (e && location.search === qs) return;

  // update history
  const histUrl = location.pathname + qs;

  if (!e) {
    history.replaceState({ qs }, '', histUrl);
  }
  else {
    history.pushState({ qs }, '', histUrl);
  }

  raiseEvent();

}


// restore form from querystring
function parseHistory(qs) {

  translate.reset();
  const param = new URLSearchParams(qs);

  for (let iv of param.entries()) {

    let
      inp = Array.from(document.getElementsByName(iv[0])),
      value = iv[1];

    inp.forEach(i => {

      if (i.type === 'checkbox' || i.type === 'radio') {
        if (inp.length === 1 || i.value === value) i.checked = true;
      }
      else i.value = value;

    });

  }

}


// raise custom event
function raiseEvent() {

  const
    data = new FormData(translate),
    detail = {};

  // parse form values
  for(const pair of data.entries()) {
    detail[pair[0]] = pair[1];
  }

  // custom event
  window.dispatchEvent(
    new CustomEvent('translate', {
      detail,
      bubbles: false,
      cancelable: false
    })
  );

}
