import { Address } from '@prisma/client'

// 3 addresses
export const addresses: Address[] = [
  {
    id: 'address-01',
    phone: '0356543942',
    addressLine: '123B Tố Hữu',
    contactName: 'noname',
    coordinate: '16.0377806,108.2217842',
    province: 48,
    district: 492,
    ward: 20258,
  },
  {
    id: 'address-02',
    phone: '654832111',
    addressLine: '96 Hoàn Văn Thụ',
    contactName: 'noname',
    coordinate: '16.0630791,108.2166671',
    province: 48,
    district: 492,
    ward: 20242,
  },
  {
    id: 'address-03',
    phone: '1234245432',
    addressLine: '118 Thái Thị Bôi',
    coordinate: '16.0682418,108.195853',
    contactName: 'noname',
    province: 48,
    district: 491,
    ward: 20215,
  },
]
