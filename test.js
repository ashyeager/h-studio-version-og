const KEYWORDS = {
  website: 'websites',
  'landing page': 'websites',
  automation: 'automation',
  workflow: 'automation',
  chatbot: 'chatbots',
  voice: 'chatbots',
  agent: 'chatbots',
  pricing: 'pricing',
  cost: 'pricing',
  price: 'pricing',
  contact: 'contact',
  reach: 'contact',
  message: 'contact',
  instagram: 'contact',
  process: 'process',
  how: 'process',
  what: 'what',
  do: 'what',
  services: 'what',
  ai: 'what',
};

const text = "what do you do?";
const lowerText = text.toLowerCase();
let matchedAction = 'unknown';
for (const [keyword, action] of Object.entries(KEYWORDS)) {
  if (lowerText.includes(keyword)) {
    matchedAction = action;
    break; // This might match 'what' first
  }
}
console.log(matchedAction);
