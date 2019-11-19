export interface LocationModel {
  id: number;
  latitude: number;
  longitude: number;
  city: City;
}

interface City {
  id: number;
  name: string;
  state: State;
}

interface State {
  id: number;
  name: string;
}
