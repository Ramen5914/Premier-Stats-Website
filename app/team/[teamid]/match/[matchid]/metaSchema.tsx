import { z } from "zod";

export const metaSchema = z.object({
    enemyName: z.string(),
    enemyTag: z.string(),
});

export type MetaType = z.infer<typeof metaSchema>;
