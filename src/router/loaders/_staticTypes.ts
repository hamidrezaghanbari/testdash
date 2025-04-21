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

type UsersTabData = {
  tab: 'overview' | 'analyze' | 'search';
};

export type { Channel, UsersTabData, CampaignTabData };
