export const BaseUrl = 'http://zhangyixiao.club:8080';

export enum BusinessCreatedStatus {
  ACTIVE = 'active',
  OFFLINE = 'offline',
}

export const businessCreatedListTag = {
  [BusinessCreatedStatus.ACTIVE]: '当前生效',
  [BusinessCreatedStatus.OFFLINE]: '已下线',
};

export const Type = {
  ReleaseByZaihui: 'ZAIHUI_CANCEL',
  ReleaseByMerchant: 'MERCHANT_CANCEL',
  ChangeBrand: 'BRAND_CHANGE',
  Other: 'OTHER',
};

export const TypeCN = {
  [Type.ReleaseByZaihui]: '再惠主动解约',
  [Type.ReleaseByMerchant]: '商户主动解约',
  [Type.ChangeBrand]: '商户更换品牌',
  [Type.Other]: '其他原因',
};

//账号状态
export enum BusinessManagementStatus {
  ENABLE = 'enable',
  DISABLE = 'disable',
}

export const BusinessManagementTag = {
  [BusinessManagementStatus.ENABLE]: '启用中',
  [BusinessManagementStatus.DISABLE]: '禁用中',
};
