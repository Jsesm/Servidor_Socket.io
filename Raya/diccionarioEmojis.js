export const emojiDictionary = {
  gandalf: "🧙‍♂️",
  legolas: "🧝‍♂️",
  anillo: "💍",
  smaug: "🐉",
  lurtz: "🧌",
  monte: "🌋",
};

export function getEmoji(word) {
  const key = word.toLowerCase();
  return emojiDictionary[key] || word;
}