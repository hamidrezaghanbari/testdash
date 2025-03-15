type Channel =
  | 'ONSITE'
  | 'INAPP'
  | 'SURVEY'
  | 'PUSH'
  | 'WEBPUSH'
  | 'EMAIL'
  | 'CUSTOM'
  | 'SMS'
  | 'TELEGRAM'
  | 'WHATSAPP';

type CampaignTabData = {
  tab: 'list' | 'overview' | 'archive';
};

export type { Channel, CampaignTabData };
