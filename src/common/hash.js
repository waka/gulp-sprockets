import crypto from 'crypto';

const hash = {
  /**
   * @param {String} contents .
   * @return {String} Encrypted string by md5.
   */
  create: (contents) => {
    return crypto.createHash('md5').update(contents).digest('hex');
  }
};

export default hash;
