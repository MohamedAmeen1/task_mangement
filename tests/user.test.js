const { string } = require('joi');
let userService = require('../services/userService')
bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken');

test('test password encrypted with value not the original value', () => {
    expect(userService.encrypt_password('123456')).not.toEqual('123456');
  });



test('test password valid after encryption', async () => {
    let password = '123456'
    let encrypted_password =await userService.encrypt_password(password)
    const valid = await bcrypt.compare(password, encrypted_password);
    expect(valid).toBe(true);
});

test('test wrong password to be invalid with other encrypted password', async () => {
    let password = '123456'
    let encrypted_password =await userService.encrypt_password(password)
    const valid = await bcrypt.compare('12345x', encrypted_password);
    expect(valid).toBe(false);
});


test('test generated token', async () => {
    let user = {id: 5}
    let token =await userService.genrate_token(user)
    expect(typeof(token)).toBe('string');
});

test('test generated token verification returns the same user_id ', async () => {
    let user = {id: 5}
    let token =await userService.genrate_token(user)

    const { id, x } = jwt.verify(token, 'test')
    expect(id).toBe(user.id);
});