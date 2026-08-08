import type {CSSProperties} from "react";

export function cx(...values: Array<false | null | string | undefined>): string {
    return values.filter(Boolean).join(" ");
}

export type CustomProperties = CSSProperties & Record<`--${string}`, number | string>;
