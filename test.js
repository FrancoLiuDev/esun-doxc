function findNext(alpha) {
  let chars = [...alpha].reverse();

  const idx = chars.findIndex((c) => {
    return c.charCodeAt() < "Z".charCodeAt();
  });
  if (idx >= 0) {
    chars[idx] = String.fromCharCode(chars[idx].charCodeAt() + 1);
    for (let i = 0; i < idx; i++) {
      chars[idx] = "A";
    }
  } else {
    chars.push("A");
    chars = chars.map((c) => {
      return "A";
    });
  }
  return chars.reverse().join("");
}
let Alpha = "A";
for (let i = 0; i < 500; i++) {
  Alpha = findNext(Alpha);
  console.log("Alpha", Alpha);
}
