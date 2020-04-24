export const bb='zrliao'

export function trim(text) {
    if (typeof(text) == "string") {
        return text.replace(/^\s*|\s*$/g, "");
    } else {
        return text;
    }
}