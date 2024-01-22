export interface Animal {
  animal_id: number;
  name: string;
  race: string;
  age: number;
  user_id: string;
  owner_name: string;
  owner_phone: string;
  owner_email: string;
  created_at: string;
  updated_at: string;
}

export interface Vaccination {
  vaccination_id: number;
  vaccin_name: string;
  animal_id: number;
  user_id: string;
  vaccination_date: string;
  created_at: string;
  updated_at: string;
}
