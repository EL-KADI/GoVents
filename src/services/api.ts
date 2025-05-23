import axios from 'axios';
import { EventResponse, EventType } from '../types/Event';

const API_KEY = 'eG10UWZzy97ITuLHAAtaFWZhm8fyCFOK';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';

export const searchEvents = async (
  city: string, 
  eventType: EventType,
  startDateTime?: string,
  endDateTime?: string,
  size: number = 20,
  page: number = 0,
): Promise<EventResponse> => {
  try {
    const params: Record<string, string | number> = {
      apikey: API_KEY,
      size,
      page,
    };

    
    if (city) {
      params.city = city;
    }


    if (eventType !== 'All') {
      params.classificationName = eventType;
    }

    if (startDateTime && endDateTime) {
      params.startDateTime = startDateTime;
      params.endDateTime = endDateTime;
    }

    const response = await axios.get<EventResponse>(`${BASE_URL}/events.json`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const getEventById = async (eventId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/events/${eventId}`, {
      params: {
        apikey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching event details:', error);
    throw error;
  }
};