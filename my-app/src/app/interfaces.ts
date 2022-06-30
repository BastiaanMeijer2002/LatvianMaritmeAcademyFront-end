export interface Stationdata {
  id:Number,
  geolocation:String,
  date:String,
  time:String,
  temperature:String,
  wind_speed:Number,
  wind_direction:Number,
  rain:Number
}

export interface StationdataSimple {
  geolocation:String,
  date:string,
  wind_speed:number,
  rainfall:number
}

export interface loginData {
  username:String,
  password:String
}

export interface geolocationPlace {
  place: String,
  country: String
}

export interface statistics {
  geolocation: String
  measurement: String
}

