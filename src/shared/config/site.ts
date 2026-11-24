export const site = {
  name: 'TweakMC.pl',

  defaultTheme: 'default' as const,
  showThemeSwitcher: true,

  serverIpCopy: 'tweakmc.pl',
  serverIpName: 'TweakMC',
  serverIpTld: '.pl',

  discordUrl: 'https://discord.gg/tweakmc',
  discordLabel: 'discord.gg/tweakmc',

  // Use the public Dynmap proxy address.
  dynmapUrl: 'https://tweakmc.pl/mapa/live/',
  dynmapDisplayPath: 'tweakmc.pl/mapa',

  // Enable once the Stripe and Minecraft endpoints are available.
  shopApiEnabled: false,
  walletApiBase: '/api/plugin/wallet',
  shopActivityEndpoint: '/api/shop/activity',
  stripeCheckoutEndpoint: '/api/stripe/create-checkout-session',

  shopAmounts: [10, 25, 50, 100],
  shopMin: 5,
  shopMax: 1000,
  shopSliderMax: 1000,
  payments: ['BLIK', 'Apple Pay', 'Google Pay', 'Visa / Mastercard', 'Klarna'],
};
