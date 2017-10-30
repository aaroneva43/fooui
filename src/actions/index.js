export const userLogin = (payload, pathName) => ({
    type: 'USER_LOGIN',
    payload,
    meta: { auth: true, pathName },
});