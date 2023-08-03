export const msalConfig = {
    auth: {
        clientId: '9e3a7c34-908f-41a6-8b07-3c02fc6bbcf5',
        // CG88Q~ZY_8Dz86P69A-3PzlzRKzklHh_zzNFTdss
        authority: 'https://login.microsoftonline.com/4d41fa50-108f-4e47-9d0d-f86df7d18c1f',
        redirectUri: window.location.origin,
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: false,
    },
};

// Scopes you add here will be prompted for consent during login.
export const loginRequest = {
    scopes: ['User.Read', 'User.ReadBasic.All'],
};