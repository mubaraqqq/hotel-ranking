export interface IHotelDocument {
  name: string;
  city: string;
  country: string;
  address: string;
  hotelId: string;
  hotelChain?: string;
}

export interface IHotelInput extends Omit<IHotelDocument, "hotelId"> {}

export interface IHotelChainDoc {
  name: string;
  hq: string;
  chainId: string;
}

export interface IHotelChainInput extends Omit<IHotelChainDoc, "chainId"> {}
