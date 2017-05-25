/*
 *  Code Referrence =>
 *    https://stackoverflow.com/a/30730835/6811653
 */
export class LocalStorageUtil {

  public static removeStorage(key) {
    try {
        localStorage.removeItem(key);
        localStorage.removeItem(key + '_expiresIn');
    } catch(e) {
        console.log('removeStorage: Error removing key ['+ key + '] from localStorage: ' + JSON.stringify(e) );
        return false;
    }
    return true; 
  }

  public static getStorage(key) {
    var now = Date.now();  //epoch time, lets deal only with integer
    // set expiration for storage
    var expiresIn = Number(localStorage.getItem(key+'_expiresIn'));
    if( expiresIn===undefined || expiresIn===null ){ 
      expiresIn = 0; 
    }

    if (expiresIn < now) {  // Expired
        this.removeStorage(key);
        return null;
    } else {
        try {
            var value = localStorage.getItem(key);
            return value;
        } catch(e) {
            console.log('getStorage: Error reading key ['+ key + '] from localStorage: ' + JSON.stringify(e) );
            return null;
        }
    }
  }

  public static setStorage(key, value, expires) {
    if( expires===undefined || expires===null ){
        expires = (1*60*60);  // default: seconds for 1 hour
    } else {
        expires = Math.abs(expires); // make sure it's positive
    }

    var now = Date.now();  // millisecs since epoch time, lets deal only with integer
    var schedule = now + expires*1000; 
    try {
        localStorage.setItem(key, value);
        localStorage.setItem(key + '_expiresIn', String(schedule));
    } catch(e) {
        console.log('setStorage: Error setting key ['+ key + '] in localStorage: ' + JSON.stringify(e) );
        return false;
    }
    return true;
  }
  
}