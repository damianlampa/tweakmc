// ─────────────────────────────────────────────────────────────
//  TweakMC.pl — konfiguracja strony (bez surowego IP serwera!).
// ─────────────────────────────────────────────────────────────
export const site = {
  name: 'TweakMC.pl',
  // Domyślny motyw strony: 'default' | 'christmas' | 'halloween' | 'spring'
  defaultTheme: 'default' as const,
  // Pokaż przełącznik sezonowy (ustaw na false na produkcji, jeśli chcesz zablokować jeden motyw)
  showThemeSwitcher: true,
  // Wyświetlane stylowo jako TweakMC.pl, a do schowka zawsze trafia czyste tweakmc.pl
  serverIpCopy: 'tweakmc.pl',
  serverIpName: 'TweakMC',
  serverIpTld: '.pl',
  discordUrl: 'https://discord.gg/tweakmc',
  discordLabel: 'discord.gg/tweakmc',
  // Mapa wyłącznie przez proxy domeny (nigdy surowe IP hosta — ochrona przed DDoS)
  dynmapUrl: 'https://tweakmc.pl/mapa/live/',
  dynmapDisplayPath: 'tweakmc.pl/mapa',
  // Endpointy sklepu / pluginu MC — zmień shopApiEnabled na true po podpięciu backendu Stripe + pluginu
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
