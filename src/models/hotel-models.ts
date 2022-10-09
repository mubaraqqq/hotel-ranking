import { db } from "./../constants/constants";
import {
  IHotelChainDoc,
  IHotelChainInput,
  IHotelDocument,
  IHotelInput,
} from "../types/types";
import { generateUUID } from "../utils";

export interface IHotelImplementation {
  createHotel: (hotel: IHotelInput) => Promise<void>;
  editHotel: (hotelId: IHotelDocument) => Promise<void>;
  getHotel: (hotelId: string) => Promise<IHotelDocument | undefined>;
  getHotels: () => Promise<IHotelDocument[] | undefined>;
  deleteHotel: (hotelId: string) => Promise<void>;
}

export class HotelModels implements IHotelImplementation {
  async createHotel(hotel: IHotelInput): Promise<void> {
    let hotelDB = localStorage.getItem(db.HOTEL);
    let hotelArr: IHotelDocument[] = JSON.parse(hotelDB || "[]");
    let newHotelArr: IHotelDocument[] = [
      ...hotelArr,
      { ...hotel, hotelId: generateUUID() },
    ];
    localStorage.setItem(db.HOTEL, JSON.stringify(newHotelArr));
  }
  async editHotel(hotel: IHotelDocument): Promise<void> {
    let hotelDB = localStorage.getItem(db.HOTEL);
    let hotelArr: IHotelDocument[] = JSON.parse(hotelDB || "[]");
    let hotelToEditIndex = hotelArr.findIndex(
      (el) => el.hotelId === hotel.hotelId
    );
    hotelArr[hotelToEditIndex] = hotel;
    localStorage.setItem(db.HOTEL, JSON.stringify(hotelArr));
  }
  async getHotel(hotelId: string): Promise<IHotelDocument | undefined> {
    let hotelDB = localStorage.getItem(db.HOTEL);
    let hotelArr: IHotelDocument[] = JSON.parse(hotelDB || "[]");
    let hotel = hotelArr.find((el) => el.hotelId === hotelId);
    return hotel;
  }
  async getHotels(): Promise<IHotelDocument[] | undefined> {
    let hotelDB = localStorage.getItem(db.HOTEL);
    let hotelArr: IHotelDocument[] = JSON.parse(hotelDB || "[]");
    return hotelArr;
  }
  async deleteHotel(hotelId: string): Promise<void> {
    let hotelDB = localStorage.getItem(db.HOTEL);
    let hotelArr: IHotelDocument[] = JSON.parse(hotelDB || "[]");
    let filteredHotels = hotelArr.filter((el) => el.hotelId !== hotelId);
    localStorage.setItem(db.HOTEL, JSON.stringify(filteredHotels));
  }
}

export interface IHotelChainImplementation {
  createHotelChain: (hotelChain: IHotelChainInput) => Promise<void>;
  editHotelChain: (hotelChain: IHotelChainDoc) => Promise<void>;
  getHotelChain: (hotelChainId: string) => Promise<IHotelChainDoc | undefined>;
  getHotelChains: () => Promise<IHotelChainDoc[] | undefined>;
  deleteHotelChain: (hotelChainId: string) => Promise<void>;
}

export class HotelChainModels implements IHotelChainImplementation {
  async createHotelChain(hotelChain: IHotelChainInput): Promise<void> {
    let hotelChainDB = localStorage.getItem(db.HOTEL_CHAIN);
    let hotelChainArr: IHotelChainDoc[] = JSON.parse(hotelChainDB || "[]");
    let newHotelChainArr: IHotelChainDoc[] = [
      ...hotelChainArr,
      { ...hotelChain, chainId: generateUUID() },
    ];
    localStorage.setItem(db.HOTEL_CHAIN, JSON.stringify(newHotelChainArr));
  }
  async editHotelChain(hotelChain: IHotelChainDoc): Promise<void> {
    let hotelChainDB = localStorage.getItem(db.HOTEL_CHAIN);
    let hotelChainArr: IHotelChainDoc[] = JSON.parse(hotelChainDB || "[]");
    let hotelChainIndexToEdit = hotelChainArr.findIndex(
      (el) => el.chainId === hotelChain.chainId
    );
    hotelChainArr[hotelChainIndexToEdit] = hotelChain;
    localStorage.setItem(db.HOTEL_CHAIN, JSON.stringify(hotelChainArr));
  }
  async getHotelChain(
    hotelChainId: string
  ): Promise<IHotelChainDoc | undefined> {
    let hotelChainDB = localStorage.getItem(db.HOTEL_CHAIN);
    let hotelChainArr: IHotelChainDoc[] = JSON.parse(hotelChainDB || "[]");
    let hotelChain = hotelChainArr.find((el) => el.chainId === hotelChainId);
    return hotelChain;
  }
  async getHotelChains(): Promise<IHotelChainDoc[] | undefined> {
    let hotelChainDB = localStorage.getItem(db.HOTEL_CHAIN);
    let hotelChainArr: IHotelChainDoc[] = JSON.parse(hotelChainDB || "[]");
    return hotelChainArr;
  }
  async deleteHotelChain(hotelChainId: string): Promise<void> {
    let hotelChainDB = localStorage.getItem(db.HOTEL_CHAIN);
    let hotelChainArr: IHotelChainDoc[] = JSON.parse(hotelChainDB || "[]");
    let filteredHotelChainArr = hotelChainArr.filter(
      (el) => el.chainId !== hotelChainId
    );
    localStorage.setItem(db.HOTEL_CHAIN, JSON.stringify(filteredHotelChainArr));
  }
}
