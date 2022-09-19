/* eslint-disable eqeqeq */
export const countLearnedWords = (lessons) => {
  let count = 0;
  if (Array.isArray(lessons)) {
    lessons.forEach((lesson) => {
      let temp = lesson.learned_words.filter((word) => {
        return word.choice.is_correct == true;
      });
      count += temp.length;
    });
  } else {
    lessons.learned_words.forEach((word) => {
      count += word.choice.is_correct ? 1 : 0;
    });
  }
  return count;
};
