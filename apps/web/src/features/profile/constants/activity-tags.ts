const ACTIVITY_TAG_EXAMPLES = [
  'outdoors',
  'sports',
  'study',
  'music',
  'food',
  'games',
] as const;

type ActivityTagExample = (typeof ACTIVITY_TAG_EXAMPLES)[number];

export { ACTIVITY_TAG_EXAMPLES };
export type { ActivityTagExample };
