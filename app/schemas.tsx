import { z } from "zod";

export const division = z.enum([
  "Unranked",
  "Open 1",
  "Open 2",
  "Open 3",
  "Open 4",
  "Open 5",
  "Intermediate 1",
  "Intermediate 2",
  "Intermediate 3",
  "Intermediate 4",
  "Intermediate 5",
  "Advanced 1",
  "Advanced 2",
  "Advanced 3",
  "Advanced 4",
  "Advanced 5",
  "Elite 1",
  "Elite 2",
  "Elite 3",
  "Elite 4",
  "Elite 5",
  "Contender",
]);
export const region = z.enum([
  "US West",
  "US East",
  "Western Europe",
  "Central & Eastern Europe",
  "Middle East",
  "Turkiye",
  "Asia",
  "Japan",
  "Oceania",
  "South Asia",
  "Korea",
  "Latin America North",
  "Latin America South",
  "Brazil",
]);
export const team = z.object({
  id: z.coerce.number(),
  name: z.string(),
  tag: z.string(),
  episode: z.number(),
  act: z.number(),
  division: division,
  rank: z.number(),
  imageLink: z.string(),
  region: region,
  playerCount: z.number(),
});
export const teamSchema = z.array(team);

export type TeamType = z.infer<typeof team>;
export type TeamSchemaType = z.infer<typeof teamSchema>;
