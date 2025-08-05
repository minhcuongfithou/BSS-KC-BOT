const isValidShopifyDomain = (domain) => {
    return typeof domain === 'string' && domain.endsWith('.myshopify.com') && !domain.startsWith('httpF');
};

export {
    isValidShopifyDomain
};