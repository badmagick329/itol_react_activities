export type PokenameResult = {
  name: string;
  url: string;
};

export type Pokemon = {
  name: string;
  image: string;
  species: string;
  abilities: Ability[];
};

export type Ability = {
  name: string;
  url: string;
};
