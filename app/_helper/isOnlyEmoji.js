function isOnlyEmojis(text) {
  // This regex matches strings that consist entirely of emojis
  const emojiRegex = /^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)+$/gu;
  return emojiRegex.test(text.trim());
}

export default isOnlyEmojis;
