export const regex = {
  // Min 8 chars, at least one uppercase, one lowercase, and one number
  'password': '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!"#%&()*+,-./:;<=>?@^_`{|}~]{8,}$',

  // Alphanumerical digits including _ and -, 3 - 15 characters, inclusive
  'username': '^[0-9A-Za-z_-]{3,15}$',

  //
  'name': '^.*$'
}
