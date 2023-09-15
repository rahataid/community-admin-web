import {
  BANK_STATUS,
  GENDER,
  IBeneficiariesItem,
  IBeneficiaryClaimsDetails,
  IBeneficiaryDetails,
  IBeneficiaryDetailsTableList,
  IFilterOptions,
  INTERNET_ACCESS,
  PHONE_OWNERSHIP,
} from 'src/types/beneficiaries';

export const internetAccessOptions: IFilterOptions = Object.values(INTERNET_ACCESS) as string[];

export const bankStatusOptions: IFilterOptions = Object.values(BANK_STATUS) as string[];
export const phoneStatusOptions: IFilterOptions = Object.values(PHONE_OWNERSHIP) as string[];

export const genderOptions: IFilterOptions = Object.values(GENDER) as string[];

export const beneficiaryDetails: IBeneficiaryDetails = {
  address: {
    location: 'Darchula',
  },
  bankStatus: BANK_STATUS.BANKED,
  createdAt: '123456',
  dob: '01-01-1990',
  email: 'cr7@ronaldo.com',
  gender: GENDER.MALE,
  id: 7,
  internetAccess: INTERNET_ACCESS.HOME_INTERNET,
  isApproved: true,
  latitude: 100,
  longitude: 200,
  name: 'Cristiano Ronaldo',
  walletAddress: '0x0002',
  uuid: '213123hasd23210',
  tokensClaimed: 20,
  tokensAssigned: 10,
  _count: {
    projects: 22,
  },
  deletedAt: null,
  updatedAt: '21312',
  phone: '23123',
  phoneOwnership: PHONE_OWNERSHIP.FEATURE,
};

export const beneficiaryClaimsDetails: IBeneficiaryClaimsDetails = {
  claimedDate: '07/Jul/2023',
  receivedDate: '07/Jul/2023',
  claimedAmount: 200,
  receivedAmount: 100,
  walletAddress: '0x77777abcde',
};

export const beneficiaryTransactionList: IBeneficiaryDetailsTableList = [];

export const beneficiaryList: IBeneficiariesItem[] = [...Array(30)].map((_, index) => ({
  id: index,
  bankStatus: BANK_STATUS.BANKED,
  name: `Beneficiary ${index + 1}`,
  gender: GENDER.FEMALE,
  internetAccess: INTERNET_ACCESS.HOME_INTERNET,
  phoneOwnership: PHONE_OWNERSHIP.FEATURE,
  uuid: `sadadh-12312${index}`,
  createdAt: '2133',
  updatedAt: '2133',
  isApproved: true,
  tokensAssigned: 10,
  tokensClaimed: 20,
  deletedAt: null,
  dob: '01-01-1990',
  latitude: 23123,
  longitude: 23123,
  walletAddress: '0x0002',
}));
