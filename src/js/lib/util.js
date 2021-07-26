// utility functions

// build options object from known data, but omit named values where necessary
export function buildOpt(data = {}, omit = []) {

  const opt = {};

  for (const name in data) {

    const value = data[name];

    if (value && !omit.includes(name)) {
      opt[name] = value === 'true' ? true : value === 'false' ? false : value;
    }

  }

  return opt;

}
