// Promise Types
export type IQueryStatus = "success" | "error";

export type IQueryResponse = {
  status: IQueryStatus;
  errorMessage?: string;
  successMessage?: string;
  isLoading?: boolean;
};

export interface IDocQueryResponse<T> extends IQueryResponse {
  doc?: T;
}

export interface IDocListQueryResponse<T> extends IQueryResponse {
  docList?: T[];
}

export interface IMutationResponse extends IQueryResponse {
  doc?: unknown;
}

// Hotel Types
export interface IHotelDocument {
  name: string;
  city: string;
  country: string;
  address: string;
  hotelId: string;
  hotelChain: string;
}

export interface IHotelInput extends Omit<IHotelDocument, "hotelId"> {}

export interface IHotelChainDoc {
  name: string;
  hq: string;
  chainId: string;
}

export interface IHotelChainInput extends Omit<IHotelChainDoc, "chainId"> {}
