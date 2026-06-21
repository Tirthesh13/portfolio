export interface Quest {
  id: string
  title: string
  description: string
  zone: string
  npcId: string
  reward: string
  rewardEmoji: string
  rewardName: string
}

export const QUESTS: Quest[] = [
  {
    id: 'q_keeper',
    title: 'Meet the Keeper',
    description: 'Speak to the Realm Keeper in the Starting Village',
    zone: 'The Starting Village',
    npcId: 'keeper',
    reward: 'orb',
    rewardEmoji: '🔮',
    rewardName: 'Orb of Origins',
  },
  {
    id: 'q_scholar',
    title: 'Read the Tomes',
    description: 'Visit the Academy of Knowledge',
    zone: 'Academy of Knowledge',
    npcId: 'scholar1',
    reward: 'scroll',
    rewardEmoji: '📜',
    rewardName: 'Scroll of Knowledge',
  },
  {
    id: 'q_guild',
    title: 'Join the Guild',
    description: 'Speak to the Guild Master',
    zone: 'Guild of Quests',
    npcId: 'guild1',
    reward: 'badge',
    rewardEmoji: '⚔️',
    rewardName: 'Quest Badge',
  },
  {
    id: 'q_forge',
    title: 'Claim the Artifacts',
    description: 'Find the artifacts in the Forge',
    zone: 'Forge of Artifacts',
    npcId: 'forge1',
    reward: 'artifact',
    rewardEmoji: '🔥',
    rewardName: 'Crystal Artifact',
  },
  {
    id: 'q_inn',
    title: 'Send a Message',
    description: "Visit the Messenger's Inn",
    zone: "Messenger's Inn",
    npcId: 'innkeeper',
    reward: 'letter',
    rewardEmoji: '✉️',
    rewardName: 'Raven Sent',
  },
]

export const QUEST_BY_NPC: Record<string, Quest> = Object.fromEntries(
  QUESTS.map((q) => [q.npcId, q])
)
