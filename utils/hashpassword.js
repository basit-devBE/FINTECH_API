import bcrypt from 'bcrypt';

const saltRounds = 10;

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                reject(err); 
            } else {
                resolve(hash);
            }
        });
    });
};

const validatePassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, result) => {
            if (err) {
                reject(err); // Reject with the error if comparison fails
            } else {
                resolve(result); // Resolve with true/false based on comparison result
            }
        });
    });
};

export {hashPassword, validatePassword}