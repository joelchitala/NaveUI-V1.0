export const generateUUID = (max = 100000) => {
    let uuid = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 16; i++) {
        let randomValue = crypto.getRandomValues(new Uint8Array(1))[0] % chars.length;
        uuid += chars[randomValue];
    }
  
    return uuid + '-' + Math.floor(Math.random() * max).toString();
}