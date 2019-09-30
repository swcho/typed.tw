const isNotVendor = (function() {
  const pseudos = [
    "::-webkit-input-placeholder", "::-moz-placeholder",
    ":-ms-input-placeholder", "::-ms-input-placeholder"
  ];
  return (selector: string) => (
    pseudos.every(pseudo => !selector.includes(pseudo))
  );
})();

const removePseudo = (function() {
  const pseudos = [
    // These are not Tailwind's pseudo variants but are used
    ":before", ":after", "::placeholder",
    // These are Tailwind's pseudo variants
    ":hover", ":active", ":focus-within", ":focus", ":visited", ":disabled",
    ":first-child", ":last-child", ":nth-child(odd)", ":nth-child(even)",
  ];
  const remove = (value: string, pseudo: string) => value.replace(pseudo, "");
  return (selector: string) => pseudos.reduce(remove, selector);
})();

export const toClasses = (selectors: string[]) => selectors
  .filter(isNotVendor)
  .map(removePseudo);
