export interface Event {
  id: string;
  name: string;
  url: string;
  images: {
    url: string;
    width: number;
    height: number;
    ratio?: string;
  }[];
  dates: {
    start: {
      localDate: string;
      localTime: string;
      dateTime: string;
    };
    timezone?: string;
    status?: {
      code: string;
    };
  };
  priceRanges?: {
    type: string;
    currency: string;
    min: number;
    max: number;
  }[];
  _embedded?: {
    venues: {
      name: string;
      city: {
        name: string;
      };
      state?: {
        name: string;
      };
      country: {
        name: string;
      };
      address?: {
        line1: string;
      };
      location?: {
        longitude: string;
        latitude: string;
      };
    }[];
  };
  classifications?: {
    segment: {
      name: string;
    };
    genre: {
      name: string;
    };
    subGenre?: {
      name: string;
    };
  }[];
  info?: string;
  pleaseNote?: string;
}

export interface EventResponse {
  _embedded: {
    events: Event[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

export type EventType = 'Music' | 'Arts & Theatre' | 'Sports' | 'All';