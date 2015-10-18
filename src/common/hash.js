import crypto from 'crypto';

const hash = {
  create: (contents) => {
    return crypto.createHash('md5').update(contents).digest('hex');
  }
};

export default hash;
