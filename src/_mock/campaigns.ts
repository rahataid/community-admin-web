import { CAMPAIGN_TYPES, ICampaignFilterOptions } from 'src/types/campaigns';

export const campaignTypeOptions: ICampaignFilterOptions = Object.values(
  CAMPAIGN_TYPES
) as string[];
