import { HotelChainModels, HotelModels } from "./../models/hotel-models";
import {
  IDocListQueryResponse,
  IDocQueryResponse,
  IHotelChainDoc,
  IHotelChainInput,
  IHotelDocument,
  IHotelInput,
  IMutationResponse,
} from "./../types/types";

interface IHotelRepo {
  createHotel: (hotel: IHotelInput) => Promise<IMutationResponse>;
  editHotel: (hotel: IHotelDocument) => Promise<IMutationResponse>;
  getHotel: (
    hotelId: string
  ) => Promise<IDocQueryResponse<IHotelDocument | undefined>>;
  getHotels: () => Promise<IDocListQueryResponse<IHotelDocument>>;
  deleteHotel: (hotelId: string) => Promise<IMutationResponse>;
}

class HotelRepository implements IHotelRepo {
  protected model = new HotelModels();
  async createHotel(hotel: IHotelInput): Promise<IMutationResponse> {
    try {
      await this.model.createHotel(hotel);
      return {
        status: "success",
        successMessage: "Hotel created successfully",
      };
    } catch {
      return { status: "error", errorMessage: "Error creating hotel" };
    }
  }
  async editHotel(hotel: IHotelDocument): Promise<IMutationResponse> {
    try {
      await this.model.editHotel(hotel);
      return {
        status: "success",
        successMessage: "Hotel updated successfully",
      };
    } catch (e) {
      return { status: "error", errorMessage: "Error updating hotel" };
    }
  }
  async getHotel(
    hotelId: string
  ): Promise<IDocQueryResponse<IHotelDocument | undefined>> {
    try {
      const hotel = await this.model.getHotel(hotelId);
      return {
        doc: hotel,
        status: "success",
        successMessage: "Hotel retrieved successfully",
      };
    } catch {
      return {
        status: "error",
        errorMessage: "Hotel not found",
      };
    }
  }
  async getHotels(): Promise<IDocListQueryResponse<IHotelDocument>> {
    try {
      const hotels = await this.model.getHotels();
      return {
        docList: hotels,
        status: "success",
        successMessage: "Hotels retrieved successfully",
      };
    } catch {
      return {
        status: "error",
        errorMessage: "Hotels not found",
      };
    }
  }
  async deleteHotel(hotelId: string): Promise<IMutationResponse> {
    try {
      await this.model.deleteHotel(hotelId);
      return {
        status: "success",
        successMessage: "Hotel deleted successfully",
      };
    } catch {
      return { status: "error", errorMessage: "Hotel could not be deleted" };
    }
  }
}

export const HotelRepo = new HotelRepository();

interface IHotelChainRepo {
  createHotelChain: (
    hotelChain: IHotelChainInput
  ) => Promise<IMutationResponse>;
  editHotelChain: (hotelChain: IHotelChainDoc) => Promise<IMutationResponse>;
  getHotelChain: (
    hotelChainId: string
  ) => Promise<IDocQueryResponse<IHotelChainDoc | undefined>>;
  getHotelChains: () => Promise<IDocListQueryResponse<IHotelChainDoc>>;
  deleteHotelChain: (hotelChainId: string) => Promise<IMutationResponse>;
}

export class HotelChainRepository implements IHotelChainRepo {
  protected model = new HotelChainModels();
  async createHotelChain(
    hotelChain: IHotelChainInput
  ): Promise<IMutationResponse> {
    try {
      await this.model.createHotelChain(hotelChain);
      return {
        status: "success",
        successMessage: "Hotel chain created successfully",
      };
    } catch {
      return { status: "error", errorMessage: "Error creating hotel chain" };
    }
  }
  async editHotelChain(hotelChain: IHotelChainDoc): Promise<IMutationResponse> {
    try {
      await this.model.editHotelChain(hotelChain);
      return {
        status: "success",
        successMessage: "Hotel chain updated successfully",
      };
    } catch (e) {
      return { status: "error", errorMessage: "Error updating hotel chain" };
    }
  }
  async getHotelChain(
    hotelChainId: string
  ): Promise<IDocQueryResponse<IHotelChainDoc | undefined>> {
    try {
      const hotelChain = await this.model.getHotelChain(hotelChainId);
      return {
        doc: hotelChain,
        status: "success",
        successMessage: "Hotel chain retrieved successfully",
      };
    } catch {
      return {
        status: "error",
        errorMessage: "Hotel chain not found",
      };
    }
  }
  async getHotelChains(): Promise<IDocListQueryResponse<IHotelChainDoc>> {
    try {
      const hotelChains = await this.model.getHotelChains();
      return {
        docList: hotelChains,
        status: "success",
        successMessage: "Hotel chains retrieved successfully",
      };
    } catch {
      return {
        status: "error",
        errorMessage: "Hotel chains not found",
      };
    }
  }
  async deleteHotelChain(hotelChainId: string): Promise<IMutationResponse> {
    try {
      await this.model.deleteHotelChain(hotelChainId);
      return {
        status: "success",
        successMessage: "Hotel chain deleted successfully",
      };
    } catch {
      return {
        status: "error",
        errorMessage: "Hotel chain could not be deleted",
      };
    }
  }
}

export const HotelChainRepo = new HotelChainRepository();
