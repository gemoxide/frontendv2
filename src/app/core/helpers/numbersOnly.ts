export const numbersOnly = (evt: React.FormEvent<HTMLInputElement>) => {
    evt.currentTarget.value = (+evt.currentTarget.value
        .replace(/[^0-9\,.]/, "")
        .replaceAll(",", "")).toLocaleString();
};
