import axios from 'axios';

const url = "http://localhost:8080";

export const service = {
  getAbility: async () => {
    try {
      const response = await axios.get(`${url}/ability`);
      return response.data;
    } catch (error) {
      console.error('Error when searching for heroes: ', error);
      throw error;
    }
  },
  getHero: async () => {
    try {
      const response = await axios.get(`${url}/hero`);
      return response.data;
    } catch (error) {
      console.error('Error when searching for heroes: ', error);
      throw error;
    }
  },
  getHeroAbility: async () => {
    try {
      const response = await axios.get(`${url}/hero/ability`);
      return response.data;
    } catch (error) {
      console.error('Error when searching for heroes: ', error);
      throw error;
    }
  },
  createAbility: async (name_ability: string) => {
    const abilityData = {
      "nameAbility": name_ability
    }
    try {
      const response = await axios.post(`${url}/ability/create`, abilityData);
      return response.data;
    } catch (error) {
      console.error('Error when creating ability: ', error);
      throw error;
    }
  },

  createHero: async (hero_name: string, fk_ability: number) => {
    const heroData = {
      "nameHero": hero_name,
      "fkAbility": fk_ability
    }
    try {
      const response = await axios.post(`${url}/hero/create`, heroData);
      return response.data;
    } catch (error) {
      console.error('Error when creating hero: ', error);
      throw error;
    }
  },
  deleteHero: async (id_hero: number) => {
    try {
      const response = await axios.delete(`${url}/hero/delete/${id_hero}`);
      return response.data;
    } catch (error) {
      console.error('Error when deleting hero: ', error);
      throw error;
    }
  },
  deleteAbility: async (id_ability: number) => {
    try {
      const response = await axios.delete(`${url}/ability/delete/${id_ability}`);
      return response.data;
    } catch (error) {
      console.error('Error when deleting ability: ', error);
      throw error;
    }
  },
  updateHero: async (id_hero: number, nameHero: string, fkAbility: number) => {
    const dataHero = {
      "id_hero": id_hero,
      "nameHero": nameHero,
      "fkAbility": fkAbility
    }
    try {
      const response = await axios.put(`${url}/hero/update/${id_hero}`, dataHero)
      return response.data;
    } catch (error) {
      console.error('Error when deleting ability: ', error);
      throw error;
    }
  },
  updateAbility: async (id_ability: number, nameAbility: string) => {
    const dataAbility = {
      "id_ability": id_ability,
      "nameAbility": nameAbility,
    }
    try {
      const response = await axios.put(`${url}/ability/update/${id_ability}`, dataAbility)
      return response.data;
    } catch (error) {
      console.error('Error when deleting ability: ', error);
      throw error;
    }
  },
  getAbilitybyId: async (id_ability: number) => {
    try {
      const response = await axios.get(`${url}/ability/${id_ability}`)
      return response.data;
    } catch (error) {
      console.error('Error when deleting ability: ', error);
      throw error;
    }
  },
  getHeroybyId: async (id_hero: number) => {
    try {
      const response = await axios.get(`${url}/hero/${id_hero}`)
      return response.data;
    } catch (error) {
      console.error('Error when deleting ability: ', error);
      throw error;
    }
  },
}